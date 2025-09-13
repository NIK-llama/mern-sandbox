const { Router } = require("express");
const { CourseModel, PurchaseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const { json } = require("zod");

const courseRouter = Router();

courseRouter.post("/purchase",userMiddleware, async function(req, res) {
    const userId = req.id;
    const courseId = req.body.courseId;

    if(!courseId){
        return res.status(400).json({
            message: "Please provide a courseId",
        });
    }

    const alreadyPurchased = await CourseModel.findOne({
        courseId,
        userId
    })

    if(alreadyPurchased){
        return res.json({
            message:"You have already bought this course",
        });
    }

    await PurchaseModel.create({
        courseId,
        userId
    })

    res.json({
        message: "You have successfully bought the course"
    })

})

courseRouter.get("/preview", async function(req, res) {
    const courses = await CourseModel.find({});
    
    res.json({
        courses
    })

})

module.exports = {
    courseRouter: courseRouter
}