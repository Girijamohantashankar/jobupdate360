import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/username', {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/home');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar_container">
      <div className="nav_bar">
        <div className="logo">
          <Link to="/home">
            <img src={logo} alt="logo" className="logo_img" />
          </Link>
          <Link className="Link br_btn" to="/home">Home</Link>
          <Link className="Link br_btn" to="/review">People Review</Link>
        </div>

        <div className="nav_links">
          <ul>
            {isLoggedIn ? (
              <li className="user_profile" onClick={toggleDropdown}>
                <div className="profile_icon">
                  {userName.charAt(0).toUpperCase()}
                </div>
                {showDropdown && (
                  <div className="dropdown_menu">
                    <Link to="" className="dropdown_item">Profile</Link>
                    <div className="dropdown_item" onClick={handleLogout}>Logout</div>
                  </div>
                )}
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
