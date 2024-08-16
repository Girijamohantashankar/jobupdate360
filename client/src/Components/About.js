import React, { useState, useEffect } from 'react';
import './About.css';
import Loader from './Loader';
import projectImage from '../assets/mission.png'; 
import teamImage from '../assets/team.jpg'; 

function About() {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); 
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Job Update 360</h1>
        <p>Your one-stop solution for all job updates and career resources.</p>
      </header>
      <section className="about-section">
        <img src={projectImage}  alt="Project Overview" className="about-image" />
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            At Job Update 360, we are dedicated to revolutionizing the job search experience. Our mission is to provide job seekers with the most up-to-date and relevant job listings, career advice, and resources to help them land their dream job.
          </p>
          <p>
            We leverage the latest technology and market insights to ensure that our users have access to the best opportunities available. Whether you are a recent graduate, an experienced professional, or someone looking to make a career change, Job Update 360 is here to support you every step of the way.
          </p>
        </div>
      </section>
      <section className="team-section">
        <div className="team-content">
          <h2>Meet Our Team</h2>
          <p>
            Our team is composed of industry experts, tech enthusiasts, and passionate individuals who are committed to making a positive impact in the job market. With diverse backgrounds and extensive experience, we work together to deliver the best possible service to our users.
          </p>
          <p>
            We believe that every job seeker deserves access to the right tools and support to achieve their career goals. Our team’s dedication and expertise drive our continuous efforts to innovate and improve the job search experience.
          </p>
        </div>
        <img src={teamImage} alt="Our Team" className="team-image" />
      </section>
      <footer className="about-footer">
        <p>&copy; 2024 Job Update 360. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;
