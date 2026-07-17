import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/client";
import DashboardCard from "../components/DashboardCard";
export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        let cancelled = false;
        fetchDashboard().then((res) => {
            if (cancelled)
                return;
            if (res.success)
                setStats(res.data);
            else
                setError(res.error.message);
        });
        return () => {
            cancelled = true;
        };
    }, []);
    if (error)
        return _jsxs("p", { children: ["\u30A8\u30E9\u30FC: ", error] });
    if (!stats)
        return _jsx("p", { children: "\u8AAD\u307F\u8FBC\u307F\u4E2D..." });
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9" }), _jsxs("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: [_jsx(DashboardCard, { label: "\u554F\u984C\u7DCF\u6570", value: stats.total_questions }), _jsx(DashboardCard, { label: "\u516C\u958B\u6E08\u307F\u554F\u984C", value: stats.published_questions }), _jsx(DashboardCard, { label: "\u30BB\u30C3\u30B7\u30E7\u30F3\u7DCF\u6570", value: stats.total_sessions }), _jsx(DashboardCard, { label: "\u53C2\u52A0\u8005\u7DCF\u6570", value: stats.total_participants }), _jsx(DashboardCard, { label: "\u5E73\u5747\u6B63\u7B54\u7387", value: `${stats.average_correct_rate}%` })] })] }));
}
