-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT
);

CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  text VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quotes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author TEXT NOT NULL,
  content TEXT NOT NULL
);

INSERT INTO 
  posts (title, text)
VALUES 
  ('My first post', 'Oh my glob, I love to post.'), 
  ('Follow-up post', 'Butts.');