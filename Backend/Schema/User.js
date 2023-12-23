const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("User",userSchema)
module.exports=User