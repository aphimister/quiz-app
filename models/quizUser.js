const mongoose = require("mongoose");


const user = new mongoose.Schema({
    name: {
        type: String,
        reguired: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('user', user) 