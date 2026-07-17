CREATE TABLE IF NOT EXISTS rankings (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  participant_id TEXT NOT NULL REFERENCES participants(id),
  score INTEGER NOT NULL,
  rank INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS game_logs (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  event_type TEXT NOT NULL, -- GAME_START | QUESTION_START | QUESTION_END | RESULT | GAME_END
  event_data TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
