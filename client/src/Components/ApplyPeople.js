import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ApplyPeople.css';
import Loader from './Loader';

function ApplyPeople() {
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
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="viewJob_container">
            <h1>Your Posts</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="error-msg">{error}</p>
            ) : jobs.length === 0 ? (
                <p className="no-jobs-msg">No jobs found.</p>
            ) : (
                <div className="job-list">
                    {jobs.map((job) => (
                        <div key={job._id} className="job-item card">
                            <h2>{job.jobTitle}</h2>
                            <p><strong>Company:</strong> {job.companyName}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                            <p><strong>Apply By:</strong> {new Date(job.applyDate).toLocaleDateString()}</p>
                            <p><strong>Expires On:</strong> {new Date(job.expireDate).toLocaleDateString()}</p>
                            <p><strong>Shift:</strong> {job.Shift}</p>
                            <p><strong>Technologies:</strong> {job.technology.join(', ')}</p>
                            <p><strong>Qualification:</strong> {job.qualification}</p>
                            <p><strong>Batch:</strong> {job.batch}</p>
                            <Link to={`/view-applied-candidates/${job._id}`} className="view-candidates-button">
                                View Applied Candidates
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ApplyPeople;
