import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useGameControl } from "../hooks/useGameControl";
import { useBossAnswer } from "../hooks/useBossAnswer";
import { getRankingFinal } from "../api/client";
import { useState } from "react";
import SessionControl from "../components/SessionControl";
import QuestionDisplay from "../components/QuestionDisplay";
import AnswerPanel from "../components/AnswerPanel";
import ScorePanel from "../components/ScorePanel";
import BattleResult from "../components/BattleResult";
const KEY_TO_CHOICE = { a: "A", b: "B", c: "C", d: "D" };
export default function DashboardPage() {
    const game = useGameControl();
    const bossAnswer = useBossAnswer(game.sessionId, game.question?.question_id ?? null);
    const [finalResult, setFinalResult] = useState(null);
    useEffect(() => {
        if (game.sessionState?.status === "finished" && game.sessionId) {
            getRankingFinal(game.sessionId).then((res) => {
                if (res.success)
                    setFinalResult(res.data);
            });
        }
    }, [game.sessionState?.status, game.sessionId]);
    // docs/prd/gdd/technical/prompts/05_Claude_Phase5_Boss_Client.md キーボード操作
    useEffect(() => {
        const handler = (e) => {
            const key = e.key.toLowerCase();
            if (!game.sessionId)
                return;
            if (key in KEY_TO_CHOICE && game.question) {
                bossAnswer.answer(KEY_TO_CHOICE[key]);
            }
            else if (key === " ") {
                e.preventDefault();
                game.goNext();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [game, bossAnswer]);
    if (!game.sessionId) {
        return (_jsx(SessionControl, { busy: game.busy, error: game.error, onStart: game.start, onResume: game.resume }));
    }
    if (finalResult) {
        return (_jsx(BattleResult, { result: finalResult, onReset: () => {
                setFinalResult(null);
                game.reset();
            } }));
    }
    const remainingSeconds = game.sessionState?.remaining_seconds ?? 0;
    const isTimeUp = remainingSeconds <= 0;
    return (_jsxs("div", { style: { padding: 16, maxWidth: 560, margin: "0 auto" }, children: [_jsxs("p", { style: { fontSize: 12, color: "#888" }, children: ["Session ID: ", game.sessionId] }), game.question && (_jsxs(_Fragment, { children: [_jsx(QuestionDisplay, { questionNo: game.question.question_no, title: game.question.title, remainingSeconds: remainingSeconds, participants: game.ranking?.participants ?? 0 }), _jsx(AnswerPanel, { choices: game.question.choices, selected: bossAnswer.answered, disabled: !!bossAnswer.answered || bossAnswer.submitting || isTimeUp, onSelect: bossAnswer.answer }), !bossAnswer.answered && isTimeUp && (_jsx("p", { style: { color: "#d32f2f", marginTop: 8 }, children: "\u6642\u9593\u5207\u308C\u3067\u3059\u3002\u6B21\u306E\u554F\u984C\u3078\u9032\u3093\u3067\u304F\u3060\u3055\u3044\u3002" }))] })), _jsxs("div", { style: { display: "flex", gap: 10, marginTop: 16 }, children: [_jsx("button", { style: styles.nextButton, onClick: game.goNext, disabled: game.busy, children: "\u6B21\u306E\u554F\u984C\u3078\uFF08Space\uFF09" }), _jsx("button", { style: styles.endButton, onClick: game.finish, disabled: game.busy, children: "\u914D\u4FE1\u7D42\u4E86" }), _jsx("button", { style: styles.resetButton, onClick: () => {
                            if (window.confirm("現在のセッションを離脱して開始画面に戻りますか？（配信自体は終了しません）")) {
                                game.reset();
                            }
                        }, children: "\u30EA\u30BB\u30C3\u30C8" })] }), game.ranking && bossAnswer.result && (_jsx(ScorePanel, { bossScore: bossAnswer.result.score, bossTotal: bossAnswer.result.total, raidAverage: game.ranking.average, ranking: game.ranking.top })), game.error && _jsx("p", { style: { color: "#d32f2f" }, children: game.error })] }));
}
const styles = {
    nextButton: {
        flex: 1,
        padding: "14px 0",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        background: "#1976d2",
        border: "none",
        borderRadius: 8,
    },
    endButton: {
        padding: "14px 20px",
        fontSize: 14,
        color: "#333",
        background: "#e0e0e0",
        border: "none",
        borderRadius: 8,
    },
    resetButton: {
        padding: "14px 16px",
        fontSize: 14,
        color: "#d32f2f",
        background: "#fff",
        border: "1px solid #d32f2f",
        borderRadius: 8,
    },
};
