import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRelativeTime } from "./relativeTime";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import ReportModal from './ReportModal';
import FeedbackModal from "./FeedbackModal";
import Loader from './Loader';
import ReactPaginate from 'react-paginate';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pagination calculations
  useEffect(() => {
    const offset = currentPage * jobsPerPage;
    const paginatedJobs = filteredJobs.slice(offset, offset + jobsPerPage);
    setCurrentJobs(paginatedJobs);
    setPageCount(Math.ceil(filteredJobs.length / jobsPerPage));
  }, [currentPage, filteredJobs, jobsPerPage]);

  // Handle page click
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Fetch jobs data
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/job/allJobs");
        setJobs(response.data);
        setFilteredJobs(response.data);
        setCurrentPage(0);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtering logic
  useEffect(() => {
    const results = jobs.filter((job) => {
      const matchesSearchTerm =
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.companyName && job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDate =
        !selectedDate ||
        (selectedDate === "24 hours" &&
          new Date(job.applyDate) >= new Date(Date.now() - 24 * 60 * 60 * 1000)) ||
        (selectedDate === "7 days" &&
          new Date(job.applyDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (selectedDate === "30 days" &&
          new Date(job.applyDate) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      const matchesRemote =
        !selectedRemote ||
        job.jobType.toLowerCase().includes(selectedRemote.toLowerCase());

      const matchesType =
        !selectedType ||
        job.jobType.toLowerCase().includes(selectedType.toLowerCase());

      const matchesPay =
        !selectedPay ||
        parseInt(job.salary.replace(/[^0-9]/g, "")) >= parseInt(selectedPay);

      const matchesEducation =
        !selectedEducation ||
        job.qualification.toLowerCase().includes(selectedEducation.toLowerCase());

      return (
        matchesSearchTerm &&
        matchesDate &&
        matchesRemote &&
        matchesType &&
        matchesPay &&
        matchesEducation
      );
    });

    setFilteredJobs(results);
    setCurrentPage(0);
  }, [
    searchTerm,
    searchLocation,
    selectedDate,
    selectedRemote,
    selectedType,
    selectedPay,
    selectedEducation,
    jobs,
  ]);

  const handleReset = () => {
    setSearchTerm("");
    setSearchLocation("");
    setSelectedDate("");
    setSelectedRemote("");
    setSelectedType("");
    setSelectedPay("");
    setSelectedEducation("");
    setFilteredJobs(jobs);
    setSelectedJob(null);
    setCurrentPage(0);
  };

  const handleApplyClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      localStorage.setItem('System_config', selectedJob._id);
      localStorage.setItem('Current_Ip_address', selectedJob.createdBy);
      navigate("/customform");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };
  return (
    <div className="home_container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="search_box_content">
            <div className="job_search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* <div className="job_location">
              <i className="fa-solid fa-location-dot"></i>
              <input
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div> */}
            <div className="job_search_btn">
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
          <div className="dropdown_container">
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>Date of Post</option>
              <option value="24 hours">Last 24 hours</option>
              <option value="7 days">Last 7 days</option>
              <option value="30 days">Last 30 days</option>
            </select>

            <select
              value={selectedRemote}
              onChange={(e) => setSelectedRemote(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>Remote Job</option>
              <option value="Remote">Remote only</option>
              <option value="In-office">In-office</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>Type of Job</option>
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="IT">IT</option>
              <option value="Govt">Govt</option>
            </select>

            <select
              value={selectedPay}
              onChange={(e) => setSelectedPay(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>Pay</option>
              <option value="15000">₹15,000.00+/month</option>
              <option value="19166">₹19,166.67+/month</option>
              <option value="22500">₹22,500.00+/month</option>
              <option value="27500">₹27,500.00+/month</option>
              <option value="35000">₹35,000.00+/month</option>
            </select>

            <select
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="dropdown"
            >
              <option value="" disabled>Education Level</option>
              <option value="High School">High School</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>

          <div className="cards_content">
            <div className="cards">
              {currentJobs.map((job) => (
                <div
                  key={job._id}
                  className={`card ${selectedJob?._id === job._id ? "active" : ""}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="cards_text">
                    <h2>{job.jobTitle}</h2>
                    <div className="company_location">
                      <span><i className="fa-solid fa-building"></i> {job.companyName}</span>
                      <span><i className="fa-solid fa-location-dot"></i> {job.location}</span>
                    </div>
                  </div>
                  <div className="cards_info">
                    <p>
                      <b>Salary:</b> {job.salary}
                    </p>
                    <p>
                      <b>Type:</b> {job.jobType}
                    </p>
                    <p>
                      <b>Shift:</b> {job.Shift}
                    </p>
                  </div>
                  <div className="card_des">
                    <span>{job.description}</span>
                  </div>
                  <div className="date_post">
                    <p>
                      <b>Posted By:</b> {getRelativeTime(job.applyDate)}
                    </p>
                    <p>more...</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedJob && (
              <div className="job_details">
                <button className="close_button" onClick={handleCloseJobDetails}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <h2>{selectedJob.jobTitle}</h2>
                <p>
                  <b>Company:</b> {selectedJob.companyName}
                  <Link className="web_icon" to={selectedJob.webUrl} target="_blank">
                    <i className="fas fa-external-link-alt"></i>
                  </Link>
                </p>
                <p>
                  <b>Location:</b> {selectedJob.location}
                </p>
                <p>
                  <b>Salary:</b> {selectedJob.salary}
                </p>
                <div className='apply_button'>
                  <button onClick={() => handleApplyClick(selectedJob.websiteUrl)}>Apply Now</button>
                </div>
                <div className="job_description_details">
                  <p><b>Type:</b> {selectedJob.jobType}</p>
                  <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
                  <p><b>Shift:</b> {selectedJob.Shift}</p>
                  <p><strong>Apply Date:</strong> {new Date(selectedJob.applyDate).toLocaleDateString()}</p>
                  <p><strong>Last Date:</strong> {new Date(selectedJob.expireDate).toLocaleDateString()}</p>
                  <p><strong>Job Description:</strong></p>
                  <p className="job_description">{selectedJob.description}</p>
                  <p><strong>Selection Process:</strong></p>
                  <p className="job_description">{selectedJob.selectionProcess}</p>
                  <p><strong>Technology:</strong> {selectedJob.technology.join(', ')}</p>
                  <p><strong>Shift:</strong> {selectedJob.Shift}</p>
                  <p><strong>Application Fee:</strong> {selectedJob.applicationFee}</p>
                  <p><b>Posted:</b> {getRelativeTime(selectedJob.applyDate)}</p>
                </div>
                <div className="report_jobs">
                  <div className="report_icon" onClick={handleOpenModal}>
                    <span><i className="fa-solid fa-flag"></i></span>
                    <span>Report job</span>
                  </div>
                </div>
                <ReportModal isOpen={isModalOpen} onClose={handleCloseModal} job_id={selectedJob._id} />
              </div>
            )}
          </div>

          <FeedbackModal />
          <div className="pagination">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
