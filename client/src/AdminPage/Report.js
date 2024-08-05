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
            const response = await axios.get('http://localhost:5000/api/job/reportAllJobs');
            console.log('Fetched jobs:', response.data); 
            setJobs(response.data);  
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);  
            setError('Error fetching jobs');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    // Handle job deletion
    const handleDelete = async (job) => { 
        try {
            const response = await axios.post('http://localhost:5000/api/report/report_delete', { jobId: job.job_id });
            console.log('Delete response:', response);
            await fetchJobs(); 
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Error deleting job');
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (jobToDelete) {
            handleDelete(jobToDelete);
            setJobToDelete(null);
        }
    };

    // Render loading, error, or jobs
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        
        <div className="report-container">
            {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map((job) => (
                    <div key={job._id} className="job-card">
                        <h3>{job.reports[0]?.problem}</h3>
                        <p>{job.reports[0]?.description}</p>
                        <button onClick={() => setJobToDelete(job)}>Delete</button>
                    </div>
                ))
            ) : (
                <div>No jobs available</div>
            )}
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
