const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const User = require('./module/user')
const AWS = require("aws-sdk");
const Shop = require('./module/shop');
const Service = require('./module/service');
const fileUpload = require("express-fileupload");
const cron = require("node-cron")
const header = require("./header");
const {resetBook}=require('./middleware/authControllers')

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5000;
//global.TextEncoder = require("util").TextEncoder; 
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(fileUpload())
app.use(express.json())
app.use(header);
app.use(express.urlencoded({ extended: false }));
app.use('/auth', require('./routes/routes'))

// var multer = require('multer');
// //const shop = require('./module/shop');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../app/public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// var upload = multer({ storage: storage })

// app.post('/image', upload.single('image'), async (req, res) => {
//     const id = "61f13633c14cd84414ea2fb0";
//     const shopImage = req.file.originalname
//     const updateShop = await shop.findByIdAndUpdate(id, { $push: { shopImage: shopImage } }, { new: true })
//     // const updateShop = await shop.findById(id)
//     console.log("object,", updateShop);

//     res.send(updateShop)
// })

app.put('/updateShop/:id', async (req, res) => {
    try {

        // console.log("img file", req.file);
        // console.log("req.body=", req.body);
        const S3_BUCKET_NAME = "bartermate1";
        const s3 = new AWS.S3({
          accessKeyId: "AKIA35SLNSUMK5AGZN6W",
          secretAccessKey: "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",
          region: "ap-south-1",
        });
        var base64data = await Buffer.from(req.files.image.data);
      const params = {
        Bucket: S3_BUCKET_NAME, // pass your bucket name
        Key: `${req.files.image.name}`, // file will be saved
        Body: base64data,
        ACL: "public-read",
        CacheControl: "no-cache",
      };

      const ResponseData = await s3.upload(params).promise();
        const shopImage = ResponseData.Location
        const id = req.params.id;
        const { ShopName, shopAddress, shopPincode, openTiming, closeTiming } = req.body;
        const user = await Shop.findById(id)

        if (user) {
            const UpdateShop = await Shop.findByIdAndUpdate(id, { $set: { ShopName, shopAddress, shopPincode, openTiming, closeTiming, shopImage } }, { new: true })
            console.log("updated", UpdateShop);
            res.status(200).json(UpdateShop);
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        console.log("update err", err);
        return res.status(500).json(err);
    }

})
app.post('/index/:id', async (req, res) => {
    try {
        // console.log("data index", req.file);
        // console.log("data2", req.body);
        const S3_BUCKET_NAME = "bartermate1";
        const s3 = new AWS.S3({
          accessKeyId: "AKIA35SLNSUMK5AGZN6W",
          secretAccessKey: "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",
          region: "ap-south-1",
        });
        var base64data = await Buffer.from(req.files.image.data);
      const params = {
        Bucket: S3_BUCKET_NAME, // pass your bucket name
        Key: `${req.files.image.name}`, // file will be saved
        Body: base64data,
        ACL: "public-read",
        CacheControl: "no-cache",
      };

      const ResponseData = await s3.upload(params).promise();
        const shopImage = ResponseData.Location
        const id = req.params.id;
        const { ShopName, shopAddress, shopPincode, openTiming, closeTiming } = req.body;
        const user = await User.findById(id)
        if (user) {
            console.log("img", shopImage);
            const hairCutting = JSON.parse(req.body.hairCutting);
            const Saving = JSON.parse(req.body.Saving);
            const hairColor = JSON.parse(req.body.hairColor);
            const Facial = JSON.parse(req.body.Facial);
            const FaceWash = JSON.parse(req.body.FaceWash);
            const Bleach = JSON.parse(req.body.Bleach);
            const CleanUp = JSON.parse(req.body.CleanUp);
            const Massage = JSON.parse(req.body.Massage);
            console.log("parse", hairCutting);

            const addStyles = await Service.create({
                hairCutting, Saving, hairColor, Facial, FaceWash, Bleach, CleanUp, Massage
            })
            console.log(addStyles._id);
            const addShop = await Shop.create({
                ServiceId: addStyles._id, ShopName, shopAddress, shopPincode, openTiming, closeTiming, shopImage
            })
            const data2 = await User.findByIdAndUpdate(id, { $push: { ShopId: addShop._id } }, { new: true })
            console.log("updated user", data2)
            console.log("created shop", addShop)
            console.log("updated", addStyles);
            res.status(200).json(data2);
        } else {
            res.status(401).json("You can update only your post!");
        }
    } catch (err) {
        console.log("image err", err);
        return res.status(500).json(err);
    }

})

// var __dirname = path.resolve()
// app.use('/images', express.static(path.join(__dirname, '../app/public')))

cron.schedule("00 01 * * *", () => {
    console.log("3:34 AM Every Day");
    resetBook();
});

// mongoose.connect(process.env.mongoDB, {
//     useNewUrlParser: true,
// }).then(res => { console.log('db cnnected') }).catch(err => { console.log(err) })

// app.listen(port, () => console.log(`server is running on ${port}`))

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Mongo DB connection
mongoose.Promise = global.Promise; // Return promise inside app
const devDbUrl =
  "mongodb+srv://onkar:onkar@cluster0.toikh.mongodb.net/knockonce?retryWrites=true&w=majority";

mongoose
  .connect(devDbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongodb Connection establish.");
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Connection Error => ", err.message);
  });