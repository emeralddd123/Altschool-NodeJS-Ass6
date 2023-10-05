const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./dbConnection')
const authRouter = require('./auth/auth.routes')
const userRouter = require('./user/user.routes')
const { authenticate } = require('./auth/auth.middlewares')
const productRouter = require('./product/product.routes')
const categoryRouter = require('./product/category.routes')

const app = express()
const port = process.env.PORT

db.connnectToDb()

const headSetter = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')  //unsafe

    next()
}

app.use(headSetter)
app.use(bodyParser.json())

app.get('/', (req, res) => res.send("Welcome To Product Store"))

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use(authenticate)
app.use('/product', productRouter)
app.use('/category', categoryRouter)

app.get('/me', (req, res) => {
    return res.status(200).json({ message: 'success', data:{user: req.user}, error:null });
})


app.get("*", (req, res) => {
    res.status(404).json({ "error": "Page not found" })
})
app.listen(port, () => console.log(`App listening on port ${port}!`));
