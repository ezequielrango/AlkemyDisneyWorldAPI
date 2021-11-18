
const express = require('express');
const router = express.Router();
const path= require('path');


//controller
const controller= require('../controllers/moviesController');

 // Middleware validation
const validation = require('../validations/moviesValidator');
// Middleware uploadFile
const upload = require('../middlewares/UploadImageMovie');



  // Exercise 7 Challenge

router.get('/',controller.list)

  // Exercise 8 Challenge

router.get('/:id',controller.detail)

  // Exercise 9 Challenge (CRUD)

router.post('/',upload.single('image'),validation,controller.create)
router.put('/:id',upload.single('image'),validation,controller.update)
router.delete('/:id',controller.delete)


module.exports= router;