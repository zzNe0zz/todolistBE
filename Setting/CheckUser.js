const express = require("express")
const jwt =require("jsonwebtoken")
const userModel = require("../Model/UserModel/user")

module.exports.checkRole = async function (req,res,next){
    let token = req.headers.authorization.split(" ")[1]
    const data = jwt.verify(token,"ne0")
   if(data.user.role === "admin"){

       next()
   }
   else if(data.user.role === "user"){
    res.status(400).json( "not have access")
   }
    console.log(data);
}

module.exports.checkToken = async function(req,res,next){
    let token = req.headers.authorization.split(" ")[1]
    const data = jwt.verify(token,"ne0")
    if(data){
        next()
    }
    else res.status(400).json("Sigin")
}
