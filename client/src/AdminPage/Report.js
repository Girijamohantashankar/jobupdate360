import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';
import { useNavigate } from "react-router-dom";
import Loader from '../Components/Loader';

const Report = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobToDelete, setJobToDelete] = useState(null);
    const navigate = useNavigate();

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

    // Handle ignoring the report job
    const handleIgnore = async (job) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/report/deleteReport/${job._id}`);
            console.log('Ignore response:', response);
            setJobs(jobs.filter(j => j._id !== job._id));
        } catch (error) {
            console.error('Error ignoring report job:', error);
            setError('Error ignoring report job');
        }
    };
    // Confirm deletion
    const handleConfirmDelete = () => {
        if (jobToDelete) {
            handleDelete(jobToDelete);
            setJobToDelete(null);
        }
    };

    if (loading) return <div><Loader /></div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="report-container">
            {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map((job) => (
                    <div key={job._id} className="job-card">
                        <div className='report_counts'>
                            <span><b>Reason:</b></span>
                            <span> {job.reports[0]?.problem}</span>
                            <span><b>Description</b></span>
                            <p>{job.reports[0]?.description}</p>
                            <p><b>Total user Reported:</b> <span className='text_color_r'>{job.reportCount}</span> </p>
                        </div>
                        <div className='card_delete_btn'>
                            <button className='btn_delete' onClick={() => setJobToDelete(job)}>Delete</button>
                            <button className='btn_view' onClick={() => navigate(`/job/${job._id}`)}>View</button>
                            <button className='btn_ignore' onClick={() => handleIgnore(job)}>Ignore</button>
                        </div>
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
