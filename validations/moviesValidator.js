
const {body} = require('express-validator');
const db = require('../database/models');
const path = require('path')

module.exports =  [

    body('title')
        .notEmpty().withMessage('The title is required')
        .isLength({ min: 5, max: 255 }).withMessage('The title must contain between 5 and 255 characters'),

    
    body('score')
        .notEmpty().withMessage('You must rate the movie')
        .isInt({min:1,max:5}).withMessage('You must rate from 1 to 5. Enter only numbers'),

    body('release')
        .notEmpty().withMessage('Enter a Date')
        .isDate().withMessage('Format error'),
      

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
    
     body('genreId')
        .notEmpty().withMessage('Enter corresponding genre')
        .isInt().withMessage('Enter only numbers')
        .custom((value,{req}) =>{
            return db.genres.findByPk(value)
            .then(genre =>{
                if(!genre){   //Reason for rejection of the promise
                    return Promise.reject(); // Return of rejected promise
                }
            }).catch(() => Promise.reject('non-existent genre')) // I encapsulate error with the reason for the rejected promise (non-existent gender).
        }),
        
]