import AboutPage from "../Pages/AboutPage";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[200vh] no-scrollbar">
      <div className="relative">
        {/* Background image for parallax effect */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('../../bgImg2.jpg')",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Hero Text */}
        <div className="fixed inset-0 flex justify-center py-[6rem] z-10">
          <h1 className="text-5xl md:text-8xl text-white font-bold text-center lg:text-start">
            FIND YOUR TRAIL
          </h1>
        </div>

        {/* Foreground image */}
        <div className="relative z-20">
          <img
            className="object-cover w-full h-[100vh]"
            src="../../noBg.png"
            alt="Foreground"
          />
        </div>
      </div>

      {/* AboutPage Component */}
      <div className="relative z-20">
        <AboutPage />
      </div>
    </div>
  );
};

export default Hero;
