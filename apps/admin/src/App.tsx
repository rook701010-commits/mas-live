// docs/prd/gdd/technical/prompts/07_Claude_Phase7_Admin_Panel.md 準拠
// MVP: 管理者1人のみ、権限管理・ログインなし（DL-002 / 認証ポリシーはBoss Client同様）

import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import QuestionsPage from "./pages/QuestionsPage";
import SessionsPage from "./pages/SessionsPage";

type Tab = "dashboard" | "questions" | "sessions";

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <div style={{ fontFamily: "sans-serif", padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <h1>MAS LIVE - Admin</h1>
      <nav style={{ display: "flex", gap: 8, marginBottom: 16, borderBottom: "1px solid #ddd", paddingBottom: 8 }}>
        <button onClick={() => setTab("dashboard")} disabled={tab === "dashboard"}>
          ダッシュボード
        </button>
        <button onClick={() => setTab("questions")} disabled={tab === "questions"}>
          問題管理
        </button>
        <button onClick={() => setTab("sessions")} disabled={tab === "sessions"}>
          セッション管理
        </button>
      </nav>

      {tab === "dashboard" && <DashboardPage />}
      {tab === "questions" && <QuestionsPage />}
      {tab === "sessions" && <SessionsPage />}
    </div>
  );
}
