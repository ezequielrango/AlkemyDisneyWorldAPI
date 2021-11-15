
const express = require('express');
const router = express.Router();
const controller= require('../controllers/moviesController')
const validation = require('../validations/moviesValidator') // Middleware de validación

  // Exercise 7 Challenge

router.get('/',controller.list)

  // Exercise 8 Challenge

router.get('/:id',controller.detail)

  // Exercise 9 Challenge (CRUD)

router.post('/',validation,controller.create)
router.put('/:id',validation,controller.update)
router.delete('/:id',controller.delete)


module.exports= router;