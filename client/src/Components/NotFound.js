import React from 'react';
import "./NotFound.css";
import notFoundGif from '../assets/error.gif';

function NotFound() {
  return (
    <div className='no_found_container'>
      <img src={notFoundGif} alt="Not Found" className="notfound-gif" />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
