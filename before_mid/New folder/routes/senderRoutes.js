const express = require('express');
const { createSender } = require('../controllers/senderController');

const router = express.Router();
router.post('/create', createSender);

module.exports = router;
