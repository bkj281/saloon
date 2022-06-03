const express = require("express"),
  router = express.Router(),
  auth = require('../middleware/auth');

const {
  addToCart,
  cartItems
} = require('../controllers/cart');

router.route('/add-to-cart').post(auth, addToCart);
router.route('/view-cart/:role/:_id').post(auth, cartItems);

module.exports = router;