Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認)

タイトル

POST /session/next エンドポイントの追加

背景

07_API_Final_Specification.mdには問題を1問ずつ進める手段が存在しなかった。一方、technical/prompts/05_Claude_Phase5_Boss_Client.mdはBoss画面に「次の問題」ボタンを要求しており、Phase2のAPI実装時に矛盾が判明した。

決定

POST /session/next（body: session_id）を追加する。sessions.current_question_noをインクリメントし、game_logsへQUESTION_STARTイベントを記録する。

理由

この機能がないと20問を順に進行できず、MVP必須要件（20問回答できる）を満たせない。既存エンドポイントへの破壊的変更はなく、DBスキーマ変更も不要（既存カラムを利用）。

影響範囲

- docs/prd/gdd/technical/07_API_Final_Specification.md（本コミットでエンドポイント追記済み）
- workers/src/routes/session.ts（本コミットで実装）
- workers/src/index.ts（ルーティング追加）
