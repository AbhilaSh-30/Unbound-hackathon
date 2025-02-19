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

-- Milestone 3
CREATE TABLE routing_rules (
    id SERIAL PRIMARY KEY,
    original_model VARCHAR(255) NOT NULL,
    regex_pattern TEXT NOT NULL,
    redirect_model VARCHAR(255) NOT NULL
);

-- Sample rule
INSERT INTO routing_rules (original_model, regex_pattern, redirect_model) VALUES
('openai/gpt-3.5', '(credit card)', 'gemini/gemini-alpha');

--Milestone 7
CREATE TABLE file_routing_rules (
    id SERIAL PRIMARY KEY,
    file_type VARCHAR(50) NOT NULL,
    redirect_provider VARCHAR(255) NOT NULL,
    redirect_model VARCHAR(255) NOT NULL
);

