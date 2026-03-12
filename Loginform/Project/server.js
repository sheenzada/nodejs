
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
}));

app.set("view engine", "ejs");

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Home Page
app.get("/", (req, res) => {
  res.render("login");
});

// Register Page
app.get("/register", (req, res) => {
  res.render("register");
});

// Register User
app.post("/register", async (req, res) => {

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  await user.save();

  res.redirect("/");
});

// Login User
app.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send("Wrong Password");
  }

  req.session.user = user;

  res.redirect("/dashboard");
});

// Dashboard
app.get("/dashboard", (req, res) => {

  if (!req.session.user) {
    return res.redirect("/");
  }

  res.send(`
    <h1>Welcome ${req.session.user.username}</h1>
    <a href="/logout">Logout</a>
  `);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Server Start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

