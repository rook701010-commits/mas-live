# 誤ってコミットされたビルド成果物の削除手順（続き）

前回のクリーンアップ(`git rm --cached apps/*/src/**/*.js`)では、bashのglobパターンの都合でsrc直下の`App.js`・`main.js`（サブディレクトリではなく直下にあるファイル）が対象外でした。以下の8ファイルがまだgit管理下に残っています。

```bash
cd /c/GitHub/mas-live

git rm --cached \
  apps/admin/src/App.js apps/admin/src/main.js \
  apps/boss/src/App.js apps/boss/src/main.js \
  apps/overlay/src/App.js apps/overlay/src/main.js \
  apps/player/src/App.js apps/player/src/main.js

git add -A
git commit -m "chore: remove remaining tsc build artifacts (App.js/main.js)"
git push origin main
```

完了後、`git status`で`apps/*/src/`配下に`.js`ファイルがUntracked/Trackedいずれにも出てこないことを確認してください（`.gitignore`の`apps/*/src/**/*.js`により以後は無視されます）。
