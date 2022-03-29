function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    //request travels on but code after does not execute
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  //Undefined for non admins - true for admins
  res.locals.isAdmin = req.session.isAdmin;

  next();
}

module.exports = checkAuthStatus;
