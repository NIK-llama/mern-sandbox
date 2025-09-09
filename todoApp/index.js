const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "nbjd443od8593jfa&&94*kandkl";
const { UserModel, TodoModel } = require("./db");

mongoose.connect("mongodb+srv://nik:29IcOSqcV4g1qgfN@cluster0.5lf5tpm.mongodb.net/todoDB");
const app = express();
app.use(express.json());

app.post('/signup', async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You are signed up"
    })
})

app.post('/signin', async function(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user);

    if(user) {
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
})

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
})

app.get('/todos', auth, async function(req,res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId: userId
    })

    res.json({
        todos: todos
    })
})

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
