exports.showLogin = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    req.session.user = { email };
    res.redirect("/dashboard");
  } else {
    res.send("Invalid Login");
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};