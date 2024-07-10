import React from 'react';
import './AuthForm.css';

function Login() {
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
