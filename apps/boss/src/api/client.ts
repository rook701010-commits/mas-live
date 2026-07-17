// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のAPIクライアント
// 認証なし（DL-002: MVPはログイン機能を含まない）

const BASE_URL = "/api";

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

export interface BossResultResponse {
  score: number;
  total: number;
}

export function createSession(title: string, bossName: string) {
  return apiPost<{ session_id: string }>("/session/create", {
    title,
    boss_name: bossName,
  });
}

export function startSession(sessionId: string) {
  return apiPost<Record<string, never>>("/session/start", { session_id: sessionId });
}

export function nextQuestion(sessionId: string) {
  return apiPost<{ question_no: number }>("/session/next", { session_id: sessionId });
}

export function endSession(sessionId: string) {
  return apiPost<Record<string, never>>("/session/end", { session_id: sessionId });
}

export function getSessionCurrent(sessionId: string) {
  return apiGet<SessionCurrentResponse>(
    `/session/current?session_id=${encodeURIComponent(sessionId)}`
  );
}

export function getCurrentQuestion(sessionId: string) {
  return apiGet<QuestionResponse>(
    `/player/question?session_id=${encodeURIComponent(sessionId)}`
  );
}

export function submitBossAnswer(sessionId: string, questionId: string, answer: string) {
  return apiPost<Record<string, never>>("/boss/answer", {
    session_id: sessionId,
    question_id: questionId,
    answer,
  });
}

export function getBossResult(sessionId: string) {
  return apiGet<BossResultResponse>(`/boss/result?session_id=${encodeURIComponent(sessionId)}`);
}

export function getRankingLive(sessionId: string) {
  return apiGet<RankingLiveResponse>(`/ranking/live?session_id=${encodeURIComponent(sessionId)}`);
}

export function getRankingFinal(sessionId: string) {
  return apiGet<RankingFinalResponse>(
    `/ranking/final?session_id=${encodeURIComponent(sessionId)}`
  );
}
