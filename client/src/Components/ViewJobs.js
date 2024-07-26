import React, { useEffect, useState } from 'react';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/job/userPosts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }

        const data = await response.json();
        setJobs(data.jobs);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Your Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.jobTitle}</h2>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Apply By:</strong> {new Date(job.applyDate).toLocaleDateString()}</p>
              <p><strong>Expires On:</strong> {new Date(job.expireDate).toLocaleDateString()}</p>
              <p><strong>Shift:</strong> {job.Shift}</p>
              <p><strong>Technologies:</strong> {job.technology.join(', ')}</p>
              <p><strong>Application Fee:</strong> {job.applicationFee}</p>
              <p><strong>Selection Process:</strong> {job.selectionProcess}</p>
              <p><strong>Qualification:</strong> {job.qualification}</p>
              <p><strong>Batch:</strong> {job.batch}</p>
              <a href={job.webUrl} target="_blank" rel="noopener noreferrer">Job Link</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewJobs;
