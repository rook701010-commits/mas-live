import { useState, useEffect } from "react";
import type { Question } from "../api/client";

interface Props {
  initial?: Question | null;
  onSave: (q: Partial<Question> & { id?: string }) => void;
  onCancel: () => void;
}

const CATEGORIES = ["haikouritsu", "oshihiki", "tensuu", "nanikiru", "chakuji", "yomi"];

export default function QuestionEditor({ initial, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Question>>(
    initial ?? {
      category: CATEGORIES[0],
      difficulty: 1,
      status: "draft",
    }
  );

  useEffect(() => {
    setForm(
      initial ?? {
        category: CATEGORIES[0],
        difficulty: 1,
        status: "draft",
      }
    );
  }, [initial]);

  function set<K extends keyof Question>(key: K, value: Question[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div style={styles.panel}>
      <h3>{initial ? "問題編集" : "問題新規作成"}</h3>

      <label style={styles.row}>
        カテゴリ
        <select value={form.category ?? ""} onChange={(e) => set("category", e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label style={styles.row}>
        難易度(1-5)
        <input
          type="number"
          min={1}
          max={5}
          value={form.difficulty ?? 1}
          onChange={(e) => set("difficulty", Number(e.target.value))}
        />
      </label>

      <label style={styles.row}>
        タイトル
        <input value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} />
      </label>

      <label style={styles.row}>
        問題文
        <textarea
          value={form.question_text ?? ""}
          onChange={(e) => set("question_text", e.target.value)}
          rows={3}
        />
      </label>

      {(["choice_a", "choice_b", "choice_c", "choice_d"] as const).map((key, i) => (
        <label style={styles.row} key={key}>
          選択肢{["A", "B", "C", "D"][i]}
          <input value={form[key] ?? ""} onChange={(e) => set(key, e.target.value)} />
        </label>
      ))}

      <label style={styles.row}>
        正解
        <select
          value={form.correct_answer ?? ""}
          onChange={(e) => set("correct_answer", e.target.value)}
        >
          <option value="">選択してください</option>
          {["A", "B", "C", "D"].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label style={styles.row}>
        解説
        <textarea
          value={form.explanation ?? ""}
          onChange={(e) => set("explanation", e.target.value)}
          rows={2}
        />
      </label>

      <label style={styles.row}>
        ステータス
        <select value={form.status ?? "draft"} onChange={(e) => set("status", e.target.value)}>
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
      </label>

      <div style={styles.actions}>
        <button onClick={() => onSave(form)}>保存</button>
        <button onClick={onCancel}>キャンセル</button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  panel: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginTop: 12, maxWidth: 480 },
  row: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, fontSize: 13 },
  actions: { display: "flex", gap: 8, marginTop: 8 },
};
