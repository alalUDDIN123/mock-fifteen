
const express =require("express");
const config=require("dotenv");
const ConnectDb = require("./config/Db.connect");
config.config();
const cors= require("cors");
const userRouter = require("./routes/user.route");
const boardRouter = require("./routes/task.route");

const app= express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome backedn")
})

app.use("/",userRouter)
app.use("/",boardRouter)
const port =process.env.PORT

app.listen(port,async()=>{
    await ConnectDb()
    console.log(`Server running on http://localhost:${port}`)
})