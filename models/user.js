const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize")
const bcrypt = require("bcrypt")


const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }, role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
    },
});

User.beforeCreate(async (user, option) => {
    try {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    } catch (err) {
        throw new Error();
    }
});

User.prototype.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

User.prototype.isAdmin = async function () {
    const user = this
    if (user.role == 'admin') {
        return true
    }
    return false
}


module.exports = { User };
