import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

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
  }, [setIsLoggedIn, setUserName]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleProfileIconClick = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar_container">
      <div className="nav_bar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="logo_img" />
          </Link>
          <Link className="Link br_btn" to="/">Home</Link>
          <Link className="Link br_btn" to="/feedbackShow">People's Feedback</Link>
          {isLoggedIn && (
            <Link className="Link br_btn" to="/dashboard">Dashboard</Link>
          )}
        </div>

        <div className="nav_links">
          <ul>
            {isLoggedIn ? (
              <li className="user_profile">
                <span className="Link br_btn profile_icon" onClick={handleProfileIconClick}>
                  {userName.charAt(0).toUpperCase()}
                </span>
                {showDropdown && (
                  <div className="dropdown_menu" ref={dropdownRef}>
                    <Link to="/profile" className="dropdown_item">Profile</Link>
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
