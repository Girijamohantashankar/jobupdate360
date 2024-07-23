import React, { useState, useEffect } from 'react';
import './ViewJobs.css';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const userId = 'userId'; // Replace with dynamic userId or use a state management library

    fetch(`http://localhost:5000/api/jobsByUser/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('API Response:', data); // Log data received from API
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error('Unexpected API response:', data);
          setJobs([]); // Handle unexpected response
        }
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setJobs([]); // Handle fetch error by setting jobs to empty array
      });
  }, []);

  return (
    <div className='viewJob_container'>
      <h2>Jobs Created by User</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <strong>Title:</strong> {job.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewJobs;
