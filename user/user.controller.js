const { where } = require('sequelize');
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')



const signup = async (req, res) => {
    try {
        const { email, username, phoneNumber, password } = req.body;


        const existingEmail = await User.findOne({ where: { email } });
        const existingUsername = await User.findOne({ where: { username } });
        const existingNumber = await User.findOne({ where: { phoneNumber } });

        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        if (existingUsername) {
            return res.status(409).json({ error: "Username already exists" });
        }

        if (existingNumber) {
            return res.status(409).json({ error: "Phone number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            email,
            username,
            phoneNumber,
            password: hashedPassword,
        });

        const userData = { ...newUser.dataValues };
        delete userData['password']

        const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.status(201).json({ message: 'success', access_token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = { signup }
