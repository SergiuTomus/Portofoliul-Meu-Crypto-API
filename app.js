// APP MIDDLEWARES
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const apiRoutes = require("./routes/routes");
const db = require("./models/index");

const initApp = async () => {
  const app = express();

  app.use(morgan("dev"));
  // app.use("/img", express.static("img")); // middleware that makes the 'img' folder publicly available
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Access Control middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  // Passport middleware
  app.use(passport.initialize());
  require("./config/passport")(passport);

  // Middleware for defined routes
  app.use("/", apiRoutes);

  // Middleware for requests that does not matched with the defined routes
  app.use((req, res, next) => {
    const error = new Error("Resursa nu a fost gasita");
    error.status = 404;
    next(error);
  });

  // Middleware for all errors in the app
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  try {
    // await sequelize.sync({ force: true });
    await db.sequelize.authenticate();
    console.log("Database connection has been established successfully."); // to delete
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return app;
};

module.exports = initApp;
