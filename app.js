const path = require("path");
const express = require("express");

const csrf = require("csurf");

const createSessionConfig = require("./config/session");
const expressSession = require("express-session");

const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const sharedRoutes = require("./routes/shared.routes");

const db = require("./data/database");

const { addCsrfToken } = require("./middlewares/csrf-token");
const errorHandler = require("./middlewares/error-handler");
const checkAuthStatus = require("./middlewares/check-auth");

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
app.use(checkAuthStatus);
app.use(errorHandler);

app.use(authRoutes);
app.use(sharedRoutes);
app.use(productsRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
