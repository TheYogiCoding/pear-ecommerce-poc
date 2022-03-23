const User = require("../models/user.model");

function getSignUp(req, res) {
  console.log("Sign Up Logic");
  res.render("customer/auth/signup");
}

async function signUp(req, res) {
  const user = new User(
    req.body.emailAddress,
    req.body.password,
    req.body.fullName,
    req.body.streetName,
    req.body.eircode,
    req.body.county
  );

  await user.signUp();

  res.redirect("/login");
}

function getLogin(req, res) {
  console.log("Login Logic");
  res.render("customer/auth/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signUp: signUp,
};
