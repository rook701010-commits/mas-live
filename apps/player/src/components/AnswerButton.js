import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LABELS = ["A", "B", "C", "D"];
export default function AnswerButton({ choices, disabled, selected, onSelect }) {
    return (_jsx("div", { style: styles.grid, children: choices.map((choice, i) => {
            const label = LABELS[i] ?? String(i + 1);
            const isSelected = selected === label;
            return (_jsxs("button", { style: {
                    ...styles.button,
                    ...(isSelected ? styles.selected : {}),
                }, disabled: disabled, onClick: () => onSelect(label), children: [_jsx("span", { style: styles.label, children: label }), choice] }, label));
        }) }));
}
const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
    },
    button: {
        minHeight: 56,
        fontSize: 16,
        borderRadius: 10,
        border: "2px solid #ccc",
        background: "#fff",
        textAlign: "left",
        padding: "10px 12px",
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    selected: {
        borderColor: "#d32f2f",
        background: "#ffebee",
    },
    label: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "#333",
        color: "#fff",
        fontSize: 13,
        flexShrink: 0,
    },
};
