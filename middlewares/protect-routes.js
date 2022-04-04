function protectRoutes(req, res, next) {
  if (!res.locals.isAuth) {
    return res.redirect("/unauthorized");
  }

  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/accessdenied");
  }

  next();
}

module.exports = protectRoutes;
