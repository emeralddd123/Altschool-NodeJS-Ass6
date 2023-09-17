const Joi = require('joi')

const userSchema = Joi.object({
    email: Joi.string().min(3).max(100).required(),
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).required(),
    phoneNumber: Joi.string().min(3).required()
})

const validUserCreation = (req, res, next) => {
    const { error, value } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validUserCreation }
