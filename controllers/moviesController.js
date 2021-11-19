const db = require('../database/models');
const {Op} = require('sequelize');
const fs = require('fs');
const path = require('path');

const getURLBase = req => `${req.protocol}://${req.get('host')}`;

const { validationResult } = require("express-validator");


module.exports = {
    


       // Exercise 7 && 10 Challenge

    list : (req,res) => {
        db.movies.findAll({
            attributes : ['title','release','image'],

            include: [{association: 'genre'}],

            where : {
                title : {
                    [Op.substring] : req.query.title ? req.query.title : ""  //If through the query of the request comes a title, it looks for that value or else it brings all of them. The Op. takes the string space.
                },
                genreId : {
                    [Op.substring] : req.query.genre ? req.query.genre : ""
                } 
            },
            order : [
                ["title",req.query.order && req.query.order.toUpperCase() == "DESC" ? req.query.order : "ASC"]
            ]  // Example : http://localhost:3030/movies/?order=DESC  || http://localhost:3030/movies/?order=ASC
      
        }).then(movies => {
            const response = {
                status : 200,
                quantity : movies.length,
                msg : 'All movies',
                data: movies,
             
            }
            res.status(200).json(response)
        }).catch(err => {
            const response = {
                status : 500,
                msg :'internal error server'
            }
            res.status(500).json(response)
        })
    },

 /*============================================*/  

      // Exercise 8 Challenge

    
    detail : (req,res) => {
        db.movies.findByPk(req.params.id,{
            include : [
                { association : "genre",},
                { association : "characters"},
            ]

        }).then(movie => {
          
            movie.image=  getURLBase(req) + '/movies/' + movie.image
        
            const response  ={
                meta : {
                    status: 200,
                    msg :'Detail movie and characters',
                },
                data : {
                    movie, 
                } 
            }
            res.status(200).json(response)
        }).catch(err => {
            console.log(err);
            const response = {
                status: 500,
                msg: 'Internal server error'
            }
            res.status(500).json(response)
        })


    },



/*============================================*/

    // Exercise 9 Challenge (CRUD)

    
    create : async (req,res)=> {
        const errors = validationResult(req);
        if(errors.isEmpty()){

            db.movies.create({
                title : req.body.title,
                score : +req.body.score,
                release : req.body.release,
                image :  req.file.filename ,
                genreId : +req.body.genreId
          
            }).then(newMovie=>{
                let response = {
                    status : 201,
                    url : getURLBase(req) + '/movies/' + newMovie.id ,
                    message : 'movie create'
                }
                return res.status(201).json(response)
            
            }).catch(err =>{ //error promise
                req.file ? fs.unlinkSync(path.join(__dirname, '../images/movies/', req.file.filename)) : null ; // If an error occurs, the uploaded file will be deleted.
            
                console.log(err)
                const response = {
                    status : 400,
                    msg : "movie no create"
                }
                res.status(400).json(response);
            })

        }else{ // second option of the conditional
            req.file ? fs.unlinkSync(path.join(__dirname, '../images/movies/', req.file.filename)) : null;
            const response = {
                status : 500 ,
                msg : 'Error data validation',
                errors : errors.mapped()
            }
            res.status(500).json(response);
        }

     },


/*============================================*/


     update : async (req,res)=> {

         const errors  =validationResult(req);  // Validation results.

        db.movies.findByPk(req.params.id)
        .then(movie=>{

            if(errors.isEmpty()){ //  If the errors variable is empty, proceed to update the movie

            db.movies.update({
                title : req.body.title,
                score : +req.body.score,
                release : req.body.release,
                image : req.body.image,
                genreId : +req.body.genreId
            },{
                where : {
                    id : req.params.id    
                }  
        
             }).then(movieUpdated=>{
                 const response = {
                     status :200,
                     meta : {
                        url : getURLBase(req) + '/characters/' + movieUpdated.id
                    },
                     msg : 'movie updated '
                 }
                 res.status(200).json(response);
    
             }).catch(err=> { // err update 
                 console.log(err);
                 const response = {
                    status : 500,
                    msg :'internal server error '
                }
                res.status(500).json(response)
             })
             
        }else{

            const response = {
                status : 400,
                msg : "error when updated the movie",
                errors : errors.mapped(),
            }
            res.status(400).json(response);
        }
            
        }).catch(err => { // err question db
            console.log(err);
            const response = {
                status : 400,
                msg : 'movie doesnt exist in the API'
            }
            res.status(400).json(response)
        })
     },


 /*============================================*/


     delete : async (req,res) => {
        db.movies.findByPk(req.params.id)

        .then(movieDestroy =>{
            db.movies.destroy({
                where : {
                    id : req.params.id
                }
            })
            const response = {
                status : 200,
                msg : 'movie deleted'
            }
            res.status(200).json(response)

        }).catch(err=> { // err delete 
                 console.log(err);
                 const response = {
                    status : 500,
                    msg :'internal server error'
                }
                res.status(500).json(response)
             })
     },


}