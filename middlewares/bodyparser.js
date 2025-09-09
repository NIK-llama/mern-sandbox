const express = require('express');
const app = express();
// const bodyParser = require('body-parser');


app.use(express.json());
// app.use(bodyParser.json());

app.post('/mul', function(req,res) {
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    const result = a*b;
    res.send(`${result}`);
})

app.listen(3000)