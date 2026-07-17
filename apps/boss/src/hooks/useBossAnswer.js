import { useCallback, useEffect, useState } from "react";
import { submitBossAnswer, getBossResult } from "../api/client";
export function useBossAnswer(sessionId, questionId) {
    const [answered, setAnswered] = useState(null);
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        setAnswered(null);
        setError(null);
    }, [questionId]);
    useEffect(() => {
        if (!sessionId)
            return;
        getBossResult(sessionId).then((res) => {
            if (res.success)
                setResult(res.data);
        });
    }, [sessionId, answered]);
    const answer = useCallback(async (choice) => {
        if (!sessionId || !questionId)
            return;
        setSubmitting(true);
        const res = await submitBossAnswer(sessionId, questionId, choice);
        setSubmitting(false);
        if (!res.success) {
            if (res.error.code === "DUPLICATE_ANSWER") {
                setAnswered(choice);
                return;
            }
            if (res.error.code === "TIMEOUT") {
                setError("時間切れです。次の問題へ進んでください。");
                return;
            }
            setError(res.error.message);
            return;
        }
        setAnswered(choice);
    }, [sessionId, questionId]);
    return { answer, answered, result, submitting, error };
}
