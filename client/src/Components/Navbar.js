import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if the user is logged in by checking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching the user's name
      const user = { name: 'Girija Shankar Mohanta' }; // Replace this with actual API call to fetch user details
      setUserName(user.name);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="navbar_container">
      <div className="nav_bar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="logo_img" />
          </Link>
          <Link className="Link br_btn" to="/">Home</Link>
          <Link className="Link br_btn" to="/review">People Review</Link>
        </div>

        <div className="nav_links">
          <ul>
            {isLoggedIn ? (
              <li className="user_profile">
                <Link className="Link br_btn" to="/profile">
                  {userName.charAt(0).toUpperCase()}
                </Link>
              </li>
            ) : (
              <li>
                <Link className="Link br_btn" to="/signup">Employee | Post Job</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
