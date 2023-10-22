const jwt = require('jsonwebtoken');
const {Jwt_secret} = require('../keys');
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = (req,res,next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must have to login to Create post 1"});
    }
    const token = authorization.replace( "Bearer ","")
    console.log(token)
    jwt.verify(token,Jwt_secret,(err,payload)=>{
        console.log(payload)
        if(err){
            return res.status(401).json({error:"You must have to login to Create post 2"});
        }
        else{
            const {_id} = payload
            USER.findById(_id).then(userData=>{
                req.user = userData;
                next();
            })
        }
    })
   
}