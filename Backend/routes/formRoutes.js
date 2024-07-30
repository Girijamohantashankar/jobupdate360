const express = require('express');
const Form = require('../models/formModel');
const router = express.Router();

router.post('/submit-form', async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error });
  }
});

module.exports = router;
