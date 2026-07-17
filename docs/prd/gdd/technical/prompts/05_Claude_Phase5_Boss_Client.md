Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase5

Boss React Client Implementation

目的



配信者（rook7）が配信中に操作するBoss Clientを作成する。



この画面は、



「ゲームマスター画面」



として利用する。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアフロントエンドエンジニアです。



Phase5:

Boss Client Implementation

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



現在の構成を確認してください。



確認:



apps/boss



React設定



API接続状況





結果を報告してください。



\---



\# Step2



Boss画面構成を作成してください。



ディレクトリ:



apps/boss/src/







components/



SessionControl.tsx



QuestionDisplay.tsx



AnswerPanel.tsx



ScorePanel.tsx



BattleResult.tsx



pages/



DashboardPage.tsx



hooks/



useGameControl.ts



useBossAnswer.ts



api/



client.ts





\---



\# Step3



Dashboard画面を作成してください。





表示:



\## 上部



タイトル



Boss名



参加人数





\---



\## 中央



現在問題



問題番号



残り時間





\---



\## 下部



Boss回答欄



A



B



C



D





\---



\# Step4



ゲーム開始機能を作成してください。





ボタン:



「配信開始」



処理:



POST



/api/session/create





↓



POST



/api/session/start





\---



\# Step5



問題進行機能を作成してください。





ボタン:



「次の問題」



処理:



現在問題更新



\---



\# Step6



Boss回答機能を作成してください。





操作:



回答ボタン選択





API:



POST



/api/boss/answer





\---



\# Step7



結果表示を作成してください。





表示:



Boss正解数



Raid平均



差分



勝敗予測





\---



\# Step8



配信者向け操作性を調整してください。





条件:



\- マウス操作中心

\- キーボード操作対応

\- 誤操作防止

\- 画面情報を大きく表示





\---



\# キーボード操作



対応:



A



B



C



D



↓



回答





Space



↓



次問題





Enter



↓



開始





\---



\# Step9



OBS連携用データ確認。





Boss画面から



Overlay API



が正常更新されることを確認。



\---



\# Step10



テスト。





確認:



\- セッション作成

\- 開始

\- 20問進行

\- Boss回答

\- 結果表示





\---



\# 禁止事項



禁止:



\- ゲームルール変更

\- HP追加

\- スキル追加

\- 演出追加

\- 認証追加





\---



\# 完了報告形式



変更ファイル:







一覧





実装:







機能一覧





API:







利用API一覧





テスト:







結果





問題:







未解決事項





\---



\# Phase5完了条件



✓ 配信者がゲーム開始可能



✓ 20問操作可能



✓ Boss回答可能



✓ 結果確認可能



✓ OBS連携準備完了





次Phase:



Phase6



OBS Overlay Implementation

開発メモ



Boss Clientは単なる管理画面ではない。



配信中の「演出コントローラー」である。



重要度:



操作ミス防止



＞



情報の見やすさ



＞



デザイン



次に作成する資料：



docs/prompts/06\_Claude\_Phase6\_OBS\_Overlay.md



内容：



OBS Browser Source

配信画面設計

アニメーション

勝敗演出

rook7チャンネル向け画面構成



を定義します。

