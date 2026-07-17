Version: 1.0



Status: Accepted



Date: 2026-07-17



Author: Project Manager



タイトル



通信アーキテクチャの決定



背景



MAS LIVEはライブ配信中に利用されるサービスであり、



問題表示

回答受付

集計

ランキング更新

OBS表示



をリアルタイムに処理する必要がある。



通信方式として、



Polling

WebSocket



の2案を比較した。



検討案

案A



WebSocket方式



概要



サーバーとクライアントが常時接続する。



状態変化をリアルタイム送信する。



メリット

高速なリアルタイム更新

多人数イベントに向いている

将来的なゲーム性拡張に対応しやすい

デメリット

実装難易度が高い

接続管理が必要

切断復旧処理が必要

デバッグが難しい

MVPでは過剰性能

案B



Polling方式



採用



概要



クライアントが一定間隔でAPIへ状態確認を行う。



例：



5秒ごと



GET /api/session/current

メリット

実装が単純

障害調査が容易

Cloudflare Workersと相性が良い

Claudeによる実装支援が容易

MVP開発速度が速い

デメリット

完全リアルタイムではない

大規模化すると通信量増加

採用仕様



MVPではPolling方式を採用する。



更新頻度

通常状態



5秒間隔



回答受付中



3秒間隔



結果発表



1秒間隔



対象

Player Client



取得内容



現在問題

残り時間

回答状態

ランキング

Boss Client



取得内容



ゲーム状態

問題状態

集計状態

Overlay



取得内容



問題

Bossスコア

Raid平均

演出状態

WebSocket移行条件



以下を満たした場合、検討する。



条件1



同時接続数



1000人以上



条件2



新ゲームモード追加



例



チーム戦

HP制

リアルタイムバトル

条件3



演出要求増加



例



秒単位のゲージ変化

視聴者イベント

複数状態同期

将来構成



Season2以降



Player



↓



WebSocket Gateway



↓



Cloudflare Workers



↓



Game Engine



↓



D1



への移行を検討する。



判断理由



MVPでは、



「最高性能」



ではなく、



「確実に配信で動くこと」



を優先する。



配信サービスでは、



機能不足よりも、



本番中の停止が最大のリスクである。



影響範囲



対象



API設計

React実装

Cloudflare Workers

OBS Overlay

負荷試験

結論



MAS LIVE CoreではPolling方式を採用する。



将来的なWebSocket化を前提に、API設計は状態取得型として実装する。

