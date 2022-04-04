function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 400) {
    return res.status(400).render("shared/notfound");
  }

  //Server Side Error set by middleware
  res.status(500).render("shared/error");
}

module.exports = handleErrors;
