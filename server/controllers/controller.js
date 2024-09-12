const Job = require('../models/Job')
const mongoose = require('mongoose')

const test = (req, res) => {
    res.json('test is working')
}

const fetchAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
        return res.json(jobs)
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Convert the string ID to an ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(job);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const createJob = async (req, res) => {
    try {

        const { title, status, location } = req.body

        if (!title || !status || !location) {
            return res.json({
                error: "All fields are required!"
            })
        }

        const job = await Job.create({
            title,
            status,
            location
        })

        return res.json(job)

    }
    catch (error) {
        console.error(error)
    }
}

const updateJob = async (req, res) => {
    try {

        const jobId = req.params.id;
        const { title, status, location } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }

        // Find and update the job
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { title, status, location },
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(updatedJob);

    }
    catch(error) {
        console.error(error)
    }
}

const deleteJob = async (req, res) => {
    try {

        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ error: 'Invalid job ID' });
        }

        const result = await Job.findByIdAndDelete(jobId);

        if (!result) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });

    }
    catch(error) {
        console.error(error)
    }
}

const deleteAllJobs = async (req, res) => {
    try {
        // Delete all jobs
        const result = await Job.deleteMany({});

        res.json({ message: 'All jobs have been deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting all jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    test,
    createJob,
    updateJob,
    deleteJob,
    fetchAllJobs,
    getJobById,
    deleteAllJobs
}