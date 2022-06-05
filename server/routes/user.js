const express = require("express"),
  router = express.Router(),
  auth = require('../middleware/auth');

const {
  createUser,
  login,
  info,
  sendOtp,
  verifyOtp,
  updatePwd
} = require('../controllers/user');


router.route('/register').post(createUser);
router.route('/login').post(login);
router.route('/info/:_id').post(auth, info);

// Forgot Password
router.route('/forgot-password').post(sendOtp);
router.route('/verify-otp').post(verifyOtp);
router.route('/update-pwd').put(updatePwd);


module.exports = router;