import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function BattleResult({ result, onReset }) {
    const bossWon = result.winner === "boss";
    return (_jsxs("div", { style: {
            ...styles.wrap,
            background: bossWon ? "#e3f2fd" : "#ffebee",
            borderRadius: 16,
        }, children: [_jsx("h2", { style: { ...styles.headline, color: bossWon ? "#1565c0" : "#c62828" }, children: bossWon ? "rook7 DEFENSE SUCCESS!!" : "RAID WIN!!" }), _jsx("p", { style: styles.sub, children: bossWon ? "防衛成功。連勝記録更新！" : "100人の勝利！次回はリベンジだ。" }), _jsxs("div", { style: styles.scoreRow, children: [_jsxs("div", { style: styles.scoreBox, children: [_jsx("span", { style: styles.scoreLabel, children: "Boss" }), _jsx("span", { style: styles.scoreValue, children: result.boss_score })] }), _jsx("span", { style: styles.vs, children: "VS" }), _jsxs("div", { style: styles.scoreBox, children: [_jsx("span", { style: styles.scoreLabel, children: "Raid\u5E73\u5747" }), _jsx("span", { style: styles.scoreValue, children: result.raid_average })] })] }), _jsx("button", { style: styles.button, onClick: onReset, children: "\u65B0\u3057\u3044\u914D\u4FE1\u3092\u958B\u59CB\u3059\u308B" })] }));
}
const styles = {
    wrap: { textAlign: "center", padding: 24 },
    headline: { fontSize: 26, margin: "0 0 4px" },
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
    scoreValue: { fontSize: 40, fontWeight: "bold" },
    vs: { fontSize: 14, color: "#999" },
    button: {
        marginTop: 8,
        padding: "12px 24px",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        background: "#333",
        border: "none",
        borderRadius: 8,
    },
};
