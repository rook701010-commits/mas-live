Version: 1.0



Status: Draft



Date: 2026-07-17



MAS LIVE Core MVP Development Plan

「100人でrook7を倒せ！」

1\. MVPの目的



MAS LIVE Core MVPの目的は、



YouTubeライブ配信で実際に利用できる



「視聴者参加型麻雀バトルシステム」



を最短で完成させることである。



MVPでは、



大規模サービス化や高度なランキング機能よりも、



以下を優先する。



配信で動くこと

視聴者が参加できること

勝敗が成立すること

毎週開催できること

2\. MVP完成条件



以下を満たした時点でMVP完成とする。



必須条件



✓ 配信者がゲーム開始できる



✓ 視聴者がURLから参加できる



✓ 20問回答できる



✓ 回答データが保存される



✓ rook7スコア計算可能



✓ 視聴者平均スコア計算可能



✓ 勝敗判定可能



✓ OBS画面表示可能



✓ 結果を保存できる



3\. MVP対象ユーザー

Boss



対象:



配信者 rook7



役割:



イベント開始

問題進行

自身の回答

結果確認

Player



対象:



視聴者



役割:



参加

問題回答

結果確認

Admin



対象:



運営者



MVPでは:



rook7本人のみ。



役割:



問題管理

イベント準備

4\. MVPシステム構成

&#x20;                YouTube Live



&#x20;                    ↓





&#x20;                OBS Overlay





&#x20;                    ↑





Boss Client ← API → Cloudflare Workers





&#x20;                    ↓





&#x20;                Cloudflare D1





&#x20;                    ↑





Player Client

5\. 開発Phase

Phase0

Project Setup



目的:



開発基盤準備。



実施:



GitHub作成

Folder構成

環境設定

Claudeへ資料投入



完了条件:



開発開始可能状態。



Phase1

Frontend / Backend Setup



目的:



基本環境構築。



実施:



React設定

Workers設定

D1準備

Deploy確認

Phase2

Database \& API Foundation



目的:



ゲームデータ保存基盤作成。



実装:



Session

Question

Answer

Result



API:



Session作成

問題取得

回答送信

集計取得

Phase3

Player Client



目的:



視聴者参加画面作成。



機能:



名前入力

Session参加

問題表示

回答送信

結果表示

Phase4

Boss Client



目的:



配信者操作画面作成。



機能:



開始

問題進行

回答入力

スコア確認

Phase5

Game Core



目的:



勝敗システム完成。



実装:



20問管理

正答判定

平均計算

勝敗判定

Phase6

OBS Overlay



目的:



配信画面表示。



表示:



問題番号

Bossスコア

Raid平均

防衛記録

勝敗

Phase7

Admin Panel



目的:



運営効率化。



機能:



問題登録

問題編集

Session作成

統計確認

Phase8

Integration Test



目的:



実配信確認。



テスト:



Boss操作

Player参加

OBS表示

データ保存

Phase9

Beta Test



目的:



10〜20人規模で検証。



確認:



楽しいか

分かりやすいか

技術問題

Phase10

Release



目的:



正式運用開始。



実施:



初回イベント

記録開始

Season開始

6\. MVPで実装しないもの



以下は後回し。



アカウント機能



理由:



参加ハードル低下優先。



個人ランキング



理由:



まずイベント成立を確認。



称号



理由:



Season開始後追加。



WebSocket



理由:



100人規模ならPollingで十分。



AI機能



理由:



ゲーム成立後に追加。



7\. 技術選定

Frontend



React



理由:



高速開発可能。



Backend



Cloudflare Workers



理由:



低コスト・高可用性。



Database



Cloudflare D1



理由:



MVP規模に適合。



Hosting



Cloudflare Pages



理由:



Workersとの相性。



8\. 開発優先順位



優先順位:









ゲームが動く









配信で使える









視聴者が楽しい









記録が残る









拡張する



9\. MVP成功指標



初回目標:



参加者:



10〜20人



成功条件:



全員最後まで参加

勝敗表示成功

配信者がまた使いたいと思う

視聴者が次回参加したいと思う

10\. MVP後ロードマップ



MVP



↓



Season System



↓



Ranking



↓



Multi Streamer



↓



MAS LIVE Platform



最終方針



MVPで作るものは、



「完成された麻雀サービス」



ではない。



まず作るべきものは、



毎週開催できるライブゲームの核



である。

