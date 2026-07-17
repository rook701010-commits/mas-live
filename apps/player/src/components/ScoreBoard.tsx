interface Props {
  participants: number;
  average: number;
  top: { name: string; score: number }[];
}

export default function ScoreBoard({ participants, average, top }: Props) {
  return (
    <div style={styles.box}>
      <div style={styles.summary}>
        <span>参加人数 {participants}人</span>
        <span>Raid平均 {average}</span>
      </div>
      {top.length > 0 && (
        <ol style={styles.list}>
          {top.map((p, i) => (
            <li key={i} style={styles.item}>
              {p.name} — {p.score}点
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  box: {
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    background: "#fafafa",
    fontSize: 14,
  },
  summary: { display: "flex", justifyContent: "space-between", fontWeight: "bold" },
  list: { margin: "8px 0 0", paddingLeft: 20 },
  item: { padding: "2px 0" },
};
