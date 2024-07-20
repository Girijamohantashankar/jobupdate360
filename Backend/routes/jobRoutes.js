const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const cron = require('node-cron');


router.post('/createJob', async (req, res) => {
  const job = new Job(req.body);
  try {
    const saveJob = await job.save();
    res.status(201).json(saveJob);
    scheduleJobDeletionTask();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function scheduleJobDeletionTask() {
  cron.schedule('0 0 * * *', async () => {
    console.log('Cron job started at:', new Date().toLocaleString());
    try {
      const currentDate = new Date();
      const expiredJobs = await Job.find({ expireDate: { $lt: currentDate } });

      console.log('Found expired jobs:', expiredJobs);
      expiredJobs.forEach(async (job) => {
        await job.remove(); 
      });

      console.log('Expired job deletion completed.');
    } catch (error) {
      console.error('Error running expired job deletion:', error);
    }
  });
}


//  get all jobs
router.get('/allJobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
