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

app.use(express.static(path.join(__dirname, 'uploads')));

// Require routes

const characterRouter = require('./routes/charactersRouter');
const movieRouter = require('./routes/moviesRouter');
const userRouter = require('./routes/usersRouter');


// ENDPOINTS
app.use('/characters',characterRouter); 
app.use('/movies',movieRouter);
app.use('/auth', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

  module.exports = app