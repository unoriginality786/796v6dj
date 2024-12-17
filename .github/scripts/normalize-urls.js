const fs = require('fs');
const path = require('path');

// Path to your JSON files
const jsonFilesDir = './json_files'; // Relative path to the json_files directory
console.log("Checking directory:", jsonFilesDir);

// Function to normalize URLs in the JSON file
function normalizeUrls() {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(jsonFilesDir);
    console.log("Files in directory:", files);

    files.forEach(file => {
      const filePath = path.join(jsonFilesDir, file);
      console.log("Reading file:", filePath);

      // Check if the file exists before attempting to read it
      if (!fs.existsSync(filePath)) {
        console.log(`File does not exist: ${filePath}`);
        return;
      }

      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log("Loaded data for", file);

      // Iterate over each URL and normalize it
      for (let key in data) {
        if (Array.isArray(data[key])) {
          data[key] = data[key].map(url => {
            // Normalize URL if it contains /refs/heads/
            if (url.includes('/refs/heads/')) {
              console.log(`Normalizing URL in ${file}:`, url);
              return url.replace('/refs/heads/', '/');
            }
            return url;
          });
        }
      }

      // Write the normalized data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Normalized URLs in ${file}`);
    });
  } catch (error) {
    console.error("Error normalizing URLs:", error);
  }
}

// Run the normalization
normalizeUrls();
