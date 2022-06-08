const User = require('../models/user');
const otpGenerator = require('otp-generators');
const nodemailer = require('nodemailer');

const createUser = async (req, res) => {
  try {

    if (await User.countDocuments({ email: req.body.email }) !== 0) {
      return res.status(406).json({ msg: "User Already Exists!\nTry logging In!!" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({ user: newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({ email }).select('password Role');
    if (user) {
      const cond = await user.matchPassword(password);
      // console.log(cond);
      if (cond) {
        const token = await user.genAuthToken();
        // console.log(token);
        return res.status(200).json({token: token, user});
      }
      else {
        return res.status(401).json({msg: 'Invalid Credential'});
      }
    }
    else {
      return res.status(404).json({ msg: 'User does\'nt Exist' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const info = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Unexpected Error Occured!" });
  }
}

const updateInfo = async(req, res) => {
    // findById function will find product by id and then return the object that has found else return null
    // console.log(req.params);
    try{
      
      const user = await User.findByIdAndUpdate(
        {_id:req.params.id},
        {
            $set : req.body
        }    
      ); 


      return res.status(200).json(user);
    }catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Unexpected Error Occured!" });
    }
};

const sendOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({msg: "User doesn\'t exist!!"});
    }
    const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChar: false });
    const expiresIn = new Date().getTime() + 3*60*1000;
    const user2 = await User.findByIdAndUpdate(user._id, { otp: otp, expiresIn: expiresIn });
		await user2.save();
    const x = await sendMail(email, otp);
    if (x)
      return res.status(201).json({msg: "OTP sent on email"});
    else 
      return res.status(403).json({msg: "An Error Occured"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: "An error Occured!"});
  }
}

const sendMail = async (email, otp) => {
  try {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PWD
      }
    });

    let mailDetails = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      html: `<h2>OTP: ${otp}</h2><p>Enter OTP within 3 minutes before it expires.</p>`
    };

    const success = await mailTransporter.sendMail(mailDetails);
    return success;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const verifyOtp = async (req, res) => {
  try {
    const {
      email,
      otp,
      expiresIn
    } = req.body;
    const user = await User.findOne({ email: email }).select('otp expiresIn');
    if (user.expiresIn <= expiresIn) {
      return res.status(408).json({msg: 'Code Expired!\nTry Again!'});
    } else if (user.otp !== otp) {
      return res.status(406).json({msg: 'Incorrect OTP'});
    } else {
      return res.status(200).json({msg: 'OTP Verified!!'});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: 'An error Occured!'});
  }
}

const updatePwd = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select('password');
    user.password = req.body.pwd;
    await user.save(); 
    return res.status(201).json({msg: "Password Updated!!"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg: "An Error Occured!!"});
  }
}

module.exports = {
  createUser,
  login,
  info,
  updateInfo
  sendOtp,
  verifyOtp,
  updatePwd
};