// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のAPIクライアント
// 認証なし（DL-002: MVPはログイン機能を含まない）
const BASE_URL = "/api";
async function apiGet(path) {
    const res = await fetch(`${BASE_URL}${path}`);
    return res.json();
}
async function apiPost(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    return res.json();
}
export function createSession(title, bossName) {
    return apiPost("/session/create", {
        title,
        boss_name: bossName,
    });
}
export function startSession(sessionId) {
    return apiPost("/session/start", { session_id: sessionId });
}
export function nextQuestion(sessionId) {
    return apiPost("/session/next", { session_id: sessionId });
}
export function endSession(sessionId) {
    return apiPost("/session/end", { session_id: sessionId });
}
export function getSessionCurrent(sessionId) {
    return apiGet(`/session/current?session_id=${encodeURIComponent(sessionId)}`);
}
export function getCurrentQuestion(sessionId) {
    return apiGet(`/player/question?session_id=${encodeURIComponent(sessionId)}`);
}
export function submitBossAnswer(sessionId, questionId, answer) {
    return apiPost("/boss/answer", {
        session_id: sessionId,
        question_id: questionId,
        answer,
    });
}
export function getBossResult(sessionId) {
    return apiGet(`/boss/result?session_id=${encodeURIComponent(sessionId)}`);
}
export function getRankingLive(sessionId) {
    return apiGet(`/ranking/live?session_id=${encodeURIComponent(sessionId)}`);
}
export function getRankingFinal(sessionId) {
    return apiGet(`/ranking/final?session_id=${encodeURIComponent(sessionId)}`);
}
