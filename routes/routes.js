const { Router } = require('express');
const authController = require('../controllers/authController');
const {requireAuth, checkUser} = require('../middleware/authMiddleware');

const router = Router();

router.get('*', checkUser);

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', authController.login_get);

router.get('/signup', authController.signup_get);

router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);

router.get('/logout', authController.logout_get);

router.get('/quotations', requireAuth, (req, res) => {
    res.render('quotations');
});

module.exports = router;

