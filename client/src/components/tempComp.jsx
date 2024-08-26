import React from "react";

export default function Loader() {
  return (
    <div className="relative w-[5rem] h-[5rem] p-2.5 flex items-center justify-center">
      <div className="absolute  w-[6rem] h-[2rem] flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Front Cloud */}
          <div className="absolute top-[11.25px] left-[-25.25px] z-[11] animate-clouds">
            <span className=" w-[16.25px] h-[16.25px] rounded-[50%_50%_0_50%] bg-[#4c9beb] inline-block z-[5]"></span>
            <span className=" w-[11.25px] h-[11.25px] rounded-[50%_50%_50%_0%] bg-[#4c9beb] inline-block -ml-[6.25px] z-[5]"></span>
          </div>

          {/* Sun */}
          <span className="absolute w-[30px] h-[30px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-[50%] inline-block z-[10] animate-sunshine"></span>
          <span className="absolute w-[30px] h-[30px] bg-gradient-to-r from-[#fcbb04] to-[#fffc00] rounded-[50%] inline-block"></span>

          {/* Back Cloud */}
          <div className="absolute top-[-7.5px] left-[0.75px] z-[12] animate-clouds">
            <span className=" w-[7.5px] h-[7.5px] rounded-[50%_50%_0_50%] bg-[#4c9beb] inline-block z-[5]"></span>
            <span className=" w-[12.5px] h-[12.5px] rounded-[50%_50%_50%_0%] bg-[#4c9beb] inline-block -ml-[5px] z-[5]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
