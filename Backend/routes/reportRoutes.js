const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Job = require('../models/Job'); 


router.post('/report_job', async (req, res) => {
    const { job_id, report } = req.body;
    const { problem, description } = report;
// console.log(job_id,'job_id');
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
            // console.log(newReport,'newReport');
            await newReport.save();
            return res.status(201).send({ message: 'New report created', report: newReport });
        }
    } catch (error) {
        console.error('Error reporting job:', error);
        return res.status(500).send({ message: 'Server error', error });
    }
});

router.post('/report_delete', async (req, res) => {
    try {
        const { jobId, reportId } = req.body; // Extract jobId and reportId from request body
        console.log(`Received request to delete report with ID: ${reportId} from job with ID: ${jobId}`);

        // Find the report document
        const reportDoc = await Report.findOne({ job_id: jobId });

        if (!reportDoc) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Filter out the specific report by its _id
        reportDoc.reports = reportDoc.reports.filter(report => report._id.toString() !== reportId);

        // Save the updated report document
        await reportDoc.save();

        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error('Error deleting report:', error);
        res.status(500).json({ message: 'Error deleting report', error });
    }
});





module.exports = router;
