import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportView.css';
import { getRelativeTime } from '../Components/relativeTime';
import Loader from '../Components/Loader';

function ReportView() {
    const [reportDetails, setReportDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/report/viewReportjob/${id}`);
                console.log("API Response:", response.data); 
                setReportDetails(response.data);
            } catch (error) {
                console.error("Error fetching report details:", error);
            }
        };
        fetchReportDetails();
    }, [id]);

    if (!reportDetails) {
        return <div><Loader /></div>;
    }

    const { report, job } = reportDetails;

    const formatDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : 'N/A';
    }
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="job_details new_reports_job">

            <button className="back_button" onClick={handleBackClick}>Back</button>

            <h2>{job.jobTitle}</h2>

            <p>
                <b>Company:</b> {job.companyName} <Link className="web_icon" to={job.webUrl} target="_blank"><i className="fas fa-external-link-alt"></i></Link>
            </p>
            <p><b>Location:</b> {job.location || 'N/A'}</p>
            <p><b>Salary:</b> {job.salary || 'N/A'}</p>
            <div className='apply_button'></div>
            <div className="job_description_details">
                <p><b>Type:</b> {job.jobType || 'N/A'}</p>
                <p><strong>Qualification:</strong> {job.qualification || 'N/A'}</p>
                <p><b>Shift:</b> {job.Shift || 'N/A'}</p>
                <p><strong>Apply Date:</strong> {formatDate(job.applyDate)}</p>
                <p><strong>Last Date:</strong> {formatDate(job.expireDate)}</p>
                <p><strong>Job Description:</strong></p>
                <p className="job_description">{job.description || 'N/A'}</p>
                <p><strong>Selection Process:</strong></p>
                <p className="job_description">{job.selectionProcess || 'N/A'}</p>
                <p><strong>Technology:</strong> {Array.isArray(job.technology) ? job.technology.join(', ') : 'N/A'}</p>
                <p><strong>Shift:</strong> {job.Shift || 'N/A'}</p>
                <p><strong>Application Fee:</strong> {job.applicationFee || 'N/A'}</p>
                <p><b>Posted:</b> {job.applyDate ? getRelativeTime(job.applyDate) : 'N/A'}</p>
            </div>
            <div className="report_details">
                <h2>Reports</h2>
                {report.reports.map((r, index) => (
                    <div key={index}>
                        <p><b>Problem:</b> {r.problem}</p>
                        <p><b>Description:</b> {r.description}</p>
                    </div>
                ))}
                <p><b>Total Reports:</b> {report.reportCount}</p>
            </div>
        </div>
    );
}

export default ReportView;
