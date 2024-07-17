const express = require('express');
const router = express.Router();
const Job = require('../models/Job');




// Create a new Job
router.post('/createJob', async(req,res) =>{
    const job = new Job(req.body);
    try{
        const saveJob = await job.save();
        res.status(201).json(saveJob);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
})

// Get all jobs
router.get('/allJobs', async (req, res) => {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });






















module.exports = router;