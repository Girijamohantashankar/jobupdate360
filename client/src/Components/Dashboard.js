import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import job from "../assets/job.png";
import people from "../assets/people.png";
import jobview from "../assets/jobview.png";
import Loader from './Loader';
import MonthlyPostViews from './MonthlyPostViews';

function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://localhost:5000/api/user/username', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserName(data.name);
      } catch (error) {
        console.error('Error fetching user data:', error.message);

      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const hours = new Date().getHours();
    let greet;

    if (hours < 12) greet = 'Good Morning';
    else if (hours < 18) greet = 'Good Afternoon';
    else greet = 'Good Evening';

    setGreeting(`${greet}, ${userName}`);
  }, [userName]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_slider">
          <div className="dashboard_greeting">{greeting}</div>
        </div>
      </div >
      <div className='dashboard_cards'>
        <Link to='/appliedPeople' className='dashboard_card'>
          <img src={people} className='people_img' alt='png' />
          <p className='dashboard_card_title'>People Applied</p>
        </Link>
        <Link to='/createJob' className='dashboard_card'>
          <img src={job} className='job_img' alt='png' />
          <p className='dashboard_card_title'>Create Jobs</p>
        </Link>
        <Link to='/viewJobs' className='dashboard_card'>
          <img src={jobview} className='job_img' alt='png' />
          <p className='dashboard_card_title'>View Posts</p>
        </Link>
      </div>
      <MonthlyPostViews />
    </>

  );
}

export default Dashboard;
