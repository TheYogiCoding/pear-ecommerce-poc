const path = require("path");
const express = require("express");

const csrf = require("csurf");

const authRoutes = require("./routes/auth.routes");

const db = require("./data/database");

const csurf = require("csurf");
const { addCsrfToken } = require("./middlewares/csrf-token");

const app = express();

//Make express aware of views folder and
//use EJS templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static css files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(csurf());

app.use(addCsrfToken);

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
