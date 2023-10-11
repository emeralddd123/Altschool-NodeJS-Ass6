const express = require("express")
const paginationMiddleware = require('../globalMiddlewares/paginationMiddleware')
const { isAdmin } = require('../auth/auth.middlewares')
const { addProduct, getAllProduct, getProduct, updateProduct, deleteProduct } = require('./product.controller')

const productRouter = express.Router()

productRouter.get('/', paginationMiddleware(15), getAllProduct)
productRouter.get('/:id', getProduct)
productRouter.use(isAdmin)
productRouter.post('/', addProduct)
productRouter.put('/:id', updateProduct)
productRouter.delete('/:id', deleteProduct)

module.exports = productRouter

