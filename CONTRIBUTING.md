\# MAS LIVE Development Guide



\## Purpose



このドキュメントは、MAS LIVEプロジェクトに関わるすべての開発者が、

同じルール・同じ思想で開発を行うためのガイドラインです。



\---



\## Project Principles



1\. 面白さを最優先する

2\. GDDを唯一の仕様書とする

3\. 実装前に仕様を確定する

4\. 推測実装を禁止する

5\. MVPを最優先する



\---



\## Development Flow



Idea

↓

PRD

↓

GDD

↓

Technical Design

↓

Implementation

↓

Testing

↓

Release



\---



\## Roles



\### ChatGPT



\- Product Manager

\- Game Designer

\- System Architect

\- Reviewer



\### Claude



\- Frontend Engineer

\- Backend Engineer

\- Refactoring

\- Testing Support



\### Human



\- Product Owner

\- Final Decision Maker

\- Play Tester



\---



\## Branch Strategy



main



常に動作する最新版



develop



次期リリース



feature/\*



各機能開発



\---



\## Commit Rules



feat:

新機能



fix:

バグ修正



docs:

ドキュメント



style:

フォーマットのみ



refactor:

リファクタリング



test:

テスト



chore:

その他



\---



\## Directory Rules



docs/



設計資料



frontend/



React



worker/



Cloudflare Workers



database/



Schema



assets/



画像・音声



tests/



テスト



\---



\## Specification Rule



実装は必ず最新GDDに従うこと。



仕様変更は禁止。



仕様変更が必要な場合はDecision Logへ登録する。



\---



\## UI Rule



OBSを最優先。



スマホは第二優先。



PC管理画面は第三優先。



\---



\## Coding Rule



TypeScript Strict



ESLint



Prettier



Component Driven



Atomic Design



\---



\## Quality Rule



実装完了ではなく



「配信で面白い」



を完成条件とする。

