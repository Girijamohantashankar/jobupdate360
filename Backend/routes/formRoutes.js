const express = require('express');
const Form = require('../models/formModel');
const router = express.Router();
const upload = require('../middleware/multerConfig');


router.post('/submit-form', upload.single('pdf'), async (req, res) => {
    try {
        console.log(req.body);


        const existingForm = await Form.findOne({ email: req.body.email });

        if (existingForm) {
            return res.status(400).json({ message: 'This email ID has already been used to apply.' });
        }
        const form = new Form({
            fullName: req.body.fullName,
            email: req.body.email,
            mobileNumber: req.body.mobileNumber,
            location: req.body.location,
            portfolioUrl: req.body.portfolioUrl,
            pdf: req.file.path,
            jobTitle: req.body.jobTitle,
            companyName: req.body.companyName,
            highestQualification: req.body.highestQualification,
            totalExperience: req.body.totalExperience,
            interviewDate: req.body.interviewDate,
            noticePeriod: req.body.noticePeriod,
            jobId: req.body.jobId,
            createdBy: req.body.createdBy,
        });

        await form.save();
        res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving form data', error });
    }
});

module.exports = router;
