const express = require('express');
const app = express();
const createError = require('http-errors');
const fs = require("fs");
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require("method-override");
const env = require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const authorization = require('./validations/authorization')

app.use(express.static(path.join(__dirname, 'images')));

// Require routes

const characterRouter = require('./routes/charactersRouter');
const movieRouter = require('./routes/moviesRouter');
const userRouter = require('./routes/usersRouter');
const relateRouter = require("./routes/relationRouter")

app.use('/auth', userRouter); //  I use the routes related to the users to generate and return the token, before requesting the generated token in the header, as in the rest of the routesI use the routes related to the users to generate and return the token, before requesting the generated token in the header, as in the rest of the routes
app.use(authorization); //apply the authorization before the program reads the routes

// ENDPOINTS (all private)
app.use('/characters',characterRouter); 
app.use('/movies',movieRouter);
app.use("/relation",relateRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

  module.exports = app