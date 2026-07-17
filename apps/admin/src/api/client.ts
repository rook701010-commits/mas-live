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
  return (await res.json()) as ApiResult<T>;
}

async function apiPost<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json()) as ApiResult<T>;
}

async function apiPut<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return (await res.json()) as ApiResult<T>;
}

async function apiDelete<T>(path: string): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_URL}${path}`, { method: "DELETE" });
  return (await res.json()) as ApiResult<T>;
}

export interface Question {
  id: string;
  category: string;
  difficulty: number;
  title: string;
  question_text?: string;
  image_url?: string | null;
  choice_a?: string;
  choice_b?: string;
  choice_c?: string;
  choice_d?: string;
  correct_answer?: string;
  explanation?: string | null;
  status: string;
}

export interface DashboardStats {
  total_questions: number;
  published_questions: number;
  total_sessions: number;
  total_participants: number;
  average_correct_rate: number;
}

export function fetchDashboard() {
  return apiGet<DashboardStats>("/admin/dashboard");
}

export function fetchQuestionList() {
  return apiGet<{ questions: Question[] }>("/admin/question/list");
}

export function createQuestion(body: Partial<Question>) {
  return apiPost<{ id: string }>("/admin/question/create", body);
}

export function updateQuestion(body: Partial<Question> & { id: string }) {
  return apiPut<{}>("/admin/question/update", body);
}

export function deleteQuestion(id: string) {
  return apiDelete<{}>(`/admin/question/delete?id=${encodeURIComponent(id)}`);
}

export function createSession(body: { title: string; boss_name: string; question_count: number }) {
  return apiPost<{ session_id: string }>("/session/create", body);
}

export function startSession(sessionId: string) {
  return apiPost<{}>("/session/start", { session_id: sessionId });
}
