import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React from "react";

export default function Ratings({ ratingsAverage }) {
  // Create an array of 5 elements to render stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < Math.floor(ratingsAverage)) {
      // Fully filled star
      return <FaStar key={index} color="#22c55e" />;
    } else if (index < Math.ceil(ratingsAverage)) {
      // Half-filled star
      return <FaStarHalfAlt key={index} color="#22c55e" />;
    } else {
      // Empty star
      return <FaRegStar key={index} color="#22c55e" />;
    }
  });

  return (
    <div className="flex gap-[2px] text-white">
      {stars.map((el, index) => (
        <div key={index}>{el}</div>
      ))}
    </div>
  );
}
