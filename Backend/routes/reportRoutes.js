const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Job = require('../models/Job'); 

// To Display the reports Job
router.post('/report_job', async (req, res) => {
    const { job_id, report } = req.body;
    const { problem, description } = report;
    try {
        let existingReport = await Report.findOne({ job_id });
        if (existingReport) {
            const problemExists = existingReport.reports.some(r => r.problem === problem && r.description === description);
            if (!problemExists) {
                existingReport.reports.push({ problem, description });
            }
            existingReport.reportCount += 1;
            await existingReport.save();
            return res.status(200).send({ message: 'Report count incremented and report added if new', report: existingReport });
        } else {
            const newReport = new Report({
                job_id,
                reports: [{ problem, description }],
                reportCount: 1
            });
            await newReport.save();
            return res.status(201).send({ message: 'New report created', report: newReport });
        }
    } catch (error) {
        console.error('Error reporting job:', error);
        return res.status(500).send({ message: 'Server error', error });
    }
});

// To delete the job Reports
router.post('/report_delete', async (req, res) => {
    try {        
        const { jobId } = req.body;
        const jobDeletionResult = await Job.findByIdAndDelete(jobId);
        const reportDeletionResult = await Report.deleteMany({ job_id: jobId });

        res.status(200).json({
            message: 'Job and reports deleted successfully',
            jobDeletionResult,
            reportDeletionResult
        });
    } catch (error) {
        console.error('Error deleting job and reports:', error);
        res.status(500).json({ message: 'Error deleting job and reports', error });
    }
});



module.exports = router;
