const { jwt } = require("../utils/libs");

function userMiddleware(req,res,next) {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_USER_SECRET);

    if(decodedToken) {
        req.id = decodedToken.id
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware
}