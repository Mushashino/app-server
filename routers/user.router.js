const router = require('express').Router();
const { signUp, verifyOtp, login } = require('../controllers/user.controller');

router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/login').post(login);

module.exports = router; 