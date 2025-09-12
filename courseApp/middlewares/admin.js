const { jwt } = require("../utils/libs");

function adminMiddleware(req,res,next) {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

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
    adminMiddleware
}