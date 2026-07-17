import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// docs/prd/gdd/technical/prompts/07_Claude_Phase7_Admin_Panel.md 準拠
// MVP: 管理者1人のみ、権限管理・ログインなし（DL-002 / 認証ポリシーはBoss Client同様）
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import QuestionsPage from "./pages/QuestionsPage";
import SessionsPage from "./pages/SessionsPage";
export default function App() {
    const [tab, setTab] = useState("dashboard");
    return (_jsxs("div", { style: { fontFamily: "sans-serif", padding: 16, maxWidth: 900, margin: "0 auto" }, children: [_jsx("h1", { children: "MAS LIVE - Admin" }), _jsxs("nav", { style: { display: "flex", gap: 8, marginBottom: 16, borderBottom: "1px solid #ddd", paddingBottom: 8 }, children: [_jsx("button", { onClick: () => setTab("dashboard"), disabled: tab === "dashboard", children: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9" }), _jsx("button", { onClick: () => setTab("questions"), disabled: tab === "questions", children: "\u554F\u984C\u7BA1\u7406" }), _jsx("button", { onClick: () => setTab("sessions"), disabled: tab === "sessions", children: "\u30BB\u30C3\u30B7\u30E7\u30F3\u7BA1\u7406" })] }), tab === "dashboard" && _jsx(DashboardPage, {}), tab === "questions" && _jsx(QuestionsPage, {}), tab === "sessions" && _jsx(SessionsPage, {})] }));
}
