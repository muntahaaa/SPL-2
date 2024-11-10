const pool = require('../db');

async function insertSender(senderName) {
  const senderResult = await pool.query(
    'INSERT INTO senders (sender_name) VALUES ($1) ON CONFLICT (sender_name) DO NOTHING RETURNING sender_id',
    [senderName]
  );

  if (senderResult.rows.length > 0) {
    return senderResult.rows[0].sender_id;
  } else {
    const existingSender = await pool.query(
      'SELECT sender_id FROM senders WHERE sender_name = $1',
      [senderName]
    );
    return existingSender.rows[0]?.sender_id || null;
  }
}

async function insertArtifact(secondaryId, category, subcategory, description, senderId) {
  const artifactResult = await pool.query(
    `INSERT INTO artifacts (secondary_id, category, subcategory, description, created_at, updated_at, updated_by)
     VALUES ($1, $2, $3, $4, NOW(), NOW(), $5) 
     ON CONFLICT (secondary_id) DO NOTHING RETURNING id`,
    [secondaryId, category, subcategory, description, senderId]
  );

  return artifactResult.rows[0]?.id || null;
}

async function updateArtifactFilePath(artifactId, filePath) {
  await pool.query(
    'UPDATE artifacts SET file_path = $1 WHERE id = $2',
    [filePath, artifactId]
  );
}

module.exports = { insertSender, insertArtifact, updateArtifactFilePath };
