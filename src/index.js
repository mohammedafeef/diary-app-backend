//importing the libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//importing the routes
const authRoutes = require("./routes/authRoute");
const dairyRoutes = require("./routes/dairyRoute");
const globalErrorHandler = require("./controllers/errorController");


// creating an instance of the express app
const app = express();

//Using bodyparser through middleware to format the req body
app.use(bodyParser.json());

//setting the cors in the app
app.use(cors());

//ROUTES
//dairy route
app.use("/dairy", dairyRoutes);
//user route
app.use("/auth", authRoutes);

// handle undefined Routes
app.use("*", (req, res, next) =>
  res.status(404).json({ message: "undefined route" })
);

//global error handling
app.use(globalErrorHandler);

module.exports = app;
