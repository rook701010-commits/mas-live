CREATE TABLE IF NOT EXISTS session_questions (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  order_no INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_session_questions_session_id ON session_questions(session_id);
