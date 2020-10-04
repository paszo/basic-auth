const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
    let errors = {email: '', password: '', login: ''};
    console.log(err);

    // login errors
    if((err.message === 'incorrect email') || (err.message === 'incorrect password')) {
        errors.login = 'that email or password is not correct';
    }

    // signup errors
    // duplicate error code
    if(err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};

const createToken = (id) => {
    return jwt.sign({id}, SECRET_KEY, {expiresIn: maxAge});
};

const signup_post =  async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({email, password});
        console.log(`I got user ${user}`);
        const token = createToken(user._id);
        console.log('jwt', token);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

const login_get = (req, res) => {
    res.render('login');
};

const signup_get = (req, res) => {
    res.render('signup');
};

const login_post = async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

const logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get
}