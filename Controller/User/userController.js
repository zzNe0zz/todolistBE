const userModel = require("../../Model/UserModel/user")
const bcryp = require("bcrypt")
// const cookies = require("cookie-parser")
const jwt = require("jsonwebtoken")
exports.creatUser = async function(req,res){

    try {   
            let checkUser = await userModel.findOne({username:req.body.username})
            if(checkUser){
                res.status(400).json({mess:"user availible"})
            }else if(checkUser === null){
                let password =  bcryp.hashSync(req.body.password,10)
                let data = await userModel.create({
                    username:req.body.username,
                    password
                })
                res.status(200)
            }
            console.log(checkUser);
           
          
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.login = async function(req,res){
    try {
        let user = await userModel.findOne({username:req.body.username})
       if(user){
           let checkPassword = await bcryp.compare(req.body.password,user.password)
           if(checkPassword === true){
               let  token = jwt.sign({user},"ne0",{expiresIn:"7d"})
                delete user._doc.password
                delete user._doc._id
               res.status(200).json({token,user})
           }
           else if(checkPassword === false){
                res.status(400).json("password wrong")
           }
       }
        else if(user=== null){
            res.status(400).json("user")
        }    
    } catch (error) {
        res.status(500).json({mess:error})
    }
}
exports.getAlluser = async function(req,res){
       try {
            let data = await userModel.find()
            res.status(200).json(data)
       } catch (error) {
        res.status(400).json(error)
       }
}
exports.profile = async function(req,res){
    try {
        console.log(req);
    } catch (error) {
        
    }
}

exports.upAvatar = async function(req,res){
    try {
        // console.log(req);
        res.status(200).json("ok")
    } catch (error) {
        res.status(400).json("ok")
        console.log(error);
    }
}