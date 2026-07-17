interface Props {
  bossScore: number;
  raidAverage: number;
}

// docs/prd/gdd/13_OBS_Overlay.md 配色: Boss=赤, Raid=青
export default function BattleGauge({ bossScore, raidAverage }: Props) {
  const total = bossScore + raidAverage || 1;
  const bossRatio = Math.min(Math.max(bossScore / total, 0), 1);

  return (
    <div style={styles.wrap}>
      <div style={styles.gauge}>
        <div style={{ ...styles.bossFill, width: `${bossRatio * 100}%` }} />
      </div>
      <div style={styles.labels}>
        <span style={styles.bossLabel}>rook7 {bossScore}</span>
        <span style={styles.vs}>VS</span>
        <span style={styles.raidLabel}>Raid {raidAverage}</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
