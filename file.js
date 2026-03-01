const fs = require('fs');

const fileName = 'example.txt';
const content = 'This is a message written by Node.js!';

// 1. Write a file
fs.writeFile(fileName, content, (err) => {
  if (err) throw err;
  console.log('File created successfully!');

  // 2. Read the file we just created
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content read:', data);
  });
});