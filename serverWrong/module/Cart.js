const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    ShopId: { type: String, required: true },
    UserId: { type: String, required: true },
    orders: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
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

module.exports = mongoose.model("cart", cartSchema)