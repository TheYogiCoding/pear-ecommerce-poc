const path = require("path");
const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

//Make express aware of views folder and
//use EJS templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static css files
app.use(express.static("public"));

app.use(authRoutes);

app.listen(3000);
