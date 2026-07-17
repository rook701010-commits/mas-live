import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
// docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md Step4
export default function SessionControl({ busy, error, onStart, onResume }) {
    const [title, setTitle] = useState("100人でrook7を倒せ！");
    const [bossName, setBossName] = useState("rook7");
    const [existingId, setExistingId] = useState("");
    const handleStart = (e) => {
        e.preventDefault();
        if (!title.trim() || !bossName.trim())
            return;
        onStart(title.trim(), bossName.trim());
    };
    const handleResume = (e) => {
        e.preventDefault();
        if (!existingId.trim())
            return;
        onResume(existingId.trim());
    };
    return (_jsxs("div", { style: styles.wrap, children: [_jsx("h1", { style: styles.title, children: "MAS LIVE - Boss Console" }), _jsxs("form", { onSubmit: handleStart, style: styles.form, children: [_jsx("h2", { style: styles.section, children: "\u65B0\u3057\u3044\u914D\u4FE1\u3092\u958B\u59CB" }), _jsxs("label", { style: styles.label, children: ["\u30BF\u30A4\u30C8\u30EB", _jsx("input", { style: styles.input, value: title, onChange: (e) => setTitle(e.target.value) })] }), _jsxs("label", { style: styles.label, children: ["Boss\u540D", _jsx("input", { style: styles.input, value: bossName, onChange: (e) => setBossName(e.target.value) })] }), _jsx("button", { style: styles.button, type: "submit", disabled: busy, children: busy ? "開始中..." : "配信開始（Enter）" })] }), _jsxs("form", { onSubmit: handleResume, style: styles.form, children: [_jsx("h2", { style: styles.section, children: "\u65E2\u5B58\u30BB\u30C3\u30B7\u30E7\u30F3\u3092\u518D\u958B" }), _jsxs("label", { style: styles.label, children: ["Session ID", _jsx("input", { style: styles.input, value: existingId, onChange: (e) => setExistingId(e.target.value), placeholder: "\u9014\u4E2D\u304B\u3089\u518D\u63A5\u7D9A\u3059\u308B\u5834\u5408" })] }), _jsx("button", { style: styles.secondaryButton, type: "submit", children: "\u518D\u958B\u3059\u308B" })] }), error && _jsx("p", { style: styles.error, children: error })] }));
}
const styles = {
    wrap: { padding: 24, maxWidth: 480, margin: "0 auto" },
    title: { fontSize: 26, textAlign: "center" },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 16,
        marginTop: 16,
        background: "#f5f5f5",
        borderRadius: 12,
    },
    section: { fontSize: 16, margin: 0 },
    label: { display: "flex", flexDirection: "column", gap: 4, fontSize: 14 },
    input: { padding: "10px 12px", fontSize: 16, borderRadius: 8, border: "1px solid #ccc" },
    button: {
        marginTop: 4,
        padding: "14px 0",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        background: "#d32f2f",
        border: "none",
        borderRadius: 8,
    },
    secondaryButton: {
        marginTop: 4,
        padding: "12px 0",
        fontSize: 14,
        color: "#333",
        background: "#e0e0e0",
        border: "none",
        borderRadius: 8,
    },
    error: { color: "#d32f2f", marginTop: 12, textAlign: "center" },
};
