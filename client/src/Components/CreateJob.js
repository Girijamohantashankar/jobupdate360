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
    applicationFee: '',
    technology: [],
    Shift: '',
    webUrl: '',
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

  const handleBack = () => {
    setStep(1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const authHeader = {
      Authorization: 'Bearer '+localStorage.getItem('token'),
      'Content-Type': 'application/json'
    };


    axios.post('http://localhost:5000/api/job/createJob', authHeader)
      .then(response => {
        // console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error creating the job!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTechnologyChange = (e) => {
    const value = e.target.value;
    if (value && !formData.technology.includes(value)) {
      setFormData({
        ...formData,
        technology: [...formData.technology, value]
      });
    }
  };

  const removeTechnology = (tech) => {
    setFormData({
      ...formData,
      technology: formData.technology.filter(t => t !== tech)
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
                <option value="Govt">Govt</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
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
                <option value="BTech/MCA/B.Sc">BTech/MCA/B.Sc</option>
                <option value="MCA">MCA</option>
                <option value="MCA">BTech</option>
                <option value="B.Com">B.Com</option>
                <option value="BBA">BBA</option>
                <option value="BAF">BAF</option>
                <option value="BBI">BBI</option>
                <option value="BMS">BMS</option>
                <option value="10th">10th</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="Any Graduation">Any Graduation</option>
                <option value="Any Degree">Any Degree</option>
                <option value="Others">Others</option>
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
                <option value="others">others</option>
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
                <option value="₹15,000 - ₹20,000">₹15,000 - ₹20,000</option>
                <option value="₹20,000 - ₹25,000">₹20,000 - ₹25,000</option>
                <option value="₹25,000 - ₹30,000">₹25,000 - ₹30,000</option>
                <option value="₹30,000 - ₹45,000">₹30,000 - ₹45,000</option>
                <option value="5LPA - 10LPA">5LPA - 10LPA</option>
                <option value="10LPA+ Above">10LPA+ Above</option>
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
            <label htmlFor="technology">Technology</label>
            <select
              id="technology"
              value=""
              onChange={handleTechnologyChange}
              
            >
              <option value="">Select Technology</option>
              <option value="React Js">React Js</option>
              <option value="Angular">Angular</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="Python">Python</option>
              <option value="Vue js">Vue js</option>
              <option value="Others">Others</option>
            </select>
            <div className="selected_technologies">
              {formData.technology.map((tech, index) => (
                <span key={index} className="tech_item">
                  {tech}
                  <span
                    type="button"
                    className="remove_btn"
                    onClick={() => removeTechnology(tech)}
                  >
                    &times;
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="form_group">
            <label htmlFor="Shift">Shift</label>
            <select
              id="Shift"
              value={formData.Shift}
              onChange={handleChange}
              required
            >
              <option value="">Select Shift</option>
              <option value="Day Shift">Day Shift</option>
              <option value="Night Shift">Night Shift</option>
              <option value="Day/Night Shift">Day/Night Shift</option>
            </select>
          </div>
          
          <div className="form_group">
            <label htmlFor="webUrl">Company Website</label>
            <input
              type="text"
              id="webUrl"
              value={formData.webUrl}
              onChange={handleChange}
              placeholder="Enter your company Website"
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
          handleBack={handleBack}
        />
      )}
    </div>
  );
}

export default CreateJob;
