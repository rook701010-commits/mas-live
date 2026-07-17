Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認)

タイトル

GET /overlay/state レスポンスへの remaining_seconds, participants 追加

背景

13_OBS_Overlay.mdは「残り時間」「Raid人数」の表示を要求していたが、07_API_Final_Specification.mdのoverlay/stateレスポンスにはこれらが含まれていなかった。Phase6実装にあたり判明。

決定

overlay/stateのレスポンスに remaining_seconds（数値、秒）と participants（数値、人数）を追加する。

理由

OBS画面で残り時間・参加人数を表示するために必須。既存フィールド（boss/question/score/average/event）は変更せず追加のみのため、Player/Boss Clientへの影響はない。

影響範囲

- docs/prd/gdd/technical/07_API_Final_Specification.md（本コミットで追記済み）
- workers/src/routes/ranking.ts（handleOverlayStateに実装済み）
- workers/src/routes/session.ts（computeRemainingSecondsをexportし再利用）

なお、13_OBS_Overlay.mdが求める「シーズン」「連勝数」表示は、配信を跨いだBoss通算成績を保持するDBテーブルが存在しないため（Season Systemの範囲）、本DLの対象外とする。
