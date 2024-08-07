const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback: String,
    rating: Number,
    timestamp: { type: Date, default: Date.now },
    status: { type: String, default: 'view' }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
