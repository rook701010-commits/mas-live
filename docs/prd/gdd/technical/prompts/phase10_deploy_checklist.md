# Phase10 本番デプロイ手順

## 1. Workers API（完了・要再デプロイ）

CORS対応(DL-013)を追加したため、再デプロイしてください。

```bash
cd /c/GitHub/mas-live/workers
wrangler deploy
```

現在のAPI URL: `https://mas-live-api.mas-api-rook7.workers.dev`

## 2. フロントエンド4アプリのビルド

`.env.production`（VITE_API_BASE_URL=本番API URL）を追加済みです。以下でビルドすると自動的に本番APIを向いたバンドルが生成されます。

```bash
cd /c/GitHub/mas-live
cd apps/player && npm run build && cd ../..
cd apps/boss && npm run build && cd ../..
cd apps/admin && npm run build && cd ../..
cd apps/overlay && npm run build && cd ../..
```

各`apps/*/dist`が生成物です。

## 3. 静的ホスティングへのデプロイ（Cloudflare Pages推奨）

4アプリはそれぞれ別サービスとしてデプロイしてください（配信者用/視聴者用/OBS用/管理用でURLを分ける）。

```bash
cd /c/GitHub/mas-live/apps/player
wrangler pages deploy dist --project-name=mas-live-player

cd ../boss
wrangler pages deploy dist --project-name=mas-live-boss

cd ../admin
wrangler pages deploy dist --project-name=mas-live-admin

cd ../overlay
wrangler pages deploy dist --project-name=mas-live-overlay
```

初回はCloudflareダッシュボードでのプロジェクト作成確認が必要な場合があります。

## 4. 動作確認

- Player: 発行されたURLに`?session=<session_id>`を付けてスマホ実機で参加確認。
- Boss: 発行されたURLで新規配信開始→問題進行→終了までの一連の操作確認。
- Overlay: OBSのBrowser Sourceに`<overlay URL>?session=<session_id>`を設定し、透過背景・ランキング・勝敗演出を確認。
- Admin: 問題の作成・編集・削除、ダッシュボード表示を確認。

## 5. 既知の制約（MVP）

- Access-Control-Allow-Originは現状`*`（オリジン制限なし）。将来的に本番フロントのドメインが固定されたら制限を検討してください。
- 認証機能なし（DL-002方針通り）。session_idを知っていれば誰でも参加・閲覧可能です。配信中はsession_idの取り扱いに注意してください。
