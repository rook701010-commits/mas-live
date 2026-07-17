-- APIテスト用の最低限データ（docs/prd/gdd/technical/prompts/02_Claude_Phase2_Database.md Step5準拠）

INSERT INTO questions (id, category, difficulty, title, question_text, choice_a, choice_b, choice_c, choice_d, correct_answer, explanation, status)
VALUES
  ('Q00001', 'haikouritsu', 1, '何切る問題1', 'サンプル問題文1', 'A', 'B', 'C', 'D', 'B', 'サンプル解説1', 'published'),
  ('Q00002', 'oshihiki', 2, '押し引き問題1', 'サンプル問題文2', 'A', 'B', 'C', 'D', 'A', 'サンプル解説2', 'published'),
  ('Q00003', 'tensuu', 2, '点数計算問題1', 'サンプル問題文3', 'A', 'B', 'C', 'D', 'C', 'サンプル解説3', 'published'),
  ('Q00004', 'nanikiru', 1, '何切る問題2', 'サンプル問題文4', 'A', 'B', 'C', 'D', 'D', 'サンプル解説4', 'published'),
  ('Q00005', 'chakuji', 3, '着順判断問題1', 'サンプル問題文5', 'A', 'B', 'C', 'D', 'B', 'サンプル解説5', 'published');

INSERT INTO sessions (id, title, boss_name, status, total_questions)
VALUES ('S00001', '100人でrook7を倒せ！(テスト配信)', 'rook7', 'created', 20);
