const LABELS = ["A", "B", "C", "D"];

interface Props {
  choices: string[];
  selected: string | null;
  disabled: boolean;
  onSelect: (choice: string) => void;
}

// docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md
// キーボードA/B/C/D対応はDashboardPage側で処理する
export default function AnswerPanel({ choices, selected, disabled, onSelect }: Props) {
  return (
    <div style={styles.grid}>
      {choices.map((choice, i) => {
        const label = LABELS[i] ?? String(i + 1);
        const isSelected = selected === label;
        return (
          <button
            key={label}
            style={{ ...styles.button, ...(isSelected ? styles.selected : {}) }}
            disabled={disabled}
            onClick={() => onSelect(label)}
          >
            <span style={styles.label}>{label}</span>
            {choice}
          </button>
        );
      })}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  button: {
    minHeight: 56,
    fontSize: 16,
    borderRadius: 10,
    border: "2px solid #ccc",
    background: "#fff",
    textAlign: "left",
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  selected: { borderColor: "#d32f2f", background: "#ffebee" },
  label: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "#333",
    color: "#fff",
    fontSize: 13,
    flexShrink: 0,
  },
};
