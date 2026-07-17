// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のAPIクライアント
// docs/prd/gdd/technical/prompts/decision-log/DL-013_Frontend_API_Base_URL.md
// 開発時は/apiへのvite proxyを使用。本番はVITE_API_BASE_URLで実APIを指定する。

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

interface ApiSuccess<T> {
  success: true;
  data: T;
}

interface ApiFailure {
  success: false;
  error: { code: string; message: string };
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

async function apiGet<T>(path: string): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`);
  return res.json();
}

async function apiPost<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export interface QuestionResponse {
  question_no: number;
  question_id: string;
  title: string;
  choices: string[];
}

export interface SessionCurrentResponse {
  status: "created" | "ready" | "playing" | "finished" | "cancelled";
  question_no: number;
  remaining_seconds: number;
}

export interface RankingLiveResponse {
  participants: number;
  average: number;
  top: { name: string; score: number }[];
}

export interface RankingFinalResponse {
  boss_score: number;
  raid_average: number;
  winner: "boss" | "raid";
}

export function joinSession(sessionId: string, nickname: string) {
  return apiPost<{ participant_token: string }>("/player/join", {
    session_id: sessionId,
    nickname,
  });
}

export function getCurrentQuestion(sessionId: string) {
  return apiGet<QuestionResponse>(
    `/player/question?session_id=${encodeURIComponent(sessionId)}`
  );
}

export function submitAnswer(
  sessionId: string,
  participantToken: string,
  questionId: string,
  answer: string
) {
  return apiPost<Record<string, never>>("/player/answer", {
    session_id: sessionId,
    participant_token: participantToken,
    question_id: questionId,
    answer,
  });
}

export function getSessionCurrent(sessionId: string) {
  return apiGet<SessionCurrentResponse>(
    `/session/current?session_id=${encodeURIComponent(sessionId)}`
  );
}

export function getRankingLive(sessionId: string) {
  return apiGet<RankingLiveResponse>(
    `/ranking/live?session_id=${encodeURIComponent(sessionId)}`
  );
}

export function getRankingFinal(sessionId: string) {
  return apiGet<RankingFinalResponse>(
    `/ranking/final?session_id=${encodeURIComponent(sessionId)}`
  );
}
