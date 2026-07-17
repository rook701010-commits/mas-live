import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ScorePanel({ bossScore, bossTotal, raidAverage, ranking }) {
    const diff = Math.round((bossScore - raidAverage) * 10) / 10;
    return (_jsxs("div", { style: styles.wrap, children: [_jsxs("div", { style: styles.row, children: [_jsxs("div", { style: styles.box, children: [_jsx("span", { style: styles.label, children: "Boss\u6B63\u7B54\u6570" }), _jsxs("span", { style: styles.value, children: [bossScore, "/", bossTotal] })] }), _jsxs("div", { style: styles.box, children: [_jsx("span", { style: styles.label, children: "Raid\u5E73\u5747" }), _jsx("span", { style: styles.value, children: raidAverage })] }), _jsxs("div", { style: styles.box, children: [_jsx("span", { style: styles.label, children: "\u5DEE\u5206" }), _jsx("span", { style: { ...styles.value, color: diff >= 0 ? "#2e7d32" : "#d32f2f" }, children: diff > 0 ? `+${diff}` : diff })] })] }), ranking.length > 0 && (_jsx("ol", { style: styles.rankList, children: ranking.slice(0, 5).map((p, i) => (_jsxs("li", { children: [p.name, " \u2014 ", p.score, "\u70B9"] }, i))) }))] }));
}
const styles = {
    wrap: { marginTop: 16 },
    row: { display: "flex", gap: 12, marginBottom: 12 },
    box: {
        flex: 1,
        padding: 12,
        background: "#f5f5f5",
        borderRadius: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    label: { fontSize: 12, color: "#666" },
    value: { fontSize: 24, fontWeight: "bold" },
    rankList: { fontSize: 14, paddingLeft: 20, margin: 0 },
};
