interface Props {
  bossScore: number;
  bossTotal: number;
  raidAverage: number;
  ranking: { name: string; score: number }[];
}

export default function ScorePanel({ bossScore, bossTotal, raidAverage, ranking }: Props) {
  const diff = Math.round((bossScore - raidAverage) * 10) / 10;

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <div style={styles.box}>
          <span style={styles.label}>Boss正答数</span>
          <span style={styles.value}>{bossScore}/{bossTotal}</span>
        </div>
        <div style={styles.box}>
          <span style={styles.label}>Raid平均</span>
          <span style={styles.value}>{raidAverage}</span>
        </div>
        <div style={styles.box}>
          <span style={styles.label}>差分</span>
          <span style={{ ...styles.value, color: diff >= 0 ? "#2e7d32" : "#d32f2f" }}>
            {diff > 0 ? `+${diff}` : diff}
          </span>
        </div>
      </div>

      {ranking.length > 0 && (
        <ol style={styles.rankList}>
          {ranking.slice(0, 5).map((p, i) => (
            <li key={i}>{p.name} — {p.score}点</li>
          ))}
        </ol>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { marginTop: 16 },
  row: { display: "flex", gap: 12, marginBottom: 12 },
  box: {
    flex: 1,
    padding: 12,
    background: "#f5f5f5",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  label: { fontSize: 12, color: "#666" },
  value: { fontSize: 24, fontWeight: "bold" },
  rankList: { fontSize: 14, paddingLeft: 20, margin: 0 },
};
