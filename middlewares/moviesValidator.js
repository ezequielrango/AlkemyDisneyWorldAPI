
const {body} = require('express-validator');

module.exports =  [

    body("title")
        .notEmpty().withMessage("the title is required")
        .isLength({max : 255}).withMessage("maximun length reached"),

    
    body('score')
        
]