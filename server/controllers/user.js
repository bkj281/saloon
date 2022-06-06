const User = require('../models/user');

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


module.exports = {
  createUser,
  login,
  info,
  updateInfo
};