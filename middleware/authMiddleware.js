const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('token: ', token);
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err) {
                console.log('secret key: ', process.env.SECRET_KEY);
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log('decoded token: ', decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user.email;
                next();
            }
            }
        )
    }
    else {
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth, checkUser};