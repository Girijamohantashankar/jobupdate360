import React, { useState } from 'react';
import './ReportModal.css';
import axios from 'axios';

const ReportModal = ({ isOpen, onClose, job_id }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [report, setReport] = useState({
        problem: '',
        description: ''
    });

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setReport(prev => ({ ...prev, problem: event.target.value }));
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setReport(prev => ({ ...prev, description: event.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/report/report_job', {
                report,
             job_id
            });
            console.log('Report submitted with:', { report, job: job_id });
            onClose();
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                <h2>Choose a Problem:</h2>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="problem"
                            value="offensive"
                            checked={selectedOption === 'offensive'}
                            onChange={handleOptionChange}
                        />
                        It's offensive or harassing
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="problem"
                            value="fake"
                            checked={selectedOption === 'fake'}
                            onChange={handleOptionChange}
                        />
                        Asking for money or seems like a fake job
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="problem"
                            value="incorrect"
                            checked={selectedOption === 'incorrect'}
                            onChange={handleOptionChange}
                        />
                        Incorrect company, location or job details
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="problem"
                            value="not-job"
                            checked={selectedOption === 'not-job'}
                            onChange={handleOptionChange}
                        />
                        I think it's NOT a Job, but selling something
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="problem"
                            value="other"
                            checked={selectedOption === 'other'}
                            onChange={handleOptionChange}
                        />
                        Other
                    </label>
                </div>
                <textarea
                    placeholder="Describe your problem below:"
                    value={description}
                    onChange={handleDescriptionChange}
                    maxLength={150}
                />
                <div className="char-count">{description.length}/150</div>
                <button onClick={handleSubmit}>Report to Jobupdate360</button>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default ReportModal;
