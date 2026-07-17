import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { fetchQuestionList, createQuestion, updateQuestion, deleteQuestion, } from "../api/client";
import QuestionTable from "../components/QuestionTable";
import QuestionEditor from "../components/QuestionEditor";
export default function QuestionsPage() {
    const [questions, setQuestions] = useState([]);
    const [editing, setEditing] = useState(undefined);
    const [error, setError] = useState(null);
    async function load() {
        const res = await fetchQuestionList();
        if (res.success)
            setQuestions(res.data.questions);
        else
            setError(res.error.message);
    }
    useEffect(() => {
        load();
    }, []);
    async function handleSave(q) {
        const res = q.id ? await updateQuestion(q) : await createQuestion(q);
        if (res.success) {
            setEditing(undefined);
            load();
        }
        else {
            setError(res.error.message);
        }
    }
    async function handleDelete(id) {
        const res = await deleteQuestion(id);
        if (res.success)
            load();
        else
            setError(res.error.message);
    }
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u554F\u984C\u7BA1\u7406" }), error && _jsxs("p", { style: { color: "red" }, children: ["\u30A8\u30E9\u30FC: ", error] }), _jsx("button", { onClick: () => setEditing(null), children: "\u65B0\u898F\u554F\u984C\u4F5C\u6210" }), _jsx(QuestionTable, { questions: questions, onEdit: (q) => setEditing(q), onDelete: handleDelete }), editing !== undefined && (_jsx(QuestionEditor, { initial: editing, onSave: handleSave, onCancel: () => setEditing(undefined) }))] }));
}
