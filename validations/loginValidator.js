const db = require('../database/models');

const {body} = require('express-validator');
const bcrypt = require('bcryptjs');

module.exports = [
    body('email').custom((value, {req}) => {
        return db.users.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                return Promise.reject()
            }
        })
        .catch(error => Promise.reject("Invalid credentials"))
    })
]