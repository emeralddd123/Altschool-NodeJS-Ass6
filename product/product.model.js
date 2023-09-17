const mongoose = require('mongoose')
const { generateSKU } = require('../utils')

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, quantity: {
        type: Number,
        required: true
    }, available: {
        type: Boolean,
        default: false
    }, size: {
        type: String,
        enum: ['small', 'medium', 'large']
    }, categories: [{
        name: String
    }], sku: {
        type: String,
        unique: true
    },
    modifiedAt: {
        type:Date,
        default:Date.now()
    },
    createdAt: {
        type:Date,
        default:Date.now()
    }
})

ProductSchema.pre('save', async function (next) {
    this.sku = generateSKU(this.name);
    next();
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel
