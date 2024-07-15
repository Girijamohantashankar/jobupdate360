import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/user/username', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserName(data.name);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Failed to fetch username:', error);
          setIsLoggedIn(false);
        }
      }
    };

    fetchUserName();
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
