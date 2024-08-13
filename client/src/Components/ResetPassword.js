import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

function ResetPassword() {
    const { resetToken } = useParams(); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/forgot/reset-password/${resetToken}`, {
                newPassword: password,
                confirmPassword: confirmPassword,
            });

            if (response.status === 200) {
                toast.success('Password has been reset successfully');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page after successful reset
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong, please try again later');
            }
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
