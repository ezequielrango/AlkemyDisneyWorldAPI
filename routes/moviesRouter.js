
const express = require('express');
const router = express.Router();
const controller= require('../controllers/moviesController')


  // Exercise 7 Challenge

router.get('/',controller.list)

  // Exercise 8 Challenge

router.get('/:id',controller.detail)

  // Exercise 9 Challenge (CRUD)

router.post('/',controller.create)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)


module.exports= router;