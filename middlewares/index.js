const express = require('express');
const app = express();

var users = [{
    name: "Nik",
    kidneys: [{
        healthy: false
    }]
}];

app.get("/", function(req,res) {
    const nikKidneys = users[0].kidneys;
    const numberOfKidneys = nikKidneys.length;
    const numberOfHealthyKidneys = nikKidneys.filter((kidney) => kidney.healthy).length;
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    })
});

app.use(express.json());

app.post("/",function(req,res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg: "Done!"
    })
});

app.put("/", function(req,res) {
    if(hasUnhealthyKidney(users)) {
        users[0].kidneys.forEach(kidney => { 
        kidney.healthy = true;
    });

    res.json({
        msg: "Done!"
    })
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

app.delete("/", function(req,res) {
    if(hasUnhealthyKidney(users)) {
        users[0].kidneys = users[0].kidneys.filter(kidney => kidney.healthy);

        res.json ({
        msg: "Done!"
    });
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
});

function hasUnhealthyKidney(users) {
  return users[0].kidneys.some(kidney => !kidney.healthy);
}

app.listen(3000);