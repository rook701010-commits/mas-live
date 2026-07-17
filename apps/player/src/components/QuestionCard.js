import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function QuestionCard({ questionNo, totalQuestions, title, remainingSeconds }) {
    return (_jsxs("div", { style: styles.card, children: [_jsxs("div", { style: styles.header, children: [_jsxs("span", { children: ["\u554F\u984C ", questionNo, "/", totalQuestions] }), _jsxs("span", { style: styles.timer, children: ["\u6B8B\u308A ", remainingSeconds, "\u79D2"] })] }), _jsx("p", { style: styles.question, children: title })] }));
}
const styles = {
    card: {
        padding: 16,
        borderRadius: 12,
        background: "#f5f5f5",
        marginBottom: 16,
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 14,
        color: "#555",
        marginBottom: 8,
    },
    timer: { fontWeight: "bold", color: "#d32f2f" },
    question: { fontSize: 18, lineHeight: 1.5, margin: 0 },
};
