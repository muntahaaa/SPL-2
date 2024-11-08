import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

const app = express();
const port = 3000;

// Set the absolute path to the IIT folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/IIT", express.static(path.join(__dirname, "IIT")));
app.use(express.static(path.join(__dirname, "public")));

// Function to read the CSV and return rows with 'index'
function getCSVIndexes() {
  return new Promise((resolve, reject) => {
    const indexes = [];
    fs.createReadStream("Book1.csv")
      .pipe(csv())
      .on("data", (row) => {
        indexes.push(row); // Each row will include the index, name, type, and roll
      })
      .on("end", () => {
        resolve(indexes);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Endpoint to get all indexes from the CSV
app.get("/getIndexes", async (req, res) => {
  try {
    const rows = await getCSVIndexes();
    const indexes = rows.map((row) => row.index); // Extract only the indexes (e.g., IIT.13.1350)
    res.json(indexes);
  } catch (error) {
    res.status(500).send("Error reading CSV file");
  }
});

// Endpoint to generate and return image URL based on index
app.get("/image/:index", async (req, res) => {
  const indexParts = req.params.index.split("."); // Split the index (e.g., IIT.13.1350)
  const folder = `${indexParts[1]}th`; // Folder like "13th"
  const imageName = `${indexParts[2]}.png`; // Image like "1350.png"
  
  // Construct the relative URL for the client
  const imageUrl = `../IIT/${folder}/${imageName}`;

  // Check if image exists and send the relative URL
  const imagePath = path.join(__dirname, "IIT", folder, imageName);
  if (fs.existsSync(imagePath)) {
    res.json({ imageUrl });
  } else {
    res.status(404).send("Image not found");
  }
});

// Serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
