import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';

const Report = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobToDelete, setJobToDelete] = useState(null);

    // Fetch jobs from the API
    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/job/reportAllJobs');
            console.log('Fetched jobs:', response.data);  // Log fetched jobs

            // Extract the first report from each entry
            const singleJobReports = response.data.flatMap(item => item.reports ? [item.reports[0]] : []);
            setJobs(singleJobReports);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);  // Set jobs to an empty array in case of an error
            setError('Error fetching jobs');
            setLoading(false);
        }
    };

    // Fetch jobs when the component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    // Handle job deletion
    const handleDelete = async (jobId) => {
        console.log('Deleting job with ID:', jobId); // Log jobId
        try {
            const response = await axios.post('http://localhost:5000/api/report/report_delete', { jobId });
            console.log('Delete response:', response); // Log the response
            await fetchJobs(); // Refresh the job list after deletion
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
                        <h3>{job.problem}</h3>
                        <p>{job.description}</p>
                        <button onClick={() => setJobToDelete(jobs._id)}>Delete</button>
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
