import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import report from '../assets/report.png';
import allUsers from '../assets/user-group-296.png';
import feedback from '../assets/feedback.png';
import contact from '../assets/viewContact.png';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';



ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


function Admin() {
  const [progress, setProgress] = useState({
    totalUsers: 0,
    blockUsers: 0,
    totalJobs: 0,
    activeUsers: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [maxUsers, setMaxUsers] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const totalUsers = await fetchTotalUsers();
      setMaxUsers(totalUsers);
      const blockUsers = await fetchBlockUsers();
      const totalJobs = await fetchTotalJobs();
      const activeUsers = await fetchActiveUsers();
      const monthlyCounts = await fetchMonthlyJobCounts();

      setProgress({
        totalUsers,
        blockUsers,
        totalJobs,
        activeUsers,
      });
      setMonthlyData(monthlyCounts);
      setLoading(false);
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


  const fetchMonthlyJobCounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/countUser/monthlyJobCounts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.monthlyCounts;
    } catch (error) {
      console.error('Error fetching monthly job counts:', error);
      return Array(12).fill(0);
    }
  };



  const calculateProgress = (value) => (value / maxUsers) * 100;


  // Function to determine color based on job count
  const getColor = (count) => {
    if (count > 100) return '#4caf50';
    if (count > 50) return '#ff9800';
    return '#f44336';
  };

  // Data for the bar chart
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Jobs Posted',
        data: monthlyData,
        backgroundColor: monthlyData.map(getColor),
      }
    ]
  };



  return (
    <div className='admin_container'>
      {loading ? (
        <Loader />
      ) : (
        <div className='dashboard_cards'>
          <Link to="/reportJob-j78-ht88-gir-9hrh-72th8-de0we" className='dashboard_card'>
            <img src={report} className='people_img' alt='report' />
            <p className='dashboard_card_title'>View Report Jobs</p>
          </Link>
          <Link to='/viewAllUsers-756bhd-76bh-th687-gdb78-gii-99re' className='dashboard_card'>
            <img src={allUsers} className='job_img' alt='png' />
            <p className='dashboard_card_title'>View All Users</p>
          </Link>
          <Link to='/feedbackView-74ht-2024-to-2025bdg-tu45-ebt09' className='dashboard_card'>
            <img src={feedback} className='job_img' alt='png' />
            <p className='dashboard_card_title'>View Feedback</p>
          </Link>
          <Link to="/viewContact-2024-hyb-45hd-new78-243-ngs45-jbf12-8jnh-ndh09" className='dashboard_card'>
            <img src={contact} className='job_img' alt='png' />
            <p className='dashboard_card_title'>View Contact Requests</p>
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


          <div className='dashboard_card_bar'>
            <p className='dashboard_card_title1'>Monthly Jobs Posted</p>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>

        </div>
      )}
    </div>
  );
}

export default Admin; 
