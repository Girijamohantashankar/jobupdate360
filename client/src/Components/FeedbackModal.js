import React, { useEffect, useState } from 'react';
import './FeedbackModal.css';
import { setInitialVisitTime, hasOneHourPassed, hasGivenFeedback, setFeedbackGiven } from '../utils/feedback';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem('lastVisit')) {
            setInitialVisitTime();
        }
        if (hasOneHourPassed() && !hasGivenFeedback()) {
            setShowModal(true);
        }
    }, []);

    const handleFeedbackSubmit = async () => {
        setFeedbackGiven();
        setShowModal(false);
        const response = await fetch('http://localhost:5000/api/feedbackUser/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedback, rating }),
        });

        if (response.ok) {
            toast.success('Feedback submitted successfully');
        } else {
            toast.error('Failed to submit feedback');
        }
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    return (
        <>
            {showModal && (
                <div className='feedback_overlay'>
                    <div className="feedback_modal">
                        <div className="modal-content">
                            <h2>We Value Your Feedback</h2>
                            <p>Please provide your feedback to help us improve.</p>
                            <textarea
                                placeholder="Your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                style={{ resize: 'none' }} // Disable horizontal resizing
                            />
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => (
                                    <i
                                        key={index}
                                        className={`fa-star ${index < rating ? 'fas' : 'far'}`}
                                        onClick={() => handleStarClick(index)}
                                    ></i>
                                ))}
                            </div>
                            <button onClick={handleFeedbackSubmit}>Submit</button>
                            <div className='close_icon_modal'> 
                                <i
                                    className="fas fa-times close-icon"
                                    onClick={() => setShowModal(false)}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default FeedbackModal;