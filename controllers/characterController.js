const db = require('../database/models')
const {Op} = require('sequelize')
const getURL = req => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = req => `${req.protocol}://${req.get('host')}`;



module.exports= {

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


 /*===============================================================================*/

    // Exercise 4 Challenge (CRUD)


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/    
     create : async (req,res)=> {
   
        db.characters.create({
            name : req.body.name,
            age: +req.body.age,
            weight: +req.body.weight,
            history: req.body.history,
            image: req.body.image
      
        }).then(newCharacter=>{
            let response = {
                status : 201,
                meta : {
                    url : getURLBase(req) + '/characters/' + newCharacter.id
                },
                message : 'character create'
            }
            return res.status(201).json(response)
       
        }).catch(err =>{
            console.log(err);

            const response = {
                status : 400,
                msg : "character no create"
            }
            res.status(400).json(response);
        })
     },

   /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

     update : async (req,res)=> {
        db.characters.findByPk(req.params.id)
        .then(character=>{
            db.characters.update({
                 name : req.body.name,
                 age: +req.body.age,
                 weight: +req.body.weight,
                 history: req.body.history,
                 image: req.body.image
            },{
                where : {
                    id : req.params.id    
                }  
        
             }).then(characterUpdate=>{
                 const response = {
                     status :200,
                     meta : {
                        url : getURLBase(req) + '/characters/' + character.id
                    },
                     msg : 'character updated '
                 }
                 res.status(200).json(response);
    
             }).catch(err=> { // err update 
                 console.log(err);
                 const response = {
                    status : 500,
                    msg :'internal server error ju-ju'
                }
                res.status(500).json(response)
             })
            
        }).catch(err => { // err question db
            console.log(err);
            const response = {
                status : 500,
                msg : 'character doesnt exist in the API'
            }
            res.status(500).json(response)
        })
     },


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 

     delete : async (req,res) => {
        db.characters.findByPk(req.params.id)

        .then(characterDestroy =>{
            db.characters.destroy({
                where : {
                    id : req.params.id
                }
            })
            const response = {
                status : 200,
                msg : 'character deleted'
            }
            res.status(200).json(response)

        }).catch(err=> { // err update 
                 console.log(err);
                 const response = {
                    status : 500,
                    msg :'internal server error ju-ju'
                }
                res.status(500).json(response)
             })
     },


    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/ 


    detail : async (req,res)=> {  
        db.characters.findByPk(req.params.id,{
            include : [                   // 2 parameter
                { association :'movies', attributes: ['name','id', 'title']}  // name association and atributes other model
            ]
        }).then(detailCharacter=> {
            db.movies.findOne({
                where : {
                    id : detailCharacter.movieId,
                },
        })
    }

        )}
}