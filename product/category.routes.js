const express = require('express')
const { addCategory, getAllCategory,getCategory } = require('./product.controller')
const paginationMiddleware = require('../globalMiddlewares/paginationMiddleware')

const categoryRouter = express.Router()
categoryRouter.get('/', paginationMiddleware(15), getAllCategory)
categoryRouter.post('/', addCategory)
categoryRouter.get('/:id', getCategory)

module.exports = categoryRouter
