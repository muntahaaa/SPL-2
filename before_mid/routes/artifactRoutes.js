const express = require('express');
const { createArtifact, uploadCSV } = require('../controllers/artifactController');

const router = express.Router();
router.post('/create', createArtifact);
router.post('/upload-csv', uploadCSV);

module.exports = router;
