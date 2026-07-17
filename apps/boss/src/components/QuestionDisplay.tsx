const TOTAL_QUESTIONS = 20;

interface Props {
  questionNo: number;
  title: string;
  remainingSeconds: number;
  participants: number;
}

export default function QuestionDisplay({
  questionNo,
  title,
  remainingSeconds,
  participants,
}: Props) {
  return (
    <div style={styles.wrap}>
      <div style={styles.topRow}>
        <span style={styles.badge}>問題 {questionNo}/{TOTAL_QUESTIONS}</span>
        <span style={styles.badge}>参加人数 {participants}人</span>
        <span style={styles.timer}>残り {remainingSeconds}秒</span>
      </div>
      <p style={styles.question}>{title}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { padding: 16, background: "#111", color: "#fff", borderRadius: 12, marginBottom: 16 },
  topRow: { display: "flex", gap: 16, fontSize: 14, marginBottom: 12, flexWrap: "wrap" },
  badge: { background: "#333", padding: "4px 10px", borderRadius: 6 },
  timer: { background: "#d32f2f", padding: "4px 10px", borderRadius: 6, fontWeight: "bold" },
  question: { fontSize: 22, lineHeight: 1.5, margin: 0 },
};
