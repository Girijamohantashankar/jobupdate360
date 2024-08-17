import React, { useEffect, useState } from 'react';
import './PeoplesReview.css';
import StarRating from '../Components/StarRating';
import Loader from '../Components/Loader';
import nofound from '../assets/noresult.jpg';

function PeoplesReview() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [expandedFeedbacks, setExpandedFeedbacks] = useState({});
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

    const toggleReadMore = (id) => {
        setExpandedFeedbacks(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            const truncatedText = words.slice(0, wordLimit).join(' ');
            return [truncatedText, true];
        }
        return [text, false];
    };

    return (
        <div className="peoples-review-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {error && <p className="error-message">{error}</p>}
                    {feedbacks.length > 0 ? (
                        feedbacks.map(feedback => {
                            const [truncatedFeedback, isTruncated] = truncateText(feedback.feedback, 30);
                            const isExpanded = expandedFeedbacks[feedback._id];
                            return (
                                <div key={feedback._id} className="feedback_card">
                                    <span className='f_w'><span className='user_icon'><i className="fa-regular fa-user"></i></span>{formatEmail(feedback.email)}</span>
                                    <span>
                                        <strong><i className="fa-solid fa-quote-left"></i></strong>
                                        {isExpanded || !isTruncated ? feedback.feedback : `${truncatedFeedback}...`}
                                        {isTruncated && (
                                            <a className="read-more-button" onClick={() => toggleReadMore(feedback._id)}>
                                                {isExpanded ? 'Show Less' : 'Read More'}
                                            </a>
                                        )}
                                        <strong><i className="fa-solid fa-quote-right"></i></strong>
                                    </span>
                                    <span><strong>Rating:</strong> <StarRating rating={feedback.rating} /></span>
                                    <span><strong>Posted:</strong> {new Date(feedback.timestamp).toLocaleString()}</span>
                                </div>
                            );
                        })
                    ) : (
                        <div className='not_found'>
                            <img className='not_found_img' src={nofound} alt='nofound' />
                            <p className='no_feedback'>No feedbacks found.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PeoplesReview;
