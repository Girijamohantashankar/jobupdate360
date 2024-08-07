import React from 'react';
import './ConfirmationModalFeedback.css';

const ConfirmationModalFeedback = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal-content">
                <p>{message}</p>
                <button className='btn_r' onClick={onConfirm}>Yes</button>
                <button className='btn_g' onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default ConfirmationModalFeedback;
