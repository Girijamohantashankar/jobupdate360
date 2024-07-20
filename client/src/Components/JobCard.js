import React from 'react';
import { getRelativeTime } from './relativeTime';
import './JobCard.css';

function JobCard({ job, onClick, isActive }) {
  const description = job.description.length > 100 ? job.description.slice(0, 100) + '...' : job.description;

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
        <li>{description}</li>
        {job.description.length > 100 && <span className='more_text'>more...</span>}
      </div>
      <div className='date_post'>
        <p><b>Posted:</b> {getRelativeTime(job.applyDate)}</p>
      </div>
    </div>
  );
}

export default JobCard;
