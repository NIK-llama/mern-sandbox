const { Router } = require("express");
const { AdminModel } = require("../db");
const { bcrypt, z, jwt } = require("../utils/libs");
const JWT_ADMIN_SECRET = "viklaandafdj57498473aljkadf";

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
            adminId: admin._id.toString()
        }, JWT_ADMIN_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

adminRouter.post("/course", function(req, res) {

})

adminRouter.put("/course", function(req, res) {

})

adminRouter.get("/course/bulk", function(req, res) {

})

module.exports = {
    adminRouter: adminRouter
}