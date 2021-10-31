
const express = require('express');
const router = express.Router();
const controller= require('../controllers/moviesController')


  // Exercise 7 Challenge

router.get('/',controller.list)



module.exports= router;