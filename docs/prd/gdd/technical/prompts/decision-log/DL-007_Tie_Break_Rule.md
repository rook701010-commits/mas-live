Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認)

タイトル

同点時の勝敗判定ルールの統一

背景

01_Core_Game_Loop.mdは「同点 → Boss防衛成功」、21_Season_System.mdは「同点の場合 → 視聴者勝利」と、GDD間で矛盾する記述が存在した。ranking/final APIの実装にあたり、どちらか一方に統一する必要があった。

決定

同点の場合、Boss防衛成功（Boss勝利）とする。

理由

01_Core_Game_Loop.mdの記載を正とする。Bossを「防衛側」と位置づける本企画のコンセプト（「100人でrook7を倒せ！」＝視聴者が攻める側）と整合する。

影響範囲

- workers/src/routes/ranking.ts の勝敗判定ロジック
- docs/prd/gdd/21_Season_System.mdの該当記述（本コミットで修正）

以降、同点時の勝敗判定はこの決定に従う。
