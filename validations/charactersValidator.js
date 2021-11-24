const {body} = require('express-validator');
const db = require('../database/models');
const path = require('path');

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

   
     body("image").custom((value,{req})=>{
        let extensions = [".jpg",".jpeg",".gif",".png",]

        if(!req.file){  // If there is no file in the request
            throw new Error("required")
        }else{
            if(!extensions.includes(path.extname(req.file.originalname))){// If there is a file in the request but it does not contain an extension of those contained in the array :
                throw new Error(`las extensiones permitidas son ${extensions.join(", ")}`);
            }else{
                return true 
            }
        }
    }),
    ]