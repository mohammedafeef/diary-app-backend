//importing the libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// importing the environmental variables
require("dotenv/config");

// creating an instance of the express app
const app = express();

//Using bodyparser through middleware to format the req body
app.use(bodyParser.json());

//setting the cors in the app
app.use(cors());

//ROUTES
//dairy route

//user route

//Connecting to the Database (altas mongoDB)
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.info("DB CONNECTED SUCCESSFULLY")
);

// Running server
app.listen(process.env.PORT || 3000, function () {
  console.info(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
