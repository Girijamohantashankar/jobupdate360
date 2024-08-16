import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { AuthContext } from '../AuthContext';
import LogoutModal from './LogoutModal';

function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsModalOpen(false);
    navigate('/');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProfileIconClick = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

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
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            <img src={logo} alt="logo" className="logo_img" />
          </NavLink>
          <NavLink to="/" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>Home</NavLink>
          <NavLink to="/feedbackShow" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>People's Feedback</NavLink>
          <NavLink to="/contact-us" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>Contact us</NavLink>
          <NavLink to="/about" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>About</NavLink>
          {isLoggedIn && (
            <NavLink to="/dashboard" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
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
                    <NavLink to="/profile" className={({ isActive }) => `dropdown_item ${isActive ? 'active' : ''}`}><i className="fa-solid fa-user"></i> Profile</NavLink>
                    <NavLink to="/" className={({ isActive }) => `dropdown_item ${isActive ? 'active' : ''}`}><i className="fa-solid fa-house"></i> Home</NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => `dropdown_item ${isActive ? 'active' : ''}`}><i className="fa-solid fa-chart-line"></i> Dashboard</NavLink>
                    <div className="dropdown_item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i> Logout</div>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <NavLink to="/signup" className={({ isActive }) => `Link br_btn ${isActive ? 'active' : ''}`}>Employee | Post Job</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export default Navbar;
