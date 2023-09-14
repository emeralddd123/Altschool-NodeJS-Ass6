const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./dbConnection')

const app = express()
const port = process.env.PORT

//db.connnectToDb()

const headSetter = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')  //The CORS should be modified to the requirement

    next()
}

app.use(headSetter)
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))



app.get("*", (req, res) => {
    res.status(404).json({ "error": "Page not found" })
})
app.listen(port, () => console.log(`App listening on port ${port}!`));
