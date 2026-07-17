import { useEffect, useRef, useState } from "react";
import { getCurrentQuestion, getSessionCurrent, } from "../api/client";
// docs/prd/gdd/technical/prompts/decision-log/DL-005_Communication_Architecture.md
// MVPはPolling方式。通常状態は5秒間隔を採用。
const POLL_INTERVAL_MS = 5000;
export function useQuestion(sessionId) {
    const [question, setQuestion] = useState(null);
    const [sessionState, setSessionState] = useState(null);
    const [error, setError] = useState(null);
    const lastQuestionNo = useRef(null);
    useEffect(() => {
        if (!sessionId)
            return;
        let cancelled = false;
        const poll = async () => {
            const [sessionRes, questionRes] = await Promise.all([
                getSessionCurrent(sessionId),
                getCurrentQuestion(sessionId),
            ]);
            if (cancelled)
                return;
            if (sessionRes.success) {
                setSessionState(sessionRes.data);
            }
            if (questionRes.success) {
                if (questionRes.data.question_no !== lastQuestionNo.current) {
                    lastQuestionNo.current = questionRes.data.question_no;
                }
                setQuestion(questionRes.data);
                setError(null);
            }
            else {
                setError(questionRes.error.message);
            }
        };
        poll();
        const timer = setInterval(poll, POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, [sessionId]);
    return { question, sessionState, error };
}
