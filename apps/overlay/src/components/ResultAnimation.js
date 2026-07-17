import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md Step5
export default function ResultAnimation({ bossScore, raidAverage, winner }) {
    const bossWon = winner === "boss";
    return (_jsxs("div", { style: styles.wrap, children: [_jsx("h1", { style: { ...styles.headline, color: bossWon ? "#ff5252" : "#448aff" }, children: bossWon ? "rook7 DEFENSE SUCCESS!!" : "RAID WIN!!" }), _jsxs("p", { style: styles.score, children: ["Boss ", bossScore, " \u2014 Raid ", raidAverage] })] }));
}
const styles = {
    wrap: { textAlign: "center", color: "#fff" },
    headline: { fontSize: 40, margin: 0, textShadow: "0 0 12px rgba(0,0,0,0.8)" },
    score: { fontSize: 20, marginTop: 8 },
};
