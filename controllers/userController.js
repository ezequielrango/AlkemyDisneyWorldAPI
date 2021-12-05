const db = require('../database/models')
const {Op}  =require('sequelize')
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const sendgridKey = process.env.SENDGRID_API_KEY;

const transporter = nodemailer.createTransport(sendGridTransport({
    auth:{
        api_key: sendgridKey
    }
})) 


module.exports = {

    register : async (req,res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            db.users.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,10)  //encrypt password
            }).then(newUser =>{
                const response = {
                    status: 201,
                    msg: "create, check email ",
                }
                transporter.sendMail({
                    to: newUser.email, 
                    from: 'ezequielrango29@gmail.com', 
                    subject: 'Challenge Alkemy Backend con Node.js',
                    html: `<p>Gracias por registrarte${newUser.email}</p>`,
                })
                

                res.status(200).json(response)
            }).catch(err =>{
                const response = {
                    status: 500,
                    msg: "internal server error"
                }
                console.log(err);
                res.status(500).json(response);
            })
        }else{
            const response = {
                status: 400,
                msg: "error account create",
                errors : errors.mapped()
            }
            
            res.status(400).json(response)
        }
    },

    login : async (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            }).then(user =>{
                    const userToken = {
                        id: user.id,
                        name: user.email
                    };

                    const token = jwt.sign(userToken,process.env.KEY_SECRET, {
                        expiresIn: '1h'
                      });

                    const response = {
                        status: 200,
                        token: token,
                        msg : 'please enter the token, expire in 1h'
                    }

                    res.status(200).json(response);
            }).catch(err =>{
                const response = {
                    status: 401,
                    msg: "invalid credentials"
                }

                res.status(401).json(response);
            })
        }else{
            const response = {
                status: 401,
                msg: "invalid credentials",
                errors: errors.mapped()
            }

            res.status(401).json(response);
        }
    }
}