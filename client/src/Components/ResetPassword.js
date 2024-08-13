import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css'; 

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:5000/api/forgot/reset-password`, { token, password });
            toast.success(response.data.message);
            setTimeout(() => navigate('/login'), 3000); 
        } catch (err) {
            console.error("Error:", err.response ? err.response.data : err);
            toast.error(err.response ? err.response.data.message : 'Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Your Password</h2>
            <p>Enter your new password below to reset it.</p>
            <form onSubmit={handleSubmit} className="forgot-password-form">
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="forgot-password-input"
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="forgot-password-input"
                />
                <button 
                    type="submit" 
                    className="forgot-password-button" 
                    disabled={loading}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                <p>Back to the <Link to="/login">Login</Link></p>
            </form>
            <ToastContainer />
        </div>
    );
}

export default ResetPassword;
