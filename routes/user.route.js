const express= require('express');
const { registerUser, loginUser } = require('../controller/user.controller');

const userRouter= express.Router();
userRouter.post("/signup",registerUser)
userRouter.post("/login",loginUser)
module.exports=userRouter