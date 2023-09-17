const Joi = require('joi')
const ProductModel = require('./product.model')

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

const addProduct = async (req, res) => {
    const { error, value } = productSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ "message": "failed", "data": null, "error": error.details[0].message })
    }
    try {
        const product = await ProductModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            available: req.body.available,
            size: req.body.size,
            categories: req.body.categories
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



    } catch (error) {

    }
}

const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = ProductModel.findById(id)
    } catch (error) {
        
    }
}

const updateProduct = async (req, res) => {

}

const deleteProduct = async (req, res) => {

}

module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}