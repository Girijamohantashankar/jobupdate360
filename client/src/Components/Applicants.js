import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Applicants.css';
import Loader from './Loader';
import noApplicantsGif from '../assets/noresult.jpg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Applicants() {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [filteredApplicants, setFilteredApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        experience: '',
        location: '',
        noticePeriod: ''
    });

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/form/applicants/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applicants');
                }

                const data = await response.json();
                setApplicants(data.applicants);
                setFilteredApplicants(data.applicants);
            } catch (err) {
                console.error('Error fetching applicants:', err);
                setError('Failed to load applicants');
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId]);

    useEffect(() => {
        filterApplicants();
    }, [searchTerm, filters]);

    const filterApplicants = () => {
        let updatedApplicants = applicants;

        if (searchTerm) {
            updatedApplicants = updatedApplicants.filter((applicant) =>
                applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filters.experience) {
            updatedApplicants = updatedApplicants.filter(
                (applicant) => parseInt(applicant.totalExperience) >= parseInt(filters.experience)
            );
        }

        if (filters.location) {
            updatedApplicants = updatedApplicants.filter(
                (applicant) => applicant.location.toLowerCase() === filters.location.toLowerCase()
            );
        }

        if (filters.noticePeriod) {
            updatedApplicants = updatedApplicants.filter(
                (applicant) => parseInt(applicant.noticePeriod) <= parseInt(filters.noticePeriod)
            );
        }

        setFilteredApplicants(updatedApplicants);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const exportToPDF = () => {
        const input = document.getElementById('applicants_table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            const pdfPreview = window.open(pdf.output('bloburl'), '_blank');
            pdfPreview.focus();
        });
    };

    const downloadPDF = () => {
        const input = document.getElementById('applicants_table');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('applicants.pdf');
        });
    };

    return (
        <div className="applicants_container">
            <h1>Applied Candidates</h1>
            <div className="filter-container">
                <div className='search_input_box'>
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search_input"
                    />
                </div>
                <div className='filter_dropdown'>
                    <select
                        name="experience"
                        value={filters.experience}
                        onChange={handleFilterChange}
                        className="filter_select"
                    >
                        <option value="">Filter by Experience</option>
                        <option value="1">1+ Years</option>
                        <option value="2">2+ Years</option>
                        <option value="3">3+ Years</option>
                        <option value="4">4+ Years</option>
                        <option value="5">5+ Years</option>
                    </select>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="filter_select"
                    >
                        <option value="">Filter by Location</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                    </select>
                    <select
                        name="noticePeriod"
                        value={filters.noticePeriod}
                        onChange={handleFilterChange}
                        className="filter_select"
                    >
                        <option value="">Filter by Notice Period</option>
                        <option value="15">15 Days or Less</option>
                        <option value="30">30 Days or Less</option>
                        <option value="60">60 Days or Less</option>
                        <option value="90">90 Days or Less</option>
                    </select>
                </div>
                <div className='download_pdf'>
                    <button onClick={exportToPDF} className="export_button">Preview PDF</button>
                    <button onClick={downloadPDF} className="export_button btn_download">Download PDF</button>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="error-msg">{error}</p>
            ) : filteredApplicants.length === 0 ? (
                <div className="no-applicants-msg">
                    <p>No candidates have applied for this job.</p>
                    <img src={noApplicantsGif} alt="No applicants" className="no-applicants-gif" />
                    <Link to="/appliedPeople" className="back-button">
                        Back
                    </Link>
                </div>
            ) : (
                <div className="table_responsive">
                    <table className="applicants_table" id="applicants_table">
                        <thead>
                            <tr className='table_tr'>
                                <th>Serial No.</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Location</th>
                                <th>Portfolio URL</th>
                                <th>Job Title</th>
                                <th>Company Name</th>
                                <th>Highest Qualification</th>
                                <th>Total Experience</th>
                                <th>Interview Date</th>
                                <th>Notice Period</th>
                                <th>Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredApplicants.map((applicant, index) => (
                                <tr key={applicant._id}>
                                    <td>{index + 1}</td>
                                    <td>{applicant.fullName}</td>
                                    <td>{applicant.email}</td>
                                    <td>{applicant.mobileNumber}</td>
                                    <td>{applicant.location}</td>
                                    <td>
                                        {applicant.portfolioUrl ? (
                                            <a href={applicant.portfolioUrl} target="_blank" rel="noopener noreferrer">
                                                View Portfolio
                                            </a>
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td>{applicant.jobTitle}</td>
                                    <td>{applicant.companyName}</td>
                                    <td>{applicant.highestQualification}</td>
                                    <td>{applicant.totalExperience} years</td>
                                    <td>{new Date(applicant.interviewDate).toLocaleDateString()}</td>
                                    <td>{applicant.noticePeriod} days</td>
                                    <td>
                                        <a href={`/${applicant.pdf}`} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Applicants;
