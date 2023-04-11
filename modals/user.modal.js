const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{
    versionKey:false
})

const userModal= mongoose.model("user",userSchema)

module.exports=userModal