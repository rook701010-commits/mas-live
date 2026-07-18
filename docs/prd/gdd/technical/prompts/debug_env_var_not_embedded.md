# 削除確認 → 再ビルド → デプロイ

## 1. 削除できたか確認

```bash
cd /c/GitHub/mas-live
find apps -path "*/src/*" -name "*.js"
```

何も表示されなければ削除成功です（これらは元々`git rm --cached`でgit管理外になっていたファイルなので、`git status`には出てこなくて正常です）。

## 2. 再ビルド＆確認

```bash
cd /c/GitHub/mas-live

cd apps/player && rm -rf dist && npm run build && grep -c "workers.dev" dist/assets/*.js && cd ../..
cd apps/boss && rm -rf dist && npm run build && grep -c "workers.dev" dist/assets/*.js && cd ../..
cd apps/admin && rm -rf dist && npm run build && grep -c "workers.dev" dist/assets/*.js && cd ../..
cd apps/overlay && rm -rf dist && npm run build && grep -c "workers.dev" dist/assets/*.js && cd ../..
```

各`grep -c`が1以上になっていて、かつファイルハッシュ（`dist/assets/index-XXXXXXXX.js`）が今までと違う名前になっていれば成功です。

## 3. commit

```bash
git add -A
git commit -m "fix: remove stale compiled .js files that were shadowing .tsx sources"
git push origin main
```

## 4. Pages再デプロイ

```bash
cd apps/player && wrangler pages deploy dist --project-name=mas-live-player && cd ../..
cd apps/boss && wrangler pages deploy dist --project-name=mas-live-boss && cd ../..
cd apps/admin && wrangler pages deploy dist --project-name=mas-live-admin && cd ../..
cd apps/overlay && wrangler pages deploy dist --project-name=mas-live-overlay && cd ../..
```

デプロイ後、Boss Clientで改めて「配信開始」を試してください。
