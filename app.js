const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./dbConnection')
const { authRouter } = require('./auth/auth.routes')
const { userRouter } = require('./user/user.routes')
const { authenticate } = require('./auth/auth.middlewares')
const productRouter = require('./product/product.routes')

const app = express()
const port = process.env.PORT

db.connnectToDb()

const headSetter = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')  //The CORS should be modified to the requirement

    next()
}

app.use(headSetter)
app.use(bodyParser.json())

app.use('/auth', authRouter)

app.use('/user', userRouter)



app.use(authenticate)
app.use('/product', productRouter)
app.get('/', (req, res) => res.json(req.user))


app.get("*", (req, res) => {
    res.status(404).json({ "error": "Page not found" })
})
app.listen(port, () => console.log(`App listening on port ${port}!`));
