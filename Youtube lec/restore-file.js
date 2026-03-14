const fs = require('fs');

fs.rename('dummy.txt', 'trash/dummy.txt', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("File moved to trash");
});