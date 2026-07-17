import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export default function ScoreBoard({ participants, average, top }) {
    return (_jsxs("div", { style: styles.box, children: [_jsxs("div", { style: styles.summary, children: [_jsxs("span", { children: ["\u53C2\u52A0\u4EBA\u6570 ", participants, "\u4EBA"] }), _jsxs("span", { children: ["Raid\u5E73\u5747 ", average] })] }), top.length > 0 && (_jsx("ol", { style: styles.list, children: top.map((p, i) => (_jsxs("li", { style: styles.item, children: [p.name, " \u2014 ", p.score, "\u70B9"] }, i))) }))] }));
}
const styles = {
    box: {
        marginTop: 16,
        padding: 12,
        borderRadius: 10,
        background: "#fafafa",
        fontSize: 14,
    },
    summary: { display: "flex", justifyContent: "space-between", fontWeight: "bold" },
    list: { margin: "8px 0 0", paddingLeft: 20 },
    item: { padding: "2px 0" },
};
