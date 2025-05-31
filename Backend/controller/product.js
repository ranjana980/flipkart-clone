const Products = require('../models/product')
const User = require('../models/user')

const getProducts = async (req, res) => {
    const products = await Products.find()
    try {
        res.json({ code: 200, data: products })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'No Data Found'
        })
    }
}

const addProduct = async (req, res) => {
    const { product_name, category, size, photo } = req.body
    try {
        const product = new Products({
            product_name: product_name,
            category: category,
            size: size,
            photo: photo,
        });

        // Save the new product to the database
        const result = await product.save();
        res.json({
            code: 200,
            message: 'product added successfully',
        })
    }
    catch (err) {
        console.log(err, 'err')
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}


const deleteProductById = async (req, res) => {
    const { id } = req.params
    const products = await Products.findOneAndDelete({ _id: id })
    const updatedList = await Products.find()
    try {
        res.json({
            code: 200,
            data: updatedList
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}



const addToCard = async (req, res) => {
    const { data } = req.body
    const existingUser = await User.findByIdAndUpdate({ _id: data._id }, { $set: data })
    try {
        res.json({
            code: 200,
            data: existingUser,
            msg: "Added to cart successfully"
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}

const updateProductById = async () => {
    const { id } = req.params
    const products = await Products.findOneAndUpdate({ _id: id })
    const updatedList = await Products.find()
    try {
        res.json({
            code: 200,
            data: updatedList
        })
    }
    catch (err) {
        res.json({
            code: 400,
            msg: 'somthing went wrong'
        })
    }
}
module.exports = { getProducts, addProduct, addToCard, deleteProductById, updateProductById }