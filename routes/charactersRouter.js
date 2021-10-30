const { Router } = require('express');
var express = require('express');
var router = express.Router();

// Controllers
const controller= require('../controllers/characterController')



// ROUTES CHARACTER COLLECTION


    // Excercise 3 

router.get('/', controller.list)


    // Excercise 4

router.post('/',controller.create)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)

    // Excercise 5

router.get('/:id',controller.detail)

  // Excercise 6 Search character

router.get('/search',controller.search)





module.exports = router