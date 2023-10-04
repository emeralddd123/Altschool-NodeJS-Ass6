const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize")

const { generateSKU } = require("../utils");

const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    size: {
        type: DataTypes.ENUM("small", "medium", "large"),
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING,
        unique: true,
        set(name) {
            this.setDataValue("sku", generateSKU(name));
        },
    },
});

Product.belongsToMany(Category, { through: "ProductCategory" });
Category.belongsToMany(Product, { through: "ProductCategory" });


module.exports = { Product, Category };
