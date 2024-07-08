import React from 'react';
import "./Home.css";


function Home() {
  return (
    <div className='home_container'>
      <div className='search_box_content'>
        <div className='job_search'>
          <i class="fa-solid fa-magnifying-glass"></i>
          <input placeholder='Job title, keywords, or company' />
        </div>
        <div className='job_location'>
          <i class="fa-solid fa-location-dot"></i>
          <input placeholder='Location' />
        </div>

        <div className='job_search_btn'>
          <button>Search</button>
        </div>


      </div>
    </div>
  )
}

export default Home