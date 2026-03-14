const fs = require("fs");

fs.readFile("test.txt", "utf8", (err, data) => {

  if (err) {
    console.log(err);
  }

  console.log(data);

});