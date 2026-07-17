// docs/prd/gdd/technical/07_API_Final_Specification.md 準拠のAPIクライアント
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
export function joinSession(sessionId, nickname) {
    return apiPost("/player/join", {
        session_id: sessionId,
        nickname,
    });
}
export function getCurrentQuestion(sessionId) {
    return apiGet(`/player/question?session_id=${encodeURIComponent(sessionId)}`);
}
export function submitAnswer(sessionId, participantToken, questionId, answer) {
    return apiPost("/player/answer", {
        session_id: sessionId,
        participant_token: participantToken,
        question_id: questionId,
        answer,
    });
}
export function getSessionCurrent(sessionId) {
    return apiGet(`/session/current?session_id=${encodeURIComponent(sessionId)}`);
}
export function getRankingLive(sessionId) {
    return apiGet(`/ranking/live?session_id=${encodeURIComponent(sessionId)}`);
}
export function getRankingFinal(sessionId) {
    return apiGet(`/ranking/final?session_id=${encodeURIComponent(sessionId)}`);
}
