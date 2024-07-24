import React, { useEffect, useState } from 'react';

const ViewJobs = ({ createdBy }) => {
  const [jobPosts, setJobPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        console.log('Fetching job posts...');
        const token = localStorage.getItem('jwtToken'); // Adjust based on where you store your token
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch(`http://localhost:5000/api/viewJobs/createdBy?createdBy=${createdBy}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Job posts fetched:', data);
        setJobPosts(data);
      } catch (error) {
        console.error('Error fetching job posts:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [createdBy]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Job Posts</h1>
      {jobPosts.length === 0 ? (
        <p>No job posts found.</p>
      ) : (
        <ul>
          {jobPosts.map((job) => (
            <li key={job._id}>
              <h2>{job.jobTitle}</h2>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Apply Date:</strong> {new Date(job.applyDate).toLocaleDateString()}</p>
              <p><strong>Expire Date:</strong> {new Date(job.expireDate).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Selection Process:</strong> {job.selectionProcess}</p>
              <p><strong>Application Fee:</strong> {job.applicationFee}</p>
              <p><strong>Technologies:</strong> {job.technology.join(', ')}</p>
              <p><strong>Shift:</strong> {job.Shift}</p>
              <p><strong>Website:</strong> <a href={job.webUrl} target="_blank" rel="noopener noreferrer">{job.webUrl}</a></p>
              <p><strong>Report Count:</strong> {job.Report}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewJobs;
