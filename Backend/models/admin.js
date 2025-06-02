const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    first_name: {
        type: String,
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
    role: {
        type: String
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
    },
    chat: {
        type: Array
    },
    password: {
        type: String
    }

}, { timestamps: true });
const Admin = mongoose.model("admins", adminSchema)
module.exports = Admin