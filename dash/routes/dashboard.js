const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  const user = {
    email: "admin@gmail.com"
  };

  res.render("dashboard", { user });

});

module.exports = router;