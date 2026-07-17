// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md 準拠
// OBS Browser Source用。背景透過・1920x1080前提。session_idはURLクエリで受け取る。

import { useOverlayState } from "./hooks/useOverlayState";
import BossInfo from "./components/BossInfo";
import QuestionStatus from "./components/QuestionStatus";
import BattleGauge from "./components/BattleGauge";
import ScoreDisplay from "./components/ScoreDisplay";
import ResultAnimation from "./components/ResultAnimation";
import RankingList from "./components/RankingList";

function getSessionIdFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("session") ?? "";
}

export default function App() {
  const sessionId = getSessionIdFromUrl();
  const { state, ranking, finished, finalResult, error } = useOverlayState(sessionId || null);

  if (!sessionId) {
    return (
      <div style={styles.hint}>
        OBS Browser SourceのURLに ?session=&lt;session_id&gt; を付けてください
      </div>
    );
  }

  if (finished && finalResult) {
    return (
      <div style={styles.root}>
        <div style={styles.center}>
          <ResultAnimation
            bossScore={finalResult.boss_score}
            raidAverage={finalResult.raid_average}
            winner={finalResult.winner}
          />
        </div>
      </div>
    );
  }

  if (error || !state) {
    return <div style={styles.hint}>{error ?? "接続中..."}</div>;
  }

  return (
    <div style={styles.root}>
      <div style={styles.topBar}>
        <BossInfo bossName={state.boss} />
        <QuestionStatus
          questionNo={state.question}
          remainingSeconds={state.remaining_seconds}
          participants={state.participants}
        />
      </div>

      <div style={styles.bottomBar}>
        <BattleGauge bossScore={state.score} raidAverage={state.average} />
        <ScoreDisplay event={state.event} />
      </div>

      {ranking && ranking.top.length > 0 && (
        <div style={styles.rankingCorner}>
          <RankingList top={ranking.top} />
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
