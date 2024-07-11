const express = require('express')
require ("dotenv").config()
const {connectDB} = require('./db')
const router = require('./router')

const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

connectDB()

app.use("/usuarios", router)

app.listen(8000)