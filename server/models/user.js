const mongoose = require("mongoose"),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

const User_Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: [true, 'User Already Exists!'],
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
    // minlength: [6, "Password should be greater than 6 characters"]
  },
  Role: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  Pincode: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },

  // Reset Password
  otp: {
    type: String,
    select: false
  },

  expiresIn: {
    type: Number,
    select: false
  },

  // Auth
  tokens: {
    type: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    select: false
  }
},
  { timestamps: true }
);

// before saving the user object we need to hash its password
User_Schema.pre('save', async function (next) {
  if (!this.isModified('password'))
    next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// method to match password
User_Schema.methods.matchPassword = async function (password) {

  const x = await bcrypt.compare(password, this.password);
  // console.log(x);
  return x;   // returns boolean value after comparison
}

// JWT Token Generation
User_Schema.methods.genAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id }, // payload
      process.env.SECRET_KEY, //secretkey
      { expiresIn: "28d" }, //expire duration
    );
    this.tokens = [];
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
}

module.exports = mongoose.model('User', User_Schema);