const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "12345") {
    req.session.user = email;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid Login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;