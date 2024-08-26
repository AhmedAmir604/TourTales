import React from "react";

export default function MyButton({ text, handler }) {
  return (
    <div className="flex transition-all duration-150 max-w-sm rounded-xl bg-gradient-to-tr from-pink-500 to-blue-500 p-0.5 shadow-lg">
      <button
        className="flex-1 hover:bg-[#0f0f2c]/60 hover:text-gray-100 text-gray-300 transition-all duration-200 text-md font-bold bg-[#0e0f22] px-5 py-2 rounded-xl"
        onClick={handler}
      >
        {text}
      </button>
    </div>
  );
}

// import React from "react";
// import { Button } from "@nextui-org/react";

// export default function MyButton() {
//   return (
//     <Button
//       onClick={handler}
//       radius="full"
//       className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
//     >
//       {text}
//     </Button>
//   );
// }
