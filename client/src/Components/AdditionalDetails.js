import React, { useState, useEffect } from 'react';
import Loader from './Loader'; 

function AdditionalDetails({ formData, setFormData, handleFinalSubmit, loading }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      {isLoading ? (
        <Loader />
      ) : (
        <form className="additional_details_form" onSubmit={handleSubmit}>
          <h2>Additional Details</h2>    



          <div className="form_group">
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdditionalDetails;
