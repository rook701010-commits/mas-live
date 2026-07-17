Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase6

OBS Overlay Implementation

目的



YouTubeライブ配信のOBS画面上に表示する専用Overlayを作成する。



視聴者が配信画面を見るだけで、



現在の戦況

Boss状況

視聴者全体の状況

勝敗の流れ



を理解できる状態にする。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアフロントエンドエンジニアです。



Phase6:

OBS Overlay Implementation

を実施してください。



必ず以下を確認してください。



参照資料:



docs/gdd/



docs/technical/07\_API\_Final\_Specification.md



docs/technical/00\_System\_Boundary.md





仕様変更は禁止です。



改善案がある場合は実装前に提案してください。



\---



\# Step1



現在のOverlay構成を確認してください。



確認:



apps/overlay



React設定



API接続



Build設定





結果を報告してください。



\---



\# Step2



Overlay画面構成を作成してください。



目的:



OBS Browser Sourceで表示可能にする。





構成:







apps/overlay/src/



components/



BossInfo.tsx



QuestionStatus.tsx



BattleGauge.tsx



ScoreDisplay.tsx



ResultAnimation.tsx



hooks/



useOverlayState.ts



api/



client.ts





\---



\# Step3



メイン画面を作成してください。





表示項目:



\## Boss情報



\- rook7

\- 防衛記録

\- 現在連勝数





\---



\## Battle表示



例:







rook7



18 / 20



VS



視聴者平均



17.3 / 20







\---



\## スコア表示



表示:



Boss Score



Raid Average



Difference





\---



\# Step4



Polling実装。





取得:



GET



/api/overlay/state





頻度:



1秒





理由:



OBS表示は視聴者体験を優先する。



\---



\# Step5



状態変化演出を追加。





対象:



\## 問題開始



表示変更





\---



\## 正解発表



演出





\---



\## Boss勝利



Boss WIN





\---



\## 視聴者勝利



RAID WIN





\---



\# Step6



OBS向け設定。





条件:



\- 1920×1080対応

\- 背景透過

\- Browser Source対応

\- 16:9





\---



\# Step7



rook7配信用デザイン。





方向性:



麻雀大会風



↓



ゲームイベント風





要素:



\- 大きな数字

\- 勝負感

\- ラウンド感

\- 視認性優先





\---



\# Step8



パフォーマンス確認。





確認:



\- メモリ使用

\- CPU負荷

\- 長時間表示





\---



\# Step9



OBS設定手順をREADMEへ追加。





内容:



Browser Source URL



幅



高さ



透過設定



\---



\# 禁止事項



禁止:



\- Canvasゲーム化

\- 動画背景

\- 重いアニメーション

\- 外部素材大量利用

\- WebSocket追加





\---



\# 完了報告形式



変更ファイル:







一覧





Overlay:







表示項目





OBS:







設定確認





Test:







結果





問題:







未解決事項





\---



\# Phase6完了条件



✓ OBS Browser Source表示



✓ 透過背景



✓ リアルタイム更新



✓ 勝敗演出表示



✓ 配信画面で利用可能





次Phase:



Phase7



Admin Panel Implementation

開発メモ



このOverlayは単なる情報表示ではない。



MAS LIVEの「テレビ画面」である。



視聴者が参加していなくても、



「何か面白い勝負をしている」



と感じられることが重要。



特にrook7配信では、



麻雀大会の実況感を出すことで、



通常の段位戦配信との差別化になる。



次に作成する資料：



docs/prompts/07\_Claude\_Phase7\_Admin\_Panel.md



内容：



問題管理

配信作成

問題編集

統計確認

運営機能



を定義します。

