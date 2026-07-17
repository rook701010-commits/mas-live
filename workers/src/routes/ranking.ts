import type { Env } from "../types";
import { failure, success } from "../utils/response";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Ranking / Overlay API
// docs/prd/gdd/22_Game_Balance_Design.md - MVPは全員平均を採用
// docs/prd/gdd/technical/decision-log/DL-007_Tie_Break_Rule.md - 同点はBoss防衛成功
// GET /ranking/live, GET /ranking/final, GET /overlay/state

interface ParticipantScore {
  nickname: string;
  score: number;
}

async function getParticipantScores(env: Env, sessionId: string): Promise<ParticipantScore[]> {
  const result = await env.DB.prepare(
    `SELECT p.nickname as nickname, COALESCE(SUM(a.is_correct), 0) as score
     FROM participants p
     LEFT JOIN answers a ON a.participant_id = p.id AND a.session_id = p.session_id
     WHERE p.session_id = ?
     GROUP BY p.id`
  )
    .bind(sessionId)
    .all<ParticipantScore>();

  return result.results ?? [];
}

async function getBossScore(env: Env, sessionId: string): Promise<{ score: number; total: number }> {
  const row = await env.DB.prepare(
    `SELECT COUNT(*) as total, SUM(is_correct) as score FROM boss_answers WHERE session_id = ?`
  )
    .bind(sessionId)
    .first<{ total: number; score: number | null }>();
  return { score: row?.score ?? 0, total: row?.total ?? 0 };
}

export async function handleRankingLive(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const scores = await getParticipantScores(env, sessionId);
  const participants = scores.length;
  const average =
    participants === 0 ? 0 : scores.reduce((sum, s) => sum + s.score, 0) / participants;

  const top = [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((s) => ({ name: s.nickname, score: s.score }));

  return success({
    participants,
    average: Math.round(average * 10) / 10,
    top,
  });
}

export async function handleRankingFinal(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const boss = await getBossScore(env, sessionId);
  const scores = await getParticipantScores(env, sessionId);
  const raidAverage =
    scores.length === 0 ? 0 : scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

  // DL-007: 同点はBoss防衛成功（Boss勝利）
  const winner = raidAverage > boss.score ? "raid" : "boss";

  return success({
    boss_score: boss.score,
    raid_average: Math.round(raidAverage * 10) / 10,
    winner,
  });
}

// docs/prd/gdd/08_Game_Event_System.md 準拠の固定イベント割り当て
function eventForQuestionNo(questionNo: number): string {
  if (questionNo === 5) return "mini_boss";
  if (questionNo === 10) return "bonus_round";
  if (questionNo === 15) return "mid_boss";
  if (questionNo === 20) return "final_boss";
  return "normal";
}

export async function handleOverlayState(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(
    `SELECT boss_name, current_question_no FROM sessions WHERE id = ?`
  )
    .bind(sessionId)
    .first<{ boss_name: string; current_question_no: number }>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);

  const boss = await getBossScore(env, sessionId);
  const scores = await getParticipantScores(env, sessionId);
  const average =
    scores.length === 0 ? 0 : scores.reduce((sum, s) => sum + s.score, 0) / scores.length;

  return success({
    boss: session.boss_name,
    question: session.current_question_no,
    score: boss.score,
    average: Math.round(average * 10) / 10,
    event: eventForQuestionNo(session.current_question_no),
  });
}
