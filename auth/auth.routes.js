const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { UserModel } = require('../user/user.model')


const userLoginSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required()
})

authRouter = express.Router()

authRouter.post('/login', async (req, res) => {
    //login function
})


module.exports = { authRouter }
