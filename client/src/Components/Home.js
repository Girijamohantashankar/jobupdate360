import React, { useState } from 'react';
import "./Home.css";


function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPay, setSelectedPay] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");






  return (
    <div className='home_container'>
      <div className='search_box_content'>
        <div className='job_search'>
          <i class="fa-solid fa-magnifying-glass"></i>
          <input placeholder='Job title, keywords, or company' />
        </div>
        <div className='job_location'>
          <i class="fa-solid fa-location-dot"></i>
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
            <div onClick={() => setSelectedDate("Last 24 hours")}>Last 24 hours</div>
            <div onClick={() => setSelectedDate("Last 7 days")}>Last 7 days</div>
            <div onClick={() => setSelectedDate("Last 30 days")}>Last 30 days</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedRemote || "Remote Job"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedRemote("Remote only")}>Remote only</div>
            <div onClick={() => setSelectedRemote("In-office")}>In-office</div>
            <div onClick={() => setSelectedRemote("Hybrid")}>Hybrid</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedType || "Type of Job"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedType("Full-time")}>Full-time</div>
            <div onClick={() => setSelectedType("Part-time")}>Part-time</div>
            <div onClick={() => setSelectedType("Contract")}>Contract</div>
            <div onClick={() => setSelectedType("Temporary")}>Temporary</div>
          </div>
        </div>
        <div className='dropdown'>
          <div className='dropdown_selected'>{selectedPay || "Pay"}</div>
          <div className='dropdown_options'>
            <div onClick={() => setSelectedPay("15,000.00")}>₹15,000.00+/month</div>
            <div onClick={() => setSelectedPay("19,166.67")}>₹19,166.67+/month</div>
            <div onClick={() => setSelectedPay("22,500.00")}>₹22,500.00+/month</div>
            <div onClick={() => setSelectedPay("27,500.00")}>₹27,500.00+/month</div>
            <div onClick={() => setSelectedPay("35,000.00")}>₹35,000.00+/month</div>
            
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
    </div>
  )
}

export default Home