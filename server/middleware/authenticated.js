const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Unauthenticated = require('../error/unauthenticated');

const auth = async (req, res, next) => {
    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer ')) {
        // throw new Unauthenticated('Authenticated invalid!!!');
        return res.status(401).json({success: false, message: 'Authenticated invalid!!!'});
    }

    const token = authheader.split(' ')[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            userId: payload.userId,
            username: payload.username
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

module.exports = auth;