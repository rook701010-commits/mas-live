Version: 1.0

Status: Accepted

Date: 2026-07-18

Author: Project Manager (rook7承認: Phase10 wrangler deploy成功後の質問への回答「環境変数でAPI URLを切替」)

タイトル

本番フロントエンドのAPI接続先切替とCORS対応

背景

`wrangler deploy`によりworkers APIが `https://mas-live-api.mas-api-rook7.workers.dev` にデプロイされた。各フロントエンド(player/boss/admin/overlay)のapi/client.tsは`BASE_URL = "/api"`固定で、開発時のみvite proxyで機能していた。本番ではフロントを別ドメイン(Cloudflare Pages等)にデプロイする想定のため、相対パスのままでは動作しない。またクロスオリジンになるため、workers側にCORSヘッダーがないとブラウザにブロックされる。

決定

- 各app(player/boss/admin/overlay)のapi/client.tsで`BASE_URL`を`import.meta.env.VITE_API_BASE_URL ?? "/api"`に変更。
- 各appに`.env.production`を追加し、`VITE_API_BASE_URL=https://mas-live-api.mas-api-rook7.workers.dev/api`を設定（本番ビルド時のみ適用。開発時`npm run dev`はこれまで通り`/api`のvite proxyを使用）。
- 各appのsrc/vite-env.d.tsで`ImportMetaEnv`型を定義。
- workers/src/utils/response.tsにCORS_HEADERS（Access-Control-Allow-Origin: *等）を追加し、success/failure両方に適用。
- workers/src/index.tsでOPTIONSプリフライトリクエストに204 + CORSヘッダーで応答するよう追加。

理由

Phase10でwrangler deployによる本番API稼働が確認できたため、フロントエンドの本番接続先切替が必須になった。API自体の認証方式・レスポンス形式（07_API_Final_Specification.md）は変更していない。

影響範囲

- apps/{player,boss,admin,overlay}/src/api/client.ts
- apps/{player,boss,admin,overlay}/src/vite-env.d.ts（新規）
- apps/{player,boss,admin,overlay}/.env.production（新規）
- workers/src/utils/response.ts, workers/src/index.ts
- 既存の正常系動作（開発環境でのvite proxy経由アクセス）には影響なし。
- Access-Control-Allow-Originを`*`にしているため、現時点ではオリジン制限なし（MVP・認証なし方針と整合。将来的に本番フロントのドメインが確定したら制限を検討）。

デプロイ手順（ユーザー側作業）

1. workers: 変更なし（CORS対応込みで`wrangler deploy`を再実行）。
2. 各app: `npm run build`（.env.productionが自動適用され、本番Workers URLを指すバンドルが生成される）。
3. 生成された`apps/*/dist`をCloudflare Pages等の静的ホスティングにデプロイ。
