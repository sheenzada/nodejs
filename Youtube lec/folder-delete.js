const fs = require("fs");

fs.rmdir("delete", (err) => {

  if (err) throw err;

  console.log("Folder deleted");

});