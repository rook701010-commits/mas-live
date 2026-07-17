Version: 1.0



Status: Draft



Date: 2026-07-17



MAS LIVE Technical Roadmap

技術拡張ロードマップ

1\. 技術戦略



MAS LIVEは、



最初から大規模サービスを作らない。



段階的に成長させる。



開発方針

MVP



↓



安定運用



↓



参加者増加



↓



Platform化

2\. Version Roadmap

Version 1.0

MVP



目的:



rook7配信で使える。



実装:



✓ React



✓ Cloudflare Workers



✓ D1 Database



✓ Player画面



✓ Boss画面



✓ OBS Overlay



✓ 勝敗判定



✓ 防衛記録



想定規模:



同時参加



100〜300人



Version 1.5

配信改善版



目的:



毎週運用しやすくする。



追加:



WebSocket



現在:



Polling



↓



変更:



リアルタイム通信



メリット:



遅延低下

サーバー負荷軽減

演出強化



追加:



問題セット管理



機能:



Season問題

過去問題

難易度管理



追加:



配信履歴



保存:



結果

名場面

記録

Version 2.0

Community Edition



目的:



視聴者体験強化。



追加:



個人アカウント



機能:



参加履歴

成績

称号

ランキング



種類:



Season

月間

歴代

プロフィール



表示:



MAS LIVE ID



参加回数



勝利回数



最高得点



称号

Version 3.0

Multi Streamer Platform



目的:



他配信者対応。



変更:



現在:



rook7



↓



MAS LIVE



将来:



MAS LIVE



├ rook7



├ 配信者A



├ 配信者B



└ 配信者C

3\. マルチBoss設計

Boss Entity追加



Database:



bosses



id



name



channel\_id



rating



settings



Bossごと:



難易度

問題傾向

記録



を管理。



4\. 負荷対策

100人



現在設計で対応可能。



1000人



必要:



Cache

Queue

WebSocket

集計分離

10000人



必要:



Durable Objects

Redis相当

Event Architecture

5\. API進化

Version管理



現在:



/api/session



将来:



/api/v1/session



理由:



サービス化時に破壊変更を防ぐ。



6\. データ分離



成長後:



現在:



D1



変更:



User DB



Game DB



Analytics DB

7\. AI統合



将来機能。



AI実況



入力:



勝敗状況

問題結果

コメント



出力:



実況コメント。



AIコーチ



視聴者向け。



例:



あなたは守備判断が強い傾向があります

AI問題生成



補助:



問題案

難易度推定

解説作成

8\. 技術負債管理



毎月確認。



チェック:



API速度

DBサイズ

Error率

Code品質

9\. セキュリティ強化



Platform化時。



追加:



Auth

Rate Limit強化

不正参加対策

Bot対策

10\. 最終アーキテクチャ



理想:



&#x20;                YouTube配信



&#x20;                     ↓





&#x20;             MAS LIVE Platform





&#x20;                     ↓





&#x20;┌────────┬────────┬────────┐



&#x20;Player    Boss     Overlay





&#x20;                     ↓





&#x20;             API Gateway





&#x20;                     ↓





&#x20;┌────────┬────────┬────────┐



&#x20;Game DB  User DB  Analytics DB



&#x20;                     ↓



&#x20;                   AI

11\. 開発優先順位



絶対順序:



1



ゲームが動く



↓



2



配信で使える



↓



3



視聴者が楽しい



↓



4



継続する



↓



5



拡大する



結論



MAS LIVEは、



最初は小さな配信企画。



しかし設計次第で、



「麻雀配信者向け参加型ゲーム基盤」



まで成長可能。

