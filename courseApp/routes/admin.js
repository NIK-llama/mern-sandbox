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

    const requireBody = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        imageUrl: z.string().url(),
        price: z.number().positive(),
    })

    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData){
        return res.json({
            message: "Incorrect data format",
            error: parsedData.error,
        })
    }

    const {title,description,imageUrl,price} = req.body;

    const course = await CourseModel.create({ 
        title, 
        description, 
        imageUrl, 
        price, 
        createrId: adminId 
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course",adminMiddleware, async function(req, res) {
    const adminId = req.id;

    const requireBody = z.object({
        courseId: z.string().min(5),
        title: z.string().min(3).optional(),
        description: z.string().min(5).optional(), 
        imageUrl: z.string().url().min(5).optional(),
        price: z.number().positive().optional(),
    });

    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData){
        return res.json({
            message: "Incorrect data format",
            error: parsedData.error
        });
    }

    const {title,description,imageUrl,price,courseId} = req.body;

    const course = await CourseModel.findOne({
        _id: courseId,
        createrId: adminId
    })


    res.json({
        message: "Course Updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", function(req, res) {

})

module.exports = {
    adminRouter: adminRouter
}