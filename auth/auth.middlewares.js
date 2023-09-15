const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()


const authenticate = (req, res, next) => {
    // some code to check for user authentication

    next()
}


module.exports = { authenticate }
