const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); 
const authMiddleware = require('../middleware/authMiddleware'); 

 
router.get('/createdBy', authMiddleware, async (req, res) => {
  try {
    console.log('Request received');
    const { createdBy } = req.query; 

    if (!createdBy) {
      console.log('CreatedBy parameter missing');
      return res.status(400).json({ message: 'CreatedBy parameter is required.' });
    }

    console.log('Fetching jobs for createdBy:', createdBy);
    const jobs = await Job.find({ createdBy });
    console.log('Retrieved jobs:', jobs);

    if (jobs.length === 0) {
      console.log('No jobs found for this user');
      return res.status(404).json({ message: 'No jobs found for this user.' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
