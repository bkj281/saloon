const mongoose = require('mongoose');

const Shop_Schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  ShopName: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopPincode: {
    type: String,
    required: true,
  },
  shopImage: {
    type: String,
    required: false,
  },
  openTiming: {
    type: String,
    required: true,
  },
  closeTiming: {
    type: String,
    required: true,
  },
  ServiceId: {
    hairCutting: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    Shaving: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    hairColor: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    Facial: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    FaceWash: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    Bleach: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
    Massage: {
      type: Array,
      Style: { type: String },
      Price: { type: String },
      required: false
    },
  },
  
  timeSlot: {
    type: Array,
    default: [
      { AvailableTime: "8:00 am to 9:00 am", count: 0 },
      { AvailableTime: "9:00 am to 10:00 am", count: 0 },
      { AvailableTime: "10:00 am to 11:00 am", count: 0 },
      { AvailableTime: "11:00 am to 12:00 am", count: 0 },
      { AvailableTime: "12:00 am to 1:00 pm", count: 0 },
      { AvailableTime: "1:00 pm to 2:00 pm", count: 0 },
      { AvailableTime: "2:00 pm to 3:00 pm", count: 0 },
      { AvailableTime: "3:00 pm to 4:00 pm", count: 0 },
      { AvailableTime: "4:00 pm to 5:00 pm", count: 0 },
      { AvailableTime: "5:00 pm to 6:00 pm", count: 0 },
      { AvailableTime: "6:00 pm to 7:00 pm", count: 0 },
      { AvailableTime: "7:00 pm to 8:00 pm", count: 0 },
    ]
  },
});

module.exports = mongoose.model('Shop', Shop_Schema);