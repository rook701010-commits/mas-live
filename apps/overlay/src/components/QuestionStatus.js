import { jsxs as _jsxs } from "react/jsx-runtime";
const TOTAL_QUESTIONS = 20;
export default function QuestionStatus({ questionNo, remainingSeconds, participants }) {
    return (_jsxs("div", { style: styles.wrap, children: [_jsxs("span", { style: styles.item, children: ["Q", questionNo, "/", TOTAL_QUESTIONS] }), _jsxs("span", { style: styles.timer, children: ["\u23F1 ", remainingSeconds, "s"] }), _jsxs("span", { style: styles.item, children: ["\uD83D\uDC65 ", participants] })] }));
}
const styles = {
    wrap: { display: "flex", gap: 12, fontSize: 16, color: "#fff" },
    item: { background: "rgba(0,0,0,0.5)", padding: "4px 10px", borderRadius: 6 },
    timer: {
        background: "rgba(211,47,47,0.85)",
        padding: "4px 10px",
        borderRadius: 6,
        fontWeight: "bold",
    },
};
