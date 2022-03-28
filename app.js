const path = require("path");
const express = require("express");

const csrf = require("csurf");

const createSessionConfig = require("./config/session");
const expressSession = require("express-session");

const authRoutes = require("./routes/auth.routes");

const db = require("./data/database");

const { addCsrfToken } = require("./middlewares/csrf-token");
const errorHandler = require("./middlewares/error-handler");

const app = express();

//Make express aware of views folder and
//use EJS templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static css files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfToken);
app.use(errorHandler);

app.use(authRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
