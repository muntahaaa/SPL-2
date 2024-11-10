CREATE TABLE IF NOT EXISTS senders (
    sender_id SERIAL PRIMARY KEY,
    sender_name VARCHAR(255) UNIQUE
);

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
