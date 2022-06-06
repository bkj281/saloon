const express = require("express"),
  router = express.Router(),
  auth = require('../middleware/auth');

const {
  createUser,
  login,
  info,
  updateInfo
} = require('../controllers/user');


router.route('/register').post(createUser);
router.route('/login').post(login);
router.route('/info/:_id').post(auth, info);
router.route('/info/:id').put(auth,updateInfo);
module.exports = router;