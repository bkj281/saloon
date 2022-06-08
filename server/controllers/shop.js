const Shop = require('../models/shop');

const createShop = async (req, res) => {
  try {
    // if (await Shop.countDocuments({ ShopName: req.body.ShopName }) !== 0 || await Shop.countDocuments({ userId: req.body.userId }) !== 0) {
    //   return res.status(406).json({ msg: "Shop Name Already Exists for this user!\nTry logging In!!" });
    // }

    let ServiceId = {
      HairCutting: [],
      Shaving: [],
      HairColor: [],
      Facial: [],
      FaceWash: [],
      Bleach: [],
      Massage: []
    };

    req.body.ServiceId = ServiceId;

    const newShop = new Shop(req.body);
    await newShop.save();

    return res.status(201).json({ user: newShop });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

const allShops = async (req, res) => {
  try {
		let list;
		if (req.query.search === undefined) {
			list = await Shop.find();
		}
		else {
			list = await Shop.find({ $or: [ { shopPincode: req.query.search }, { shopAddress: { $regex : new RegExp(req.query.search, "i") } }, { ShopName: { $regex : new RegExp(req.query.search, "i") } } ] });
		}
		return res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

const shopDetails = async (req, res) => {
  try {
    const saloon = await Shop.findById(req.params._id);
    return res.status(200).json({ saloon });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

const info = async (req, res) => {
  try {
    const user = await Shop.find({ userId: req.params._id});
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Unexpected Error Occured!" });
  }
}

const ownersShop = async (req, res) => {
  try {
    const shops = await Shop.find({ userId: req.params._id });
    // console.log(shops);
    return res.status(200).json(shops);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Unexpected error occured!!' });
  }
}

module.exports = {
  createShop,
  allShops,
  shopDetails,
  info,
  ownersShop
};