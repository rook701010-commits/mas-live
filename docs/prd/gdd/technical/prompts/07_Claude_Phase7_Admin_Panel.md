Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase7

Admin Panel Implementation

目的



MAS LIVE Coreの運営者向け管理画面を作成する。



目的は、



「コードを書き換えずに配信イベントを準備できる状態」



を作ること。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアフルスタックエンジニアです。



Phase7:

Admin Panel Implementation

を実施してください。



必ず以下を確認してください。



参照資料:



docs/gdd/



docs/technical/06\_Database\_Final\_Schema.md



docs/technical/07\_API\_Final\_Specification.md





仕様変更は禁止です。



改善案がある場合は実装前に提案してください。



\---



\# Step1



現在のAdmin構成を確認してください。



確認:



apps/admin



React設定



API接続状態



\---



\# Step2



Admin画面構成を作成してください。



構成:



apps/admin/src/







components/



QuestionTable.tsx



QuestionEditor.tsx



SessionCreator.tsx



DashboardCard.tsx



pages/



DashboardPage.tsx



QuestionsPage.tsx



SessionsPage.tsx



api/



client.ts





\---



\# Step3



Dashboardを作成してください。



表示:



\- 総問題数

\- 公開問題数

\- 配信回数

\- 総参加人数

\- 平均正答率



\---



\# Step4



問題管理機能を作成してください。



\## 一覧



表示:



\- ID

\- カテゴリ

\- 難易度

\- 問題タイトル

\- 状態





\---



\## 登録



入力:



\- カテゴリ

\- 難易度

\- 問題文

\- 選択肢A〜D

\- 正解

\- 解説





API:



POST



/api/admin/question/create





\---



\## 編集



API:



PUT



/api/admin/question/update





\---



\## 削除



API:



DELETE



/api/admin/question/delete





\---



\# Step5



配信作成機能を作成してください。





入力:



タイトル



Boss名



問題数





処理:



POST



/api/session/create





\---



\# Step6



問題選択機能を作成してください。





仕様:



公開済み問題から選択



↓



セッションへ登録





\---



\# Step7



CSV機能を追加してください。





対応:



Export



Import



\---



用途:



大量問題追加



バックアップ



問題管理



\---



\# Step8



統計表示を作成してください。





表示:



問題別:



\- 回答数

\- 正答率

\- 平均回答時間





\---



\# Step9



権限について。





MVP:



管理者1人のみ。





実装しない:



\- 複数管理者

\- 権限管理

\- ロール管理





\---



\# Step10



テスト。





確認:



\- 問題追加

\- 問題編集

\- 問題削除

\- Session作成

\- Dashboard表示





\---



\# 禁止事項



禁止:



\- ログイン実装

\- 権限システム

\- 決済

\- SNS連携

\- 不要なCMS化





\---



\# 完了報告形式



変更ファイル:







一覧





機能:







実装済み機能





API:







利用API





確認:







テスト結果





問題:







未解決事項





\---



\# Phase7完了条件



✓ 問題登録可能



✓ 配信準備可能



✓ 統計確認可能



✓ CSV管理可能





次Phase:



Phase8



Integration Test

開発メモ



Adminは最初から豪華なCMSにしない。



重要なのは、



配信前30分で準備できること。



理想運用：



前日

↓

問題確認



当日配信前

↓

Session作成



配信開始

↓

Boss Client操作



という流れ。



次に作成する資料：



docs/prompts/08\_Claude\_Phase8\_Integration\_Test.md



内容：



全システム接続テスト

100人参加テスト

OBS配信テスト

バグ確認

リリース判定基準



を作成します。

