# 誤ってコミットされたビルド成果物の削除手順

原因: apps/*/tsconfig.jsonに`noEmit`がなく、`tsc -b`実行時にsrc配下へ.js/.tsbuildinfoが生成され、`git add -A`で一緒にコミットされた。tsconfig.jsonに`noEmit: true`を追加し、.gitignoreにも除外設定を追加済み(このコミットに含めてください)。

以下をローカルで実行し、既にコミット済みの成果物をgit管理から外してください（ファイル自体は残ります。手元で削除したい場合は`git rm -f`を使ってください）。

```bash
cd /c/GitHub/mas-live

git rm -r --cached \
  apps/admin/src/App.js apps/admin/src/api/client.js apps/admin/src/components/DashboardCard.js \
  apps/admin/src/components/QuestionEditor.js apps/admin/src/components/QuestionTable.js \
  apps/admin/src/components/SessionCreator.js apps/admin/src/main.js \
  apps/admin/src/pages/DashboardPage.js apps/admin/src/pages/QuestionsPage.js apps/admin/src/pages/SessionsPage.js \
  apps/admin/tsconfig.tsbuildinfo \
  apps/boss/src/App.js apps/boss/src/api/client.js apps/boss/src/components/AnswerPanel.js \
  apps/boss/src/components/BattleResult.js apps/boss/src/components/QuestionDisplay.js \
  apps/boss/src/components/ScorePanel.js apps/boss/src/components/SessionControl.js \
  apps/boss/src/hooks/useBossAnswer.js apps/boss/src/hooks/useGameControl.js apps/boss/src/main.js \
  apps/boss/src/pages/DashboardPage.js apps/boss/tsconfig.tsbuildinfo \
  apps/overlay/src/App.js apps/overlay/src/api/client.js apps/overlay/src/components/BattleGauge.js \
  apps/overlay/src/components/BossInfo.js apps/overlay/src/components/QuestionStatus.js \
  apps/overlay/src/components/RankingList.js apps/overlay/src/components/ResultAnimation.js \
  apps/overlay/src/components/ScoreDisplay.js apps/overlay/src/hooks/useOverlayState.js \
  apps/overlay/src/main.js apps/overlay/tsconfig.tsbuildinfo \
  apps/player/src/App.js apps/player/src/api/client.js apps/player/src/components/AnswerButton.js \
  apps/player/src/components/JoinForm.js apps/player/src/components/QuestionCard.js \
  apps/player/src/components/ResultPanel.js apps/player/src/components/ScoreBoard.js \
  apps/player/src/hooks/useAnswer.js apps/player/src/hooks/useQuestion.js apps/player/src/hooks/useSession.js \
  apps/player/src/main.js apps/player/src/pages/GamePage.js apps/player/src/pages/JoinPage.js \
  apps/player/src/pages/ResultPage.js apps/player/tsconfig.tsbuildinfo

git add -A
git commit -m "chore: exclude tsc build artifacts (noEmit + .gitignore)"
git push origin main
```

コミット後、`npm run build`を各appで再実行してsrc配下に.js/.tsbuildinfoが生成されないことを確認してください（`noEmit: true`追加により生成されなくなります）。
