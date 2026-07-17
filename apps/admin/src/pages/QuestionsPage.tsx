import { useEffect, useState } from "react";
import {
  fetchQuestionList,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  type Question,
} from "../api/client";
import QuestionTable from "../components/QuestionTable";
import QuestionEditor from "../components/QuestionEditor";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editing, setEditing] = useState<Question | null | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const res = await fetchQuestionList();
    if (res.success) setQuestions(res.data.questions);
    else setError(res.error.message);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(q: Partial<Question> & { id?: string }) {
    const res = q.id ? await updateQuestion(q as Partial<Question> & { id: string }) : await createQuestion(q);
    if (res.success) {
      setEditing(undefined);
      load();
    } else {
      setError(res.error.message);
    }
  }

  async function handleDelete(id: string) {
    const res = await deleteQuestion(id);
    if (res.success) load();
    else setError(res.error.message);
  }

  return (
    <div>
      <h2>問題管理</h2>
      {error && <p style={{ color: "red" }}>エラー: {error}</p>}
      <button onClick={() => setEditing(null)}>新規問題作成</button>
      <QuestionTable
        questions={questions}
        onEdit={(q) => setEditing(q)}
        onDelete={handleDelete}
      />
      {editing !== undefined && (
        <QuestionEditor
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditing(undefined)}
        />
      )}
    </div>
  );
}
