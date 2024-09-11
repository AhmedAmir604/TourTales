import React from "react";

export default function Review() {
  const handleDelete = () => {
    // Implement the delete functionality here
    console.log("Review deleted");
  };

  return (
    <div className="p-4">
      <ul className="space-y-4">
        <li className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 object-cover rounded-full border-2 border-gray-300 m-4"
              src="/images/Ju6-1negUEjTnBKw_ZP4r.png"
              alt="Reviewer"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-500">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <svg
                  className="block h-6 w-6 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <button
                className="ml-auto text-red-500 hover:text-red-700"
                onClick={handleDelete}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 2a1 1 0 00-1 1v1H4a1 1 0 000 2h1v11a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 000-2h-1V3a1 1 0 00-1-1H6zM5 4h10V3H5v1zM7 8a1 1 0 00-1 1v8a1 1 0 002 0V9a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v8a1 1 0 002 0V9a1 1 0 00-1-1z"></path>
                </svg>
              </button>
            </div>
            <p className="text-base text-gray-800">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro
              blanditiis sapiente ab dolores, ad dignissimos perspiciatis.
            </p>
            <p className="mt-2 text-sm font-semibold text-gray-900">
              John Lester
            </p>
            <p className="text-sm text-gray-600">March 01, 2022</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
