import type { Env } from "../types";
import { failure, success } from "../utils/response";
import { logEvent } from "../utils/log";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Session API
// docs/prd/gdd/technical/06_Database_Final_Schema.md - sessions / session_questions
// POST /session/create, POST /session/start, GET /session/current, POST /session/end

const QUESTION_DURATION_SECONDS = 20;

interface SessionRow {
  id: string;
  title: string;
  boss_name: string;
  status: string;
  current_question_no: number;
  total_questions: number;
  started_at: string | null;
  ended_at: string | null;
}

export async function handleSessionCreate(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ title?: string; boss_name?: string; question_count?: number }>();

  if (!body.title || !body.boss_name) {
    return failure("INVALID_REQUEST", "title and boss_name are required");
  }

  const id = crypto.randomUUID();
  const totalQuestions = body.question_count ?? 20;

  await env.DB.prepare(
    `INSERT INTO sessions (id, title, boss_name, status, current_question_no, total_questions)
     VALUES (?, ?, ?, 'created', 0, ?)`
  )
    .bind(id, body.title, body.boss_name, totalQuestions)
    .run();

  return success({ session_id: id });
}

export async function handleSessionStart(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ session_id?: string }>();
  if (!body.session_id) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`)
    .bind(body.session_id)
    .first<SessionRow>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);
  if (session.status === "finished") {
    return failure("SESSION_FINISHED", "session already finished", 409);
  }

  // 未登録の場合のみ、公開済み問題からランダムに出題順を確定する
  const existing = await env.DB.prepare(
    `SELECT COUNT(*) as cnt FROM session_questions WHERE session_id = ?`
  )
    .bind(body.session_id)
    .first<{ cnt: number }>();

  if (!existing || existing.cnt === 0) {
    const questions = await env.DB.prepare(
      `SELECT id FROM questions WHERE status = 'published' ORDER BY RANDOM() LIMIT ?`
    )
      .bind(session.total_questions)
      .all<{ id: string }>();

    let orderNo = 1;
    for (const q of questions.results ?? []) {
      await env.DB.prepare(
        `INSERT INTO session_questions (id, session_id, question_id, order_no) VALUES (?, ?, ?, ?)`
      )
        .bind(crypto.randomUUID(), body.session_id, q.id, orderNo)
        .run();
      orderNo++;
    }
  }

  await env.DB.prepare(
    `UPDATE sessions SET status = 'playing', current_question_no = 1, started_at = datetime('now') WHERE id = ?`
  )
    .bind(body.session_id)
    .run();

  await logEvent(env, body.session_id, "GAME_START", null);
  await logEvent(env, body.session_id, "QUESTION_START", { question_no: 1 });

  return success({});
}

export async function handleSessionNext(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ session_id?: string }>();
  if (!body.session_id) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`)
    .bind(body.session_id)
    .first<SessionRow>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);
  if (session.status !== "playing") {
    return failure("SESSION_FINISHED", "session is not playing", 409);
  }

  const nextNo = session.current_question_no + 1;
  if (nextNo > session.total_questions) {
    return failure("INVALID_REQUEST", "no more questions", 409);
  }

  await env.DB.prepare(`UPDATE sessions SET current_question_no = ? WHERE id = ?`)
    .bind(nextNo, body.session_id)
    .run();

  await logEvent(env, body.session_id, "QUESTION_START", { question_no: nextNo });

  return success({ question_no: nextNo });
}

export async function handleSessionCurrent(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`)
    .bind(sessionId)
    .first<SessionRow>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);

  const remaining = await computeRemainingSeconds(env, sessionId, session.current_question_no);

  return success({
    status: session.status,
    question_no: session.current_question_no,
    remaining_seconds: remaining,
  });
}

export async function handleSessionEnd(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ session_id?: string }>();
  if (!body.session_id) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(`SELECT * FROM sessions WHERE id = ?`)
    .bind(body.session_id)
    .first<SessionRow>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);

  await env.DB.prepare(
    `UPDATE sessions SET status = 'finished', ended_at = datetime('now') WHERE id = ?`
  )
    .bind(body.session_id)
    .run();

  await logEvent(env, body.session_id, "GAME_END", null);

  return success({});
}

// 20秒固定のQuestion Flow（docs/prd/gdd/01_Core_Game_Loop.md準拠）を、
// game_logsのQUESTION_START記録からの経過時間で近似する。
async function computeRemainingSeconds(
  env: Env,
  sessionId: string,
  questionNo: number
): Promise<number> {
  const log = await env.DB.prepare(
    `SELECT created_at FROM game_logs
     WHERE session_id = ? AND event_type = 'QUESTION_START' AND event_data LIKE ?
     ORDER BY created_at DESC LIMIT 1`
  )
    .bind(sessionId, `%"question_no":${questionNo}%`)
    .first<{ created_at: string }>();

  if (!log) return QUESTION_DURATION_SECONDS;

  const startedAt = new Date(log.created_at + "Z").getTime();
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(QUESTION_DURATION_SECONDS - elapsed, 0);
}
