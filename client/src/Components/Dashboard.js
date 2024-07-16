import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import job from "../assets/job.png";
import people from "../assets/people.png";

function Dashboard() {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

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

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_slider">
          <div className="dashboard_greeting">{greeting}</div>
        </div>
      </div >
      <div className='dashboard_cards'>
        <Link className='dashboard_card'>
        <img src={people}  className='people_img'/>
          <p className='dashboard_card_title'>People Applied</p>
        </Link>
        <Link className='dashboard_card'>
          <img src={job} className='job_img' />
          <p className='dashboard_card_title'>Create Jobs</p>
        </Link>
      </div>
    </>

  );
}

export default Dashboard;
