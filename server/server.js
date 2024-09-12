const express = require('express')
const PORT = 5001
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

app.use(express.json())

//connecting to database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"))
.catch(() => console.log("db not connected"))


app.use('/', require('./routes/routes'))


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})