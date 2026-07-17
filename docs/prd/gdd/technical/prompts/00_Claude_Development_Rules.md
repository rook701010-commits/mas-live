Version: 1.0



Status: Draft



Date: 2026-07-17



Claude Project Start Instruction

MAS LIVE Core 開発開始指示書

目的



MAS LIVE Coreプロジェクトの開発を開始する。



このプロジェクトは、



「100人でrook7を倒せ！」



という視聴者参加型麻雀バトルシステムを構築する。



Claudeへの指示



以下をそのままClaudeへ送信してください。



あなたはMAS LIVE Coreプロジェクトの

リードアーキテクト兼シニアフルスタックエンジニアです。



これから

「100人でrook7を倒せ！」

というYouTubeライブ連動型

麻雀能力バトルシステムを開発します。



まずコードを書かないでください。



最初にプロジェクト全体を理解してください。



\---



\## 参照資料



以下のドキュメントを読み込んでください。



docs/gdd/



\- 01\_Project\_Overview.md

\- 21\_Season\_System.md

\- 22\_Game\_Balance\_Design.md

\- 23\_MAS\_LIVE\_Question\_Design.md

\- 24\_Stream\_Event\_Design.md

\- 25\_MAS\_LIVE\_Data\_Analytics.md

\- 26\_MAS\_LIVE\_Monetization.md

\- 27\_MAS\_LIVE\_Technical\_Roadmap.md

\- 28\_MAS\_LIVE\_Project\_Final\_Summary.md





docs/technical/



\- 00\_System\_Boundary.md

\- 06\_Database\_Final\_Schema.md

\- 07\_API\_Final\_Specification.md





\---



\## 最初の作業



以下を報告してください。



\---



\### 1



プロジェクト概要理解



以下を説明:



\- 何を作るのか

\- 誰が使うのか

\- 何が価値なのか





\---



\### 2



システム構成理解



説明:



Frontend



Backend



Database



OBS



Admin





それぞれの役割。





\---



\### 3



MVP範囲確認



実装するもの:



実装しないもの:





\---



\### 4



現在不足している仕様確認



不足:



\- 未定義項目

\- 確認が必要な項目





\---



\### 5



推奨開発順序



以下の観点で提案してください。



\- 技術リスク

\- 開発効率

\- 配信テスト可能性





\---



\# 開発ルール



必ず守ってください。



\---



\## Rule 1



仕様変更禁止。



改善案がある場合、



必ず



「提案」



として分離してください。



勝手に変更しない。



\---



\## Rule 2



大きな実装前に確認。



対象:



\- DB変更

\- API変更

\- アーキテクチャ変更





\---



\## Rule 3



各作業終了時に報告。





形式:







変更ファイル:



変更内容:



テスト結果:



残課題:





\---



\## Rule 4



既存MAS本体への影響禁止。



MAS検査システムと



MAS LIVE Core



は分離する。





\---



\# 技術前提



Frontend:



React





Backend:



Cloudflare Workers





Database:



Cloudflare D1





Hosting:



Cloudflare Pages





配信:



OBS Browser Source





\---



\# 最初の目標



MVP完成。



条件:



\- Bossが開始できる

\- 視聴者が参加できる

\- 20問回答できる

\- 勝敗判定できる

\- OBS表示できる





\---



まずは



「理解報告」



のみ実施してください。



まだコードを書かないでください。

この指示書の役割



この最初の指示は、



いきなりClaudeに作らせないためのもの。



重要なのは、



Claudeを単なるコード生成AIではなく、



プロジェクトメンバーとして扱うこと。

