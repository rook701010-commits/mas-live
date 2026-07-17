import type { Env } from "../types";
import { failure, success } from "../utils/response";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Player API
// docs/prd/gdd/technical/06_Database_Final_Schema.md - participants / answers
// POST /player/join, GET /player/question, POST /player/answer

interface SessionRow {
  id: string;
  status: string;
  current_question_no: number;
}

interface QuestionRow {
  id: string;
  question_text: string;
  choice_a: string;
  choice_b: string;
  choice_c: string;
  choice_d: string;
  correct_answer: string;
}

export async function handlePlayerJoin(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ session_id?: string; nickname?: string }>();
  if (!body.session_id || !body.nickname) {
    return failure("INVALID_REQUEST", "session_id and nickname are required");
  }

  const session = await env.DB.prepare(`SELECT id, status FROM sessions WHERE id = ?`)
    .bind(body.session_id)
    .first<{ id: string; status: string }>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);
  if (session.status === "finished") {
    return failure("SESSION_FINISHED", "session already finished", 409);
  }

  const id = crypto.randomUUID();
  const token = crypto.randomUUID();

  await env.DB.prepare(
    `INSERT INTO participants (id, session_id, nickname, participant_token) VALUES (?, ?, ?, ?)`
  )
    .bind(id, body.session_id, body.nickname, token)
    .run();

  return success({ participant_token: token });
}

export async function handlePlayerQuestion(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return failure("INVALID_REQUEST", "session_id is required");

  const session = await env.DB.prepare(
    `SELECT id, status, current_question_no FROM sessions WHERE id = ?`
  )
    .bind(sessionId)
    .first<SessionRow>();
  if (!session) return failure("SESSION_NOT_FOUND", "session not found", 404);

  const sq = await env.DB.prepare(
    `SELECT q.id, q.question_text, q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.correct_answer
     FROM session_questions sq
     JOIN questions q ON q.id = sq.question_id
     WHERE sq.session_id = ? AND sq.order_no = ?`
  )
    .bind(sessionId, session.current_question_no)
    .first<QuestionRow>();

  if (!sq) return failure("SESSION_NOT_FOUND", "current question not found", 404);

  // 正答(correct_answer)は視聴者へは返却しない
  return success({
    question_no: session.current_question_no,
    question_id: sq.id,
    title: sq.question_text,
    choices: [sq.choice_a, sq.choice_b, sq.choice_c, sq.choice_d],
  });
}

export async function handlePlayerAnswer(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{
    session_id?: string;
    participant_token?: string;
    question_id?: string;
    answer?: string;
  }>();

  if (!body.session_id || !body.participant_token || !body.question_id || !body.answer) {
    return failure("INVALID_REQUEST", "session_id, participant_token, question_id, answer are required");
  }

  const participant = await env.DB.prepare(
    `SELECT id FROM participants WHERE session_id = ? AND participant_token = ?`
  )
    .bind(body.session_id, body.participant_token)
    .first<{ id: string }>();
  if (!participant) return failure("INVALID_REQUEST", "invalid participant_token", 403);

  const existingAnswer = await env.DB.prepare(
    `SELECT id FROM answers WHERE session_id = ? AND question_id = ? AND participant_id = ?`
  )
    .bind(body.session_id, body.question_id, participant.id)
    .first<{ id: string }>();
  if (existingAnswer) return failure("DUPLICATE_ANSWER", "already answered", 409);

  const question = await env.DB.prepare(`SELECT correct_answer FROM questions WHERE id = ?`)
    .bind(body.question_id)
    .first<{ correct_answer: string }>();
  if (!question) return failure("INVALID_ANSWER", "question not found", 404);

  const isCorrect = question.correct_answer === body.answer ? 1 : 0;

  await env.DB.prepare(
    `INSERT INTO answers (id, session_id, question_id, participant_id, answer, is_correct)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(crypto.randomUUID(), body.session_id, body.question_id, participant.id, body.answer, isCorrect)
    .run();

  return success({});
}
