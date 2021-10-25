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

// Require routes

const characterRouter = require('./routes/charactersRouter');




// ENDPOINTS
app.use('/characters',characterRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

  module.exports = app