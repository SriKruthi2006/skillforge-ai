-- PostgreSQL schema for SkillForge
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  description TEXT
);

CREATE TABLE modules (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE
);

CREATE INDEX idx_modules_course ON modules(course_id);

CREATE TABLE topics (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  module_id BIGINT REFERENCES modules(id) ON DELETE CASCADE
);

CREATE INDEX idx_topics_module ON topics(module_id);

CREATE TABLE learning_materials (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  content_url TEXT,
  content_type TEXT,
  topic_id BIGINT REFERENCES topics(id) ON DELETE CASCADE
);

CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  text TEXT,
  difficulty TEXT,
  topic_id BIGINT REFERENCES topics(id) ON DELETE SET NULL
);

CREATE INDEX idx_questions_topic ON questions(topic_id);

CREATE TABLE options (
  id BIGSERIAL PRIMARY KEY,
  text TEXT,
  correct BOOLEAN DEFAULT FALSE,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE tests (
  id BIGSERIAL PRIMARY KEY,
  title TEXT,
  created_at timestamptz
);

CREATE TABLE test_questions (
  id BIGSERIAL PRIMARY KEY,
  test_id BIGINT REFERENCES tests(id) ON DELETE CASCADE,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  points INT DEFAULT 1
);

CREATE TABLE user_answers (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  test_id BIGINT REFERENCES tests(id) ON DELETE CASCADE,
  question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id BIGINT,
  correct BOOLEAN DEFAULT FALSE
);

CREATE TABLE results (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  test_id BIGINT REFERENCES tests(id) ON DELETE CASCADE,
  score INT,
  total INT,
  taken_at timestamptz,
  analytics jsonb
);

CREATE INDEX idx_results_user ON results(user_id);
