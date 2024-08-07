import React from 'react'
import "./Admin.css";
import { Link } from 'react-router-dom';
import report from "../assets/report.png";
import allUsers from "../assets/user-group-296.png";
import feedback from "../assets/feedback.png";

function Admin() {
  return (
    <div className='admin_container'>
      <div className='dashboard_cards'>
        <Link to="/reportJob" className='dashboard_card'>
          <img src={report} className='people_img'  alt='report'/>
          <p className='dashboard_card_title'>Report Jobs</p>
        </Link>
        <Link to='/viewAllUsers' className='dashboard_card'>
          <img src={allUsers} className='job_img'  alt='png'/>
          <p className='dashboard_card_title'>View All Users</p>
        </Link>
        <Link to='/feedbackView' className='dashboard_card'>
          <img src={feedback} className='job_img' alt='png'/>
          <p className='dashboard_card_title'>View Feedback</p>
        </Link>
      </div>
    </div>
  )
}

export default Admin