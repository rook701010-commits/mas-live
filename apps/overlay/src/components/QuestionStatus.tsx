const TOTAL_QUESTIONS = 20;

interface Props {
  questionNo: number;
  remainingSeconds: number;
  participants: number;
}

export default function QuestionStatus({ questionNo, remainingSeconds, participants }: Props) {
  return (
    <div style={styles.wrap}>
      <span style={styles.item}>Q{questionNo}/{TOTAL_QUESTIONS}</span>
      <span style={styles.timer}>⏱ {remainingSeconds}s</span>
      <span style={styles.item}>👥 {participants}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { display: "flex", gap: 12, fontSize: 16, color: "#fff" },
  item: { background: "rgba(0,0,0,0.5)", padding: "4px 10px", borderRadius: 6 },
  timer: {
    background: "rgba(211,47,47,0.85)",
    padding: "4px 10px",
    borderRadius: 6,
    fontWeight: "bold",
  },
};
