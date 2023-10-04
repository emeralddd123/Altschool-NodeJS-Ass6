const Joi = require('joi')

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().integer().required(),
    available: Joi.boolean(),
    size: Joi.string().valid('small', 'medium', 'large').required(),
    categories: Joi.array().items(Joi.number().integer().required())
})

const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().min(3).max(100),
    price: Joi.number().precision(2),
    quantity: Joi.number().integer(),
    available: Joi.boolean(),
    size: Joi.string().valid('small', 'medium', 'large'),
    categories: Joi.array().items(Joi.number().integer().required())
}).or('name', 'description', 'price', 'quantity', 'available', 'size', 'categories');


const categorySchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(100).required()
})


module.exports = {
    productSchema,
    updateProductSchema,
    categorySchema
}
