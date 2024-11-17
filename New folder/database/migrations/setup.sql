-- psql -U postgres -f database/migrations/setup.sql

-- Create the database
CREATE DATABASE file_integration;

-- Create the user with a password
CREATE USER file_user WITH PASSWORD '1234';

-- Grant privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE file_integration TO file_user;

-- Connect to the newly created database
\c file_integration;

-- Grant privileges on the public schema
GRANT ALL PRIVILEGES ON SCHEMA public TO file_user;
ALTER SCHEMA public OWNER TO file_user;

CREATE TABLE IF NOT EXISTS senders (
    sender_id SERIAL PRIMARY KEY,
    sender_name VARCHAR(255) UNIQUE
);
ALTER TABLE senders OWNER TO file_user;

CREATE TABLE IF NOT EXISTS artifacts (
    id SERIAL PRIMARY KEY,
    secondary_id VARCHAR(50) UNIQUE,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    description TEXT,
    file_path VARCHAR(255),
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER
);
ALTER TABLE artifacts OWNER TO file_user;

-- Grant privileges for any future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO file_user;

