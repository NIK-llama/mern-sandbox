const { Router } = require("express");
const { AdminModel, CourseModel } = require("../db");
const { bcrypt, z, jwt } = require("../utils/libs");
const { adminMiddleware } = require("../middlewares/admin");

const adminRouter = Router();

adminRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.string().min(5).max(30).email(),
        password: z.string().min(4).max(40),
        firstname: z.string().min(2).max(30),
        lastname: z.string().min(2).max(30)
    })

    const parsedData = requiredBody.safeParse(req.body);

     if (!parsedData.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedData.error
        })
        return
    }

    const { email, password, firstname, lastname } = req.body;

    const hashedPassword = await bcrypt.hash(password,5);

    let errorThrown = false;
    try {
        await AdminModel.create({
            email,
            password: hashedPassword,
            firstname,
            lastname
        });
    } catch(e) {
        res.json({
            message: "User already exists"
        })
        errorThrown = true;
    }

    if(!errorThrown) {
        res.json({
            message: "You are signed up"
        })
    }
});

adminRouter.post("/signin", async function(req, res) {
    const { email , password } = req.body;
    const admin = await AdminModel.findOne({
        email
    })

    if(!admin) {
        res.status(403).json({
            message: "user does not exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if(passwordMatch) {
        const token = jwt.sign({
            id: admin._id.toString()
        }, process.env.JWT_ADMIN_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.id;

    const {title,description,imageUrl,price} = req.body;

    const course = await CourseModel.create({ 
        title, 
        description, 
        imageUrl, 
        price, 
        creatorId: adminId 
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
});

adminRouter.put("/course",adminMiddleware, async function(req, res) {
    const adminId = req.id;

    const {title,description,imageUrl,price,courseId} = req.body;

    const result = await CourseModel.updateOne(
        { _id: courseId, creatorId: adminId },
        { title, description, imageUrl, price }
    );

    if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Course not found or not authorized" });
    }

    res.json({ message: "Course updated successfully" });

});

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.id;

    const courses = await CourseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "Your Courses",
        courses
    })
});

module.exports = {
    adminRouter: adminRouter
}