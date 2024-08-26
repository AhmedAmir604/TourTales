import React from "react";

export default function TempCard({ tour, getTour }) {
  return (
    <section className="group hover:shadow-lg hover:shadow-black transition-all duration-300 rounded-xl">
      <div className="relative w-[14rem] h-[25rem] overflow-hidden rounded-xl">
        <img
          src={`/tours/${tour.imageCover}`}
          className="h-[25rem] object-cover"
        ></img>
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-200"></div>

        <div className="absolute inset-0 z-10 text-white flex flex-col  justify-around items-center flex-initial gap-[10rem]">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl font-thin">{tour.name}</h1>
            <p className="text-center pb-[10px]">______</p>
            <div className="leading-tight">
              <p className="text-[13px]">Starting from</p>
              <h1 className="text-2xl font-thin">${tour.price}</h1>
            </div>
          </div>

          <a
            onClick={getTour}
            className="cursor-pointer w-1/2 text-[14px] flex justify-center px-[1.5rem] py-[5px] bg-[#20214d] rounded-full text-gray-100 transition-all duration-200 hover:text-white hover:bg-[#3e3f8a] hover:shadow-xl shadow-lg hover:scale-105 font-bold "
          >
            Details
          </a>
        </div>
      </div>
    </section>
  );
}
