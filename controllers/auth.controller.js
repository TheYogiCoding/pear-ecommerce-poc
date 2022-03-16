function getSignUp(req, res) {
  console.log("Sign Up Logic");
  res.render("customer/auth/signup");
}

function getLogin(req, res) {
  console.log("Login Logic");
  res.render("login");
}

module.exports = {
  getSignUp: getSignUp,
  getLogin: getLogin,
};
