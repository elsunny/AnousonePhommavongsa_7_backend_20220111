const User = require("../models/user-model");

const jwt = require("jsonwebtoken");

require('dotenv').config({ path:'/config/.env'});

// token verification
module.exports = async (req, res, next) => {
    try {
        const token = req.cookies.userJwt;
        if(token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  
            const userId = decodedToken.id;
            
            const user = await User.findOne({
                where: {
                    id: userId,
                },
            });
            if (!user) {
                throw "Invalid user ID";
            }
            req.user = user;
            next();
        } else {
            throw 'token is missing';
        }
    } catch (error) {
        res.status(401).json({
            error: error | "Requête non authentifiée !",
        });
    }
};


