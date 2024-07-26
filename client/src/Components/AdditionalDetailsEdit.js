import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdditionalDetails.css'; 

function AdditionalDetails({ formData, setFormData, handleBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const navigate = useNavigate(); 
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info('Submitting...');

    const additionalData = selectedOption === 'website'
      ? { websiteUrl }
      : { detailsType: 'custom form' };

    const completeFormData = { ...formData, ...additionalData };

    setTimeout(async () => {
      try {
        let config={
          headers:{
            "Authorization": 'Bearer '+localStorage.getItem('token'),
          }
        }
        const response = await axios.post('http://localhost:5000/api/job/createJob', completeFormData, config);
        // console.log('Job created:', response.data);
        toast.success('Job created successfully!');
        setIsLoading(false);
        navigate('/dashboard'); 
      } catch (error) {
        console.error('Error creating job:', error);
        toast.error('There was an error creating the job.');
        setIsLoading(false);
      }
    }, 2000); 
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="additional_details">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <form className="additional_details_form" onSubmit={handleSubmit}>
          <h2>Edit Additional Details</h2>    

          <div className="form_group">
            <div className="radio_card">
              <input
                type="radio"
                id="website"
                name="details_option"
                value="website"
                checked={selectedOption === 'website'}
                onChange={handleOptionChange}
              />
              <label htmlFor="website">Enter your website/Apply details URL</label>
            </div>


            {selectedOption === 'website' && (
            <div className="form_group website_link">
              <label htmlFor="websiteUrl">Website URL</label>
              <input
                type="text"
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="Enter your website URL"
                required
              />
            </div>
          )}

            <div className="radio_card">
              <input
                type="radio"
                id="default"
                name="details_option"
                value="default"
                checked={selectedOption === 'default'}
                onChange={handleOptionChange}
              />
              <label htmlFor="default">Default data</label>
            </div>
          </div>


          <div className="form_group btn_cont">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
            <button type="button" onClick={handleBack}>
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdditionalDetails;
