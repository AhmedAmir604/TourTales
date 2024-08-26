import React from "react";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import ReviewSlider from "./ReviewSlider";
import GradientButton from "./GradientButton";

export default function TourOverview({ tour }) {
  return (
    <section className=" bg-[#20214d] ">
      <div className="relative w-full h-[100vh]">
        <img
          src={`/tours/${tour.imageCover}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute bg-[#000000] bg-opacity-70 inset-0"></div>
        <div className="absolute h-[100vh] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-white text-5xl w-2/3 text-center bg-[#b93185] bg-opacity-30 font-thin leading-tight">
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
      <div className=" top-[45rem] py-[3rem] px-[5rem] flex flex-col md:flex-row gap-[5rem] justify-center  items-center md:items-start md:justify-between  w-[100%]">
        <div className=" flex flex-col gap-[4rem] pl-0 md:pl-[5rem] ">
          <ul className="flex flex-col gap-[2rem]  ">
            <h1 className="text-[#b93185] text-xl font-semibold">
              QUICK FACTS
            </h1>
            <li className="flex gap-3 items-center font-semibold text-gray-200">
              <MdOutlineDateRange size={20} color="#b93185" /> NEXT DATE{" "}
              <p className="text-gray-400 text-sm"> {tour.formatedDate}</p>
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
      <div className="grid grid-cols-3 gap-6 w-[70vw] mx-auto mt-[1.5rem]">
        {tour.images.map((img, index) => (
          <div key={index}>
            <img
              className="h-auto max-w-full rounded-lg hover:scale-110 border-[4px] border-transparent hover:border-gray-900 transition-all duration-200"
              src={`/tours/${img}`}
              alt="Tour image"
            />
          </div>
        ))}
      </div>
      {/* {console.log(tour)} */}
      <ReviewSlider reviews={tour.reviews} />
      <div className="max-w-fit mt-[3rem] mx-auto pb-10">
        <GradientButton tourId={tour.id} />
      </div>
    </section>
  );
}
