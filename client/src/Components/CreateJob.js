import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css';
import AdditionalDetails from './AdditionalDetails';
import usePreventBackNavigation from './usePreventBackNavigation';

function CreateJob() {
  usePreventBackNavigation();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobType: '',
    jobTitle: '',
    companyName: '',
    location: '',
    qualification: '',
    batch: '',
    experience: '',
    salary: '',
    applyDate: '',
    expireDate: '',
    description: '',
    selectionProcess: '',
    applicationFee: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post('http://localhost:5000/api/job/createJob', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error creating the job!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="create_job">
      {step === 1 ? (
        <form className="create_job_form" onSubmit={handleNext}>
          <h2>Create Job</h2>
          
          <div className="form_group">
            <div className="half_width">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                value={formData.jobType}
                onChange={handleChange}
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
                value={formData.jobTitle}
                onChange={handleChange}
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
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="half_width">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
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
                value={formData.qualification}
                onChange={handleChange}
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
                value={formData.batch}
                onChange={handleChange}
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
                value={formData.experience}
                onChange={handleChange}
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
                value={formData.salary}
                onChange={handleChange}
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
                value={formData.applyDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="half_width">
              <label htmlFor="expireDate">Expire Date</label>
              <input
                type="date"
                id="expireDate"
                value={formData.expireDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter job description"
              required
            ></textarea>
          </div>

          <div className="form_group">
            <label htmlFor="selectionProcess">Selection Process Description</label>
            <textarea
              id="selectionProcess"
              value={formData.selectionProcess}
              onChange={handleChange}
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
              value={formData.applicationFee}
              onChange={handleChange}
              placeholder="Enter application fee"
              required
            />
          </div>

          <div className="form_group">
            <button type="submit">Next</button>
          </div>
        </form>
      ) : (
        <AdditionalDetails 
          formData={formData} 
          setFormData={setFormData} 
          handleFinalSubmit={handleFinalSubmit} 
          loading={loading}
        />
      )}
    </div>
  );
}

export default CreateJob;
