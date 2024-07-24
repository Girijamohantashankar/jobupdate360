import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/job/jobsByUser');
        setJobs(response.data); // Assuming response.data is an array of jobs
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    fetchJobs();
  }, []);
  
   // Empty array as second argument to useEffect means it runs once on component mount

   return (
    <div>
      <h2>Jobs List</h2>
      <ul>
        {jobs && jobs.map(job => (
          <li key={job._id}>
            <div>Job Type: {job.jobType}</div>
            <div>Job Title: {job.jobTitle}</div>
            <div>Company: {job.companyName}</div>
            <div>Location: {job.location}</div>
            <div>Qualification: {job.qualification}</div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default ViewJobs;
