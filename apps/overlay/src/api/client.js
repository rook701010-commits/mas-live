const BASE_URL = "/api";
export async function getOverlayState(sessionId) {
    const res = await fetch(`${BASE_URL}/overlay/state?session_id=${encodeURIComponent(sessionId)}`);
    return res.json();
}
export async function getSessionCurrent(sessionId) {
    const res = await fetch(`${BASE_URL}/session/current?session_id=${encodeURIComponent(sessionId)}`);
    return res.json();
}
export async function getRankingFinal(sessionId) {
    const res = await fetch(`${BASE_URL}/ranking/final?session_id=${encodeURIComponent(sessionId)}`);
    return res.json();
}
export async function getRankingLive(sessionId) {
    const res = await fetch(`${BASE_URL}/ranking/live?session_id=${encodeURIComponent(sessionId)}`);
    return res.json();
}
