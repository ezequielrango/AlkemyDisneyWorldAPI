const db = require('../database/models')
const {Op} = require('sequelize')
const getURLBase = req => `${req.protocol}://${req.get('host')}`;


module.exports = {
    
       // Exercise 7 Challenge

    list : (req,res) => {
        db.movies.findAll({
            attributes : ['title','release','image'],
        }).then(movies => {
            const response = {
                status : 200,
                msg : 'All movies',
                data: movies
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

      // Exercise 8 Challenge

    
    detail : (req,res) => {
        db.movies.findByPk(req.params.id,{
            include : [ 
                {association : 'characters'}
            ]

        }).then(movie => {
            const response  ={
                status: 200,
                msg :'Detail movie and characters',
                data : movie
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


    }


}