const mongoose=require("mongoose");
mongoose.set("strictQuery",false);

const ConnectDb=()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((res)=>{
        console.log("Database connected")
    }).catch(err=>{
        console.log("Unable to connect",err)
    })
}

module.exports=ConnectDb