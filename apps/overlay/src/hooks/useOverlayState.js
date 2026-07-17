import { useEffect, useState } from "react";
import { getOverlayState, getSessionCurrent, getRankingFinal, getRankingLive, } from "../api/client";
// docs/prd/gdd/technical/prompts/06_Claude_Phase6_OBS_Overlay.md Step4
// OBS表示は視聴者体験を優先し1秒間隔でPollingする。
const POLL_INTERVAL_MS = 1000;
export function useOverlayState(sessionId) {
    const [state, setState] = useState(null);
    const [ranking, setRanking] = useState(null);
    const [finished, setFinished] = useState(false);
    const [finalResult, setFinalResult] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!sessionId)
            return;
        let cancelled = false;
        const poll = async () => {
            const [stateRes, sessionRes, rankingRes] = await Promise.all([
                getOverlayState(sessionId),
                getSessionCurrent(sessionId),
                getRankingLive(sessionId),
            ]);
            if (cancelled)
                return;
            if (stateRes.success) {
                setState(stateRes.data);
                setError(null);
            }
            else {
                setError(stateRes.error.message);
            }
            if (rankingRes.success)
                setRanking(rankingRes.data);
            if (sessionRes.success && sessionRes.data.status === "finished") {
                setFinished(true);
                const finalRes = await getRankingFinal(sessionId);
                if (!cancelled && finalRes.success)
                    setFinalResult(finalRes.data);
            }
        };
        poll();
        const timer = setInterval(poll, POLL_INTERVAL_MS);
        return () => {
            cancelled = true;
            clearInterval(timer);
        };
    }, [sessionId]);
    return { state, ranking, finished, finalResult, error };
}
