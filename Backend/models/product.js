const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: Array
    },
    size: {
        type: String
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    image: {
        type: String
    },
    rating: {
        type: Number
    },
    deliveryCharge: {
        type: Number
    },

}, { timestamps: true });
const Product = mongoose.model("products", productSchema)
module.exports = Product