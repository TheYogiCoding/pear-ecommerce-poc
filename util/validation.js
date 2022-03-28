function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  return email && email.includes("@") && password && password.trim().length > 5;
}

function userDetailsAreValid(email, password, name, street, eircode, county) {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(eircode) &&
    !isEmpty(county)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userCredentialsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
