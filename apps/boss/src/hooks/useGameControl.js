import { useCallback, useEffect, useState } from "react";
import { createSession, startSession, nextQuestion, endSession, getSessionCurrent, getCurrentQuestion, getRankingLive, } from "../api/client";
const STORAGE_KEY = "mas_live_boss_session";
const POLL_INTERVAL_MS = 5000;
export function useGameControl() {
    const [sessionId, setSessionId] = useState(() => {
        try {
            return sessionStorage.getItem(STORAGE_KEY);
        }
        catch {
            return null;
        }
    });
    const [sessionState, setSessionState] = useState(null);
    const [question, setQuestion] = useState(null);
    const [ranking, setRanking] = useState(null);
    const [error, setError] = useState(null);
    const [busy, setBusy] = useState(false);
    useEffect(() => {
        if (!sessionId)
            return;
        let cancelled = false;
        const poll = async () => {
            const [sessionRes, questionRes, rankingRes] = await Promise.all([
                getSessionCurrent(sessionId),
                getCurrentQuestion(sessionId),
                getRankingLive(sessionId),
            ]);
            if (cancelled)
                return;
            if (sessionRes.success)
                setSessionState(sessionRes.data);
            if (questionRes.success)
                setQuestion(questionRes.data);
            if (rankingRes.success)
                setRanking(rankingRes.data);
        };
        poll();
        const timer = setInterval(poll, POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, [sessionId]);
    const start = useCallback(async (title, bossName) => {
        setBusy(true);
        setError(null);
        const createRes = await createSession(title, bossName);
        if (!createRes.success) {
            setBusy(false);
            setError(createRes.error.message);
            return;
        }
        const newSessionId = createRes.data.session_id;
        const startRes = await startSession(newSessionId);
        setBusy(false);
        if (!startRes.success) {
            setError(startRes.error.message);
            return;
        }
        try {
            sessionStorage.setItem(STORAGE_KEY, newSessionId);
        }
        catch {
            // noop
        }
        setSessionId(newSessionId);
    }, []);
    const resume = useCallback((existingSessionId) => {
        try {
            sessionStorage.setItem(STORAGE_KEY, existingSessionId);
        }
        catch {
            // noop
        }
        setSessionId(existingSessionId);
    }, []);
    const goNext = useCallback(async () => {
        if (!sessionId)
            return;
        setBusy(true);
        const res = await nextQuestion(sessionId);
        setBusy(false);
        if (!res.success)
            setError(res.error.message);
    }, [sessionId]);
    const finish = useCallback(async () => {
        if (!sessionId)
            return;
        setBusy(true);
        const res = await endSession(sessionId);
        setBusy(false);
        if (!res.success)
            setError(res.error.message);
    }, [sessionId]);
    const reset = useCallback(() => {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        }
        catch {
            // noop
        }
        setSessionId(null);
        setSessionState(null);
        setQuestion(null);
        setRanking(null);
    }, []);
    return {
        sessionId,
        sessionState,
        question,
        ranking,
        error,
        busy,
        start,
        resume,
        goNext,
        finish,
        reset,
    };
}
