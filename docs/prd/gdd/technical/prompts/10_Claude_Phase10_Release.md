Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase10

正式リリース

目的



MAS LIVE Coreを正式公開し、



「100人でrook7を倒せ！」



を継続的な配信企画として運用開始する。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

リリースマネージャーです。



Phase10:

正式リリース

を実施してください。



参照資料:



docs/roadmap/01\_MVP\_Development\_Plan.md



docs/decision-log/DL-003\_MVP\_Scope.md



docs/prompts/09\_Claude\_Phase9\_Beta\_Release.md





目的:



安全に本番環境へ移行し、

継続運営可能な状態にする。



\---



\# Step1



リリース前チェックを実施してください。



確認:



\## Backend



\- Workers Deploy状態

\- D1接続

\- APIエラー





\## Frontend



\- Player

\- Boss

\- Admin

\- Overlay





\## OBS



\- Browser Source

\- 解像度

\- 透過





\---



\# Step2



Production環境確認。





確認:



\- URL

\- Environment Variables

\- Database

\- Logs





\---



\# Step3



Backupを作成してください。





対象:



\- Database

\- Question Data

\- Configuration





\---



\# Step4



Version管理。





Release Tagを作成。





形式:







v1.0.0







内容:



MAS LIVE Core MVP Release





\---



\# Step5



リリースノートを作成。





内容:



\- 新機能

\- 遊び方

\- 注意事項

\- 今後の予定





\---



\# Step6



初回配信準備。





確認:



\## 前日



\- 問題確認

\- Session準備

\- OBS確認





\## 配信前



\- テスト参加

\- API確認

\- Overlay確認





\## 配信中



\- Boss操作

\- 結果発表





\## 配信後



\- データ保存

\- 振り返り





\---



\# Step7



初回イベント記録。





保存:



\- 参加人数

\- Boss Score

\- Raid Average

\- 勝敗

\- コメント反応

\- 改善点





\---



\# Step8



KPI計測開始。





\## 基本KPI





参加人数





目標:



100人





\---



完走率





目標:



80%以上





\---



翌週参加率





目標:



50%以上





\---



平均評価





目標:



4.0/5以上





\---



\# Step9



Season1管理開始。





記録:



\- 防衛回数

\- 敗北回数

\- 連勝記録

\- 歴代最高記録





\---



\# 完了報告形式



Release:







Version:



Date:



Status:





Deploy:







Frontend:



Backend:



Database:





初回イベント:







参加人数:



結果:



問題:





\---



\# Phase10完了条件



✓ 本番公開



✓ 初回配信成功



✓ データ保存



✓ 運営フロー確立





\---



\# 次フェーズ



Season1 Operation



↓



Season2 Expansion

開発メモ



ここからは「開発」ではなく「運営」が始まる。



MAS LIVEの価値は、



一度完成したサービスではなく、



毎週積み重なる記録と物語にある。



重要な資産:



問題データ

防衛記録

視聴者参加履歴

名勝負



これらが蓄積するほど、



「今週こそ倒す」



という文化が形成される。



次に作成する資料：



docs/gdd/21\_Season\_System.md



内容：



Season制

防衛記録

ランキング

称号

長期継続設計



をゲームデザインとして正式化します。

