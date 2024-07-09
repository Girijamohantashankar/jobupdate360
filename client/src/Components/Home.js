import React, { useState } from 'react';
import "./Home.css";

const jobData = [
  {
    id: 1,
    title: "Software Developer",
    company: "Manthan IT Solutions",
    location: "Mahajid Road, New Delhi",
    salary: "₹12,224.77 - ₹17,659.06 a month",
    type: "Full-Time",
    shift: "Day Shift",
    description: "As a backend developer you must have knowledge of the year",
    posted: "Posted 2 days ago",
    apply: "www.google.com"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Tech Innovators",
    location: "MG Road, Bangalore",
    salary: "₹18,000.00 - ₹25,000.00 a month",
    type: "Part-Time",
    shift: "Night Shift",
    description: "Proficiency in React.js and CSS",
    posted: "Posted 7 days ago",
    apply: "www.google.com"
  },
  // Add more job objects here if needed
];

function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobData.filter(job => {
    const dateFilter = selectedDate ? job.posted.includes(selectedDate) : true;
    const remoteFilter = selectedRemote ? job.location.includes(selectedRemote) : true;
    const typeFilter = selectedType ? job.type === selectedType : true;
    const payFilter = selectedPay ? parseFloat(job.salary.replace(/[^0-9.-]+/g, "")) >= parseFloat(selectedPay.replace(/[^0-9.-]+/g, "")) : true;
    const educationFilter = selectedEducation ? job.description.includes(selectedEducation) : true;
    return dateFilter && remoteFilter && typeFilter && payFilter && educationFilter;
  });

  return (
    <div className='home_container'>
      <div className='search_box_content'>
        <div className='job_search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input placeholder='Job title, keywords, or company' />
        </div>
        <div className='job_location'>
          <i className="fa-solid fa-location-dot"></i>
          <input placeholder='Location' />
        </div>
        <div className='job_search_btn'>
          <button>Search</button>
        </div>
      </div>
      
      <div className='dropdown_container'>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedDate || "Date of Post"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedDate("24 hours")}>Last 24 hours</div>
            <div onClick={() => setSelectedDate("7 days")}>Last 7 days</div>
            <div onClick={() => setSelectedDate("30 days")}>Last 30 days</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedRemote || "Remote Job"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedRemote("Remote")}>Remote only</div>
            <div onClick={() => setSelectedRemote("In-office")}>In-office</div>
            <div onClick={() => setSelectedRemote("Hybrid")}>Hybrid</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedType || "Type of Job"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedType("Full-Time")}>Full-time</div>
            <div onClick={() => setSelectedType("Part-Time")}>Part-time</div>
            <div onClick={() => setSelectedType("Contract")}>Contract</div>
            <div onClick={() => setSelectedType("Temporary")}>Temporary</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedPay || "Pay"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedPay("15000")}>₹15,000.00+/month</div>
            <div onClick={() => setSelectedPay("19166")}>₹19,166.67+/month</div>
            <div onClick={() => setSelectedPay("22500")}>₹22,500.00+/month</div>
            <div onClick={() => setSelectedPay("27500")}>₹27,500.00+/month</div>
            <div onClick={() => setSelectedPay("35000")}>₹35,000.00+/month</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedEducation || "Education Level"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedEducation("High School")}>High School</div>
            <div onClick={() => setSelectedEducation("Associate's Degree")}>Associate's Degree</div>
            <div onClick={() => setSelectedEducation("Bachelor's Degree")}>Bachelor's Degree</div>
            <div onClick={() => setSelectedEducation("Master's Degree")}>Master's Degree</div>
            <div onClick={() => setSelectedEducation("Doctorate")}>Doctorate</div>
          </div>
        </div>
      </div>

      <div className='cards_content'>
        <div className='cards'>
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className={`card ${selectedJob?.id === job.id ? 'active' : ''}`}
              onClick={() => setSelectedJob(job)}
            >
              <div className='cards_text'>
                <h2>{job.title}</h2>
                <div className='company_location'>
                  <span>{job.company}</span>
                  <span>{job.location}</span>
                </div>
              </div>
              <div className='cards_info'>
                <p><b>{job.salary}</b></p>
                <p>{job.type}</p>
                <p>{job.shift}</p>
              </div>
              <div className='card_des'>
                <li>{job.description}</li>
              </div>
              <div className='date_post'>
                <p>{job.posted}</p>
                <p>more...</p>
              </div>
            </div>
          ))}
        </div>
        {selectedJob && (
          <div className='job_details'>
            <h2>{selectedJob.title}</h2>
            <p><b>Company:</b> {selectedJob.company}</p>
            <p><b>Location:</b> {selectedJob.location}</p>
            <p><b>Salary:</b> {selectedJob.salary}</p>
            <button><b>Apply </b> {selectedJob.apply}</button>
            <p><b>Type:</b> {selectedJob.type}</p>
            <p><b>Shift:</b> {selectedJob.shift}</p>
            <p><b>Description:</b> {selectedJob.description}</p>
            <p><b>Posted:</b> {selectedJob.posted}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
