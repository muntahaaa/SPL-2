const pool = require('../config/db');

async function insertArtifact(data) {
  const { secondaryId, category, subcategory, description, senderId } = data;
  const query = `
    INSERT INTO artifacts (secondary_id, category, subcategory, description, created_at, updated_at, updated_by)
    VALUES ($1, $2, $3, $4, NOW(), NOW(), $5)
    RETURNING id
  `;
  const values = [secondaryId, category, subcategory, description, senderId];
  const result = await pool.query(query, values);
  return result.rows[0]?.id || null;
}

async function updateArtifactFilePath(artifactId, filePath) {
  const query = `UPDATE artifacts SET file_path = $1 WHERE id = $2`;
  await pool.query(query, [filePath, artifactId]);
}

module.exports = { insertArtifact, updateArtifactFilePath };
