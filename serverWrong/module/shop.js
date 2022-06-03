const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    ServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allService'
    },
    ShopName: {
        type: String,
        require: true,
    },
    shopAddress: {
        type: String,
        require: true,
    },
    shopPincode: {
        type: String,
        require: true,
    },
    shopImage: {
        type: String,
        require: false,
    },
    openTiming: {
        type: String,
        require: true,
    },
    closeTiming: {
        type: String,
        require: true,
    },
    timeSlot:  {
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
}, { timestamp: true })

module.exports = mongoose.model('shopkeeper', userSchema);
