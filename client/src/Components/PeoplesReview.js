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

    // Utility function to format ID
    const formatId = (id) => {
        if (!id) return 'N/A';
        if (id.length <= 4) return id;
        return `XXXX${id.slice(-4)}`;
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
                                <span><strong>ID:</strong> {formatId(feedback._id)}</span>
                                <span><strong>Message:</strong> {feedback.feedback} </span>
                                <span><strong>Rating:</strong> <StarRating rating={feedback.rating} /></span>
                                <span><strong>Timestamp:</strong> {new Date(feedback.timestamp).toLocaleString()}</span>
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
