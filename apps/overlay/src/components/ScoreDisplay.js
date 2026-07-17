import { jsx as _jsx } from "react/jsx-runtime";
const EVENT_LABEL = {
    normal: null,
    mini_boss: "MINI BOSS",
    bonus_round: "BONUS ROUND",
    mid_boss: "MID BOSS",
    final_boss: "FINAL QUESTION",
};
// docs/prd/gdd/08_Game_Event_System.md 準拠のイベント演出表示
export default function ScoreDisplay({ event }) {
    const label = EVENT_LABEL[event];
    if (!label)
        return null;
    return _jsx("div", { style: styles.badge, children: label });
}
const styles = {
    badge: {
        display: "inline-block",
        marginTop: 8,
        padding: "6px 16px",
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        background: "linear-gradient(90deg, #ff6f00, #d32f2f)",
        borderRadius: 8,
        letterSpacing: 2,
    },
};
