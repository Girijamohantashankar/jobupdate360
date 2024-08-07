import React, { useEffect, useState } from 'react';
import './FeedbackView.css';
import ConfirmationModal from './ConfirmationModalFeedback';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FeedbackView() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedbackUser/feedbackView');
                const data = await response.json();
                setFeedbacks(data.filter(feedback => feedback.status === 'view'));
            } catch (error) {
                console.error('Failed to fetch feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleAccept = (id) => {
        setSelectedFeedbackId(id);
        setConfirmMessage('Are you sure you want to accept this feedback?');
        setConfirmAction(() => async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/feedbackUser/feedback/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: 'accepted' }),
                });

                if (response.ok) {
                    setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                    toast.success('Feedback accepted successfully');
                } else {
                    toast.error('Failed to accept feedback');
                }
            } catch (error) {
                toast.error('Failed to accept feedback');
            }
        });
        setShowConfirmModal(true);
    };

    const handleReject = (id) => {
        setSelectedFeedbackId(id);
        setConfirmMessage('Are you sure you want to reject this feedback?');
        setConfirmAction(() => async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/feedbackUser/feedback/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setFeedbacks(feedbacks.filter(feedback => feedback._id !== id));
                    toast.success('Feedback rejected successfully');
                } else {
                    toast.error('Failed to reject feedback');
                }
            } catch (error) {
                toast.error('Failed to reject feedback');
            }
        });
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setShowConfirmModal(false);
    };

    const handleCloseModal = () => {
        setShowConfirmModal(false);
    };

    return (
        <div className="feedback-container">
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                message={confirmMessage}
            />
            {feedbacks.map(feedback => (
                <div key={feedback._id} className="feedback-card">
                    <p><strong>Feedback:</strong> {feedback.feedback}</p>
                    <p><strong>Rating:</strong> {feedback.rating}</p>
                    <p><strong>Timestamp:</strong> {new Date(feedback.timestamp).toLocaleString()}</p>
                    <div className="feedback-actions">
                        <button onClick={() => handleAccept(feedback._id)}>Accept</button>
                        <button className='reject_btn' onClick={() => handleReject(feedback._id)}>Reject</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FeedbackView;
