import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';  // Importing different types of stars

const ProductRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating); // Whole filled stars
    const halfStar = rating % 1 >= 0.5; // If rating has a half star
    const emptyStars = totalStars - Math.ceil(rating); // Remaining empty stars

    return (
        <div className="flex">
            {/* Display filled stars */}
            {Array(filledStars).fill().map((_, i) => (
                <FaStar key={`filled-${i}`} className="text-yellow-400" />
            ))}
            {/* Display half star if required */}
            {halfStar && <FaStarHalfAlt key="half" className="text-yellow-400" />}
            {/* Display empty stars */}
            {Array(emptyStars).fill().map((_, i) => (
                <FaRegStar key={`empty-${i}`} className="text-gray-300" />
            ))}
        </div>
    );
};

export default ProductRating;
