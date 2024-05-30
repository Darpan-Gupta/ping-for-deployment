const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;


    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // decondes token id
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decode.id).select("-password");  // always remember to remove password or sensitive information after fetching data from database before passing it to frontend.

            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, Token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, Token failed");
    }
})

module.exports = { protect };