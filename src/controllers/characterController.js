const path= require('path');
const db = require("../database/models");
const {Op} = require('sequelize');


module.exports={
    index : (req,res)=>{
        db.characters.findAll({
            include : [
                {association : "category"},
                {association : "type"},
                {association : "images"}
            ]
        })
            .then(products =>{
                res.render('index',{
                    products,
                    toThousand
                })
            })
        },

    }