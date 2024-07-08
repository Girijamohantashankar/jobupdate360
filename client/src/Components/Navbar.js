
import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className='navbar_container'>
      <div className='nav_bar'>
        <div className='logo'>
          <Link to="/home">
            <img src={logo} alt="logo" className='logo_img' />
          </Link>
          <Link className='Link br_btn' to="/home">Home</Link>
          <Link className='Link br_btn' to="/review">People Review</Link>
        </div>

        <div className='nav_links'>
          <ul>
            <li><Link className='Link br_btn' to="/home">Employee | Post Job</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar