
const express = require('express');
const router = express.Router();
// Controllers
const controller= require('../controllers/characterController')
const upload = require('../middlewares/UploadImageCharacter')

const validation = require('../validations/charactersValidator') // Middleware de validación


// ROUTES CHARACTER COLLECTION


    // Excercise 3 

router.get('/', controller.list)


    // Excercise 4

router.post('/',upload.single('image'),validation,controller.create)
router.put('/:id',upload.single('image'),validation,controller.update)
router.delete('/:id',controller.delete)

    // Excercise 5

router.get('/:id',controller.detail)







module.exports = router