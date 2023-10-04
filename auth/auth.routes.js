const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { User } = require('../models/user')


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
		const { username, password } = req.body

		const userWithName = await User.findOne({ where: { username: username } });

		if (!userWithName) {
			return res.status(401).json({ error: "Incorrect login credentials" });
		}

		const isValidPassword = await userWithName.isValidPassword(password);
		
		if (!isValidPassword) {
			return res.status(401).json({ error: "Incorrect login credentials" });
		} else {
			const userData =  { ...userWithName.dataValues };
			delete userData['password']
			
			const token = jwt.sign({ user: userData }, process.env.SECRET_KEY, { expiresIn: '1h' });
			
			return res.status(201).json({ message: 'Success', token });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


authRouter.post('/token-refresh', (req, res) => {
	try {
		const validBody = tokenSchema.validate(req.body)
		if (validBody.error) {
			return res.status(400).json({ error: validBody.error.details[0] })
		}
		const decodedRefreshToken = jwt.verify(validBody.refresh_token, process.env.REFRESH_SECRET_KEY)

	} catch (error) {
		// write some code to put 
		return res.json({ error })
	}

})


module.exports = { authRouter }
