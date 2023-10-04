const express = require('express')
const { signup } = require('./user.controller')
const { validUserCreation } = require('./user.middleware')
const userRouter = express.Router()

userRouter.post('/signup',validUserCreation, signup)

module.exports = { userRouter } 
