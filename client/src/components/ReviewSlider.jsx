import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Rating from "./Rating";
import { getReview } from "../helperFuncs/userHandlers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSlider({ reviews }) {
  // const [reviews, setReviews] = useState([]);
  // useEffect(() => {
  //   setReviews(Reviews);
  //   if (reviews != []) console.log(Reviews);
  // });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-screen-xl w-[80vw] md:w-[90vw] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 mt-[3rem]">
      <h2 className="text-center text-2xl md:text-4xl font-bold tracking-tight sm:text-5xl text-gray-200">
        Read trusted reviews from our customers
      </h2>
      <Slider {...settings} className="mt-14 ">
        {reviews.map((review, index) => (
          <div key={index} className="px-[1rem] py-[2rem]">
            <blockquote
              className="rounded-lg border bg-[#0c0c24] p-6 sm:p-8 mx-auto hover:-translate-y-5 shadow-gray-200 hover:shadow-2xl transition-all duration-200"
              style={{ minWidth: "300px" }} // Set fixed width
            >
              <div className="flex items-center gap-4">
                <img
                  alt={review.user.name}
                  src={`/users/${review.user.photo}`}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <Rating ratingsAverage={review.rating} />
                  <p className="mt-0.5 text-lg font-medium text-gray-200">
                    {review.user.name}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-300">{review.review}</p>
            </blockquote>
          </div>
        ))}
      </Slider>
    </div>
  );
}
