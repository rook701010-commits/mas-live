import type { Question } from "../api/client";

interface Props {
  questions: Question[];
  onEdit: (q: Question) => void;
  onDelete: (id: string) => void;
}

export default function QuestionTable({ questions, onEdit, onDelete }: Props) {
  if (questions.length === 0) {
    return <p>問題が登録されていません。</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>カテゴリ</th>
          <th style={styles.th}>難易度</th>
          <th style={styles.th}>タイトル</th>
          <th style={styles.th}>ステータス</th>
          <th style={styles.th}>操作</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.id}>
            <td style={styles.td}>{q.category}</td>
            <td style={styles.td}>{q.difficulty}</td>
            <td style={styles.td}>{q.title}</td>
            <td style={styles.td}>{q.status}</td>
            <td style={styles.td}>
              <button onClick={() => onEdit(q)}>編集</button>{" "}
              <button onClick={() => onDelete(q.id)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const styles: Record<string, React.CSSProperties> = {
  table: { width: "100%", borderCollapse: "collapse", marginTop: 12 },
  th: { textAlign: "left", borderBottom: "2px solid #ccc", padding: "6px 8px", fontSize: 13 },
  td: { borderBottom: "1px solid #eee", padding: "6px 8px", fontSize: 14 },
};
