const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();



router.get('/username', authMiddleware, async (req, res) => {
    try {
        console.log('Request received for /username');
        const userId = req.user.id;
        const user = await User.findById(userId).select('name');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ name: user.name });
    } catch (error) {
        console.error('Error in /username route:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
