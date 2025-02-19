-- Milestone 1
CREATE DATABASE unbound_hackathon;

\c unbound_hackathon

CREATE TABLE models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO models (name) VALUES
('openai/gpt-3.5'),
('anthropic/claude-v1'),
('gemini/gemini-alpha');