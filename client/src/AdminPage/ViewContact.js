import React, { useState, useEffect } from 'react';
import './ViewContact.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';

function ViewContact() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contact/requests');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contact requests:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/contact/requests/${id}`);
                toast.success('Message deleted successfully');
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (error) {
                toast.error('Failed to delete message');
                console.error('Error deleting contact:', error);
            }
        }
    };

    const handleReply = (email) => {
        window.location.href = `mailto:${email}`;
    };
    const handleBack = () => {
        navigate(-1); // This will take the user back to the previous page
    };
    return (
        <div className="view-contact">
            {loading ? (
                <Loader />
            ) : (
                <><button onClick={handleBack} className="back-btn">Back <i className="fa-solid fa-rotate-left"></i></button>
                    <h2>View Contact Requests</h2>
                    <div className='contact_view'>
                        <table className="contact-table">
                            <thead>
                                <tr className='contact_view_header_table'>
                                    <th className='th_n'>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map(contact => (
                                    <tr key={contact._id}>
                                        <td className='th_n'>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>{contact.subject}</td>
                                        <td>{contact.message}</td>
                                        <td>
                                            <button onClick={() => handleReply(contact.email)} className="reply-btn">Reply</button>
                                            <button onClick={() => handleDelete(contact._id)} className="delete-btn">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            <ToastContainer />
        </div>
    );
}

export default ViewContact;
