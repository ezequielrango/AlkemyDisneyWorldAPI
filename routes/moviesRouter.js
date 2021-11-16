
const express = require('express');
const router = express.Router();

//controller
const controller= require('../controllers/moviesController')

 // Middleware de validación
const validation = require('../validations/moviesValidator')



  // Exercise 7 Challenge

router.get('/',controller.list)

  // Exercise 8 Challenge

router.get('/:id',controller.detail)

  // Exercise 9 Challenge (CRUD)

router.post('/',validation,controller.create)
router.put('/:id',validation,controller.update)
router.delete('/:id',controller.delete)


module.exports= router;