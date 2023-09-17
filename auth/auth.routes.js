const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { UserModel } = require('../user/user.model')


const userLoginSchema = Joi.object({
	username: Joi.string().min(3).max(50).required(),
	password: Joi.string().min(3).required()
})

const tokenSchema = Joi.object({
	refresh_token: Joi.string().required(),
})

authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
	try {
		const { error, value } = await userLoginSchema.validateAsync(req.body);

		if (error) {
			return res.status(400).json({ error: error.details[0] });
		}

		const userWithName = await UserModel.findOne({ username: req.body.username });

		if (!userWithName) {
			return res.status(401).json({ error: "Incorrect login credentials" });
		}

		const isValidPassword = await userWithName.isValidPassword(req.body.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: "Incorrect login credentials" });
		} else {
			const userWithoutPassword = { ...userWithName._doc };
			delete userWithoutPassword.password;

			const token = jwt.sign({ user: userWithoutPassword }, process.env.SECRET_KEY, { expiresIn: '1h' });

			return res.status(201).json({ message: 'Success', token });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


authRouter.post('/token-refresh', (req, res) => {
	try {
		const {error, value} = tokenSchema.validate(req.body)
		if (error){
			return res.status(400).json({ error: error.details[0] })
		}
		
	} catch (error) {
		
	}

})


module.exports = { authRouter }
