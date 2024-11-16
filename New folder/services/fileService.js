const fs = require('fs').promises;
const path = require('path');

async function copyFile(secondaryId, baseDir = './old_storage') {
  const destPath = process.env.DEST_PATH;

  if (!destPath) {
    console.error('DEST_PATH environment variable is not set.');
    return null;
  }

  const [year, month] = secondaryId.split('.');

  try {
    // Construct folder path
    const folderPath = path.join(baseDir, year, month);

    // Check if the folder exists
    try {
      await fs.access(folderPath);
    } catch {
      console.error(`Source folder not found: ${folderPath}`);
      return null;
    }

    // List files in the folder
    const files = await fs.readdir(folderPath);
    const file = files.find(f => f.includes(secondaryId));

    if (!file) {
      console.log(`File not found for ID: ${secondaryId}`);
      return null;
    }

    // Construct source and destination paths
    const source = path.join(folderPath, file);
    const destination = path.join(destPath, file);

    // Ensure the destination directory exists
    await fs.mkdir(destPath, { recursive: true });

    // Copy file
    await fs.copyFile(source, destination);
    console.log(`File copied for ID: ${secondaryId} to ${destination}`);
    return destination; // Return new destination path

  } catch (err) {
    console.error(`Error copying file for ID ${secondaryId}:`, err.message);
    return null;
  }
}

module.exports = { copyFile };
