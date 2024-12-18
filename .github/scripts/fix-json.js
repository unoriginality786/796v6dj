const fs = require('fs');
const path = require('path');

// Fix missing quotes in JSON files
function fixMissingQuotes(jsonStr) {
  jsonStr = jsonStr.replace(/([:,]\s*)([A-Za-z0-9\s-]+)(?=\s*[},\]])/g, (match, p1, p2) => {
    if (!/^(true|false|null|\d+(\.\d+)?([eE][+\-]?\d+)?)$/.test(p2)) {
      return `${p1}"${p2}"`; // Add quotes around the string
    }
    return match;
  });
  return jsonStr;
}

// Set path to the json_files directory located at the root level
const jsonFilesDir = path.join(__dirname, '../../json_files');
console.log(`Looking for JSON files in: ${jsonFilesDir}`);  // Debugging line

// Check if json_files directory exists
if (!fs.existsSync(jsonFilesDir)) {
  console.error('Error: json_files directory does not exist.');
  process.exit(1);
}

// Read and fix each JSON file in json_files directory
fs.readdirSync(jsonFilesDir).forEach((file) => {
  const filePath = path.join(jsonFilesDir, file);
  console.log(`Found file: ${filePath}`); // Debugging line

  if (file.endsWith('.json')) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file ${filePath}:`, err);
        return;
      }

      // Fix missing quotes
      const fixedData = fixMissingQuotes(data);

      // Save the fixed JSON file back to the directory
      fs.writeFile(filePath, fixedData, (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
        } else {
          console.log(`Fixed file: ${filePath}`);
        }
      });
    });
  }
});
