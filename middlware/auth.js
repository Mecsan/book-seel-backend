const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

let authenticate = expressAsyncHandler(async (req, res, next) => {

    let token = req.headers['authorization']
    if (!token) throw new Error("authentication required");

    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (e) {
        throw new Error("invalid jwt");
    }
})

module.exports = authenticate;