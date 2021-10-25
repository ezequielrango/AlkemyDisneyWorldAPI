var express = require('express');
var router = express.Router();

// Controllers
const controller= require('../controllers/characterController')



// ROUTES CHARACTER COLLECTION

router.get('/', controller.list)
router.post('/',controller.create)

module.exports = router