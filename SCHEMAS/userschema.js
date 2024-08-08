//import mongoose
const mongoose = require('mongoose')

//create scheme
const usersheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 character but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        valdator(value){
            if(!validator.isEmail(value))
            {throw new Error('invalid Email')}
        }
    },
    password:{
        type:String
       
    },
    profile:{
        type:String
    }

})

const users = mongoose.model("users",usersheme)
module.exports = users