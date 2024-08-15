import React from 'react';
import './footer.css';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src={logo} alt="Job Update 360 Logo" className="footer-logo" />
          <p className="company-name">Job Update 360</p>
        </div>
        <div className="footer-middle">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact-us">Contact</a>
        </div>
        <div className="footer-right">
          <div className="subscribe">
            <input type="email" placeholder="Subscribe to our newsletter" />
            <button>Subscribe</button>
          </div>
          <div className="contact-emails">
            <div className="contact-item">
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:help@jobupdate360.in">help@jobupdate360.in</a>
            </div>
            <div className="contact-item">
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:support@jobupdate360.com">support@jobupdate360.com</a>
            </div>
            <div className="contact-item">
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:support@jobupdate360.in">support@jobupdate360.in</a>
            </div>
          </div>
        </div>
      </div>
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
      <div className="footer-bottom">
        <p>&copy; 2024 Job Update 360. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
