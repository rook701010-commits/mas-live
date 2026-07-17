import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// docs/prd/gdd/13_OBS_Overlay.md 配色: Boss=赤, Raid=青
export default function BattleGauge({ bossScore, raidAverage }) {
    const total = bossScore + raidAverage || 1;
    const bossRatio = Math.min(Math.max(bossScore / total, 0), 1);
    return (_jsxs("div", { style: styles.wrap, children: [_jsx("div", { style: styles.gauge, children: _jsx("div", { style: { ...styles.bossFill, width: `${bossRatio * 100}%` } }) }), _jsxs("div", { style: styles.labels, children: [_jsxs("span", { style: styles.bossLabel, children: ["rook7 ", bossScore] }), _jsx("span", { style: styles.vs, children: "VS" }), _jsxs("span", { style: styles.raidLabel, children: ["Raid ", raidAverage] })] })] }));
}
const styles = {
    wrap: { width: 320 },
    gauge: {
        height: 14,
        borderRadius: 7,
        background: "#1565c0",
        overflow: "hidden",
    },
    bossFill: { height: "100%", background: "#d32f2f", transition: "width 0.4s ease" },
    labels: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 4,
        fontSize: 14,
        color: "#fff",
    },
    bossLabel: { color: "#ff8a80", fontWeight: "bold" },
    raidLabel: { color: "#82b1ff", fontWeight: "bold" },
    vs: { color: "#ccc" },
};
