const mongoose = require('mongoose');

const Cart_Schema = new mongoose.Schema({
  ShopId: { 
    type: String,
    required: true 
  },
  UserId: { 
    type: String,
    required: true 
  },
  orders: {
    type: Array,
    Style: { type: String },
    Price: { type: String },
    required: false
  },
  TotalPrice: {
    type: Number,
    required: true
  },
  TimeSlot: {
    type: String,
    required: true
  },
  Date: {
    type: String,
    required: true
  },
  ShopAddress: {
    type: String,
    required: true
  },
  ShopName: {
    type: String,
    required: true
  },
  UserName: {
    type: String,
    required: true
  },
  UserContact: {
    type: String,
    required: true
  }

}, { timestamp: true })

module.exports = mongoose.model("Cart", Cart_Schema)