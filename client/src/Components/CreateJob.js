import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css';

function CreateJob() {
  const [jobType, setJobType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [qualification, setQualification] = useState('');
  const [batch, setBatch] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [applyDate, setApplyDate] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectionProcess, setSelectionProcess] = useState('');
  const [applicationFee, setApplicationFee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/job/createJob', {
      jobType,
      jobTitle,
      companyName,
      location,
      qualification,
      batch,
      experience,
      salary,
      applyDate,
      expireDate,
      description,
      selectionProcess,
      applicationFee,
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.error('There was an error creating the job!', error);
    });
  };


  return (
    <div className="create_job">
      <form className="create_job_form" onSubmit={handleSubmit}>
        <h2>Create Job</h2>
        
        <div className="form_group">
          <div className="half_width">
            <label htmlFor="jobType">Job Type</label>
            <select
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
            >
              <option value="">Select Job Type</option>
              <option value="IT">IT</option>
              <option value="Govt">Govt.</option>
             
            </select>
          </div>
          <div className="half_width">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
              required
            />
          </div>
        </div>

        <div className="form_group">
          <div className="half_width">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="half_width">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>
        </div>

        <div className="form_group">
          <div className="half_width">
            <label htmlFor="qualification">Qualification</label>
            <select
              id="qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            >
              <option value="">Select Qualification</option>
              <option value="B.A">B.A</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.Com">B.Com</option>
              <option value="BBA">BBA</option>
              <option value="BAF">BAF</option>
              <option value="BBI">BBI</option>
              <option value="BMS">BMS</option>
            </select>
          </div>
          <div className="half_width">
            <label htmlFor="batch">Batch</label>
            <select
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            >
              <option value="">Select Batch</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <div className="form_group">
          <div className="half_width">
            <label htmlFor="experience">Experience</label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            >
              <option value="">Select Experience</option>
              <option value="Fresher">Fresher</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2-5 years">2-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>
          <div className="half_width">
            <label htmlFor="salary">Salary</label>
            <select
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            >
              <option value="">Select Salary</option>
              <option value="Best in Industry">Best in Industry</option>
            </select>
          </div>
        </div>

        <div className="form_group">
          <div className="half_width">
            <label htmlFor="applyDate">Apply Date</label>
            <input
              type="date"
              id="applyDate"
              value={applyDate}
              onChange={(e) => setApplyDate(e.target.value)}
              required
            />
          </div>
          <div className="half_width">
            <label htmlFor="expireDate">Expire Date</label>
            <input
              type="date"
              id="expireDate"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form_group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="Enter job description"
            required
          ></textarea>
        </div>

        <div className="form_group">
          <label htmlFor="selectionProcess">Selection Process Description</label>
          <textarea
            id="selectionProcess"
            value={selectionProcess}
            onChange={(e) => setSelectionProcess(e.target.value)}
            rows="4"
            placeholder="Enter selection process"
            required
          ></textarea>
        </div>

        <div className="form_group">
          <label htmlFor="applicationFee">Application Fee</label>
          <input
            type="text"
            id="applicationFee"
            value={applicationFee}
            onChange={(e) => setApplicationFee(e.target.value)}
            placeholder="Enter application fee"
            required
          />
        </div>

        <div className="form_group">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
}

export default CreateJob;
