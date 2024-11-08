import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

const app = express();
const port = 3000;

// Get the current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/IIT", express.static(path.join(__dirname, "IIT"))); // Serve images from the IIT folder
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public folder

// Function to read the CSV and clean up keys
function getCSVIndexes() {
  return new Promise((resolve, reject) => {
    const indexes = [];
    fs.createReadStream("Book1.csv")
      .pipe(csv())
      .on("data", (row) => {
        // Trim whitespace from keys and add the cleaned row to indexes array
        const cleanedRow = {};
        for (const key in row) {
          cleanedRow[key.trim()] = row[key]; // Trim whitespace from key names
        }
        indexes.push(cleanedRow); // Add cleaned row to the list of indexes
      })
      .on("end", () => {
        resolve(indexes);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

// Endpoint to get all indexes
app.get("/getIndexes", async (req, res) => {
  try {
    const rows = await getCSVIndexes();
    const indexes = rows.map((row) => row.index); // Extract only the indexes (e.g., IIT.13.1350)
    res.json(indexes);
  } catch (error) {
    res.status(500).send("Error reading CSV file");
  }
});

// Endpoint to return image URL and details based on index
app.get("/image/:index", async (req, res) => {
  const indexParts = req.params.index.split("."); // Split the index (e.g., IIT.13.1350)
  const folder = `${indexParts[1]}th`; // Folder like "13th"
  const imageName = `${indexParts[2]}.png`; // Image like "1350.png"

  // Construct the relative URL for the client
  const imageUrl = `../IIT/${folder}/${imageName}`;

  try {
    const rows = await getCSVIndexes();
    const row = rows.find((row) => row.index === req.params.index); // Find row by index

    // Check if the image exists and respond with the relative URL and additional data
    const imagePath = path.join(__dirname, "IIT", folder, imageName);
    if (row && fs.existsSync(imagePath)) {
      res.json({
        imageUrl,
        name: row.name,
        type: row.type,
        roll: row.roll,
      });
    } else {
      res.status(404).send("Image not found");
    }
  } catch (error) {
    res.status(500).send("Error reading CSV or accessing file");
  }
});

// Serve the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
