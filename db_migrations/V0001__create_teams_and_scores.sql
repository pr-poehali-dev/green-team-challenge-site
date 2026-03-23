CREATE TABLE IF NOT EXISTS teams (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  avatar TEXT NOT NULL DEFAULT '⭐',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id),
  task_id INTEGER NOT NULL,
  task_title TEXT NOT NULL,
  points INTEGER NOT NULL,
  awarded_by TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO teams (name, avatar) VALUES
  ('Зелёная команда', '🌿'),
  ('Красные орлы', '🦅'),
  ('Синие волки', '🐺'),
  ('Жёлтые тигры', '🐯'),
  ('Белые медведи', '🐻'),
  ('Фиолетовые совы', '🦉')
ON CONFLICT (name) DO NOTHING;
