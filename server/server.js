require('dotenv').config();

// Express Imports
const express = require('express');
const app = express();
const cors = require('cors');

// Database Imports
const db = require("./config/db.js");
const user = require('./routes/user');
const shop = require('./routes/shop');
const cart = require('./routes/cart');


// Express Usage
app.use(express.json());
app.use(cors());



// Routes
app.use('/user', user);
app.use('/saloons', shop);
app.use('/cart', cart);




// Connecting Database
db();

const PORT = process.env.PORT || 5500;

app.get('/', (req, res) => res.send('Saloon Server Running...'));


// Starting Server
app.listen(
  PORT,
  console.log(`Server started at Port ${PORT}`)
);