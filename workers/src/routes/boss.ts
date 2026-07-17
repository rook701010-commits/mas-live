import type { Env } from "../types";
import { failure, success } from "../utils/response";
import { computeRemainingSeconds } from "./session";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Boss API
// docs/prd/gdd/technical/06_Database_Final_Schema.md - boss_answers
// POST /boss/answer, GET /boss/result
// docs/prd/gdd/technical/prompts/decision-log/DL-012_Timeout_Enforcement.md - TIMEOUT判定

export async function handleBossAnswer(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ session_id?: string; question_id?: string; answer?: string }>();
  if (!body.session_id || !body.question_id || !body.answer) {
    return failure("INVALID_REQUEST", "session_id, question_id, answer are required");
  }

  const session = await env.DB.prepare(
    `SELECT status, current_question_no FROM sessions WHERE id = ?`
  )
    .bind(body.session_id)
    .first<{ status: string; current_question_no: number }>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);
  if (session.status === "finished") {
    return failure("SESSION_FINISHED", "session already finished", 409);
  }

  const remaining = await computeRemainingSeconds(env, body.session_id, session.current_question_no);
  if (remaining <= 0) {
    return failure("TIMEOUT", "time is up for this question", 409);
  }

  const existing = await env.DB.prepare(
    `SELECT id FROM boss_answers WHERE session_id = ? AND question_id = ?`
  )
    .bind(body.session_id, body.question_id)
    .first<{ id: string }>();
  if (existing) return failure("DUPLICATE_ANSWER", "boss already answered this question", 409);

  const question = await env.DB.prepare(`SELECT correct_answer FROM questions WHERE id = ?`)
    .bind(body.question_id)
    .first<{ correct_answer: string }>();
  if (!question) return failure("INVALID_ANSWER", "question not found", 404);

  const isCorrect = question.correct_answer === body.answer ? 1 : 0;

  await env.DB.prepare(
    `INSERT INTO boss_answers (id, session_id, question_id, answer, is_correct) VALUES (?, ?, ?, ?, ?)`
  )
    .bind(crypto.randomUUID(), body.session_id, body.question_id, body.answer, isCorrect)
    .run();

  return success({});
}

export async function handleBossResult(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const row = await env.DB.prepare(
    `SELECT COUNT(*) as total, SUM(is_correct) as score FROM boss_answers WHERE session_id = ?`
  )
    .bind(sessionId)
    .first<{ total: number; score: number | null }>();

  return success({ score: row?.score ?? 0, total: row?.total ?? 0 });
}
