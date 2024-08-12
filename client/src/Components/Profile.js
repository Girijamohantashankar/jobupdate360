import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { AuthContext } from '../AuthContext';
import defaultProfilePic from '../assets/profile_logo.jpg';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';
import Loader from './Loader';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { userName, email, setIsLoggedIn } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserDetails({
              name: data.name || userName,
              email: data.email || email,
            });
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }

    };

    fetchUserProfile();
  }, [userName, email]);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleHome = () => {
    navigate('/');
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
  return (
    <div className="profile-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="profile-header">
            <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
            <div className='user_detail'>
              <h2>{userDetails.name}</h2>
              <p>{userDetails.email}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={handleHome} className="home-button"><i className="fa-solid fa-house"></i> Home</button>
            <button onClick={handleLogout} className="logout-button"><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
          </div>
          <LogoutModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmLogout}
          />
        </>
      )}
    </div>
  );
}

export default Profile;
