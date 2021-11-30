const {body} = require('express-validator');
const db = require('../database/models')

module.exports = [
    body('email').notEmpty().withMessage("required").isEmail().withMessage("Format error").custom((value, {req})=>{
        return db.users.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user){
                return Promise.reject()
            }
        })
        .catch(()=> Promise.reject("This email is already in use"))
    }),
    body('password').notEmpty().withMessage("required").isLength({min: 6}).withMessage("Format error")
]