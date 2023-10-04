const { Product, Category } = require('../models/product')
const { productSchema, updateProductSchema, categorySchema } = require('./product.middleware')
const sequelize = require("../config/sequelize")


const addProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: "failed", data: null, error: error.details[0].message });
        }

        const { name, description, price, quantity, available, size, categories } = req.body;

        const categoryInstances = await Category.findAll({
            where: { id: categories },
        });

        // Verify that all the category exists
        if (categories.length !== categoryInstances.length) {
            return res.status(400).json({ message: "failed", data: null, error: "One or more category IDs do not exist." });
        }

        const product = await sequelize.transaction(async (t) => {
            const createdProduct = await Product.create({
                name,
                description,
                price,
                quantity,
                available,
                size,
            }, { transaction: t });

            await createdProduct.setCategories(categoryInstances, { transaction: t });

            return createdProduct;
        });

        return res.status(201).json({ message: "success", data: product.dataValues });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const page = req.pagination.page;
        const limit = req.pagination.limit;
        const skip = (page - 1) * limit;

        const products = await Product.findAndCountAll({ limit: limit, offset: skip })


        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json('An error occurred.');
    }
};

const getProduct = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findOne({ where: { id: id }, include: [{ model: Category }] });

        if (!product) {
            return res.status(404).json({ "message": "failed", "data": null, "error": "Product not found" })
        }
        return res.status(200).json({ "message": "succes", "data": product, "error": null })
    } catch (error) {
        return res.status(500).json({ "message": "failed", "error": "Internal Server Error" })
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { error, value } = updateProductSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "failed", data: null, error: error.details[0].message });
    }

    try {
        const { name, description, price, quantity, available, size, categories } = req.body;

        const existingProduct = await Product.findByPk(id);

        if (!existingProduct) {
            return res.status(404).json({ message: "failed", data: null, error: `Product with id ${id} does not exist.` });
        }
        // console.log(existingProduct.__proto__)
        // return res.json("testing")
        // Update the product and categories within a transaction
        const updatedProduct = await sequelize.transaction(async (t) => {
            if (name) existingProduct.name = name;
            if (description) existingProduct.description = description;
            if (price) existingProduct.price = price;
            if (quantity) existingProduct.quantity = quantity;
            if (available) existingProduct.available = available;
            if (size) existingProduct.size = size;

            if (categories) {
                const categoryInstances = await Category.findAll({
                    where: { id: categories },
                });

                if (categories.length !== categoryInstances.length) {
                    throw new Error("One or more category IDs do not exist.");
                }

                await existingProduct.setCategories(categoryInstances, { transaction: t });
            }

            await existingProduct.save({ transaction: t });

            return existingProduct;
        });

        return res.json({ message: "success", data: updatedProduct, error: null });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'failed', data: null, error: 'An error occurred.' });
    }
}


const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({ message: "failed", data: null, error: `Product with id ${id} does not exist.` })
        }
        await product.destroy()
        return res.status(200).json({ message: "Produc deleted Succesfully", data: null, error: null })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
}


//available categorys methods
const addCategory = async (req, res) => {
    const { error, value } = categorySchema.validate(req.body)
    try {
        if (error) {
            return res.status(400).json({ "message": "failed", "data": null, "error": error.details[0].message })
        }
        const { name, description } = req.body

        const category = await Category.create({
            name: name,
            description: description
        })

        return res.status(201).json({ "message": "success", "data": category.dataValues })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const page = req.pagination.page;
        const limit = req.pagination.limit;
        const skip = (page - 1) * limit;

        const categorys = await Category.findAndCountAll({ limit: limit, offset: skip })

        return res.status(200).json(categorys);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

const getCategory = async (req, res) => {
    const id = req.params.id
    try {
        const category = await Category.findOne({ where: { id: id }, include: [{ model: Product }] });

        if (!category) {
            return res.status(404).json({ "message": "failed", "data": null, "error": "Category not found" })
        }
        return res.status(200).json({ "message": "succes", "data": category, "error": null })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "message": "failed", "error": "Internal Server Error" })
    }
}



module.exports = {
    addProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    getAllCategory,
    getCategory
}
