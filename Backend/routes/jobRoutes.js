const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Job = require('../models/Job');
const cron = require('node-cron');


router.post('/createJob', authMiddleware, async (req, res) => {
  let newObject={...req.body, createdBy:req.user.id};
  const job = new Job(newObject);
  console.log(job);
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
cron.schedule('0 0 * * *', deleteExpiredJobs);


//  get all jobs
router.get('/allJobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all jobs created by a specific user
router.get('/jobsByUser', async (req, res) => {
  const userId = req.query.userId; // Fetch userId from query parameter
  
  try {
    // Fetch jobs created by the specified user (userId)
    const jobs = await Job.find({ createdBy: userId }).sort({ createdAt: -1 });
    
    // Log the fetched jobs to console
    console.log("Jobs fetched:", jobs);
    
    // Send the jobs as JSON response
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;
