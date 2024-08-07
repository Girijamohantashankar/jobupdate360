import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const totalStars = 5; 
    const filledStars = Math.round(rating); 

    return (
        <div className="star-rating">
            {Array.from({ length: totalStars }, (_, index) => (
                <span
                    key={index}
                    className={`star ${index < filledStars ? 'filled' : ''}`}
                >
                    <i className={`fa fa-star ${index < filledStars ? 'filled' : ''}`}></i>
                </span>
            ))}
        </div>
    );
};

export default StarRating;
