import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import './ViewJobs.css';
import { Link } from 'react-router-dom';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

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
  }, [jobToDelete]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/job/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error('Failed to delete job');
      }
  
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
    }
  };
  
  const handleShowModal = (id) => {
    setJobToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(jobToDelete);
    handleCloseModal();
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-msg">{error}</div>;
  }

  return (
    <div className="viewJob_container">
      <h1>Your Posts</h1>
      {jobs.length === 0 ? (
        <p className="no-jobs-msg">No jobs found.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-item card">
              <div className="job-actions">
              <Link to={`EditJob/${job._id}`}><i className="fas fa-edit"></i></Link>
                
                <i className="fas fa-trash" onClick={() => handleShowModal(job._id)}></i>
              </div>
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
            </div>
          ))}
        </div>
      )}
      <Modal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmDelete} />
    </div>
  );
}

export default ViewJobs;
