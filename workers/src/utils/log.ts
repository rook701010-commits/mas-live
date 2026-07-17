import type { Env } from "../types";

// docs/prd/gdd/technical/06_Database_Final_Schema.md - game_logs
// GAME_START | QUESTION_START | QUESTION_END | RESULT | GAME_END

export async function logEvent(
  env: Env,
  sessionId: string,
  eventType: string,
  eventData: unknown
): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO game_logs (id, session_id, event_type, event_data) VALUES (?, ?, ?, ?)`
  )
    .bind(
      crypto.randomUUID(),
      sessionId,
      eventType,
      eventData === null || eventData === undefined ? null : JSON.stringify(eventData)
    )
    .run();
}
