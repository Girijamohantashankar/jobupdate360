import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReportView.css';
import { getRelativeTime } from '../Components/relativeTime';

function ReportView() {
    const [selectedJob, setSelectedJob] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try { 
                const response = await axios.get(`http://localhost:5000/api/report/viewReportjob/${id}`);
                console.log("API Response:", response.data);  // Log the API response
                setSelectedJob(response.data);
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };
        fetchJob();
    }, [id]);

    if (!selectedJob) {
        return <div>Loading...</div>;
    }

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'N/A';
    }

    return (
        <div className="job_details">
            <p><b>Location:</b> {selectedJob.location || 'N/A'}</p>
            <p><b>Salary:</b> {selectedJob.salary }</p>
            <div className='apply_button'></div>
            <div className="job_description_details">
                <p><b>Type:</b> {selectedJob.jobType }</p>
                <p><strong>Qualification:</strong> {selectedJob.qualification || 'N/A'}</p>
                <p><b>Shift:</b> {selectedJob.Shift || 'N/A'}</p>
                <p><strong>Apply Date:</strong> {formatDate(selectedJob.applyDate)}</p>
                <p><strong>Last Date:</strong> {formatDate(selectedJob.expireDate)}</p>
                <p><strong>Job Description:</strong></p>
                <p className="job_description">{selectedJob.description || 'N/A'}</p>
                <p><strong>Selection Process:</strong></p>
                <p className="job_description">{selectedJob.selectionProcess || 'N/A'}</p>
                <p><strong>Technology:</strong> {Array.isArray(selectedJob.technology) ? selectedJob.technology.join(', ') : 'N/A'}</p>
                <p><strong>Shift:</strong> {selectedJob.Shift || 'N/A'}</p>
                <p><strong>Application Fee:</strong> {selectedJob.applicationFee || 'N/A'}</p>
                <p><b>Posted:</b> {selectedJob.applyDate ? getRelativeTime(selectedJob.applyDate) : 'N/A'}</p>
            </div>
        </div>
    );
}

export default ReportView;
