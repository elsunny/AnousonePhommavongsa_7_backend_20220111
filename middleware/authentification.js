const jwt = require("jsonwebtoken");

require('dotenv').config({ path:'/config/.env'});

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.userJwt;
        if(token) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  
            const findUser = decodedToken.id;
            if (req.body.id && req.body.id !== findUser.id) {
                throw "Invalid user ID";
            }
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


