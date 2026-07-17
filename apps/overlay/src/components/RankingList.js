import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// docs/prd/gdd/technical/prompts/09_Claude_Phase9_Polish.md 準拠
// OBS表示用の簡易ランキング(上位5名)
export default function RankingList({ top }) {
    if (top.length === 0)
        return null;
    return (_jsx("div", { style: styles.wrap, children: top.slice(0, 5).map((entry, i) => (_jsxs("div", { style: styles.row, children: [_jsx("span", { style: styles.rank, children: i + 1 }), _jsx("span", { style: styles.name, children: entry.name }), _jsx("span", { style: styles.score, children: entry.score })] }, `${entry.name}-${i}`))) }));
}
const styles = {
    wrap: {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "rgba(0,0,0,0.55)",
        borderRadius: 8,
        padding: "8px 12px",
        minWidth: 160,
    },
    row: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        color: "#fff",
        fontSize: 13,
    },
    rank: { width: 16, textAlign: "center", opacity: 0.7 },
    name: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
    score: { fontWeight: "bold" },
};
