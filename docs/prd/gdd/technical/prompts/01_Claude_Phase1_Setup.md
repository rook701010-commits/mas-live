Version: 1.0



Status: Draft



Date: 2026-07-17



Claude実装指示書 Phase1

Project Setup

目的



MAS LIVE Coreの開発環境を構築する。



このPhaseでは機能実装を行わない。



まず、



GitHub

React

Cloudflare Workers

Cloudflare D1



の基盤を完成させる。



Claudeへの指示



以下をそのままClaudeへ送信する。



あなたはMAS LIVE Coreプロジェクトの

シニアフルスタックエンジニアです。



現在からMVP開発を開始します。



今回はPhase1:

Project Setup

のみ実施してください。



\## 目的



以下の開発基盤を作成してください。



\- React frontend

\- Cloudflare Workers backend

\- Cloudflare D1 database

\- Git管理



\## 実施手順



必ず以下の順番で進めてください。



\### Step1



現在の環境確認



確認してください。



\- OS

\- Node.js version

\- npm version

\- Git状態

\- Cloudflare CLI状態



確認結果を報告してください。



\---



\### Step2



GitHub repository構成を作成してください。



想定構成:



mas-live/



apps/



&#x20; boss/



&#x20; player/



&#x20; admin/



&#x20; overlay/





workers/



database/



docs/





必要なら改善案を提示してください。



\---



\### Step3



React環境を作成してください。



条件:



\- TypeScript

\- Vite

\- 最新安定版

\- 不要なライブラリは禁止



\---



\### Step4



Cloudflare Workers環境を作成してください。



条件:



\- TypeScript

\- Wrangler使用

\- APIの空実装のみ



\---



\### Step5



Cloudflare D1を作成してください。



今回は接続確認のみ。



まだテーブル作成は禁止です。



\---



\### Step6



READMEを作成してください。



内容:



\- プロジェクト概要

\- 開発方法

\- 起動方法

\- Deploy方法



\---



\### Step7



動作確認してください。



確認:



Frontend起動



↓



Workers起動



↓



API疎通



\---



\## 禁止事項



以下は禁止します。



\- ゲーム機能実装

\- DB設計変更

\- 勝手なライブラリ追加

\- UI作成

\- 認証追加



\---



\## 完了報告形式



最後に必ず以下形式で報告してください。



変更ファイル:







一覧





実装内容:







内容





確認結果:







Frontend:

Workers:

Database:





問題点:







あれば記載







Phase1完了条件



以下を満たすこと。



Git



✓ Repository作成



✓ 初回commit完了



Frontend



✓ React起動



✓ TypeScript動作



Backend



✓ Workers deploy成功



✓ API response確認



Database



✓ D1接続確認



次Phase



Phase2



Database Implementation



実装内容:



schema.sql作成

migration作成

questions table

sessions table

participants table

answers table



へ進む。





\---



\# 開発メモ



Phase1では「何も作らない」ことが重要。



最初から画面やゲーム処理を作ると、



後で構成変更が発生しやすい。



このプロジェクトでは、



基盤

↓

DB

↓

API

↓

画面

↓

OBS



の順番で作る。



\---



次に作成する資料：



```text

docs/prompts/02\\\_Claude\\\_Phase2\\\_Database.md



内容：



schema.sql作成指示

D1 migration

Seedデータ

DB確認方法



になります。


