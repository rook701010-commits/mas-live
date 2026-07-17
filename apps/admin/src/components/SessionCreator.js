import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { createSession, startSession } from "../api/client";
export default function SessionCreator() {
    const [title, setTitle] = useState("100人でrook7を倒せ！");
    const [bossName, setBossName] = useState("rook7");
    const [questionCount, setQuestionCount] = useState(20);
    const [sessionId, setSessionId] = useState(null);
    const [message, setMessage] = useState(null);
    async function handleCreate() {
        setMessage(null);
        const res = await createSession({ title, boss_name: bossName, question_count: questionCount });
        if (res.success) {
            setSessionId(res.data.session_id);
            setMessage(`セッションを作成しました: ${res.data.session_id}`);
        }
        else {
            setMessage(`エラー: ${res.error.message}`);
        }
    }
    async function handleStart() {
        if (!sessionId)
            return;
        const res = await startSession(sessionId);
        setMessage(res.success ? "セッションを開始しました。" : `エラー: ${res.error.message}`);
    }
    return (_jsxs("div", { style: styles.panel, children: [_jsx("h3", { children: "\u65B0\u898F\u30BB\u30C3\u30B7\u30E7\u30F3\u4F5C\u6210" }), _jsxs("label", { style: styles.row, children: ["\u30BF\u30A4\u30C8\u30EB", _jsx("input", { value: title, onChange: (e) => setTitle(e.target.value) })] }), _jsxs("label", { style: styles.row, children: ["Boss\u540D", _jsx("input", { value: bossName, onChange: (e) => setBossName(e.target.value) })] }), _jsxs("label", { style: styles.row, children: ["\u554F\u984C\u6570", _jsx("input", { type: "number", value: questionCount, onChange: (e) => setQuestionCount(Number(e.target.value)) })] }), _jsxs("div", { style: styles.actions, children: [_jsx("button", { onClick: handleCreate, children: "\u4F5C\u6210" }), _jsx("button", { onClick: handleStart, disabled: !sessionId, children: "\u958B\u59CB" })] }), sessionId && (_jsxs("p", { children: ["session_id: ", _jsx("code", { children: sessionId })] })), message && _jsx("p", { children: message })] }));
}
const styles = {
    panel: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginTop: 12, maxWidth: 420 },
    row: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, fontSize: 13 },
    actions: { display: "flex", gap: 8, marginTop: 8 },
};
