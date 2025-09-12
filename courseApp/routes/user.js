const { Router } = require("express");
const { UserModel } = require("../db");
const { bcrypt, z, jwt } = require("../utils/libs");
const JWT_USER_SECRET = "nikva3837nkaadlfuaanvav";

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
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
        await UserModel.create({
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

userRouter.post("/signin", async function(req, res) {
    const { email , password } = req.body;
    const user = await UserModel.findOne({
        email
    })

    if(!user) {
        res.status(403).json({
            message: "User does not exist"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(passwordMatch) {
        const token = jwt.sign({
            userId: user._id.toString()
        }, JWT_USER_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

userRouter.get("/owned", function(req, res) {

})

module.exports = {
    userRouter: userRouter
}