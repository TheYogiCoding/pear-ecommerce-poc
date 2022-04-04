function handleErrors(error, req, res, next) {
  console.log(error);

  if (error.code === 404) {
    return res.status(404).render("shared/notfound");
  }

  res.status(500).render("shared/error");
}

module.exports = handleErrors;
