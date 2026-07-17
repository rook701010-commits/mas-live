import { useState } from "react";
import { createSession, startSession } from "../api/client";

export default function SessionCreator() {
  const [title, setTitle] = useState("100人でrook7を倒せ！");
  const [bossName, setBossName] = useState("rook7");
  const [questionCount, setQuestionCount] = useState(20);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCreate() {
    setMessage(null);
    const res = await createSession({ title, boss_name: bossName, question_count: questionCount });
    if (res.success) {
      setSessionId(res.data.session_id);
      setMessage(`セッションを作成しました: ${res.data.session_id}`);
    } else {
      setMessage(`エラー: ${res.error.message}`);
    }
  }

  async function handleStart() {
    if (!sessionId) return;
    const res = await startSession(sessionId);
    setMessage(res.success ? "セッションを開始しました。" : `エラー: ${res.error.message}`);
  }

  return (
    <div style={styles.panel}>
      <h3>新規セッション作成</h3>
      <label style={styles.row}>
        タイトル
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label style={styles.row}>
        Boss名
        <input value={bossName} onChange={(e) => setBossName(e.target.value)} />
      </label>
      <label style={styles.row}>
        問題数
        <input
          type="number"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        />
      </label>
      <div style={styles.actions}>
        <button onClick={handleCreate}>作成</button>
        <button onClick={handleStart} disabled={!sessionId}>
          開始
        </button>
      </div>
      {sessionId && (
        <p>
          session_id: <code>{sessionId}</code>
        </p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginTop: 12, maxWidth: 420 },
  row: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, fontSize: 13 },
  actions: { display: "flex", gap: 8, marginTop: 8 },
};
