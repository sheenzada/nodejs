const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/loginDB");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

const authRoutes = require("./routes/auth");

app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});