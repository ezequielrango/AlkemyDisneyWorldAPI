const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const registerValidations = require('../validations/registerValidator');
const loginValidations = require('../validations/loginValidator');


router.post('/login',loginValidations,userController.login)
router.post('/register',registerValidations,userController.register)


module.exports = router