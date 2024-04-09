import React from 'react';

const RatingSystem = ({ rating, onRatingChange }) => {
    const handleClick = (star) => {
        onRatingChange(star);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => handleClick(star)}>
                    {rating >= star ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};

export default RatingSystem;
