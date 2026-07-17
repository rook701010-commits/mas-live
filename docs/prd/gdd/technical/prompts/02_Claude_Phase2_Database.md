Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase2

Database Implementation

目的



MAS LIVE Coreで利用するデータベース基盤を作成する。



このPhaseでは、



D1 Database構築

Schema作成

Migration作成

初期データ投入



までを実施する。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアバックエンドエンジニアです。



Phase2:

Database Implementation

を実施してください。



仕様書:



docs/technical/06\_Database\_Final\_Schema.md



を必ず確認してください。



仕様変更は禁止です。



改善案がある場合は、

実装前に提案してください。



\---



\## Step1



現在の状態確認をしてください。



確認対象:



\- workers構成

\- wrangler.toml

\- D1接続設定

\- 既存migration



結果を報告してください。



\---



\## Step2



Database migrationを作成してください。



場所:



database/migrations/



形式:



001\_create\_sessions.sql



002\_create\_questions.sql



003\_create\_participants.sql



004\_create\_answers.sql



005\_create\_boss\_answers.sql



006\_create\_rankings.sql



007\_create\_game\_logs.sql





\---



\## Step3



以下のテーブルを作成してください。



\### sessions



用途:



1回のBoss戦を管理する。





columns:



id



title



boss\_name



status



current\_question\_no



total\_questions



started\_at



ended\_at



created\_at





\---



\### questions



用途:



問題マスター。





columns:



id



category



difficulty



title



question\_text



image\_url



choice\_a



choice\_b



choice\_c



choice\_d



correct\_answer



explanation



status



created\_at



updated\_at





\---



\### participants



用途:



匿名視聴者。





columns:



id



session\_id



nickname



participant\_token



joined\_at





\---



\### answers



用途:



視聴者回答。





columns:



id



session\_id



question\_id



participant\_id



answer



is\_correct



answered\_at





\---



\### boss\_answers



用途:



Boss回答。





columns:



id



session\_id



question\_id



answer



is\_correct



answered\_at





\---



\### rankings



用途:



順位保存。





columns:



id



session\_id



participant\_id



score



rank



updated\_at





\---



\### game\_logs



用途:



イベント保存。





columns:



id



session\_id



event\_type



event\_data



created\_at





\---



\## Step4



Indexを作成してください。



必須:



sessions



status





participants



session\_id





answers



session\_id



question\_id



participant\_id





session\_questions



session\_id





\---



\## Step5



Seedデータを作成してください。



目的:



APIテスト用。





最低限:



questions



5件





sessions



1件





\---



\## Step6



D1へmigrationしてください。



確認:



table一覧



↓



insert



↓



select





\---



\## Step7



Database確認用SQLを作成してください。



場所:



database/check/



\---



作成:



check\_tables.sql



check\_sample.sql





\---



\## 禁止事項



禁止:



\- カラム追加

\- 仕様変更

\- 認証追加

\- ORM導入

\- Prisma導入

\- 不要な依存追加



\---



\## 完了報告形式



必ず以下で報告してください。



変更ファイル:







一覧





Migration:







作成内容





Database:







作成テーブル





確認結果:







migration:

insert:

select:





問題:







あれば記載





\---



\## Phase2完了条件



以下を満たす。



✓ D1接続成功



✓ 全テーブル作成



✓ Seed投入成功



✓ SELECT確認成功





次Phase:



Phase3



Workers API Implementation

開発メモ



このPhaseでは、



まだReact画面を作らない。



理由:



API仕様を先に固定するため。



正しい順番:



Database



↓



API



↓



Frontend



↓



OBS



で進める。



次に作成する資料：



docs/prompts/03\_Claude\_Phase3\_Workers\_API.md



内容：



Cloudflare Workers実装

APIルーティング

D1接続

回答受付

集計処理



まで具体化する。

