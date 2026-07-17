Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認: 「自律的に先の作業を進めて」の包括承認に基づく非破壊的追加)

タイトル

GET /admin/question/list エンドポイントの追加

背景

07_API_Final_Specification.mdのAdmin APIにはcreate/update/delete/dashboardのみが定義されており、問題一覧を取得する手段がなかった。Admin Panel(QuestionTable)の実装にあたり必要になった。

決定

GET /admin/question/list を追加する。questionsテーブルからid/category/difficulty/title/statusを一覧取得する。

理由

Admin画面の問題管理テーブルに一覧表示するために必須。既存エンドポイントへの変更・DBスキーマ変更なし。

影響範囲

- workers/src/routes/admin.ts（実装済み）
- workers/src/index.ts（ルーティング追加）
- docs/prd/gdd/technical/07_API_Final_Specification.md（追記が必要、本コミットで反映）
