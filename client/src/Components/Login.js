import React, { useContext, useEffect, useState } from 'react';
import './AuthForm.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Loader from './Loader';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext'; // Import AuthContext

function Login() {
  const { setIsLoggedIn, setUserName } = useContext(AuthContext); // Use AuthContext to set authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPass = localStorage.getItem('rememberedPass');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
    if (rememberedPass) {
      setPassword(rememberedPass);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill all the fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Something went wrong!');
        setLoading(false);
      } else {
        toast.success(data.message || 'Login successful!');
        setEmail('');
        setPassword('');
        if (remember) {
          localStorage.setItem('rememberedEmail', email);
          localStorage.setItem('rememberedPass', password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPass');
        }

        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        setUserName(email);
        setLoading(false);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to connect to the server. Please try again later');
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group remember_btn">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        {loading && <Loader />}
        <button type="submit" className="auth-button">Login</button>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
