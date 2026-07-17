import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function DashboardCard({ label, value }) {
    return (_jsxs("div", { style: styles.card, children: [_jsx("div", { style: styles.label, children: label }), _jsx("div", { style: styles.value, children: value })] }));
}
const styles = {
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
