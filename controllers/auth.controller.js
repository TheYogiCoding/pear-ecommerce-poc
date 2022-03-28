const User = require("../models/user.model");
const authUtil = require("../util/authentication");

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

async function login(req, res) {
  console.log(req.body);
  const user = new User(
    (email = req.body.email),
    (password = req.body.password)
  );
  console.log(user.email);
  console.log(user.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect("/login");
    //Visitor entered incorrect details
    console.log("No user");
    return;
  }

  const checkPasswordCorrect = await user.hasCorrectPassword(
    existingUser.password
  );

  if (!checkPasswordCorrect) {
    res.redirect("/login");
    console.log("bad password");
    return;
  }

  console.log("Logged in successfully");
  console.log(existingUser);

  authUtil.createUserSession(req, existingUser, function () {
    //Once the session was saved - so the user is not redirected to the next page
    //before the session is created
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout,
};
