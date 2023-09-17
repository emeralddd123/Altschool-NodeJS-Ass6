const express = require("express")
const { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('./product.controller')

const productRouter = express.Router()

productRouter.get('/', getAllProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/', addProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter