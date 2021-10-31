
const express = require('express');
const router = express.Router();
const controller= require('../controllers/moviesController')


  // Exercise 7 Challenge

router.get('/',controller.list)


  // Exercise 8 Challenge

router.get('/:id',controller.detail)




module.exports= router;