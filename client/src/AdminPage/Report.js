import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';

const Report = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobToDelete, setJobToDelete] = useState(null);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/job/allJobs');
            setJobs(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (jobId) => {
        try {
            await axios.delete(`http://localhost:5000/api/reportDelete/delete_job/${jobId}`);
            await fetchJobs(); 
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const handleConfirmDelete = () => {
        handleDelete(jobToDelete);
        setJobToDelete(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading jobs</div>;

    return (
        <div className="report-container">
            {jobs.map((job) => (
                <div key={job._id} className="job-card">
                    <h3>{job.title}</h3>
                    <p>{job.description}</p>
                    <button onClick={() => setJobToDelete(job._id)}>Delete</button>
                </div>
            ))}
            {jobToDelete && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this job?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={() => setJobToDelete(null)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;
