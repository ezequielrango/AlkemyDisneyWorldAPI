
const {body} = require('express-validator');
const db = require('../database/models')

module.exports =  [

    body("title")
        .notEmpty().withMessage("The title is required")
        .isLength({max : 255}).withMessage("Maximun length reached"),

    
    body('score')
        .notEmpty().withMessage('You must rate the movie')
        .isInt({min:1,max:5}).withMessage('You must rate from 1 to 5'),

    body('release')
        .notEmpty().withMessage('Enter a Date')
        .isDate().withMessage('Format error'),
      
     body("image")
        .notEmpty().withMessage("The image is required")
        .isLength({max : 255}).withMessage("Maximun length reached"),

    
     body('genreId')
        .notEmpty().withMessage('Enter corresponding genre')
        .isInt().withMessage("Enter only numbers")
        .custom((value,{req}) =>{
            return db.genres.findByPk(value)
            .then(genre =>{
                if(!genre){   //Motivo por el cual se rechaza la promesa
                    return Promise.reject(); // Retorna promesa rechazada
                }
            }).catch(() => Promise.reject("non-existent genre")) // Encapsulo error con el motivo de la promesa rechazada (genero inexistente)
        }),
        
]