const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todoList")

const regex = new RegExp( /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)
const UserSchema = mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    name : String,

    phone:Number,
    email:{
        type:String,
        pattern:"/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/"

    },
    task:[
        {

        }
    ],
    avatar:[String],
    role :{
        type:String,
        default:"user"
    }
})

const userModel = mongoose.model("user",UserSchema)

module.exports = userModel