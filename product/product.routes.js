const express = require("express")
const paginationMiddleware= require('../globalMiddlewares/paginationMiddleware')
const { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('./product.controller')

const productRouter = express.Router()

productRouter.get('/', paginationMiddleware(15), getAllProduct)
productRouter.get('/:id', getProduct)
productRouter.post('/', addProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter

