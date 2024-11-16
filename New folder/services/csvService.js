const fs = require('fs');
const csv = require('csv-parser');
const {  insertArtifact, updateArtifactFilePath } = require('../models/artifactModel');
const{insertSender} = require('../models/senderModel')
const { copyFile } = require('./fileService');

async function importCSV(filePath) {
  console.log('Starting CSV import...');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        try {
          const { ID, senderName, category, subcategory, description } = row;

          if (!ID || !senderName) {
            console.log('Invalid row, skipping:', row);
            return;
          }

          const senderId = await insertSender(senderName);
          const artifactId = await insertArtifact(ID, category, subcategory, description, senderId);
          const filePath = await copyFile(ID);

          if (filePath && artifactId) {
            await updateArtifactFilePath(artifactId, filePath);
          }
        } catch (error) {
          console.error('Error processing row:', error);
        }
      })
      .on('end', () => {
        console.log('CSV import completed.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
        reject(err);
      });
  });
}

module.exports = { importCSV };
