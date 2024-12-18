const fs = require('fs');
const path = require('path');

// Function to fix missing quotes around values that are strings
function fixMissingQuotes(jsonStr) {
  // Regex to add quotes around unquoted string values (excluding numbers, booleans, null, etc.)
  jsonStr = jsonStr.replace(/([:,]\s*)([A-Za-z0-9\s-]+)(?=\s*[},\]])/g, (match, p1, p2) => {
    // Only add quotes if the value is not a boolean, number, or null
    if (!/^(true|false|null|\d+(\.\d+)?([eE][+\-]?\d+)?)$/.test(p2)) {
      return `${p1}"${p2}"`; // Add quotes around the string
    }
    return match; // Leave non-strings (numbers, booleans) unchanged
  });

  return jsonStr;
}

// Define the directory where JSON files are stored
const jsonDir = path.join(__dirname, '..', '..', 'json_files'); // Adjust path to point to the root 'json_files' folder

// Read the files in the json_files directory
fs.readdir(jsonDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Process each file in the directory
  files.forEach((file) => {
    if (file.endsWith('.json')) {
      const filePath = path.join(jsonDir, file);

      // Read the JSON file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        // Fix missing quotes in the JSON data
        const fixedData = fixMissingQuotes(data);

        // Save the fixed JSON back to the file
        fs.writeFile(filePath, fixedData, (err) => {
          if (err) {
            console.error('Error writing file:', err);
          } else {
            console.log(`File fixed and saved: ${filePath}`);
          }
        });
      });
    }
  });
});
