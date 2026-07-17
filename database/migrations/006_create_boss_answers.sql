CREATE TABLE IF NOT EXISTS boss_answers (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  answer TEXT NOT NULL,
  is_correct INTEGER NOT NULL, -- 0 | 1
  answered_at TEXT NOT NULL DEFAULT (datetime('now'))
);
