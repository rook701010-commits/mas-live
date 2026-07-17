import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function ResultPanel({ result, nickname }) {
    const raidWon = result.winner === "raid";
    return (_jsxs("div", { style: styles.panel, children: [_jsx("h2", { style: styles.headline, children: raidWon ? "RAID WIN!!" : "rook7 DEFENSE SUCCESS!!" }), _jsx("p", { style: styles.sub, children: raidWon ? "100人の勝利！" : "防衛成功。また来週挑もう！" }), _jsxs("div", { style: styles.scoreRow, children: [_jsxs("div", { style: styles.scoreBox, children: [_jsx("span", { style: styles.scoreLabel, children: "Boss" }), _jsx("span", { style: styles.scoreValue, children: result.boss_score })] }), _jsx("span", { style: styles.vs, children: "VS" }), _jsxs("div", { style: styles.scoreBox, children: [_jsx("span", { style: styles.scoreLabel, children: "Raid\u5E73\u5747" }), _jsx("span", { style: styles.scoreValue, children: result.raid_average })] })] }), _jsxs("p", { style: styles.thanks, children: [nickname, "\u3055\u3093\u3001\u53C2\u52A0\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3057\u305F\u3002"] })] }));
}
const styles = {
    panel: { textAlign: "center", padding: 20 },
    headline: { fontSize: 24, margin: "0 0 4px" },
    sub: { color: "#666", marginTop: 0 },
    scoreRow: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        margin: "24px 0",
    },
    scoreBox: { display: "flex", flexDirection: "column", alignItems: "center" },
    scoreLabel: { fontSize: 12, color: "#888" },
    scoreValue: { fontSize: 36, fontWeight: "bold" },
    vs: { fontSize: 14, color: "#999" },
    thanks: { fontSize: 14, color: "#555" },
};
