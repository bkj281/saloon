const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    hairCutting: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    Shaving: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    hairColor: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    Facial: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    FaceWash: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    Bleach: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    CleanUp: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },
    Massage: {
        type: Array,
        StyleId: { type: String },
        Style: { type: String },
        Price: { type: String },
        Disabled: { type: Boolean },
        required: false

    },


}, { timestamp: true })

module.exports = mongoose.model('allService', userSchema);