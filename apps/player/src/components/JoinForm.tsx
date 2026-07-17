import { FormEvent, useState } from "react";

interface Props {
  initialSessionId: string;
  joining: boolean;
  error: string | null;
  onJoin: (sessionId: string, nickname: string) => void;
}

export default function JoinForm({ initialSessionId, joining, error, onJoin }: Props) {
  const [sessionId, setSessionId] = useState(initialSessionId);
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!sessionId.trim() || !nickname.trim()) return;
    onJoin(sessionId.trim(), nickname.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1 style={styles.title}>MAS LIVE</h1>
      <p style={styles.subtitle}>「100人でrook7を倒せ！」</p>

      {!initialSessionId && (
        <label style={styles.label}>
          Session ID
          <input
            style={styles.input}
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="配信者から共有されたセッションID"
          />
        </label>
      )}

      <label style={styles.label}>
        ニックネーム
        <input
          style={styles.input}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="例: 雀士A"
          maxLength={20}
        />
      </label>

      {error && <p style={styles.error}>{error}</p>}

      <button style={styles.button} type="submit" disabled={joining}>
        {joining ? "参加中..." : "参加する"}
      </button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 20,
    maxWidth: 400,
    margin: "0 auto",
  },
  title: { fontSize: 28, margin: 0, textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginTop: 0 },
  label: { display: "flex", flexDirection: "column", gap: 4, fontSize: 14 },
  input: {
    padding: "12px 14px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    minHeight: 44,
  },
  button: {
    marginTop: 8,
    padding: "14px 0",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    background: "#d32f2f",
    border: "none",
    borderRadius: 8,
    minHeight: 48,
  },
  error: { color: "#d32f2f", fontSize: 14 },
};
