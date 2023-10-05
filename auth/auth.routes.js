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
			const userData = { ...userWithName.dataValues };
			delete userData['password'];
			delete userData['createdAt'];
			delete userData['updatedAt'];

			const access_token = jwt.sign({ user: userData }, process.env.SECRET_KEY, { expiresIn: '1h' });
			// const refresh_token = jwt.sign({ user: userData }, process.env.REFRESH_SECRET_KEY, { expiresIn: '24h' })
			return res.status(201).json({ message: 'Success', data: { access_token }, error: null });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});


authRouter.post('/token-refresh', async (req, res) => {
	try {
		// const { error, valid } = tokenSchema.validate(req.body)
		// if (error) {
		// 	return res.status(400).json({ error: error.details[0] })
		// }
		// const { refresh_token } = req.body
		// const decodedRefreshToken = await jwt.verify(refresh_token, process.env.REFRESH_SECRET_KEY)
		// const userId = decodedRefreshToken.user.id
		// const user = await User.findByPk(userId)

		// const userData = { ...user.dataValues }
		// delete userData['password', 'createdAt', 'modifiedAt']

		// const access_token = jwt.sign({ user: userData }, process.env.SECRET_KEY, { expiresIn: '1h' })
		// return res.status(201).json({ message: 'Success', data: { access_token }, error: null });
		return res.json({ message: `Incoming feature`, data: null, error: null })
	} catch (error) {
		// write some code to put 
		return res.status(100).json({ error })
	}

})


module.exports = authRouter
