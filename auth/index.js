const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'randomNIknik';
const app = express();

app.use(express.json());

const users = [];

function auth(req,res,next) {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token,JWT_SECRET);
    
    if(decodedToken.username) {
        req.username = decodedToken.username;
        next();
    } else {
        res.json({
            message: "You are no logged in"
        })
    }
}

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.post('/signup', function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: 'You are signedup'
    })
})

app.post('/signin', function(req,res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(u => u.username === username && u.password === password);

    if(foundUser) {
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);

        //found.token = token;
        res.send({
            token
        })
    } else {
        res.status(403).send({
            message: "Invalid Username or Password"
        })
    }
})

app.get('/me', auth, function(req,res) {
    let foundUser = users.find(u => u.username === req.username);
    if (foundUser) {
        res.json({
            username: foundUser.username,
            password: foundUser.password
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000);