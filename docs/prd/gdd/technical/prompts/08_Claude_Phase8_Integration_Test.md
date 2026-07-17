Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase8

Integration Test

目的



MAS LIVE Core全体を接続し、



実際の配信環境で利用可能か確認する。



対象:



Player

Boss

API

Database

Overlay

OBS

Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

QAリードエンジニアです。



Phase8:

Integration Test

を実施してください。



参照資料:



docs/technical/



docs/roadmap/01\_MVP\_Development\_Plan.md





目的:



本番配信可能レベルか確認する。



\---



\# Step1



現在の実装状態を確認してください。



確認:



Frontend:



\- boss

\- player

\- admin

\- overlay





Backend:



\- Workers

\- D1





結果を一覧化してください。



\---



\# Step2



End-to-Endテストを実施してください。





シナリオ:



\## 配信開始



1



BossがSession作成





2



Playerが参加





3



Bossが開始





4



20問進行





5



回答受付





6



集計





7



勝敗表示





8



終了





\---



\# Step3



テストケースを作成してください。





形式:







ID



対象



操作



期待結果



結果





\---



\# 必須テスト





\## Player



\### P001



参加可能





期待:



participant\_token発行





\---



\### P002



回答可能





期待:



answers保存





\---



\### P003



二重回答





期待:



拒否





\---



\## Boss





\### B001



Session作成





期待:



session生成





\---



\### B002



20問操作





期待:



正常進行





\---



\## API





\### A001



存在しないsession





期待:



エラー





\---



\### A002



不正answer





期待:



拒否





\---



\## Database





\### D001



回答保存確認





\### D002



ランキング計算確認





\---



\## OBS





\### O001



Overlay表示





期待:



正常表示





\---



\# Step4



負荷テスト。





目標:



同時参加



100人





確認:



\- 回答送信

\- 集計速度

\- DB負荷

\- APIレスポンス





\---



\# Step5



スマホテスト。





対象:



iPhone



Android





確認:



\- 表示

\- タップ

\- 通信切替





\---



\# Step6



配信リハーサル。





実施:



30分連続稼働





確認:



\- OBS

\- 音声

\- Overlay

\- 操作ミス





\---



\# Step7



問題一覧確認。





確認:



\- 20問完成

\- 正解設定

\- 解説

\- 難易度





\---



\# Step8



バグ分類。





分類:



Critical



High



Medium



Low





\---



\## Critical



リリース禁止。





例:



ゲーム停止



回答不可



集計不能





\---



\## High



修正後リリース。





例:



表示崩れ



一部機能不良





\---



\## Medium



次回修正。





\---



\## Low



改善候補。



\---



\# 完了報告形式



テスト結果:







総テスト数:



成功:



失敗:



未対応:





Critical:







有無





リリース判断:







GO



or



NO GO





\---



\# Phase8完了条件



✓ E2E成功



✓ 100人テスト成功



✓ OBS確認完了



✓ Criticalバグ0件



✓ 配信可能判定



\---



次Phase:



Phase9



Beta Release

開発メモ



このPhaseは非常に重要。



Webサービスは、



「作った」



では完成ではない。



「配信中に止まらない」



ことが完成条件。



特にMAS LIVEは、



普通のWebサービスではなく、



ライブイベントシステム



として評価する。



次に作成する資料：



docs/prompts/09\_Claude\_Phase9\_Beta\_Release.md



内容：



10〜20人テスト

フィードバック収集

改善サイクル

正式リリース判断



を定義します。

