require('dotenv').config();
const express = require('express');
const { copyFile } = require('./services/fileService'); 
const artifactRoutes = require('./routes/artifactRoutes');
const senderRoutes = require('./routes/senderRoutes');

const app = express();
app.use(express.json());

app.use('/artifacts', artifactRoutes);
app.use('/senders', senderRoutes);
async function testCopy() {
    const secondaryId = '2024.01'; // Example secondary ID
    const result = await copyFile(secondaryId); // Call copyFile with the secondaryId
    if (result) {
      console.log(`File successfully copied to: ${result}`);
    } else {
      console.log('File copy failed.');
    }
  }
testCopy();  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
