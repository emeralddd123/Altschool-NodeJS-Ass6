const { UserModel } = require('./user.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()




const signup = async (req, res) => {
    try {
        const existingEmail = await UserModel.findOne({ email: req.body.email });
        const existingUsername = await UserModel.findOne({ username: req.body.username });
        const existingNumber = await UserModel.findOne({ phoneNumber: req.body.phoneNumber });

        if (existingEmail) {
            return res.status(409).json({ error: "Email already exists" });
        }

        if (existingUsername) {
            return res.status(409).json({ error: "Username already exists" });
        }

        if (existingNumber) {
            return res.status(409).json({ error: "Phone number already exists" });
        }

        const newUser = await UserModel.create({
            email: req.body.email,
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
        });

        delete newUser.password;

        const token = jwt.sign({ user: newUser }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.status(201).json({ message: 'success', value: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




module.exports = { signup }
