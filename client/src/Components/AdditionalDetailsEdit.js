import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdditionalDetails.css';

function AdditionalDetailsEdit({ formData, setFormData, handleBack, handleFinalSubmit, loading }) {
  const [selectedOption, setSelectedOption] = useState(formData.detailsType === 'website' ? 'website' : 'default');
  const [websiteUrl, setWebsiteUrl] = useState(formData.websiteUrl || '');
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const additionalData = selectedOption === 'website'
      ? { websiteUrl }
      : { detailsType: 'custom form' };
    const completeFormData = { ...formData, ...additionalData };

    try {
      setShowLoader(true); 
      await handleFinalSubmit(completeFormData);
      setTimeout(() => {
        setShowLoader(false);
        toast.success('Details successfully updated!');
        navigate('/dashboard');
      }, 2000); 
    } catch (error) {
      setShowLoader(false);
      console.error('Error updating details:', error);
      toast.error('Failed to update details. Please try again.');
    }
  };

  return (
    <div className="additional_details">
      <ToastContainer />
      {showLoader ? (
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
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
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

export default AdditionalDetailsEdit;
