const express = require('express');
const Feedback = require('../models/feedback');
const router = express.Router();


// TO Save the feedback 
router.post('/feedback', (req, res) => {
    const { feedback, rating } = req.body;
    const newFeedback = new Feedback({ feedback, rating });
    newFeedback.save()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).send(err));
});

// To Retrieve status-->"view" feedback
router.get('/feedbackView', (req, res) => {
    Feedback.find({ status: 'view' })
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).send(err));
});

// updated feedback status
router.patch('/feedback/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedFeedback);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete feedback by ID
router.delete('/feedback/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(400).send(err);
    }
});


// To Retrieve status-->"accepted" feedback
router.get('/feedbackAccepted', (req, res) => {
    Feedback.find({ status: 'accepted' })
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).send(err));
});


module.exports = router;
