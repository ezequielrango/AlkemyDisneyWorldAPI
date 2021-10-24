import { Router } from 'express';

// Controllers

const controller= require('../controllers/characterController')



// Route all characters
Router.get('/', controller.list)


module.exports = Router