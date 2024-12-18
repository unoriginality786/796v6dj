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

// Path to the directory containing the JSON files
const jsonFilesDir = path.join(__dirname, 'json_files');

// Read all files in the directory
fs.readdirSync(jsonFilesDir).forEach(file => {
  const filePath = path.join(jsonFilesDir, file);

  // Process only JSON files
  if (file.endsWith('.json')) {
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
          console.log(`Fixed file: ${filePath}`);
        }
      });
    });
  }
});
