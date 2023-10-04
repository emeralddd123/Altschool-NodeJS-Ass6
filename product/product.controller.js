const Joi = require('joi')
const Product = require('../models/product')

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    available: Joi.boolean(),
    size: Joi.string().valid('small', 'medium', 'large').required(),
    categories: Joi.array().items(Joi.object({ name: Joi.string().required() })
    )
})

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(100),
    price: Joi.number().precision(2),
    quantity: Joi.number().integer(),
    available: Joi.boolean(),
    size: Joi.string().valid('small', 'medium', 'large'),
    categories: Joi.array().items(Joi.object({ name: Joi.string() })
    )
}).or('name', 'description', 'price', 'quantity', 'available', 'size', 'categories');


const addProduct = async (req, res) => {
    const validBody = productSchema.validate(req.body)
    if (validBody.error) {
        return res.status(400).json({ "message": "failed", "data": null, "error": error.details[0].message })
    }
    try {
        const product = await Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            available: req.body.available,
            size: req.body.size,
            categories: req.body.categories,
            modifiedAt: Date.now()
        })
        return res.status(201).json({ "message": "success", "data": product })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal Server Error" })
    }

}

const getAllProduct = async (req, res) => {
    try {
        const page = req.pagination.page;
        const limit = req.pagination.limit;
        console.log('inside getaall cont')
        const skip = (page - 1) * limit;

        const products = await Product.find()
            .skip(skip)
            .limit(limit)
            .exec();

        const totalProducts = await Product.countDocuments();

        return res.json({
            products: products,
            page: page,
            limit: limit,
            totalProducts: totalProducts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json('An error occurred.');
    }
};


const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({ "message": "failed", "data": null, "error": "Product not found" })
        }
        return res.status(200).json({ "message": "succes", "data": product, "error": null })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "failed", "error": "Internal Server Error" })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id
    const validBody = updateProductSchema.validate(req.body)
    if (validBody.error) {
        return res.status(400).json({ "message": "failed", "data": null, "error": validBody.error.details[0].message })
    }
    try {
        const existingProduct = await Product.findById(id);

        if (existingProduct) {
            if (validBody.name) existingProduct.name = validBody.name;
            if (validBody.description) existingProduct.description = validBody.description;
            if (validBody.price) existingProduct.price = validBody.price;
            if (validBody.quantity) existingProduct.quantity = validBody.quantity;
            if (validBody.available) existingProduct.available = validBody.available;
            if (validBody.size) existingProduct.size = validBody.size;
            if (validBody.categories) existingProduct.categories = validBody.categories;
            existingProduct.modifiedAt = Date.now()

            await existingProduct.save();

            return res.json({ "data": existingProduct });
        } else {
            return res.status(404).json(`Product with id ${id} does not exist.`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('An error occurred.');
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        await Product.deleteOne({ id: id })
        return res.status(200).json({ "message": "product deleted successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
