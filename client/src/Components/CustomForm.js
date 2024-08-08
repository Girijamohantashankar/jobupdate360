import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustomForm.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Loader from './Loader';

function CustomForm() {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    location: '',
    portfolioUrl: '',
    pdf: null,
    jobTitle: '',
    companyName: '',
    highestQualification: '',
    totalExperience: '',
    interviewDate: '',
    noticePeriod: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handlePrev = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('pdf', formData.pdf);
    formDataToSend.append('fullName', formData.fullName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mobileNumber', formData.mobileNumber);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('portfolioUrl', formData.portfolioUrl);
    formDataToSend.append('jobTitle', formData.jobTitle);
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('highestQualification', formData.highestQualification);
    formDataToSend.append('totalExperience', formData.totalExperience);
    formDataToSend.append('interviewDate', formData.interviewDate);
    formDataToSend.append('noticePeriod', formData.noticePeriod);

    try {
      const response = await fetch('http://localhost:5000/api/form/submit-form', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Application submitted successfully!');
      } else if (response.status === 400) {
        const data = await response.json();
        toast.error(data.message);
      } else {
        toast.error('Error submitting form');
      }
    } catch (error) {
      toast.error('Error submitting form: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
    navigate('/');
  };

  const getProgressWidth = () => {
    return (step / 5) * 100 + '%';
  };

  return (

    <div className="form-container">
      <ToastContainer />
      <h1>Application Form</h1>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: getProgressWidth() }}></div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Applicant Details */}
        <div className={`step-container ${step === 1 ? 'active' : ''}`}>
          <h2 className='font_12'>Applicant Details</h2>
          <div className='form_fill'>
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email ID" value={formData.email} onChange={handleChange} />
            <label>Mobile Number</label>
            <input type="tel" name="mobileNumber" placeholder="Enter your mobile number" value={formData.mobileNumber} onChange={handleChange} />
            <label>Location</label>
            <input type="text" name="location" placeholder="Enter your location" value={formData.location} onChange={handleChange} />
            <label>Portfolio URL (if any)</label>
            <input type="url" name="portfolioUrl" placeholder="Enter your portfolio URL" value={formData.portfolioUrl} onChange={handleChange} />
          </div>
          <div className='btn_container'>
            <button className='next_btn_form' type="button" onClick={handleNext} disabled={!formData.fullName || !formData.email || !formData.mobileNumber || !formData.location}>Next</button>
          </div>
        </div>

        {/* Step 2: Upload CV */}
        <div className={`step-container ${step === 2 ? 'active' : ''}`}>
          <h2 className='font_12'>Upload a CV for the employer</h2>
          <input type="file" name="pdf" onChange={handleChange} />
          <div className='btn_container'>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button className='next_btn_form' type="button" onClick={handleNext} disabled={!formData.pdf}>Next</button>
          </div>
        </div>

        {/* Step 3: Relevant Experience */}
        <div className={`step-container ${step === 3 ? 'active' : ''}`}>
          <h2 className='font_12'>Relevant Experience</h2>
          <div className='form_fill'>
            <label>Job Title</label>
            <input type="text" name="jobTitle" placeholder='Enter Your Job role' value={formData.jobTitle} onChange={handleChange} />
            <label>Company Name</label>
            <input type="text" name="companyName" placeholder='Enter your Company name' value={formData.companyName} onChange={handleChange} />
          </div>
          <div className='btn_container'>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button className='next_btn_form' type="button" onClick={handleNext} disabled={!formData.jobTitle || !formData.companyName}>Next</button>
          </div>
        </div>

        {/* Step 4: Additional Information */}
        <div className={`step-container ${step === 4 ? 'active' : ''}`}>
          <h2 className='font_12'>Additional Information</h2>
          <div className='form_fill'>
            <label>Highest Qualification</label>
            <select name="highestQualification" value={formData.highestQualification} onChange={handleChange}>
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
            <label>Total Years of Experience</label>
            <input type="text" name="totalExperience" value={formData.totalExperience} onChange={handleChange} />
            <label>Select Date for Interview</label>
            <input type="date" name="interviewDate" value={formData.interviewDate} onChange={handleChange} />
            <label>Notice Period</label>
            <input type="text" name="noticePeriod" value={formData.noticePeriod} onChange={handleChange} />
          </div>
          <div className='btn_container'>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button className='next_btn_form' type="button" onClick={handleNext} disabled={!formData.highestQualification || !formData.totalExperience || !formData.interviewDate || !formData.noticePeriod}>Next</button>
          </div>
        </div>

        {/* Step 5: Review and Submit */}
        <div className={`step-container ${step === 5 ? 'active' : ''}`}>
          <h2 className='font_12'>Review and Submit</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Mobile Number:</strong> {formData.mobileNumber}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Portfolio URL:</strong> {formData.portfolioUrl}</p>
          <p><strong>CV:</strong> {formData.pdf ? formData.pdf.name : 'Not uploaded'}</p>
          <p><strong>Job Title:</strong> {formData.jobTitle}</p>
          <p><strong>Company Name:</strong> {formData.companyName}</p>
          <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
          <p><strong>Total Years of Experience:</strong> {formData.totalExperience}</p>
          <p><strong>Interview Date:</strong> {formData.interviewDate}</p>
          <p><strong>Notice Period:</strong> {formData.noticePeriod}</p>
          <div className='btn_container'>
            <button type="button" onClick={handlePrev}>Previous</button>
            <button className='next_btn_form' type="submit">Submit Your Application</button>
          </div>
        </div>
      </form>
      {isSubmitted && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Thank you!</h2>
            <p>Your application is submitted</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
}

export default CustomForm;
