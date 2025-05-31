const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_name: {
        type: String
    },
    category: {
        type: String
    },
    subCategory: {
        type: Array
    },
    size: {
        type: String
    },
    photo: {
        type: String
    },

}, { timestamps: true });
const Product = mongoose.model("products", productSchema)
module.exports = Product