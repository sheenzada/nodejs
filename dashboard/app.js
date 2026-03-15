const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRoutes);
app.use("/", dashboardRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});