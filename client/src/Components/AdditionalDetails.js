import React, { useState, useEffect } from 'react';
import Loader from './Loader'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdditionalDetails({ formData, setFormData, handleFinalSubmit, loading, handleBack }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info('Submitting...');
    setTimeout(() => {
      handleFinalSubmit(e);
    }, 2000);
  };

  useEffect(() => {
    if (loading) {
      setIsLoading(false);
    }
  }, [loading]);

  return (
    <div className="additional_details">
      <ToastContainer />
      {isLoading ? (
        <Loader />
      ) : (
        <form className="additional_details_form" onSubmit={handleSubmit}>
          <h2>Additional Details</h2>    

          <div className="form_group">
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

export default AdditionalDetails;
