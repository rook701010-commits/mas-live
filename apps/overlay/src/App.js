import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md 準拠
// OBS Browser Source用。背景透過・1920x1080前提。session_idはURLクエリで受け取る。
import { useOverlayState } from "./hooks/useOverlayState";
import BossInfo from "./components/BossInfo";
import QuestionStatus from "./components/QuestionStatus";
import BattleGauge from "./components/BattleGauge";
import ScoreDisplay from "./components/ScoreDisplay";
import ResultAnimation from "./components/ResultAnimation";
import RankingList from "./components/RankingList";
function getSessionIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("session") ?? "";
}
export default function App() {
    const sessionId = getSessionIdFromUrl();
    const { state, ranking, finished, finalResult, error } = useOverlayState(sessionId || null);
    if (!sessionId) {
        return (_jsx("div", { style: styles.hint, children: "OBS Browser Source\u306EURL\u306B ?session=<session_id> \u3092\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044" }));
    }
    if (finished && finalResult) {
        return (_jsx("div", { style: styles.root, children: _jsx("div", { style: styles.center, children: _jsx(ResultAnimation, { bossScore: finalResult.boss_score, raidAverage: finalResult.raid_average, winner: finalResult.winner }) }) }));
    }
    if (error || !state) {
        return _jsx("div", { style: styles.hint, children: error ?? "接続中..." });
    }
    return (_jsxs("div", { style: styles.root, children: [_jsxs("div", { style: styles.topBar, children: [_jsx(BossInfo, { bossName: state.boss }), _jsx(QuestionStatus, { questionNo: state.question, remainingSeconds: state.remaining_seconds, participants: state.participants })] }), _jsxs("div", { style: styles.bottomBar, children: [_jsx(BattleGauge, { bossScore: state.score, raidAverage: state.average }), _jsx(ScoreDisplay, { event: state.event })] }), ranking && ranking.top.length > 0 && (_jsx("div", { style: styles.rankingCorner, children: _jsx(RankingList, { top: ranking.top }) }))] }));
}
const styles = {
    root: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 24,
        boxSizing: "border-box",
        fontFamily: "sans-serif",
        background: "transparent",
        position: "relative",
    },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    rankingCorner: { position: "absolute", top: 24, right: 24 },
    bottomBar: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
    center: { display: "flex", alignItems: "center", justifyContent: "center", height: "100%" },
    hint: { padding: 16, color: "#fff", background: "rgba(0,0,0,0.6)", fontSize: 14 },
};
