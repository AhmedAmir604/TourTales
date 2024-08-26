// import Card from "./card";
import React from "react";

export default function Hero() {
  return (
    <div className="relative h-[100vh] overflow-y-scroll no-scrollbar">
      {/* Background image for parallax effect */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center "
        style={{
          backgroundImage: "url('../../bgImg2.jpg')",
          backgroundAttachment: "fixed",
        }}
      ></div>
      <div className="fixed inset-0 flex justify-center py-[6rem] -z-0">
        <h1 className="text-5xl md:text-8xl text-white font-bold text-center lg:text-start">
          FIND YOUR TRAIL
        </h1>
      </div>

      {/* Foreground image */}
      <div className="relative z-10">
        <img
          className="object-cover w-full h-[100vh]"
          src="../../noBg.png"
          alt="Foreground"
        />
        {/* <img
          className="object-cover w-full h-[100vh]"
          src="../../bgImg4.jpg"
          alt="Foreground"
        /> */}
      </div>
    </div>
  );
}
