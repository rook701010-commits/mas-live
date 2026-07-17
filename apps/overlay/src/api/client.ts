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

export interface OverlayStateResponse {
  boss: string;
  question: number;
  score: number;
  average: number;
  event: "normal" | "mini_boss" | "bonus_round" | "mid_boss" | "final_boss";
  remaining_seconds: number;
  participants: number;
}

export async function getOverlayState(sessionId: string): Promise<ApiResult<OverlayStateResponse>> {
  const res = await fetch(`${BASE_URL}/overlay/state?session_id=${encodeURIComponent(sessionId)}`);
  return res.json();
}

export interface SessionCurrentResponse {
  status: "created" | "ready" | "playing" | "finished" | "cancelled";
  question_no: number;
  remaining_seconds: number;
}

export async function getSessionCurrent(
  sessionId: string
): Promise<ApiResult<SessionCurrentResponse>> {
  const res = await fetch(`${BASE_URL}/session/current?session_id=${encodeURIComponent(sessionId)}`);
  return res.json();
}

export interface RankingFinalResponse {
  boss_score: number;
  raid_average: number;
  winner: "boss" | "raid";
}

export async function getRankingFinal(
  sessionId: string
): Promise<ApiResult<RankingFinalResponse>> {
  const res = await fetch(`${BASE_URL}/ranking/final?session_id=${encodeURIComponent(sessionId)}`);
  return res.json();
}

export interface RankingLiveResponse {
  participants: number;
  average: number;
  top: { name: string; score: number }[];
}

export async function getRankingLive(sessionId: string): Promise<ApiResult<RankingLiveResponse>> {
  const res = await fetch(`${BASE_URL}/ranking/live?session_id=${encodeURIComponent(sessionId)}`);
  return res.json();
}
