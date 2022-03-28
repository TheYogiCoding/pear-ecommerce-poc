function handleErrors(error, req, res, next) {
  console.log(error);
  //Server Side Error set by middleware
  res.status(500).render("shared/error");
}

module.exports = handleErrors;
