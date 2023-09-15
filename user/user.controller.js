const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required(),
    phoneNumber: Joi.string().min(3).required()
})


const signup = async(req, res) => {

}

const login = async(req, res) => {

}
