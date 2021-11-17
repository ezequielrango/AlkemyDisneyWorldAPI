const {body} = require('express-validator');
const db = require('../database/models');


module.exports = [

    body('name')
     .notEmpty().withMessage('Please enter the name')
     .isLength({ min: 3, max: 255 }).withMessage('The name must contain between 5 and 255 characters'),

    body('age')
     .notEmpty().withMessage('please enter the age')
     .isInt().withMessage('enter numbers only'),

    body('weight')
     .notEmpty().withMessage('please enter the weight')
     .isInt().withMessage('enter numbers only'),

    body('history')
     .notEmpty().withMessage('please enter the history of character')
     .isLength({ min: 50, max: 1000 }).withMessage('The history must contain between 50 and 1000 characters'),

     body('image')
     .notEmpty().withMessage('Please enter one image')
     .isLength({ min: 5, max: 255 }).withMessage('The image name must contain between 5 and 255 characters'),
    ]