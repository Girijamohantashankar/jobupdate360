const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../models/User');


// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Forgot Password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const encryptedResetToken = CryptoJS.AES.encrypt(resetToken, process.env.ENCRYPTION_SECRET_KEY).toString();
        const resetTokenExpiry = Date.now() + 3600000;
        user.resetToken = encryptedResetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
        
        const filePath = path.join(__dirname, '../views/password-reset-email.html'); 
        let htmlTemplate = fs.readFileSync(filePath, 'utf8');
        htmlTemplate = htmlTemplate.replace('{{resetLink}}', resetLink);

        await transporter.sendMail({
            // from: process.env.EMAIL_USER,
            from: `"jobupdate360" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: htmlTemplate,
        });

        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password route
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;
    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.ENCRYPTION_SECRET_KEY);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
        if (!decryptedToken) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        const user = await User.findOne({
            resetToken: CryptoJS.AES.encrypt(decryptedToken, process.env.ENCRYPTION_SECRET_KEY).toString(),
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetToken = undefined; 
        user.resetTokenExpiry = undefined; 
        await user.save();
        res.status(200).json({ message: 'Password successfully reset. You can now log in with your new password.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
