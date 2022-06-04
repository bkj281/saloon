const express = require("express"),
  router = express.Router(),
  auth = require('../middleware/auth');

const {
  createShop,
  allShops,
  shopDetails,
  info,
  ownersShop
} = require('../controllers/shop');


router.route('/shopDetails').post(createShop);
router.route('/shops').get(allShops);
router.route('/shop/:_id').get(shopDetails);
router.route('/info/:_id').post(auth, info);
router.route('/myshops/:_id').post(auth, ownersShop);


module.exports = router;