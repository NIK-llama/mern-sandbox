const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "nbjd443od8593jfa&&94*kandkl";
const { UserModel, TodoModel } = require("./db");

mongoose.connect("mongodb+srv://nik:29IcOSqcV4g1qgfN@cluster0.5lf5tpm.mongodb.net/todoDB");
const app = express();
app.use(express.json());

app.post('/signup', async function(req,res) {
    const requiredBody = z.object({
        email: z.string().min(5).max(30).email(),
        password: z.string().min(3).max(30),
        name: z.string().min(3).max(100)
    })

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedData.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password,5);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
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

app.post('/signin', async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
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
        }, JWT_SECRET)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

app.post('/todo', auth, async function(req,res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title: title,
        done: done,
        userId: userId
    })

    res.json({
        message: "Todo Created!"
    })
});

app.get('/todos', auth, async function(req,res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    })

    res.json({
        todos: todos
    })
});

function auth(req, res, next){
    const token = req.headers.token;

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if(decodedToken) {
        req.userId = decodedToken.userId;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

app.listen(3000);
