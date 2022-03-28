function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    //request travels on but code after does not execute
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;

  next();
}

module.exports = checkAuthStatus;
