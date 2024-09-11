import React, { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import ReviewSlider from "./ReviewSlider";
import GradientButton from "./GradientButton";

export default function TourOverview({ tour }) {
  const [date, setDate] = useState([]);

  const calculateSeatsLeft = (dateIndex) => {
    const selectedDate = tour.startDates[dateIndex];
    return selectedDate ? tour.maxGroupSize - selectedDate.participants : 0;
  };
  return (
    <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="relative w-full h-[100vh]">
        <img
          src={`/tours/${tour.imageCover}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute bg-[#000000] bg-opacity-70 inset-0"></div>
        <div className="absolute h-[100vh] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-white text-3xl md:text-5xl  w-2/3 text-center bg-[#b93185] bg-opacity-30 font-thin leading-tight">
            {tour.name}
          </h1>
          <div className=" flex gap-[2rem]">
            <div className="text-gray-200 text-md font-semibold flex  gap-2 items-center">
              <FaRegClock size={22} /> <p className="">{tour.duration}</p>
            </div>
            <div className="text-gray-200 text-lg font-semibold flex  gap-1 items-center">
              <FaLocationDot size={22} /> <p>{tour.locations.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-[45rem] py-[3rem] px-[5rem] flex flex-col md:flex-row gap-[5rem] justify-center  items-center md:items-start md:justify-between  w-[100%]">
        <div className=" flex flex-col gap-[4rem] pl-0 md:pl-[5rem] ">
          <ul className="flex flex-col gap-[2rem]  ">
            <h1 className="text-[#b93185] text-xl font-semibold">
              QUICK FACTS
            </h1>
            <li className="flex gap-3 border items-center font-semibold text-gray-200">
              <MdOutlineDateRange size={20} color="#b93185" /> NEXT DATE{" "}
              <p className="text-gray-400 text-sm"> {tour.formatedDate[0]}</p>
            </li>
            <li className="flex gap-3 items-center font-semibold text-gray-200">
              <IoIosTrendingUp size={20} color="#b93185" /> DIFFICULTY{" "}
              <p className="text-gray-400 text-sm"> {tour.difficulty}</p>
            </li>
            <li className="flex gap-3 items-center font-semibold text-gray-200">
              <GoPerson size={20} color="#b93185" /> PARTICIPANTS{" "}
              <p className="text-gray-400 text-sm"> {tour.maxGroupSize}</p>
            </li>
            <li className="flex gap-3 items-center font-semibold text-gray-200">
              <CiStar size={23} color="#b93185" /> RATING
              <p className="text-gray-400 text-sm"> {tour.ratingsAverage}</p>
            </li>
          </ul>
          <ul className="flex flex-col gap-[2rem]">
            <h1 className="text-[#b93185] text-xl font-semibold">
              YOUR TOUR GUIDES
            </h1>

            {tour.guides.map((guide, index) => (
              <li
                key={index}
                className="flex gap-3 items-center font-semibold text-gray-200"
              >
                <img
                  src={`/users/${guide.photo}`}
                  className="h-[2rem] rounded-full "
                />{" "}
                {guide.role}{" "}
                <p className="text-sm text-gray-400">{guide.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-[75vw] md:w-1/2  flex flex-col gap-[2rem]">
          <h1 className="text-xl font-semibold underline text-gray-200">
            ABOUT {tour.name.toUpperCase()}
          </h1>
          <p className="text-gray-300 leading-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi odio
            repellat veniam quia beatae, molestias excepturi, rem praesentium
            repudiandae quae omnis ratione et quisquam cupiditate porro. Qui
            deserunt maiores rem quas consequatur distinctio animi rerum
            delectus consectetur autem facere eum, expedita iste quibusdam quos
            omnis? Quos incidunt, ipsa illum dolore reiciendis sunt itaque
            tempora rem sint cupiditate adipisci accusamus labore.
          </p>
          <p className="text-gray-300    00 leading-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae
            assumenda at inventore perferendis odio accusantium eaque, fuga
            commodi sequi, veniam tempore praesentium! Nemo, deserunt unde.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem,
            quis!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-12">
        {tour.images.map((img, index) => (
          <div key={index} className="relative group">
            <img
              src={`/tours/${img}`}
              className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-105"
              alt={`Tour image ${index + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
      <ReviewSlider reviews={tour.reviews} />
      <div className="flex flex-col md:flex-col md:items-center pb-[3rem] mx-auto w-[70vw] gap-20">
        <div className="dropdown dropdown-hover max-h-[3.5rem] z-20 mx-auto bg-[#0c0c24] md:w-1/4 text-center min-w-[10rem] md:min-w-[13rem] rounded-lg ">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 text-gray-100 bg-[#0c0c24] min-w-[10rem]  md:min-w-[10rem]  "
          >
            {date[0] ? date[1] : "Please Select Tour Date!"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-[#0c0c24] text-gray-200 rounded-box z-[1] w-[100%] p-2 shadow"
          >
            {tour.startDates.map((dateItem, index) => (
              <li
                key={index}
                className={`bg-[#0c0c24] ${
                  dateItem.soldOut ? "disabled" : ""
                } `}
              >
                <a
                  className={`${
                    dateItem.soldOut
                      ? "cursor-not-allowed text-gray-400"
                      : "hover:bg-gray-600"
                  } `}
                  onClick={() =>
                    !dateItem.soldOut && // Only set the date if it is not sold out
                    setDate([
                      dateItem.Date,
                      new Date(dateItem.Date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }),
                    ])
                  }
                >
                  {`${new Date(dateItem.Date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} (Seats Left: ${
                    dateItem.soldOut ? "Sold Out" : calculateSeatsLeft(index)
                  })`}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <GradientButton disabled={!date} date={date[0]} tourId={tour.id} />
      </div>
      <div className="w-[100%] flex">
        <a
          href={`/tours/${tour.id}/reviews`}
          className="mx-auto mb-5 md:fixed md:bottom-3 md:right-3 inline-block bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <span className="text-sm md:text-lg">Leave a Review</span>
        </a>
      </div>
    </section>
  );
}
