interface Props {
  label: string;
  value: string | number;
}

export default function DashboardCard({ label, value }: Props) {
  return (
    <div style={styles.card}>
      <div style={styles.label}>{label}</div>
      <div style={styles.value}>{value}</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    minWidth: 140,
    background: "#fafafa",
  },
  label: { fontSize: 12, color: "#666" },
  value: { fontSize: 28, fontWeight: "bold", marginTop: 4 },
};
