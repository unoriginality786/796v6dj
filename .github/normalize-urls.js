const fs = require('fs');
const path = require('path');

// Path to your JSON files
const jsonFilesDir = './json_files'; // Change this to the directory where your JSON files are stored

// Function to normalize URLs in the JSON file
function normalizeUrls() {
  // Read all files in the directory
  fs.readdirSync(jsonFilesDir).forEach(file => {
    const filePath = path.join(jsonFilesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Iterate over each URL and normalize it
    for (let key in data) {
      if (Array.isArray(data[key])) {
        data[key] = data[key].map(url => {
          // Normalize URL if it contains /refs/heads/
          if (url.includes('/refs/heads/')) {
            // Remove the /refs/heads/ part from the URL
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
}

// Run the normalization
normalizeUrls();
