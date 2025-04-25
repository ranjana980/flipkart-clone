const Products = require('../models/product')

const getProduct = (req, res) => {
    res.json({ code: 200, message: 'hello' })
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
module.exports = { getProduct, addProduct }