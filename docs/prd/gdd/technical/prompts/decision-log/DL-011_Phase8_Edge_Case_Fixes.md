Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認: Phase8結合テスト指示内「5. 発見した問題は可能なら修正してください」に基づく)

タイトル

Phase8結合テストで発見したエッジケース不備の修正

背景

Phase8の全体結合テストにおいて、以下の不整合をコードレビューで発見した。

1. ranking/live・ranking/finalがsession_idの実在確認をしておらず、存在しないsession_idでも200 successで空データを返していた（他の全エンドポイントはSESSION_NOT_FOUNDを返す設計と不整合）。
2. player/question・player/answerがセッション終了後（status='finished'）でもアクセス可能だった（session/endを呼んでも、Player Clientはそれを知らず前回問題や回答受付を継続できてしまう）。
3. boss/answerがsession_idの実在・終了確認を一切行っていなかった（不正session_idでもboss_answersにレコードが作成されてしまう）。

決定

- ranking/live, ranking/finalにsession実在チェックを追加し、存在しない場合はSESSION_NOT_FOUND(404)を返すようにした。
- player/question, player/answerにセッション終了チェックを追加し、status='finished'の場合はSESSION_FINISHED(409)を返すようにした。
- boss/answerにsession実在チェックとセッション終了チェックを追加した。

理由

07_API_Final_Specification.mdのError Code定義（SESSION_NOT_FOUND / SESSION_FINISHED）が一部エンドポイントでのみ実装されており、Phase3で確認された正常系のみのテストでは発覚しなかった。エラーレスポンスの一貫性を担保するための修正であり、リクエスト/レスポンスのスキーマ自体は変更していない（新規エラーケースの追加のみ）。

影響範囲

- workers/src/routes/ranking.ts
- workers/src/routes/player.ts
- workers/src/routes/boss.ts
- 既存の正常系動作（有効なsession_idでの操作）には影響なし。

保留事項

remaining_secondsが0以下になった後もplayer/answer・boss/answerが回答を受理する（TIMEOUT判定が未実装）。07_API_Final_Specification.mdにはTIMEOUTエラーコードが定義済みだが、どのエンドポイントでも未使用。時間切れ後の回答を拒否するかどうかはゲームルール（GDD）に関わる判断のため、本DLでは修正せず別途確認を提案する。
