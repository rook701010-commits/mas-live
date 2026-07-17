CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  difficulty INTEGER NOT NULL,
  title TEXT NOT NULL,
  question_text TEXT NOT NULL,
  image_url TEXT,
  choice_a TEXT NOT NULL,
  choice_b TEXT NOT NULL,
  choice_c TEXT NOT NULL,
  choice_d TEXT NOT NULL,
  correct_answer TEXT NOT NULL, -- 'A' | 'B' | 'C' | 'D'
  explanation TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- draft | review | published | archived
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
