const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/signup', (req, res) => {
    res.render('signup');
});


router.get('/quotations', (req, res) => {
    res.render('quotations');
});

module.exports = router;

