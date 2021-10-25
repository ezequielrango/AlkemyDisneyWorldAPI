const db = require('../database/models')
const {Op} = require('sequelize')



module.exports={

    // Exercise 3 Challenge

    list : async (req,res)=> {
        db.characters.findAll({
            attributes: ["name", "image"]
        }).then(characters =>{
             let response = {
                 meta : {
                     status: 200,
                     msg: 'ALL CHARACTERS'
                 },
                 data : characters
             }
             res.json(response)
            //  res.status(200).json(characters) // ERROR QUE COSTÓ 4HS DE MI TIEMPO >.<
             
        }).catch(err =>{
                console.log(err);

                const response = {
                    status : 500,
                    msg : "internal error server"
                }
                res.status(500).json(response);
            })
        // res.send(200,{message: 'probando'})
     },


    // Exercise 4 Challenge (CRUD)
     create : async (req,res)=> {
        db.characters.create({
            where : req.body.id
        })
     }


}
