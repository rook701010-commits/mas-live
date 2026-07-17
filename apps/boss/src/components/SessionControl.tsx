import { FormEvent, useState } from "react";

interface Props {
  busy: boolean;
  error: string | null;
  onStart: (title: string, bossName: string) => void;
  onResume: (sessionId: string) => void;
}

// docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md Step4
export default function SessionControl({ busy, error, onStart, onResume }: Props) {
  const [title, setTitle] = useState("100人でrook7を倒せ！");
  const [bossName, setBossName] = useState("rook7");
  const [existingId, setExistingId] = useState("");

  const handleStart = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !bossName.trim()) return;
    onStart(title.trim(), bossName.trim());
  };

  const handleResume = (e: FormEvent) => {
    e.preventDefault();
    if (!existingId.trim()) return;
    onResume(existingId.trim());
  };

  return (
    <div style={styles.wrap}>
      <h1 style={styles.title}>MAS LIVE - Boss Console</h1>

      <form onSubmit={handleStart} style={styles.form}>
        <h2 style={styles.section}>新しい配信を開始</h2>
        <label style={styles.label}>
          タイトル
          <input style={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label style={styles.label}>
          Boss名
          <input
            style={styles.input}
            value={bossName}
            onChange={(e) => setBossName(e.target.value)}
          />
        </label>
        <button style={styles.button} type="submit" disabled={busy}>
          {busy ? "開始中..." : "配信開始（Enter）"}
        </button>
      </form>

      <form onSubmit={handleResume} style={styles.form}>
        <h2 style={styles.section}>既存セッションを再開</h2>
        <label style={styles.label}>
          Session ID
          <input
            style={styles.input}
            value={existingId}
            onChange={(e) => setExistingId(e.target.value)}
            placeholder="途中から再接続する場合"
          />
        </label>
        <button style={styles.secondaryButton} type="submit">
          再開する
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { padding: 24, maxWidth: 480, margin: "0 auto" },
  title: { fontSize: 26, textAlign: "center" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 16,
    marginTop: 16,
    background: "#f5f5f5",
    borderRadius: 12,
  },
  section: { fontSize: 16, margin: 0 },
  label: { display: "flex", flexDirection: "column", gap: 4, fontSize: 14 },
  input: { padding: "10px 12px", fontSize: 16, borderRadius: 8, border: "1px solid #ccc" },
  button: {
    marginTop: 4,
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    background: "#d32f2f",
    border: "none",
    borderRadius: 8,
  },
  secondaryButton: {
    marginTop: 4,
    padding: "12px 0",
    fontSize: 14,
    color: "#333",
    background: "#e0e0e0",
    border: "none",
    borderRadius: 8,
  },
  error: { color: "#d32f2f", marginTop: 12, textAlign: "center" },
};
