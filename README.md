# MAS LIVE Core

「100人でrook7を倒せ！」

YouTubeライブ配信で実際に利用できる、視聴者参加型麻雀バトルシステム。

配信者(Boss)1名 vs 視聴者(Raid)10〜1000人で、麻雀判断問題20問を通じて対戦する。

## コンセプト

麻雀能力検査「MAS（Mahjong Aptitude Scale）」を発展させた、視聴者参加型ライブゲーム。視聴者は見るだけの観戦者ではなく、Bossに挑む参加者になる。

## ドキュメント

- プロジェクト概要: `docs/prd/01_Project_Overview.md`
- MVP開発計画: `docs/01_MVP_Development_Plan.md`
- ゲームデザイン(GDD): `docs/prd/gdd/`
- 技術仕様: `docs/prd/gdd/technical/`
- Claude実装指示書: `docs/prd/gdd/technical/prompts/`
- 意思決定ログ: `docs/prd/gdd/technical/prompts/decision-log/`
- 開発ガイドライン: `CONTRIBUTING.md`

## 技術構成

- Frontend: React
- Backend: Cloudflare Workers
- Database: Cloudflare D1
- Hosting: Cloudflare Pages
- 配信連携: OBS Browser Source

## 開発ステータス

現在、設計フェーズ完了。実装(Phase1: Project Setup)着手前の状態。

詳細な開発フェーズは `docs/01_MVP_Development_Plan.md` を参照。

## 開発ルール

実装に関わる方は、着手前に必ず `CONTRIBUTING.md` を確認してください。
