const { Router } = require("express");
const { UserModel } = require("../db");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", function(req, res) {
    const requiredBody = z.object({
        
    })
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
})

userRouter.post("/signin", function(req, res) {

})

userRouter.get("/owned", function(req, res) {

})

module.exports = {
    userRouter: userRouter
}