import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
const TOTAL_QUESTIONS = 20;
export default function QuestionDisplay({ questionNo, title, remainingSeconds, participants, }) {
    return (_jsxs("div", { style: styles.wrap, children: [_jsxs("div", { style: styles.topRow, children: [_jsxs("span", { style: styles.badge, children: ["\u554F\u984C ", questionNo, "/", TOTAL_QUESTIONS] }), _jsxs("span", { style: styles.badge, children: ["\u53C2\u52A0\u4EBA\u6570 ", participants, "\u4EBA"] }), _jsxs("span", { style: styles.timer, children: ["\u6B8B\u308A ", remainingSeconds, "\u79D2"] })] }), _jsx("p", { style: styles.question, children: title })] }));
}
const styles = {
    wrap: { padding: 16, background: "#111", color: "#fff", borderRadius: 12, marginBottom: 16 },
    topRow: { display: "flex", gap: 16, fontSize: 14, marginBottom: 12, flexWrap: "wrap" },
    badge: { background: "#333", padding: "4px 10px", borderRadius: 6 },
    timer: { background: "#d32f2f", padding: "4px 10px", borderRadius: 6, fontWeight: "bold" },
    question: { fontSize: 22, lineHeight: 1.5, margin: 0 },
};
