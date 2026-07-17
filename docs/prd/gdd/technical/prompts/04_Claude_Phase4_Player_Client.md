Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase4

Player React Client Implementation

目的



視聴者がスマートフォンから参加できるPlayer Clientを作成する。



このPhaseでは、



参加

問題表示

回答

回答結果

現在スコア確認



までを実装する。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアフロントエンドエンジニアです。



Phase4:

Player React Client Implementation

を実施してください。



必ず以下を確認してください。



参照資料:



docs/gdd/



docs/technical/07\_API\_Final\_Specification.md



docs/technical/06\_Database\_Final\_Schema.md





仕様変更は禁止です。



改善案がある場合は実装前に提案してください。



\---



\# Step1



現在のFrontend構成を確認してください。



確認:



\- apps/player

\- package.json

\- React設定

\- TypeScript設定



結果を報告してください。



\---



\# Step2



Player画面構成を作成してください。



ディレクトリ:



apps/player/src/







components/



JoinForm.tsx



QuestionCard.tsx



AnswerButton.tsx



ResultPanel.tsx



ScoreBoard.tsx



pages/



JoinPage.tsx



GamePage.tsx



ResultPage.tsx



hooks/



useSession.ts



useQuestion.ts



useAnswer.ts



api/



client.ts





\---



\# Step3



参加画面を作成してください。



\## JoinPage



表示:



タイトル



Boss名



ニックネーム入力欄



参加ボタン





処理:



POST



/api/player/join





成功:



participant\_token保存



↓



GamePageへ移動



\---



\# Step4



ゲーム画面を作成してください。



表示:



\- 問題番号

\- 問題文

\- 選択肢4つ

\- 残り時間

\- 回答状態





\---



\# Step5



回答機能を作成してください。





仕様:



回答ボタン押下



↓



API送信



↓



回答済み表示





API:



POST



/api/player/answer





送信:



\- session\_id

\- participant\_token

\- question\_id

\- answer





\---



\# Step6



Polling処理を実装してください。





仕様:



5秒間隔



取得:



GET



/api/player/question





更新:



\- 問題

\- 残り時間

\- 状態





\---



\# Step7



結果表示を作成してください。





表示:



\- 自分の正解数

\- 現在順位

\- Raid平均

\- Bossとの差





\---



\# Step8



スマホ対応してください。





必須:



\- 縦画面対応

\- 大きなボタン

\- タップ領域44px以上

\- 片手操作可能





\---



\# Step9



エラー処理を追加してください。





ケース:



\- 通信失敗

\- セッション終了

\- 回答済み

\- 時間切れ





\---



\# Step10



テストしてください。





確認:



\## PC



Chrome



\---



\## Mobile



Chrome iPhoneサイズ



Androidサイズ





\---



\# 禁止事項



禁止:



\- ログイン追加

\- SNS連携

\- 不要なアニメーション

\- UIライブラリ大量追加

\- 状態管理ライブラリ追加





\---



\# 完了報告形式



変更ファイル:







一覧





画面:







作成画面





API:







利用API





確認:







PC:

Mobile:





問題:







未解決事項





\---



\# Phase4完了条件



✓ 視聴者参加可能



✓ 問題表示可能



✓ 回答送信可能



✓ 結果確認可能



✓ スマホ操作可能





次Phase:



Phase5



Boss Client Implementation

開発メモ



Player Clientは最初から豪華にしない。



目的は、



「配信を見ながら3秒で参加できること」



である。



重要度:



参加速度



＞



見た目



＞



機能量



次に作成する資料：



docs/prompts/05\_Claude\_Phase5\_Boss\_Client.md



内容：



配信者用操作画面

問題開始

Boss回答

勝敗表示

配信運用フロー



を定義します。

