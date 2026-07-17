interface Props {
  questionNo: number;
  totalQuestions: number;
  title: string;
  remainingSeconds: number;
}

export default function QuestionCard({ questionNo, totalQuestions, title, remainingSeconds }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span>問題 {questionNo}/{totalQuestions}</span>
        <span style={styles.timer}>残り {remainingSeconds}秒</span>
      </div>
      <p style={styles.question}>{title}</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    padding: 16,
    borderRadius: 12,
    background: "#f5f5f5",
    marginBottom: 16,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  timer: { fontWeight: "bold", color: "#d32f2f" },
  question: { fontSize: 18, lineHeight: 1.5, margin: 0 },
};
