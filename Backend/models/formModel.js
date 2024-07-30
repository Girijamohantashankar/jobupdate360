const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    pdf: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    highestQualification: {
        type: String,
        required: true,
    },
    totalExperience: {
        type: String,
        required: true,
    },
    interviewDate: {
        type: Date,
        required: true,
    },
    noticePeriod: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
