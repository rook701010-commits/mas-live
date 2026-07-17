Version: 1.0



Status: Draft



Date: 2026-07-17



MAS LIVE Project Final Summary

「100人でrook7を倒せ！」

1\. プロジェクト概要

名称



MAS LIVE Challenge



コンセプト



視聴者100人と配信者が、



麻雀能力問題20問で対決する



参加型ライブゲーム。



キャッチコピー



100人の力で、最強Bossを倒せ。



2\. なぜこの企画が強いのか



通常の麻雀配信:



配信者



↓



視聴者







視聴者は見るだけ。



MAS LIVE:



100人の視聴者



↓



協力



↓



Boss挑戦



↓



勝敗共有



視聴者が主人公になる。



3\. MVP完成形



最初に作るもの。



Player



視聴者用。



機能:



URL参加

名前入力

20問回答

結果表示

Boss



配信者用。



機能:



Session開始

問題進行

回答

勝敗確認

Overlay



OBS用。



表示:



問題番号

スコア

防衛記録

勝敗

Backend



Cloudflare。



構成:



Workers

D1

4\. 最初のGitHub構成



リポジトリ:



mas-live



構成:



mas-live/



├ apps/



│

├ player/



├ boss/



├ overlay/



└ admin/





├ workers/



│

└ api/





├ docs/



│

├ gdd/



├ technical/



├ prompts/



└ decision-log/





├ database/



│

└ schema.sql





├ README.md



└ package.json

5\. 開発開始順序

Phase A



ドキュメント準備



完了:



✓ GDD



✓ 技術仕様



✓ Claude指示書



Phase B



GitHub作成



作業:









リポジトリ作成









フォルダ作成









docs配置



Phase C



Claudeへ投入



順番:



1回目



送信:



docs/gdd/



全ファイル



目的:



企画理解。



2回目



送信:



docs/technical/



目的:



技術理解。



3回目



送信:



prompts/

01〜05



目的:



MVP開発。



6\. Claude開発ルール



必ず指示する。



Rule 1



勝手に仕様変更しない。



Rule 2



実装前に変更理由を報告。



Rule 3



ファイル変更一覧を出す。



Rule 4



テスト結果を報告。



7\. 最初にClaudeへ渡す文章

あなたはMAS LIVE Coreプロジェクトの

リードエンジニアです。



添付したGDD・仕様書を読み込み、

内容を理解してください。



まだコードを書かないでください。



以下を報告してください。



1\.

プロジェクト概要理解



2\.

システム構成理解



3\.

MVP範囲理解



4\.

不明点



5\.

開発開始時の推奨手順



仕様変更は禁止です。

8\. 最初の開発目標



期間目安:



2〜4週間



完成目標:



配信で10人が参加



↓



20問回答



↓



勝敗表示



↓



OBS表示

9\. 最初の成功条件



数字:



参加者10人



でも成功。



理由:



最初に確認するのは、



技術ではなく、



「楽しいか」



だから。



10\. 初回配信イメージ



タイトル:



【100人でrook7を倒せ】

視聴者全員vs俺！

麻雀能力20問バトル！



配信:



30分。



結果:



rook7



17/20





視聴者



17.8/20





結果:



初防衛失敗！



ここから物語開始。



11\. 長期ビジョン

1年後



可能性:



毎週イベント

参加者100〜500人

他配信者対応

全国ランキング

MAS連携

12\. このプロジェクトの本質



作るもの:



Webアプリ



ではない。



本当に作るもの:



毎週挑戦したくなる

麻雀コミュニティ

完成



MAS LIVE Core



Game Design Document



全体設計完了。



次の実作業



ここからは設計ではなく実装。



開始手順:









GitHubリポジトリ作成









フォルダ作成









ClaudeへGDD投入









Phase1実装開始

