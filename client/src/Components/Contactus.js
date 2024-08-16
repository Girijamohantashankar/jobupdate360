import React, { useState, useEffect } from 'react';
import "./Contactus.css";
import Loader from './Loader';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Contactus() {
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/contact/contact-us', formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to send message. Please try again later.');
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="contact-page">
      <div className="contact-left">
        <h1>JobUpdate360</h1>
        <p>Welcome to JobUpdate360, your one-stop platform for the latest job postings and career opportunities. We are dedicated to providing you with the best possible service to help you find your dream job.</p>

        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Job-Update-360/100095076759386/?mibextid=2JQ9oc" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/@JobUpdate360" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="https://www.instagram.com/jobupdate_360/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://in.linkedin.com/company/job-update-360" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="map-container">
          <h3>Our Location</h3>
          {iframeLoading && <Loader />}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109493.72659319632!2d75.67182918194094!3d30.95152978937506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a86e98b5a3e71%3A0x2acbcb7ea1e2fe00!2sGuru%20Arjan%20Dev%20Nagar%2C%20Ludhiana%2C%20Punjab%20141008!5e0!3m2!1sen!2sin!4v1723726381943!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
            onLoad={handleIframeLoad} // Correctly placed here
          ></iframe>
        </div>
      </div>

      <div className="contact-right">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter the subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Enter your message"
              rows="6"
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? <Loader /> : 'Send Message'}
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Contactus;
