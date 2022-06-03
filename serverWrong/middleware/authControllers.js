const bcrypt = require('bcryptjs')
const User = require('../module/user')
const Shop = require('../module/shop');
const Service = require('../module/service');
const Cart = require('../module/Cart');

const jwt = require("jsonwebtoken");
const maxAge = 5 * 24 * 60 * 60
const createJWT = id => {
	return jwt.sign({ id }, "ok", {
		expiresIn: maxAge
	})
}

const dotenv = require('dotenv');
dotenv.config();

const alertError = (err) => {
	console.log("err", err.email)
	let errors = { name: '', email: '', password: '' }
	// console.log('err message', err.message);
	// console.log('err code', err.code);
	if (err.email === 'user doesnot exit') {
		errors.email = 'user doesnot exit';
	}
	if (err.message === 'incorrect pwd') {
		errors.password = 'The password is incorrect';
	}
	if (err.code === 11000) {
		errors.email = 'This email is already registered';
		return errors;
	}
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message
		})
	}
	// if (err.message.includes('userStudent validation failed')) {
	//     Object.values(err.errors).forEach(({ properties }) => {
	//         errors[properties.path] = properties.message
	//     })
	// }
	return errors
}
module.exports.register = async (req, res) => {

	const { name, email, password, Confirmpassword, City, State, phoneNo, Pincode, Role } = req.body
	try {
		let user = await User.findOne({ email })
		console.log("registre");
		if (user) {
			return res.status(400).json({ error: 'user already exist' })
		}

		let hashed_password;
		if (password === Confirmpassword) {

			hashed_password = await bcrypt.hash(password, 10);
		} else {
			return res.status(400).json({ error: 'password doesnt match' })

		}


		const createuser = await User.create({
			name,
			email,
			password: hashed_password,
			Confirmpassword: hashed_password,
			City, State, phoneNo, Pincode, Role
		});

		return res.status(201).json(createuser);

	} catch (err) {
		let errors = alertError(err);
		return res.status(400).json({ errors });

	}

}


module.exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		var populateQuery = [{ path: 'ShopId', model: "shopkeeper" }];

		let user = await User.findOne({ email }).populate(populateQuery)
		if (!user) {
			alertError({ email: "user doesnot exit" });
			return res.status(400).json({ error: "user doesnot exit" })
		}
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ error: 'invalid creaditentiol' })
		}

		const token = createJWT(user._id);
		return res.status(200).json({
			token,
			user,
		});
	} catch (error) {
		console.log("error", error);
		let errors = alertError(error);
		// return res.status(400).json({ error: error.message });
		return res.status(400).json({ errors });
	}

}

module.exports.verifyuser = (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		console.log("req", token);
		if (token) {
			jwt.verify(token, "ok", async (err, decodedToken) => {
				console.log('decoded token', decodedToken)
				if (err) {
					console.log(err.message)
				} else {
					// var populateQuery = [{ path: 'ShopId', model: "shopkeeper", populate: { path: "ServiceId", module: "allService" } }];
					var populateQuery = [{ path: 'ShopId', populate: { path: "ServiceId", module: "allService" } }];
					let user = await User.findById(decodedToken.id).populate(populateQuery)
					res.json(user);


				}
			})
		}
	}
	catch (err) {
		console.log("verifiy err", err);
	}
}


// module.exports.verifyuser = async (req, res, next) => {
//     const token = req.cookies.jwt;
//     console.log("token", token);
//     // console.log(req);
//     // console.log(token);
//     // try {
//     //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     //     console.log("decoded",decoded);
//     //     let user = await User.findById(decoded._id)
//     //     console.log("user",user);
//     //     next();
//     // }
//     // catch (error) {
//     //     console.error(error)
//     //     res.status(401)
//     //     throw new Error('Not authorized, token failed')
//     // }


//     // if (!token) {
//     //     // if there is no token then set status as 401 and return  a message
//     //     res.status(401)
//     //     throw new Error('Not authorized, no token')
//     // }

// }
module.exports.logout = (req, res) => {
	const token = req.cookies.jwt;
	console.log(token);
	res.cookie('jwt', "", { maxAge: 1 })
	jwt.destroy()
	res.status(200).json({ logout: true })

	// next();
}

module.exports.shopkeeper = async (req, res) => {
	try {
		const { ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming } = req.body;
		const shopDetails = await Shop.create({
			ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming
		});
		const hairStyle = await Service.create({
			ServicesId: [shopDetails._id],
			hairstyle: req.body.hairstyle,
			haircut: req.body.haircut,
			hairColour: req.body.hairColour,
			hairTreatment: req.body.hairTreatment
		});
		res.status(201).json({ shopDetails });

	} catch (error) {
		let errors = alertError(error);
		console.log(error);
		res.status(400).json({ errors });
	}
}

module.exports.shopfilterer = async (req, res) => {
	let searchPin = req.query.shopPincode;
	let searchName = req.query.ShopName;
	const valueorSearch = (v1, v2) => {
		let searchPin = "";
		let searchName = "";
		if (v2 === undefined) {

			searchPin = v1;
			return searchPin;
		} else {
			searchName = v2;
			return searchName;
		}

	}
	const value = valueorSearch(searchPin, searchName)
	try {
		// await Service.find().populate({
		//     path: "ShopId",
		//     match: { $or: [{ ShopName: { $regex: value, $options: '$i' } }, { shopPincode: { $regex: value, $options: '$i' } }] }
		// })
		//     .then(data => res.send(data))
		await Shop.find({ $or: [{ ShopName: { $regex: value, $options: '$i' } }, { shopPincode: { $regex: value, $options: '$i' } }] })
			.then(data => res.send(data))
	} catch (error) {
		res.status(400).json({ error });
	}
}
module.exports.shops = async (req, res) => {
	try {


		// const currentPage = parseInt(req.query.page) || 4;
		// const size = 4;
		// console.log(req.query);
		// const skip = size * (currentPage - 1);
		var populateQuery = [{ path: "ServiceId", module: "allService" }];
		let list;
		if (req.query.search === undefined) {
			list = await Shop.find().populate(populateQuery)
			// console.log(list[0]);
		}
		else {
			list = await Shop.find({ $or: [ { shopPincode: req.query.search }, { shopAddress: { $regex : new RegExp(req.query.search, "i") } } ] }).populate(populateQuery)
		}
		return res.status(200).json({ list });
	} catch (err) {
		console.log("shops err", err);
		return res.status(500).json(err);
	}

}


module.exports.uploadImage = async (req, res) => {
	try {
		console.log("data", req.file);
		const shopImage = req.file.originalname
		const id = "61f0edfb8bf7ffbcdce65417";
		const updateShop = await shop.findByIdAndUpdate(id, { $set: { shopImage: shopImage } }, { new: true })
		// const updateShop = await shop.findById(id)
		console.log("object,", updateShop);

		return res.send(updateShop);
	} catch (err) {
		console.log("image err", err);
		return res.status(500).json(err);
	}

}
module.exports.Data = async (req, res) => {
	try {
		var populateQuery = [{ path: 'ShopId', model: "shopkeeper" }];

		// Person.find({})
		//     .populate(populateQuery)
		//     .execPopulate()
		// console.log("object");

		const list = await User.find().populate(populateQuery)
		return res.send(list);
	} catch (err) {

		return res.status(500).json(err);
	}

}
module.exports.singleShop = async (req, res) => {
	const id = req.params.id;
	try {
		var populateQuery = [{ path: 'ServiceId', module: 'allServices' }];

		const shop = await Shop.findById(id).populate(populateQuery)
		res.status(200).json({ shop });
	} catch (err) {
		console.log("singlrshop", err);
		res.status(500).json(err);
	}
}

// module.exports.addServices = async (req, res) => {
//     try {

//         console.log("data  route", req.file);
//         console.log("data2", req.body);
//         const shopImage = req.file?.originalname
//         const id = req.params.id;
//         const { ShopName, shopAddress, shopPincode, openTiming, closeTiming } = req.body;
//         const user = await User.findById(id)

//         if (user) {
//             const hairCutting = JSON.parse(req.body.hairCutting);
//             const Saving = JSON.parse(req.body.Saving);
//             const hairColor = JSON.parse(req.body.hairColor);
//             const Facial = JSON.parse(req.body.Facial);
//             const FaceWash = JSON.parse(req.body.FaceWash);
//             const Bleach = JSON.parse(req.body.Bleach);
//             const CleanUp = JSON.parse(req.body.CleanUp);
//             const Massage = JSON.parse(req.body.Massage);
//             console.log("parse", hairCutting);

//             const addStyles = await Service.create({
//                 hairCutting, Saving, hairColor, Facial, FaceWash, Bleach, CleanUp, Massage
//             })


//             console.log(addStyles._id);
//             const addShop = await Shop.create({
//                 ServiceId: addStyles._id, ShopName, shopAddress, shopPincode, openTiming, closeTiming, shopImage
//             })
//             const data2 = await User.findByIdAndUpdate(id, { $push: { ShopId: addShop._id } }, { new: true })
//             console.log("updated user", data2)
//             console.log("created shop", addShop)
//             console.log("updated", addStyles);
//             res.status(200).json(data2);
//         } else {
//             res.status(401).json("You can update only your post!");

//         }
//         // const id = "61f13620c14cd84414ea2faa";
//         // const updateShop = await shop.findByIdAndUpdate(id, { $set: {shopImage:shopImage} }, { new: true })
//         // // const updateShop = await shop.findById(id)
//         // console.log("object,",updateShop);

//         //    res.send(updateShop)
//     } catch (err) {
//         console.log("image err", err);
//         return res.status(500).json(err);
//     }
// }
module.exports.updateServices = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("id", id);
		console.log("req data", req.body);
		const service = await Service.findById(id)
		if (service) {

			const addStyles = await Service.findByIdAndUpdate(id, { $set: req.body }, { new: true })

			// const updateShop = await Shop.findByIdAndUpdate(id, { $set: req.body }, { new: true })
			// const data2 = await User.findByIdAndUpdate(id, { $push: { ShopId: addShop._id } }, { new: true })
			console.log("updated", addStyles);
			res.status(200).json(addStyles);
		} else {
			res.status(401).json("You can update only your post!");

		}

	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}
module.exports.bookOrder = async (req, res) => {
	try {
		console.log("cart", req.body);

		const addCart = await Cart.create({
			orders: req.body.cart,
			TotalPrice: req.body.Total,
			TimeSlot: req.body.Time,
			Date: req.body.Date,
			ShopAddress: req.body.ShopAddress,
			ShopName: req.body.ShopName,
			UserName: req.body.UserName,
			UserContact: req.body.UserContact,
			ShopId: req.body.ShopId,
			UserId: req.body.UserId,
		});
		const updateTime = await Shop.updateOne(
			{ _id: req.body.ShopId, "timeSlot.AvailableTime": req.body.Time },
			{ $inc: { "timeSlot.$.count": +1 } }
		)

		res.status(200).json(addCart);

	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}
module.exports.getBookedOrders = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("cart ", id);
		const addCart = await Cart.find({ ShopId: id })
		console.log("addCart", addCart);
		res.status(200).json(addCart);

	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}
module.exports.UserOrders = async (req, res) => {
	try {
		const id = req.params.id;
		console.log("cart ", id);
		const addCart = await Cart.find({ UserId: id })
		console.log("addCart", addCart);
		res.status(200).json(addCart);

	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}
module.exports.resetBook = async (req, res) => {
	try {
		// console.log("cart", req.body);
		const shopId = Shop.find();
		// const addCart = await Cart.create({
		//     orders: req.body.cart,
		//     TotalPrice: req.body.Total,
		//     TimeSlot: req.body.Time,
		//     Date: req.body.Date,
		//     ShopAddress: req.body.ShopAddress,
		//     ShopName: req.body.ShopName,
		//     UserName: req.body.UserName,
		//     UserContact: req.body.UserContact,
		//     ShopId: req.body.ShopId,
		//     UserId: req.body.UserId,
		// })

		// const time=[
		//     { AvailableTime: "8:00 am to 9:00 am", count: 0 },
		//     { AvailableTime: "9:00 am to 10:00 am", count: 0 },
		//     { AvailableTime: "10:00 am to 11:00 am", count: 0 },
		//     { AvailableTime: "11:00 am to 12:00 am", count: 0 },
		//     { AvailableTime: "12:00 am to 1:00 pm", count: 0 },
		//     { AvailableTime: "1:00 pm to 2:00 pm", count: 0 },
		//     { AvailableTime: "2:00 pm to 3:00 pm", count: 0 },
		//     { AvailableTime: "3:00 pm to 4:00 pm", count: 0 },
		//     { AvailableTime: "4:00 pm to 5:00 pm", count: 0 },
		//     { AvailableTime: "5:00 pm to 6:00 pm", count: 0 },
		//     { AvailableTime: "6:00 pm to 7:00 pm", count: 0 },
		//     { AvailableTime: "7:00 pm to 8:00 pm", count: 0 },
		// ]
		// shopId.timeSlot.map((val) => {
		//     const updateTime = await Shop.updateOne(
		//         { _id: req.body.ShopId, "timeSlot.AvailableTime": val.AvailableTime },
		//         { $set: { "timeSlot.$.count": 0 } }
		//     )
		// })

		const data = await Shop.updateMany(
			{},
			{ $set: { "timeSlot.$[].count": 0 } }
		)
		console.log("data time", data)

		// res.status(200).json(addCart);

	} catch (err) {
		console.log(err);
		// res.status(500).json(err);
	}
}



