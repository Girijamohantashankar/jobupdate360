import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';
import { useNavigate } from "react-router-dom";

const Report = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobToDelete, setJobToDelete] = useState(null);
    const navigate = useNavigate();


    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/job/reportAllJobs');
<<<<<<< HEAD
            console.log('Fetched jobs:', response.data); // Log fetched jobs

            // Update jobs state
=======
            console.log('Fetched jobs:', response.data);
>>>>>>> 1aff87935359d0a936fc8ffe086c98535dab12fc
            setJobs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
<<<<<<< HEAD
            setJobs([]); // Set jobs to an empty array in case of an error
=======
            setJobs([]);
>>>>>>> 1aff87935359d0a936fc8ffe086c98535dab12fc
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
<<<<<<< HEAD
            // Call the endpoint to delete the entire job
            const response = await axios.delete(`http://localhost:5000/api/reportDelete/delete_job/${jobId}`);
            console.log('Delete response:', response); // Log the response
            await fetchJobs(); // Refresh the job list after deletion
=======
            const response = await axios.post('http://localhost:5000/api/report/report_delete', { jobId: job.job_id });
            console.log('Delete response:', response);
            await fetchJobs();
>>>>>>> 1aff87935359d0a936fc8ffe086c98535dab12fc
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Error deleting job');
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        console.log('Confirm delete clicked'); // Debugging
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
<<<<<<< HEAD
                        <h3>{job.problem}</h3>
                        <p>{job.description}</p>
                        <button onClick={() => setJobToDelete(job._id)}>Delete</button>
=======
                        <h3>{job.reports[0]?.problem}</h3>
                        <p>{job.reports[0]?.description}</p>
                        <p>Total user Reported: {job.reportCount}</p>
                        <div className='card_delete_btn'>
                            <button className='btn_delete' onClick={() => setJobToDelete(job)}>Delete</button>
                            <button className='btn_view' onClick={() => navigate(`/job/${job._id}`)}>View</button>
                            <button className='btn_ignore' onClick={() => navigate(`${job.job_id}`)}>Ignore</button>
                        </div>
>>>>>>> 1aff87935359d0a936fc8ffe086c98535dab12fc
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
