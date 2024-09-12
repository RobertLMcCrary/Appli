const { json } = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    }
})

const jobModel = mongoose.model('job', jobSchema)

module.exports = jobModel