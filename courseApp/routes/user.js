const { Router } = require("express");
const { UserModel } = require("../db");

const userRouter = Router();

userRouter.post("/signup", function(req, res) {
    
})

userRouter.post("/signin", function(req, res) {

})

userRouter.get("/owned", function(req, res) {

})

module.exports = {
    userRouter: userRouter
}