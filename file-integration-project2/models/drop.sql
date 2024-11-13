-- psql -U postgres -f models/drop.sql
-- Terminate all connections to the database
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'file_integration';
DROP DATABASE file_integration;
DROP ROLE file_user;
