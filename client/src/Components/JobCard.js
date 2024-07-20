import React from 'react';
import './JobCard.css';

function JobCard({ job, onClick, isActive }) {
  return (
    <div className={`card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <div className='cards_text'>
        <h2>{job.title}</h2>
        <div className='company_location'>
          <span>{job.company}</span>
          <span>{job.location}</span>
        </div>
      </div>
      <div className='cards_info'>
        <p><b>{job.salary}</b></p>
        <p>{job.type}</p>
        <p>{job.shift}</p>
      </div>
      <div className='card_des'>
        <li>{job.description}</li>
      </div>
      <div className='date_post'>
        <p>{job.posted}</p>
        <p>more...</p>
      </div>
    </div>
  );
}

export default JobCard;
