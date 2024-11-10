const fs = require('fs');
const path = require('path');

async function copyFile(secondaryId) {
  const baseDir = './old_storage';
  const destPath = process.env.DEST_PATH;
  const [year, month] = secondaryId.split('.');

  try {
    const folderPath = path.join(baseDir, year, month);
    const files = fs.readdirSync(folderPath);
    const file = files.find(f => f.includes(secondaryId));

    if (file) {
      const source = path.join(folderPath, file);
      const destination = path.join(destPath, file);

      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }

      fs.copyFileSync(source, destination);
      console.log(`File copied for ID: ${secondaryId} to ${destination}`);
      return destination;
    } else {
      console.log(`File not found for ID: ${secondaryId}`);
      return null;
    }
  } catch (err) {
    console.error(`Error copying file for ID ${secondaryId}:`, err);
    return null;
  }
}

module.exports = { copyFile };
