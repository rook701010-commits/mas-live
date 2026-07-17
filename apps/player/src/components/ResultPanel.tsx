import { RankingFinalResponse } from "../api/client";

interface Props {
  result: RankingFinalResponse;
  nickname: string;
}

export default function ResultPanel({ result, nickname }: Props) {
  const raidWon = result.winner === "raid";

  return (
    <div style={styles.panel}>
      <h2 style={styles.headline}>{raidWon ? "RAID WIN!!" : "rook7 DEFENSE SUCCESS!!"}</h2>
      <p style={styles.sub}>
        {raidWon ? "100人の勝利！" : "防衛成功。また来週挑もう！"}
      </p>

      <div style={styles.scoreRow}>
        <div style={styles.scoreBox}>
          <span style={styles.scoreLabel}>Boss</span>
          <span style={styles.scoreValue}>{result.boss_score}</span>
        </div>
        <span style={styles.vs}>VS</span>
        <div style={styles.scoreBox}>
          <span style={styles.scoreLabel}>Raid平均</span>
          <span style={styles.scoreValue}>{result.raid_average}</span>
        </div>
      </div>

      <p style={styles.thanks}>{nickname}さん、参加ありがとうございました。</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
