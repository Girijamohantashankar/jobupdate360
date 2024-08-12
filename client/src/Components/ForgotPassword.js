import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';
import { Link, useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/forgot/forgot-password', { email });
            toast.success(response.data.message);
            setTimeout(() => navigate('/login'), 3000); 
        } catch (err) {
            toast.error(err.response ? err.response.data.message : 'Error sending reset link');
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Your Password?</h2>
            <p>Enter your email address below, and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="forgot-password-input"
                />
                <button type="submit" className="forgot-password-button">Send Reset Link</button>
                <p>Back to the <Link to="/login">Login</Link></p>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
