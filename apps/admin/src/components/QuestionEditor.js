import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const CATEGORIES = ["haikouritsu", "oshihiki", "tensuu", "nanikiru", "chakuji", "yomi"];
export default function QuestionEditor({ initial, onSave, onCancel }) {
    const [form, setForm] = useState(initial ?? {
        category: CATEGORIES[0],
        difficulty: 1,
        status: "draft",
    });
    useEffect(() => {
        setForm(initial ?? {
            category: CATEGORIES[0],
            difficulty: 1,
            status: "draft",
        });
    }, [initial]);
    function set(key, value) {
        setForm((f) => ({ ...f, [key]: value }));
    }
    return (_jsxs("div", { style: styles.panel, children: [_jsx("h3", { children: initial ? "問題編集" : "問題新規作成" }), _jsxs("label", { style: styles.row, children: ["\u30AB\u30C6\u30B4\u30EA", _jsx("select", { value: form.category ?? "", onChange: (e) => set("category", e.target.value), children: CATEGORIES.map((c) => (_jsx("option", { value: c, children: c }, c))) })] }), _jsxs("label", { style: styles.row, children: ["\u96E3\u6613\u5EA6(1-5)", _jsx("input", { type: "number", min: 1, max: 5, value: form.difficulty ?? 1, onChange: (e) => set("difficulty", Number(e.target.value)) })] }), _jsxs("label", { style: styles.row, children: ["\u30BF\u30A4\u30C8\u30EB", _jsx("input", { value: form.title ?? "", onChange: (e) => set("title", e.target.value) })] }), _jsxs("label", { style: styles.row, children: ["\u554F\u984C\u6587", _jsx("textarea", { value: form.question_text ?? "", onChange: (e) => set("question_text", e.target.value), rows: 3 })] }), ["choice_a", "choice_b", "choice_c", "choice_d"].map((key, i) => (_jsxs("label", { style: styles.row, children: ["\u9078\u629E\u80A2", ["A", "B", "C", "D"][i], _jsx("input", { value: form[key] ?? "", onChange: (e) => set(key, e.target.value) })] }, key))), _jsxs("label", { style: styles.row, children: ["\u6B63\u89E3", _jsxs("select", { value: form.correct_answer ?? "", onChange: (e) => set("correct_answer", e.target.value), children: [_jsx("option", { value: "", children: "\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044" }), ["A", "B", "C", "D"].map((c) => (_jsx("option", { value: c, children: c }, c)))] })] }), _jsxs("label", { style: styles.row, children: ["\u89E3\u8AAC", _jsx("textarea", { value: form.explanation ?? "", onChange: (e) => set("explanation", e.target.value), rows: 2 })] }), _jsxs("label", { style: styles.row, children: ["\u30B9\u30C6\u30FC\u30BF\u30B9", _jsxs("select", { value: form.status ?? "draft", onChange: (e) => set("status", e.target.value), children: [_jsx("option", { value: "draft", children: "draft" }), _jsx("option", { value: "published", children: "published" })] })] }), _jsxs("div", { style: styles.actions, children: [_jsx("button", { onClick: () => onSave(form), children: "\u4FDD\u5B58" }), _jsx("button", { onClick: onCancel, children: "\u30AD\u30E3\u30F3\u30BB\u30EB" })] })] }));
}
const styles = {
    panel: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginTop: 12, maxWidth: 480 },
    row: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 10, fontSize: 13 },
    actions: { display: "flex", gap: 8, marginTop: 8 },
};
