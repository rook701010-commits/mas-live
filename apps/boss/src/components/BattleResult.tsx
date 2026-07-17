import { RankingFinalResponse } from "../api/client";

interface Props {
  result: RankingFinalResponse;
  onReset: () => void;
}

export default function BattleResult({ result, onReset }: Props) {
  const bossWon = result.winner === "boss";

  return (
    <div
      style={{
        ...styles.wrap,
        background: bossWon ? "#e3f2fd" : "#ffebee",
        borderRadius: 16,
      }}
    >
      <h2 style={{ ...styles.headline, color: bossWon ? "#1565c0" : "#c62828" }}>
        {bossWon ? "rook7 DEFENSE SUCCESS!!" : "RAID WIN!!"}
      </h2>
      <p style={styles.sub}>{bossWon ? "防衛成功。連勝記録更新！" : "100人の勝利！次回はリベンジだ。"}</p>

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

      <button style={styles.button} onClick={onReset}>
        新しい配信を開始する
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
