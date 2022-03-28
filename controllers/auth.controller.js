const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignUp(req, res) {
  console.log("Sign Up Logic");
  res.render("customer/auth/signup");
}

async function signUp(req, res, next) {
  const enteredData = {
    emailAddress: req.body.emailAddress,
    password: req.body.password,
    fullName: req.body.fullName,
    streetName: req.body.streetName,
    eircode: req.body.eircode,
    county: req.body.county,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.emailAddress,
      req.body.password,
      req.body.fullName,
      req.body.streetName,
      req.body.eircode,
      req.body.county
    ) ||
    !validation.emailIsConfirmed(
      req.body.emailAddress,
      req.body.confirmEmailAddress
    )
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be at least 5 characters long",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(
    req.body.emailAddress,
    req.body.password,
    req.body.fullName,
    req.body.streetName,
    req.body.eircode,
    req.body.county
  );

  //Express middleware error handling wont handle async operations
  try {
    //Cannot have a user with the same email twice
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "User exists already! Try logging in instead!",
          ...enteredData,
        },
        function () {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signUp();
  } catch (error) {
    next(error);
    return;
  }

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

  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid credentials - please try again",
        ...enteredData,
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const checkPasswordCorrect = await user.hasCorrectPassword(
    existingUser.password
  );

  const sessionData = {
    errorMessage: "Invalid credentials - please try again",
    ...enteredData,
    email: user.email,
    password: user.password,
  };

  if (!checkPasswordCorrect) {
    sessionFlash.flashDataToSession(req, sessionData, function () {
      res.redirect("/login");
    });
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
