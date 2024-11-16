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
