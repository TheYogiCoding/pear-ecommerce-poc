const path = require("path");
const express = require("express");

const csrf = require("csurf");

const createSessionConfig = require("./config/session");
const expressSession = require("express-session");

//Route declarations
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const sharedRoutes = require("./routes/shared.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const db = require("./data/database");

//Middlewares declarations
const { addCsrfToken } = require("./middlewares/csrf-token");
const protectRoutes = require("./middlewares/protect-routes");
const errorHandler = require("./middlewares/error-handler");
const checkAuthStatus = require("./middlewares/check-auth");
const cartMiddleware = require("./middlewares/cart");
const updateCartPrices = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");

const app = express();

//Make express aware of views folder and
//use EJS templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static css files
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

//Use Middleware
app.use(cartMiddleware);
app.use(addCsrfToken);
app.use(checkAuthStatus);

//Routes
app.use(authRoutes);
app.use(sharedRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes); // /cart/items

//Protect routes to avoid unauthenticated users entering
app.use("/admin", protectRoutes, adminRoutes); // /admin/products
app.use("/orders", protectRoutes, ordersRoutes);

//Error Handling Middleware
app.use(notFoundMiddleware);
app.use(errorHandler);

//Connect to the database
db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database");
    console.log(error);
  });
