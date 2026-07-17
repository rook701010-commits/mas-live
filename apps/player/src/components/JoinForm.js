import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function JoinForm({ initialSessionId, joining, error, onJoin }) {
    const [sessionId, setSessionId] = useState(initialSessionId);
    const [nickname, setNickname] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!sessionId.trim() || !nickname.trim())
            return;
        onJoin(sessionId.trim(), nickname.trim());
    };
    return (_jsxs("form", { onSubmit: handleSubmit, style: styles.form, children: [_jsx("h1", { style: styles.title, children: "MAS LIVE" }), _jsx("p", { style: styles.subtitle, children: "\u300C100\u4EBA\u3067rook7\u3092\u5012\u305B\uFF01\u300D" }), !initialSessionId && (_jsxs("label", { style: styles.label, children: ["Session ID", _jsx("input", { style: styles.input, value: sessionId, onChange: (e) => setSessionId(e.target.value), placeholder: "\u914D\u4FE1\u8005\u304B\u3089\u5171\u6709\u3055\u308C\u305F\u30BB\u30C3\u30B7\u30E7\u30F3ID" })] })), _jsxs("label", { style: styles.label, children: ["\u30CB\u30C3\u30AF\u30CD\u30FC\u30E0", _jsx("input", { style: styles.input, value: nickname, onChange: (e) => setNickname(e.target.value), placeholder: "\u4F8B: \u96C0\u58EBA", maxLength: 20 })] }), error && _jsx("p", { style: styles.error, children: error }), _jsx("button", { style: styles.button, type: "submit", disabled: joining, children: joining ? "参加中..." : "参加する" })] }));
}
const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 20,
        maxWidth: 400,
        margin: "0 auto",
    },
    title: { fontSize: 28, margin: 0, textAlign: "center" },
    subtitle: { textAlign: "center", color: "#666", marginTop: 0 },
    label: { display: "flex", flexDirection: "column", gap: 4, fontSize: 14 },
    input: {
        padding: "12px 14px",
        fontSize: 16,
        borderRadius: 8,
        border: "1px solid #ccc",
        minHeight: 44,
        width: "100%",
        boxSizing: "border-box",
    },
    button: {
        marginTop: 8,
        padding: "14px 0",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        background: "#d32f2f",
        border: "none",
        borderRadius: 8,
        minHeight: 48,
    },
    error: { color: "#d32f2f", fontSize: 14 },
};
