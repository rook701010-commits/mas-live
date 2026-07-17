interface Props {
  top: { name: string; score: number }[];
}

// docs/prd/gdd/technical/prompts/09_Claude_Phase9_Polish.md 準拠
// OBS表示用の簡易ランキング(上位5名)
export default function RankingList({ top }: Props) {
  if (top.length === 0) return null;

  return (
    <div style={styles.wrap}>
      {top.slice(0, 5).map((entry, i) => (
        <div key={`${entry.name}-${i}`} style={styles.row}>
          <span style={styles.rank}>{i + 1}</span>
          <span style={styles.name}>{entry.name}</span>
          <span style={styles.score}>{entry.score}</span>
        </div>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
