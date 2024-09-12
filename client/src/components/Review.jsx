import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Ratings from "./Rating";

export default function Review({ rating, onDelete }) {
  const navigate = useNavigate();
  const editHandler = async (id) => {
    navigate(`/tours/${id}/reviews`);
    console.log(id);
  };
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#161931] rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row bg-[#1e2230] items-center">
          <div className="relative m-auto flex-shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full border-2 border-gray-600 m-4 shadow-lg"
              src={`/public/users/${rating.user.photo}`}
              alt="Reviewer"
            />
          </div>
          <div className="flex-1 p-4 bg-[#1e2230]">
            <p className="text-base text-gray-400 mb-2 leading-relaxed">
              {rating.review}
            </p>
            <Ratings ratingsAverage={rating.rating} />
            <p className="text-sm font-semibold text-gray-300 mt-3">
              {rating.user.name}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(rating.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="pt-auto bg-[#1e2230] md:border-l md:border-l-gray-700">
            <button
              className="ml-3 text-xl bg-black/20 p-2 mr-2 rounded-full text-green-500 hover:text-green-400 transition-colors duration-300 ease-in-out"
              onClick={() => editHandler(rating.id)}
            >
              <MdEdit />
            </button>
            <button
              className="ml-auto text-xl mr-3 bg-black/20 p-2 rounded-full text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out"
              onClick={() => onDelete(rating.id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
