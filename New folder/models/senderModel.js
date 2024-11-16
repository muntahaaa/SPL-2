const pool = require('../config/db');

async function insertSender(senderName) {
  const query = `
    INSERT INTO senders (sender_name)
    VALUES ($1)
    ON CONFLICT (sender_name) DO NOTHING
    RETURNING sender_id
  `;
  const result = await pool.query(query, [senderName]);

  if (result.rows.length > 0) {
    return result.rows[0].sender_id;
  } else {
    const existingQuery = `SELECT sender_id FROM senders WHERE sender_name = $1`;
    const existingResult = await pool.query(existingQuery, [senderName]);
    return existingResult.rows[0]?.sender_id || null;
  }
}

module.exports = { insertSender };
