const express= require('express');
const { createAboard, getBoardsData } = require('../controller/board.controller');
const authenticaeUser = require('../middleware/authentication.middleware');


const boardRouter= express.Router()
boardRouter.post("/create", authenticaeUser,createAboard)
boardRouter.get("/get", authenticaeUser,getBoardsData)
module.exports=boardRouter