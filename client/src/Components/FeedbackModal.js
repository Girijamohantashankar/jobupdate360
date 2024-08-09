import React, { useEffect, useState } from 'react';
import './FeedbackModal.css';
import { setInitialVisitTime, hasOneHourPassed, hasGivenFeedback, setFeedbackGiven } from '../utils/feedback';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
            body: JSON.stringify({ feedback, rating, email, phoneNumber }),
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
                            <div className='f_input_content'>
                            <input
                                type='email'
                                placeholder='Your Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='f_email_n'
                            />
                            <input
                                type='tel'
                                placeholder='Your Phone Number'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className='f_phone_n'
                            />
                            </div>

                            <textarea
                                placeholder="Your feedback..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                style={{ resize: 'none' }}
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
