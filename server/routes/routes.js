const express = require('express')
const router = express.Router()
const cors = require('cors')
const { test, fetchAllJobs, getJobById, createJob, updateJob, deleteJob, deleteAllJobs } = require('../controllers/controller')

const app = express()

const corsOptions = {
    origin: 'http://127.0.0.1:5500/client/index.html',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions))

//routes (connected to the functions from controller)
router.get('/', test)
router.get('/jobs', fetchAllJobs)
router.get('/jobs/:id', getJobById)
router.post('/jobs', createJob)
router.put('/jobs/:id', updateJob)
router.delete('/jobs/:id', deleteJob)
router.delete('/jobs', deleteAllJobs)


module.exports = router