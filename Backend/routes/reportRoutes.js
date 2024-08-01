const express = require('express');
const router = express.Router();
const Report = require('../models/Report')



router.post('/report_job', async (req, res) => {
  
   const job = req.body.job
   const problem = req.body.report.problem
   const description = req.body.report.description

   console.log(job,problem,description);
})



module.exports = router;