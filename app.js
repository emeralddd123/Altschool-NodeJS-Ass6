const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./dbConnection')
const authRouter = require('./auth/auth.routes')
const authMid = require('./auth/auth.middlewares')

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

app.use('auth/', authRouter)

app.get('/', (req, res) => res.send('Hello World!'))

//app.use(authMid)



app.get("*", (req, res) => {
    res.status(404).json({ "error": "Page not found" })
})
app.listen(port, () => console.log(`App listening on port ${port}!`));
