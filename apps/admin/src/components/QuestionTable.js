import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function QuestionTable({ questions, onEdit, onDelete }) {
    if (questions.length === 0) {
        return _jsx("p", { children: "\u554F\u984C\u304C\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002" });
    }
    return (_jsxs("table", { style: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: styles.th, children: "\u30AB\u30C6\u30B4\u30EA" }), _jsx("th", { style: styles.th, children: "\u96E3\u6613\u5EA6" }), _jsx("th", { style: styles.th, children: "\u30BF\u30A4\u30C8\u30EB" }), _jsx("th", { style: styles.th, children: "\u30B9\u30C6\u30FC\u30BF\u30B9" }), _jsx("th", { style: styles.th, children: "\u64CD\u4F5C" })] }) }), _jsx("tbody", { children: questions.map((q) => (_jsxs("tr", { children: [_jsx("td", { style: styles.td, children: q.category }), _jsx("td", { style: styles.td, children: q.difficulty }), _jsx("td", { style: styles.td, children: q.title }), _jsx("td", { style: styles.td, children: q.status }), _jsxs("td", { style: styles.td, children: [_jsx("button", { onClick: () => onEdit(q), children: "\u7DE8\u96C6" }), " ", _jsx("button", { onClick: () => onDelete(q.id), children: "\u524A\u9664" })] })] }, q.id))) })] }));
}
const styles = {
    table: { width: "100%", borderCollapse: "collapse", marginTop: 12 },
    th: { textAlign: "left", borderBottom: "2px solid #ccc", padding: "6px 8px", fontSize: 13 },
    td: { borderBottom: "1px solid #eee", padding: "6px 8px", fontSize: 14 },
};
