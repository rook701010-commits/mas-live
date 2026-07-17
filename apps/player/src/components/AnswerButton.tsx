interface Props {
  choices: string[];
  disabled: boolean;
  selected: string | null;
  onSelect: (choice: string) => void;
}

const LABELS = ["A", "B", "C", "D"];

export default function AnswerButton({ choices, disabled, selected, onSelect }: Props) {
  return (
    <div style={styles.grid}>
      {choices.map((choice, i) => {
        const label = LABELS[i] ?? String(i + 1);
        const isSelected = selected === label;
        return (
          <button
            key={label}
            style={{
              ...styles.button,
              ...(isSelected ? styles.selected : {}),
            }}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
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
  selected: {
    borderColor: "#d32f2f",
    background: "#ffebee",
  },
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
