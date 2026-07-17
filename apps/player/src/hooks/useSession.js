import { useCallback, useState } from "react";
import { joinSession } from "../api/client";
const STORAGE_KEY = "mas_live_participant";
function loadStored() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function saveStored(value) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
    catch {
        // sessionStorageが使えない環境でも参加自体は継続できるようにする
    }
}
export function useSession() {
    const [participant, setParticipant] = useState(loadStored());
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState(null);
    const join = useCallback(async (sessionId, nickname) => {
        setJoining(true);
        setError(null);
        const res = await joinSession(sessionId, nickname);
        setJoining(false);
        if (!res.success) {
            setError(res.error.message);
            return false;
        }
        const value = {
            sessionId,
            participantToken: res.data.participant_token,
            nickname,
        };
        saveStored(value);
        setParticipant(value);
        return true;
    }, []);
    const reset = useCallback(() => {
        try {
            sessionStorage.removeItem(STORAGE_KEY);
        }
        catch {
            // noop
        }
        setParticipant(null);
    }, []);
    return { participant, join, joining, error, reset };
}
