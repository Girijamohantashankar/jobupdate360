import React from 'react';
import "./LogoutModal.css";

function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div className="modal_overlay_logout">
            <div className="modal_content">
            <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
                <h6>Are you sure, you want to log out?</h6>
                <div className="modal_buttons">
                    <button onClick={onClose} className="cancel_btn">Cancel</button>
                    <button onClick={onConfirm} className="confirm_btn">Logout</button>
                </div>
                
            </div>
        </div>
    );
}

export default LogoutModal;
