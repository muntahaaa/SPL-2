const { insertSender } = require('../models/senderModel');

async function createSender(req, res) {
  const { senderName } = req.body;

  try {
    const senderId = await insertSender(senderName);
    res.status(201).json({ message: 'Sender created successfully.', senderId });
  } catch (error) {
    console.error('Error creating sender:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

module.exports = { createSender };
