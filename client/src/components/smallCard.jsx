import { FaCampground } from "react-icons/fa";
import React from "react";

export default function Card() {
  return (
    <section className="flex flex-col rounded-lg justify-around items-center w-[7rem] h-[6rem] bg-[#1e1f3a] bg-opacity-[75%] hover:translate-y-[-7px] transition-all">
      <div className="bg-[#31417c] rounded-lg font-bold flex justify-center items-center gap-[10px]  px-[1rem] py-[7px] text-white">
        <FaCampground size={20} />
        <p className="text-[10px]">524+</p>
      </div>
      <p className="text-center text-[12px] leading-tight text-gray-300 font-semibold w-[6rem]">
        {" "}
        Camps Organized
      </p>
    </section>
  );
}
