const fs = require('fs');
const path = require('path');

// Path to the directory where the JSON files are located
const jsonFilesDir = path.join(__dirname, '../../json_files');

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

// Read and process all JSON files in the json_files directory
fs.readdir(jsonFilesDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(jsonFilesDir, file);
      
      // Read the JSON file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        // Fix missing quotes
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
