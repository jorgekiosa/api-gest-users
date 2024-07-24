const routes = require("express").Router()

//ROTAS USER
const userRouter= require('./user')
routes.use("/",userRouter);
//ROTAS PRODUTO

module.exports=routes