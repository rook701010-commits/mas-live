import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useQuestion } from "../hooks/useQuestion";
import { useAnswer } from "../hooks/useAnswer";
import QuestionCard from "../components/QuestionCard";
import AnswerButton from "../components/AnswerButton";
// docs/prd/gdd/02_Game_Rules.md: MVPは20問固定
const TOTAL_QUESTIONS = 20;
export default function GamePage({ sessionId, participantToken, onFinished }) {
    const { question, sessionState, error } = useQuestion(sessionId);
    const { answer, answeredQuestionId, submitting, error: answerError, resetForNewQuestion } = useAnswer(sessionId, participantToken);
    useEffect(() => {
        if (sessionState?.status === "finished") {
            onFinished();
        }
    }, [sessionState?.status, onFinished]);
    useEffect(() => {
        resetForNewQuestion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question?.question_id]);
    if (error) {
        return _jsxs("p", { style: { padding: 20 }, children: ["\u554F\u984C\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F: ", error] });
    }
    if (!question) {
        return _jsx("p", { style: { padding: 20 }, children: "\u554F\u984C\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u3044\u307E\u3059..." });
    }
    const hasAnswered = answeredQuestionId === question.question_id;
    const remainingSeconds = sessionState?.remaining_seconds ?? 0;
    const isTimeUp = remainingSeconds <= 0;
    return (_jsxs("div", { style: { padding: 16, maxWidth: 480, margin: "0 auto" }, children: [_jsx(QuestionCard, { questionNo: question.question_no, totalQuestions: TOTAL_QUESTIONS, title: question.title, remainingSeconds: remainingSeconds }), _jsx(AnswerButton, { choices: question.choices, disabled: hasAnswered || submitting || isTimeUp, selected: hasAnswered ? "回答済み" : null, onSelect: (choice) => answer(question.question_id, choice) }), hasAnswered && _jsx("p", { style: { textAlign: "center", marginTop: 12 }, children: "\u56DE\u7B54\u3092\u9001\u4FE1\u3057\u307E\u3057\u305F\u3002\u6B21\u306E\u554F\u984C\u3092\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002" }), !hasAnswered && isTimeUp && (_jsx("p", { style: { textAlign: "center", marginTop: 12, color: "#d32f2f" }, children: "\u6642\u9593\u5207\u308C\u3067\u3059\u3002\u6B21\u306E\u554F\u984C\u3092\u304A\u5F85\u3061\u304F\u3060\u3055\u3044\u3002" })), answerError && _jsx("p", { style: { color: "#d32f2f", textAlign: "center" }, children: answerError })] }));
}
