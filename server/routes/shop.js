const express = require("express"),
  router = express.Router(),
  auth = require('../middleware/auth');

const {
  createShop,
  allShops,
  shopDetails,
  info
} = require('../controllers/shop');


router.route('/shopDetails').post(createShop);
router.route('/shops').get(allShops);
router.route('/shop/:_id').get(shopDetails);
router.route('/info/:_id').post(auth, info);


module.exports = router;