import type { Env } from "../types";
import { failure, success } from "../utils/response";

// docs/prd/gdd/technical/07_API_Final_Specification.md - Admin API
// docs/prd/gdd/technical/prompts/07_Claude_Phase7_Admin_Panel.md
// POST /admin/question/create, PUT /admin/question/update, DELETE /admin/question/delete, GET /admin/dashboard
// MVP: 管理者1人のみ、権限管理なし（禁止事項: ログイン実装/権限システム）

interface QuestionBody {
  id?: string;
  category?: string;
  difficulty?: number;
  title?: string;
  question_text?: string;
  image_url?: string;
  choice_a?: string;
  choice_b?: string;
  choice_c?: string;
  choice_d?: string;
  correct_answer?: string;
  explanation?: string;
  status?: string;
}

function isValidQuestion(body: QuestionBody): boolean {
  return !!(
    body.category &&
    body.difficulty &&
    body.title &&
    body.question_text &&
    body.choice_a &&
    body.choice_b &&
    body.choice_c &&
    body.choice_d &&
    body.correct_answer
  );
}

export async function handleAdminQuestionCreate(req: Request, env: Env): Promise<Response> {
  const body = await req.json<QuestionBody>();
  if (!isValidQuestion(body)) {
    return failure(
      "INVALID_REQUEST",
      "category, difficulty, title, question_text, choice_a-d, correct_answer are required"
    );
  }

  const id = body.id ?? crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO questions
      (id, category, difficulty, title, question_text, image_url, choice_a, choice_b, choice_c, choice_d, correct_answer, explanation, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      body.category,
      body.difficulty,
      body.title,
      body.question_text,
      body.image_url ?? null,
      body.choice_a,
      body.choice_b,
      body.choice_c,
      body.choice_d,
      body.correct_answer,
      body.explanation ?? null,
      body.status ?? "draft"
    )
    .run();

  return success({ id });
}

export async function handleAdminQuestionUpdate(req: Request, env: Env): Promise<Response> {
  const body = await req.json<QuestionBody>();
  if (!body.id) return failure("INVALID_REQUEST", "id is required");

  const existing = await env.DB.prepare(`SELECT id FROM questions WHERE id = ?`)
    .bind(body.id)
    .first<{ id: string }>();
  if (!existing) return failure("INVALID_REQUEST", "question not found", 404);

  await env.DB.prepare(
    `UPDATE questions SET
      category = COALESCE(?, category),
      difficulty = COALESCE(?, difficulty),
      title = COALESCE(?, title),
      question_text = COALESCE(?, question_text),
      image_url = COALESCE(?, image_url),
      choice_a = COALESCE(?, choice_a),
      choice_b = COALESCE(?, choice_b),
      choice_c = COALESCE(?, choice_c),
      choice_d = COALESCE(?, choice_d),
      correct_answer = COALESCE(?, correct_answer),
      explanation = COALESCE(?, explanation),
      status = COALESCE(?, status),
      updated_at = datetime('now')
     WHERE id = ?`
  )
    .bind(
      body.category ?? null,
      body.difficulty ?? null,
      body.title ?? null,
      body.question_text ?? null,
      body.image_url ?? null,
      body.choice_a ?? null,
      body.choice_b ?? null,
      body.choice_c ?? null,
      body.choice_d ?? null,
      body.correct_answer ?? null,
      body.explanation ?? null,
      body.status ?? null,
      body.id
    )
    .run();

  return success({});
}

export async function handleAdminQuestionDelete(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return failure("INVALID_REQUEST", "id is required");

  await env.DB.prepare(`DELETE FROM questions WHERE id = ?`).bind(id).run();
  return success({});
}

export async function handleAdminQuestionList(req: Request, env: Env): Promise<Response> {
  const result = await env.DB.prepare(
    `SELECT id, category, difficulty, title, status FROM questions ORDER BY created_at DESC`
  ).all();
  return success({ questions: result.results ?? [] });
}

export async function handleAdminDashboard(_req: Request, env: Env): Promise<Response> {
  const [questionStats, sessionStats, participantStats, answerStats] = await Promise.all([
    env.DB.prepare(
      `SELECT COUNT(*) as total, SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published
       FROM questions`
    ).first<{ total: number; published: number }>(),
    env.DB.prepare(`SELECT COUNT(*) as total FROM sessions`).first<{ total: number }>(),
    env.DB.prepare(`SELECT COUNT(*) as total FROM participants`).first<{ total: number }>(),
    env.DB.prepare(
      `SELECT COUNT(*) as total, SUM(is_correct) as correct FROM answers`
    ).first<{ total: number; correct: number | null }>(),
  ]);

  const totalAnswers = answerStats?.total ?? 0;
  const correctAnswers = answerStats?.correct ?? 0;
  const correctRate = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 1000) / 10;

  return success({
    total_questions: questionStats?.total ?? 0,
    published_questions: questionStats?.published ?? 0,
    total_sessions: sessionStats?.total ?? 0,
    total_participants: participantStats?.total ?? 0,
    average_correct_rate: correctRate,
  });
}
