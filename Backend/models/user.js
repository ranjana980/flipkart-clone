const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    otp: {
        type: Number
    },
    cart: {
        type: Array
    },
    wishlist: {
        type: Array
    },
    orders: {
        type: Array
    },
    is_verified: {
        type: Boolean
    },
    is_logged_in: {
        type: Boolean
    },
    notifications: {
        type: Array
    }

}, { timestamps: true });
const User = mongoose.model("users", userSchema)
module.exports = User