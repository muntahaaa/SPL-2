const { insertArtifact, updateArtifactFilePath } = require('../models/artifactModel');
const { copyFile } = require('../services/fileService');
const { importCSV } = require('../services/csvService');

async function createArtifact(req, res) {
  const { secondaryId, category, subcategory, description, senderId } = req.body;

  try {
    const artifactId = await insertArtifact(secondaryId, category, subcategory, description, senderId);
    if (!artifactId) {
      return res.status(400).json({ message: 'Artifact could not be created.' });
    }

    const filePath = await copyFile(secondaryId);
    if (filePath) {
      await updateArtifactFilePath(artifactId, filePath);
    }

    res.status(201).json({ message: 'Artifact created successfully.', artifactId });
  } catch (error) {
    console.error('Error creating artifact:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function uploadCSV(req, res) {
  const { filePath } = req.body;
  try {
    await importCSV(filePath);
    res.status(200).json({ message: 'CSV processed successfully.' });
  } catch (error) {
    console.error('Error processing CSV:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}





module.exports = { createArtifact, uploadCSV };
