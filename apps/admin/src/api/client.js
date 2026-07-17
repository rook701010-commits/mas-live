// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のAPIクライアント
// 認証なし（DL-002: MVPはログイン機能を含まない）
const BASE_URL = "/api";
async function apiGet(path) {
    const res = await fetch(`${BASE_URL}${path}`);
    return (await res.json());
}
async function apiPost(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return (await res.json());
}
async function apiPut(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return (await res.json());
}
async function apiDelete(path) {
    const res = await fetch(`${BASE_URL}${path}`, { method: "DELETE" });
    return (await res.json());
}
export function fetchDashboard() {
    return apiGet("/admin/dashboard");
}
export function fetchQuestionList() {
    return apiGet("/admin/question/list");
}
export function createQuestion(body) {
    return apiPost("/admin/question/create", body);
}
export function updateQuestion(body) {
    return apiPut("/admin/question/update", body);
}
export function deleteQuestion(id) {
    return apiDelete(`/admin/question/delete?id=${encodeURIComponent(id)}`);
}
export function createSession(body) {
    return apiPost("/session/create", body);
}
export function startSession(sessionId) {
    return apiPost("/session/start", { session_id: sessionId });
}
