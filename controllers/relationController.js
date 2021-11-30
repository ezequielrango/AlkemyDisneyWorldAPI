// database and operators parameters
const db = require("../database/models");
const {Op} = require("sequelize");


const {validationResult} = require("express-validator");




module.exports = {

    add: (req,res) =>{
     
        const errors = validationResult(req);

        if(errors.isEmpty()){

            db.movieCharacter.create({
                movieId: req.body.movieId,
                characterId: req.body.characterId 

            }).then(successfulRelationship =>{
                const response = {
                    status : 201,
                    msg : " created ",
                }

                res.status(201).json(response);
            }).catch(err =>{
                const response = {
                    status : 500,
                    msg : "internal server error",
                }
    
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            const response = {
                status : 400,
                msg : "error in the process",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    },

    delete: (req,res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.movieCharacter.destroy({
                where: {
                    [Op.and]: [{characterId: req.body.characterId}, {movieId: req.body.movieId}]
                }
            }).then(related =>{
                const response = {
                    status : 200,
                    msg : " relation deleted",
                }

                res.status(200).json(response);
            }).catch(err =>{
                const response = {
                    status : 500,
                    msg : "internal server error",
                }
    
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            const response = {
                status : 400,
                msg : "error error in the process",
                errors : errors.mapped()
            }

            res.status(400).json(response);
        }
    }
}