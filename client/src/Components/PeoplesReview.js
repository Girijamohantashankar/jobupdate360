import React, { useEffect, useState } from 'react';
import './PeoplesReview.css';
import StarRating from '../Components/StarRating';
import Loader from '../Components/Loader';

function PeoplesReview() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedbackUser/feedbackAccepted');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFeedbacks(data);
            } catch (error) {
                setError('Failed to fetch feedbacks');
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);
    const formatEmail = (email) => {
        if (!email) return 'N/A';
        const [localPart] = email.split('@');
        const capitalizedLocalPart = localPart.charAt(0).toUpperCase() + localPart.slice(1);
        if (capitalizedLocalPart.length <= 6) return capitalizedLocalPart;
        return `${capitalizedLocalPart.substring(0, 5)}...`;
    };
    
   
    
    return (
        <div className="peoples-review-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    {feedbacks.length > 0 ? (
                        feedbacks.map(feedback => (
                            <div key={feedback._id} className="feedback-card">
                                <span className='f_w'><span className='user_icon'><i className="fa-regular fa-user"></i></span>{formatEmail(feedback.email)}</span>
                                <span><strong> <i className="fa-solid fa-quote-left"></i></strong> {feedback.feedback} <strong><i className="fa-solid fa-quote-right"></i></strong></span>
                                <span><strong>Rating:</strong> <StarRating rating={feedback.rating} /></span>
                                <span><strong>Posted:</strong> {new Date(feedback.timestamp).toLocaleString()}</span>
                            </div>
                        ))
                    ) : (
                        <p>No feedbacks found.</p>
                    )}
                </>
            )}
        </div>
    );
}

export default PeoplesReview;
