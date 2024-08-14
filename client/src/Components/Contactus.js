import React from 'react';
import "./Contactus.css";

function Contactus() {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h1>JobUpdate360</h1>
        <p>Welcome to JobUpdate360, your one-stop platform for the latest job postings and career opportunities. We are dedicated to providing you with the best possible service to help you find your dream job.</p>
        
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="map-container">
          <h3>Our Location</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086417307788!2d-122.41941548468158!3d37.774929779759955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c5f40c2c7%3A0x220cb0a39f0ecdb4!2sGoogleplex!5e0!3m2!1sen!2sus!4v1617814097061!5m2!1sen!2sus" 
            width="100%" 
            height="250" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            title="Google Maps Location">
          </iframe>
        </div>
      </div>

      <div className="contact-right">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Enter the subject" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Enter your message" rows="6" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contactus;
