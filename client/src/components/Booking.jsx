import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Booking({ booking }) {
  return (
    <div className="w-[90vw] py-[14px] rounded-xl md:w-1/3 lg:w-1/4 bg-[#0c0c24] border-[3px] border-gray-300 relative group">
      <div className="flex flex-row md:flex-col px-4 items-center gap-2">
        <div className="w-full flex items-center relative">
          <img
            className="h-1/3 object-cover rounded-xl"
            src={`/tours/${booking.tour.imageCover}`}
          />
          <div className="h-full w-full bg-black bg-opacity-30 inset-0 absolute hover:bg-opacity-0 transition-all duration-100 rounded-xl group-hover:opacity-0"></div>

          <div className="text-red-700 text-sm md:text-lg absolute top-2 right-3">
            <FaHeart />{" "}
          </div>
        </div>

        <div className="flex gap-4 flex-row md:flex-col text-gray-100">
          <h1 className="text-md md:text-lg flex items-center">
            {booking.tour.name}
          </h1>{" "}
          <p className="text-gray-300 text-sm md:text-lg ">
            {booking.tour.summary}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-1 justify-center pt-2 ">
        <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-200/50 p-1 text-gray-900 transition-colors group-hover:bg-gray-100/100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-3 h-3 "
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            ></path>
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
          </svg>
        </span>

        <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-200/50 p-1 text-gray-900 transition-colors group-hover:bg-gray-100/100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>

        <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-200/50 p-1 text-gray-900 transition-colors group-hover:bg-gray-100/100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-3 h-3"
          >
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
          </svg>
        </span>

        <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-200/50 p-1 text-gray-900 transition-colors group-hover:bg-gray-100/100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-3 h-3"
          >
            <path d="M19.5 6h-15v9h15V6z"></path>
            <path
              fillRule="evenodd"
              d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>

        <span className="cursor-pointer rounded-full border border-gray-200 bg-gray-200/50 p-1 text-gray-900 transition-colors group-hover:bg-gray-100/100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-3 h-3"
          >
            <path d="M12 21.75a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5a.75.75 0 01-.75.75z"></path>
            <path
              fillRule="evenodd"
              d="M16.5 12a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H15v3.75a.75.75 0 01-1.5 0V13.5h-2.25v3.75a.75.75 0 01-1.5 0V13.5h-2.25a.75.75 0 01-.75-.75v-.008a.75.75 0 01.75-.75h2.25V9a.75.75 0 011.5 0v2.25h2.25V9a.75.75 0 011.5 0v2.25h2.25z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
