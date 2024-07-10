import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AuthForm.css';
import { Link, Navigate } from 'react-router-dom'; // Importing useHistory correctly

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Password does not match');
            setLoading(false);
            return;
        }
        if (!name || !email || !password || !confirmPassword) {
            toast.error('Please fill all the fields');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Something went wrong!');
            } else {
                toast.success(data.message || 'Signup successful! Please login.');

                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            }
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                Navigate('/login');
            }, 3000);

        } catch (error) {
            toast.error('Failed to connect to the server. Please try again later');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <ToastContainer />
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Choose a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-button" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default Signup;
