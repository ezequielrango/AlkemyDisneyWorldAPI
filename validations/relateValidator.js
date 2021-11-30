// module dependencies
const {body} = require("express-validator");
const path = require("path");

// database
const db = require("../database/models");

module.exports = [
    
        body("movieId")
        .notEmpty().withMessage("required")
        .custom((value,{req}) =>{
            return db.movies.findByPk(value)
            .then(movie =>{
                if(!movie){
                    return Promise.reject();
                }
            }).catch(() => Promise.reject("the movie doesn't exist"))
        }),

    body("characterId")
    .notEmpty().withMessage("required")
    .custom((value,{req}) =>{
        return db.characters.findByPk(value)
        .then(character =>{
            if(!character){
                return Promise.reject();
            }
        }).catch(() => Promise.reject("the character doesn't exist"))
    }),
]