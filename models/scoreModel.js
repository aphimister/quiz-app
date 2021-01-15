const mongoose = require("mongoose");


const score = new mongoose.Schema({
    points: {
        type: Number,
        reguired: true
    },
    time: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('score', score) 