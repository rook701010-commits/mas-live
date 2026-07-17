import { useCallback, useState } from "react";
import { joinSession } from "../api/client";

const STORAGE_KEY = "mas_live_participant";

interface StoredParticipant {
  sessionId: string;
  participantToken: string;
  nickname: string;
}

function loadStored(): StoredParticipant | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredParticipant) : null;
  } catch {
    return null;
  }
}

function saveStored(value: StoredParticipant) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // sessionStorageが使えない環境でも参加自体は継続できるようにする
  }
}

export function useSession() {
  const [participant, setParticipant] = useState<StoredParticipant | null>(loadStored());
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = useCallback(async (sessionId: string, nickname: string) => {
    setJoining(true);
    setError(null);
    const res = await joinSession(sessionId, nickname);
    setJoining(false);

    if (!res.success) {
      setError(res.error.message);
      return false;
    }

    const value: StoredParticipant = {
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
    } catch {
      // noop
    }
    setParticipant(null);
  }, []);

  return { participant, join, joining, error, reset };
}
