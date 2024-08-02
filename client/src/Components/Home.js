import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRelativeTime } from "./relativeTime";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import ReportModal from './ReportModal';



function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/job/allJobs"
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);



  useEffect(() => {
    const results = jobs.filter((job) => {
      const matchesSearchTerm =
        (job.jobTitle &&
          job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.companyName &&
          job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (job.location &&
          job.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesDate =
        !selectedDate ||
        (selectedDate === "24 hours" &&
          new Date(job.applyDate) >=
          new Date(Date.now() - 24 * 60 * 60 * 1000)) ||
        (selectedDate === "7 days" &&
          new Date(job.applyDate) >=
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (selectedDate === "30 days" &&
          new Date(job.applyDate) >=
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

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
        job.qualification
          .toLowerCase()
          .includes(selectedEducation.toLowerCase());

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
  };

  const handleApplyClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      navigate("/customform");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home_container">
      <div className="search_box_content">
        <div className="job_search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Job title, keywords, or company"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="job_location">
          <i className="fa-solid fa-location-dot"></i>
          <input
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <div className="job_search_btn">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="dropdown_container">
        <div className="dropdown">
          <div className="dropdown_selected">
            {selectedDate || "Date of Post"}
          </div>
          <div className="dropdown_options">
            <div onClick={() => setSelectedDate("24 hours")}>Last 24 hours</div>
            <div onClick={() => setSelectedDate("7 days")}>Last 7 days</div>
            <div onClick={() => setSelectedDate("30 days")}>Last 30 days</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown_selected">
            {selectedRemote || "Remote Job"}
          </div>
          <div className="dropdown_options">
            <div onClick={() => setSelectedRemote("Remote")}>Remote only</div>
            <div onClick={() => setSelectedRemote("In-office")}>In-office</div>
            <div onClick={() => setSelectedRemote("Hybrid")}>Hybrid</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown_selected">
            {selectedType || "Type of Job"}
          </div>
          <div className="dropdown_options">
            <div onClick={() => setSelectedType("Full-Time")}>Full-time</div>
            <div onClick={() => setSelectedType("Part-Time")}>Part-time</div>
            <div onClick={() => setSelectedType("Contract")}>Contract</div>
            <div onClick={() => setSelectedType("Temporary")}>Temporary</div>
            <div onClick={() => setSelectedType("IT")}>IT</div>
            <div onClick={() => setSelectedType("Govt")}>Govt</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown_selected">{selectedPay || "Pay"}</div>
          <div className="dropdown_options">
            <div onClick={() => setSelectedPay("15000")}>₹15,000.00+/month</div>
            <div onClick={() => setSelectedPay("19166")}>₹19,166.67+/month</div>
            <div onClick={() => setSelectedPay("22500")}>₹22,500.00+/month</div>
            <div onClick={() => setSelectedPay("27500")}>₹27,500.00+/month</div>
            <div onClick={() => setSelectedPay("35000")}>₹35,000.00+/month</div>
          </div>
        </div>
        <div className="dropdown">
          <div className="dropdown_selected">
            {selectedEducation || "Education Level"}
          </div>
          <div className="dropdown_options">
            <div onClick={() => setSelectedEducation("High School")}>
              High School
            </div>
            <div onClick={() => setSelectedEducation("Associate's Degree")}>
              Associate's Degree
            </div>
            <div onClick={() => setSelectedEducation("Bachelor's Degree")}>
              Bachelor's Degree
            </div>
            <div onClick={() => setSelectedEducation("Master's Degree")}>
              Master's Degree
            </div>
            <div onClick={() => setSelectedEducation("Doctorate")}>
              Doctorate
            </div>
          </div>
        </div>
      </div>

      <div className="cards_content">
        <div className="cards">
          {filteredJobs.map((job) => (
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
            <h2>{selectedJob.jobTitle}</h2>

            <p>
              <b>Company:</b> {selectedJob.companyName}  <Link className="web_icon" to={selectedJob.webUrl} target="_blank"><i className="fas fa-external-link-alt"></i></Link>
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
              <p>
                <b>Type:</b> {selectedJob.jobType}
              </p>
              <p><strong>Qualification:</strong> {selectedJob.qualification}</p>
              <p>
                <b>Shift:</b> {selectedJob.Shift}
              </p>
              <p><strong>Apply Date:</strong> {new Date(selectedJob.applyDate).toLocaleDateString()}</p>
              <p><strong>Last Date:</strong> {new Date(selectedJob.expireDate).toLocaleDateString()}</p>
              <p><strong>Job Description:</strong></p>
              <p className="job_description">
                {selectedJob.description}
              </p>
              <p><strong>Selection Process:</strong></p>
              <p className="job_description">{selectedJob.selectionProcess}</p>
              <p><strong>Technology:</strong> {selectedJob.technology.join(', ')}</p>
              <p><strong>Shift:</strong> {selectedJob.Shift}</p>
              <p><strong>Application Fee:</strong> {selectedJob.applicationFee}</p>
              <p>
                <b>Posted:</b> {getRelativeTime(selectedJob.applyDate)}
              </p>
            </div>
            <div className="report_jobs">
              <div className="report_icon" onClick={handleOpenModal}>
                <span><i className="fa-solid fa-flag"></i></span>
                <span>Report job</span>
              </div>
            </div>
            <ReportModal isOpen={isModalOpen} onClose={handleCloseModal}  job_id={selectedJob._id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;