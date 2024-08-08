import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import report from '../assets/report.png';
import allUsers from '../assets/user-group-296.png';
import feedback from '../assets/feedback.png';

function Admin() {
  const [progress, setProgress] = useState({
    totalUsers: 0,
    blockUsers: 0,
    totalJobs: 0,
    activeUsers: 0,
  });

  const [maxUsers, setMaxUsers] = useState(1); 

  useEffect(() => {
    const fetchData = async () => {
      const totalUsers = await fetchTotalUsers();
      setMaxUsers(totalUsers);
      const blockUsers = await fetchBlockUsers();
      const totalJobs = await fetchTotalJobs();
      const activeUsers = await fetchActiveUsers();

      setProgress({
        totalUsers,
        blockUsers,
        totalJobs,
        activeUsers,
      });
    };

    fetchData();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countUser/totalUsers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.totalUsers;
    } catch (error) {
      console.error('Error fetching total users:', error);
      return 0;
    }
  };

  const fetchBlockUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countUser/blockedUsers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.blockedUsers;
    } catch (error) {
      console.error('Error fetching blocked users:', error);
      return 0;
    }
  };

  const fetchTotalJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countUser/totalJobs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.totalJobs;
    } catch (error) {
      console.error('Error fetching total jobs:', error);
      return 0;
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countUser/activeUsers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.activeUsers;
    } catch (error) {
      console.error('Error fetching active users:', error);
      return 0;
    }
  };

  const calculateProgress = (value) => (value / maxUsers) * 100;

  return (
    <div className='admin_container'>
      <div className='dashboard_cards'>
        <Link to="/reportJob" className='dashboard_card'>
          <img src={report} className='people_img' alt='report' />
          <p className='dashboard_card_title'>Report Jobs</p>
        </Link>
        <Link to='/viewAllUsers' className='dashboard_card'>
          <img src={allUsers} className='job_img' alt='png' />
          <p className='dashboard_card_title'>View All Users</p>
        </Link>
        <Link to='/feedbackView' className='dashboard_card'>
          <img src={feedback} className='job_img' alt='png' />
          <p className='dashboard_card_title'>View Feedback</p>
        </Link>

        <div className='dashboard_card_circle'>
          <div
            className='circular_progress'
            style={{ '--progress': calculateProgress(progress.totalUsers) + '%', '--color': '#4caf50' }}
          >
            <p className='dashboard_card_title1'>Total Users : {progress.totalUsers} </p>

          </div>
        </div>
        <div className='dashboard_card_circle'>
          <div
            className='circular_progress'
            style={{ '--progress': calculateProgress(progress.blockUsers) + '%', '--color': '#ff5722' }}
          >
            <p className='dashboard_card_title1'>Block Users : {progress.blockUsers}</p>

          </div>
        </div>

        <div className='dashboard_card_circle'>
          <div
            className='circular_progress'
            style={{ '--progress': calculateProgress(progress.activeUsers) + '%', '--color': '#ffc107' }}
          >
            <p className='dashboard_card_title1'>Active Users : {progress.activeUsers}</p>

          </div>
        </div>
        <div className='dashboard_card_circle'>
          <div
            className='circular_progress'
            style={{ '--progress': calculateProgress(progress.totalJobs) + '%', '--color': '#2196f3' }}
          >
            <p className='dashboard_card_title1'>Total Jobs : {progress.totalJobs}</p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
