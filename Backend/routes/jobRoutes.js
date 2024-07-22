const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const cron = require('node-cron');


router.post('/createJob', async (req, res) => {
  const job = new Job(req.body);
  try {
    const saveJob = await job.save();
    res.status(201).json(saveJob);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function deleteExpiredJobs() {
  console.log('Cron job started at:', new Date().toLocaleString());
  try {
    const currentDate = new Date();
    console.log(currentDate, 'currentDate');
    const expiredJobs = await Job.find({ expireDate: { $lt: currentDate } });

    console.log('Found expired jobs:', expiredJobs);
    for (const job of expiredJobs) {
      await job.deleteOne(); // Use deleteOne method
    }

    console.log('Expired job deletion completed.');
  } catch (error) {
    console.error('Error running expired job deletion:', error);
  }
}

// Schedule the job to run at midnight every day
cron.schedule('0 18 * * *', deleteExpiredJobs);


//  get all jobs
router.get('/allJobs', async (req, res) => {
  try {

    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
