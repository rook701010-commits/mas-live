# Phase8 結合テストチェックリスト（ローカル実行用）

サンドボックス環境のファイルマウントに既知のキャッシュ遅延があり、`wrangler dev` / `tsc` / `npm run build` をClaude側で安定実行できませんでした（詳細は完了報告を参照）。以下はユーザーのローカル環境（`C:\GitHub\mas-live`）で実行するための手順です。

## 0. 事前準備

```
cd /c/GitHub/mas-live
npm install
npm run dev:workers   # 別ターミナルでD1ローカルサーバー起動 (http://127.0.0.1:8787)
```

## 1. tsc / build確認

```
cd workers && npx tsc --noEmit
cd ../apps/player && npx tsc -b && npx vite build
cd ../boss && npx tsc -b && npx vite build
cd ../admin && npx tsc -b && npx vite build
cd ../overlay && npx tsc -b && npx vite build
```

## 2. API全エンドポイント確認（curl）

```bash
BASE=http://127.0.0.1:8787/api

curl -s $BASE/health

SID=$(curl -s -X POST $BASE/session/create -H "Content-Type: application/json" -d "{\"title\":\"t\",\"boss_name\":\"rook7\",\"question_count\":20}" | grep -o '"session_id":"[^"]*"' | cut -d'"' -f4)
echo "session_id=$SID"

curl -s -X POST $BASE/session/start -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\"}"
curl -s "$BASE/session/current?session_id=$SID"

TOKEN=$(curl -s -X POST $BASE/player/join -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\",\"nickname\":\"tester\"}" | grep -o '"participant_token":"[^"]*"' | cut -d'"' -f4)
echo "token=$TOKEN"

curl -s "$BASE/player/question?session_id=$SID"
# 上記レスポンスのquestion_idを使って回答
curl -s -X POST $BASE/player/answer -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\",\"participant_token\":\"$TOKEN\",\"question_id\":\"<question_id>\",\"answer\":\"A\"}"

curl -s -X POST $BASE/boss/answer -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\",\"question_id\":\"<question_id>\",\"answer\":\"A\"}"
curl -s "$BASE/boss/result?session_id=$SID"

curl -s "$BASE/ranking/live?session_id=$SID"

curl -s -X POST $BASE/session/next -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\"}"

curl -s -X POST $BASE/session/end -H "Content-Type: application/json" -d "{\"session_id\":\"$SID\"}"
curl -s "$BASE/ranking/final?session_id=$SID"

curl -s "$BASE/admin/dashboard"
curl -s "$BASE/admin/question/list"
```

## 3. Edge Case確認（Phase8で修正済みの挙動を含む）

| ケース | 確認方法 | 期待結果 |
|---|---|---|
| 参加者0人 | player/joinせずranking/live | participants:0, average:0, top:[] |
| 未回答者あり | 一部participantのみanswer送信後ranking/live | 未回答者はscore 0でaverageに含まれる |
| 同点処理 | boss/answerとplayer/answerの正答数を同数にしてranking/final | winner:"boss"（DL-007） |
| Boss未回答 | boss/answerを一度も呼ばずranking/final | boss_score:0、raid側が0より大きければwinner:"raid" |
| 制限時間切れ | session/start後20秒待ってplayer/answer, boss/answer | TIMEOUT (409)（Phase9 DL-012で実装。以前はDL-011の保留事項だった） |
| セッション終了後アクセス | session/end後にplayer/question, player/answer, boss/answer | SESSION_FINISHED (409) ※Phase8で修正 |
| 不正session_id | 存在しないUUIDでranking/live, ranking/final, session/current, player/question | SESSION_NOT_FOUND (404) ※ranking系はPhase8で修正 |
| 不正participant_token | player/answerにでたらめなtoken | INVALID_REQUEST (403) |

## 4. Frontend確認

- Player (`npm run dev:player`): 参加→問題表示→回答→次問題→結果表示
- Boss (`npm run dev:boss`): セッション作成/開始→問題表示→回答→次問題→終了
- Admin (`npm run dev:admin`): ダッシュボード表示→問題一覧→新規作成→編集→削除→セッション作成

## 5. commit準備

```
git status
git diff
npm run build 2>&1 | tee build.log   # 各workspaceでのbuildをまとめて確認する場合は個別に実行
git add -A
git commit -m "fix: Phase8 edge case fixes (session validation on ranking/player/boss endpoints)"
```
