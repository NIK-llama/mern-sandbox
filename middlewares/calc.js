const express = require('express');
const app = express();

function loggerMiddleware(req,res,next) {
    console.log("Method is: " + req.method);
    console.log("Host is: " + req.hostname);
    console.log("Route is: " + req.url);
    console.log(new Date());
    next();
}

app.use(loggerMiddleware);

app.get('/mul/:a/:b', function(req,res) {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const result = a*b;
    res.send(`${result}`)
})

app.get('/add', function(req,res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const result = a+b;
    res.send(`${result}`)
})

app.get('/div', function(req,res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const result = a/b;
    res.send(`${result}`)
})

app.get('/sub', function(req,res) {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const result = a-b;
    res.send(`${result}`)
})

app.listen(3000)