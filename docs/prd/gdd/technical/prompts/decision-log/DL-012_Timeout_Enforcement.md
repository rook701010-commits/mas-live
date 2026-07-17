Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認: Phase9指示「1. TIMEOUT処理実装 - player answer / boss answer / 統一したエラーコード」)

タイトル

制限時間切れ（TIMEOUT）判定の実装

背景

07_API_Final_Specification.mdにはTIMEOUTエラーコードが定義済みだったが、Phase8時点ではどのエンドポイントでも未使用だった（DL-011で保留事項として明記）。Phase9でrook7から明示的にTIMEOUT処理実装の指示があったため実装する。

決定

player/answer, boss/answerの双方で、回答受付時にcomputeRemainingSeconds（session.tsの既存関数、QUESTION_STARTログからの経過時間で残り秒数を算出）を用いて残り時間を判定し、0秒以下の場合はTIMEOUTエラー（409）を返し、回答を保存しない。

理由

01_Core_Game_Loop.mdで規定される20秒固定の出題フローに対し、時間切れ後の回答が無制限に受理される状態はゲームルールと実装の乖離だった。既存のcomputeRemainingSeconds実装（session/current, overlay/stateで既に使用）をそのまま流用するため、新規のタイマー機構は追加していない。

影響範囲

- workers/src/routes/player.ts（handlePlayerAnswer）
- workers/src/routes/boss.ts（handleBossAnswer）
- 既存の正常系（時間内の回答）には影響なし。
- Player Client / Boss Clientは既に汎用エラーメッセージ表示のため未対応でも動作するが、Phase9でUXとして「時間切れ」専用表示を追加する。
