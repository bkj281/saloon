const Cart = require('../models/cart');
const User = require('../models/user');
const Shop = require('../models/shop');

const addToCart = async (req, res) => {
  try {

    let user = await User.findById(req.body.UserId);

    const addCart = {
			orders: req.body.cart,
			TotalPrice: req.body.Total,
			TimeSlot: req.body.Time,
			Date: req.body.Date,
			ShopAddress: req.body.ShopAddress,
			ShopName: req.body.ShopName,
			UserName: user.name,
			UserContact: user.phoneNo,
			ShopId: req.body.ShopId,
			UserId: req.body.UserId,
		};

    if (await Cart.countDocuments({ $and: [ { ShopId: addCart.ShopId }, { TimeSlot: addCart.TimeSlot }, { Date: addCart.Date } ] }) < 2) {
      const cart = new Cart(addCart);
      await cart.save();
      return res.status(201).json({ cart });
    } else {
      return res.status(409).json({ msg: "Slots not available!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "An Error Occured!" });
  }
}

const cartItems = async (req, res) => {
  try {
    if (req.params.role === "user") {
      const cart = await Cart.find({ UserId: req.params._id }).sort({ Date: -1 });
      return res.status(200).json(cart);
    } else { // Updation Required
      const shop = await Shop.findOne({ userId: req.params._id });
      const cart = await Cart.find({ ShopId: shop._id }).sort({ Date: -1 });
      return res.status(200).json(cart);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Unexpected Error Occured!" });
  }
}

module.exports = {
  addToCart,
  cartItems
};