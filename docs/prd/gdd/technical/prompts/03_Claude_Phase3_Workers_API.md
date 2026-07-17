Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase3

Workers API Implementation

目的



Cloudflare Workers上にMAS LIVE Core APIを実装する。



このPhaseでは、



APIルーティング

D1接続

Session管理

問題取得

回答受付

集計処理



を完成させる。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアバックエンドエンジニアです。



Phase3:

Workers API Implementation

を実施してください。



必ず以下を確認してください。



参照資料:



docs/technical/07\_API\_Final\_Specification.md



docs/technical/06\_Database\_Final\_Schema.md



docs/decision-log/DL-005\_Communication\_Architecture.md





仕様変更は禁止です。



改善案がある場合は、

実装前に提示してください。



\---



\# Step1



現在のWorkers構成を確認してください。



確認:



\- src/index.ts

\- wrangler.toml

\- D1 binding

\- package.json



結果を報告してください。



\---



\# Step2



API Routerを作成してください。



構成:



workers/src/



├ index.ts



├ routes/



│ ├ session.ts



│ ├ player.ts



│ ├ boss.ts



│ ├ ranking.ts



│ └ admin.ts



├ services/



│ ├ sessionService.ts



│ ├ questionService.ts



│ ├ rankingService.ts



│ └ answerService.ts



└ utils/



&#x20; └ response.ts





必要以上の分割は禁止。



\---



\# Step3



共通Response処理を作成してください。



成功:



{

&#x20;success:true,

&#x20;data:{}

}





失敗:



{

&#x20;success:false,

&#x20;error:{

&#x20;  code:"",

&#x20;  message:""

&#x20;}

}



\---



\# Step4



Session APIを実装してください。



\## POST



/api/session/create





処理:



\- sessions作成

\- session\_id発行





\---



\## POST



/api/session/start





処理:



\- status変更



created



↓



playing





\---



\## GET



/api/session/current





返却:



\- status

\- current\_question\_no

\- remaining\_seconds





\---



\## POST



/api/session/end





処理:



playing



↓



finished





\---



\# Step5



Player APIを実装してください。



\---



\## POST



/api/player/join





処理:



\- participant作成

\- participant\_token発行





\---



\## GET



/api/player/question





返却:



\- 問題文

\- 選択肢

\- 残り時間





\---



\## POST



/api/player/answer





処理:



\- token確認

\- 重複回答確認

\- 正解判定

\- answers保存





\---



\# Step6



Boss APIを実装してください。





\## POST



/api/boss/answer





処理:



\- boss\_answers保存

\- 正解判定





\---



\## GET



/api/boss/result





返却:



\- Boss正解数

\- 問題数





\---



\# Step7



Ranking APIを実装してください。





\## GET



/api/ranking/live





計算:



Raid平均



=



全参加者正解数合計



÷



参加人数





返却:



\- 参加人数

\- 平均点

\- 上位ランキング





\---



\## GET



/api/ranking/final





返却:



\- Boss score

\- Raid average

\- Winner





\---



\# Step8



Overlay APIを実装してください。





\## GET



/api/overlay/state





返却:



OBS表示用データ





内容:



\- Boss名

\- 現在問題

\- Boss score

\- Raid average

\- イベント





\---



\# Step9



入力チェックを実装してください。





確認:



\- session存在

\- token存在

\- answer形式

\- 二重回答





\---



\# Step10



テストを作成してください。





最低限:



\## Session



create



start



current





\## Player



join



answer





\## Boss



answer





\## Ranking



final





\---



\# 禁止事項



禁止:



\- WebSocket追加

\- 認証追加

\- ORM追加

\- DB構造変更

\- フロント実装

\- UI作成





\---



\# 完了報告形式



変更ファイル:







一覧





API:







実装済み一覧





Database:







利用テーブル





Test:







実行結果





問題:







未解決事項





\---



\# Phase3完了条件



✓ Workers deploy成功



✓ 全APIレスポンス確認



✓ D1読み書き成功



✓ Player回答保存成功



✓ 勝敗計算成功





次Phase:



Phase4



Player React Client Implementation

開発メモ



このPhaseがプロジェクトの中心。



ここで重要なのは、



「画面より先にゲームエンジンを作る」



こと。



完成時点で、



ブラウザやcurlだけでも



Boss

&#x20;VS

視聴者



のゲーム進行が可能になる状態を目指す。



次に作成する資料：



docs/prompts/04\_Claude\_Phase4\_Player\_Client.md



内容：



視聴者参加画面

スマホUI

回答ボタン

結果表示

API接続



を実装するClaude指示書になります。

