const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('token: ', token);
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err) {
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

module.exports = {requireAuth};