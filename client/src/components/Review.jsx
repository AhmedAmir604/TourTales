import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import Ratings from "./Rating";
import StarRating from "../subComponents/StarRating";
import { editReview } from "../helperFuncs/reviewHandlers";

const Review = React.memo(({ rating, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(rating.review);
  const [hoverdStars, setHoverdStars] = useState(rating.rating);
  const [Rating, setRating] = useState(rating.rating);

  const handleEditSubmit = async () => {
    try {
      const data = {
        id: rating.id,
        review: editedReview,
        rating: Rating,
      };
      const res = await editReview(data);
      if (res) {
        onUpdate(res.data.data.doc); // Call the update function to reflect changes in the parent
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#161931] rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:scale-105 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row bg-[#1e2230] items-center">
          <div className="relative m-auto flex-shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full border-2 border-gray-600 m-4 shadow-lg"
              src={`/users/${rating.user.photo}`}
              alt="Reviewer"
            />
          </div>
          <div className="flex-1 p-4 bg-[#1e2230]">
            {isEditing ? (
              <div>
                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-800 text-gray-200"
                />
                <StarRating
                  rating={Rating}
                  hoverdStars={hoverdStars}
                  setRating={setRating}
                  setHoverdStars={setHoverdStars}
                  color={"green-500"}
                  size={"h-6 w-6"}
                  space={"0"}
                />
                <button
                  className="mt-2 p-2 bg-green-500 rounded-lg text-white"
                  onClick={handleEditSubmit}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
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
            )}
          </div>
          <div className="pt-auto bg-[#1e2230] md:border-l md:border-l-gray-700">
            <button
              className="ml-3 text-xl bg-black/20 p-2 mr-2 rounded-full text-green-500 hover:text-green-400 transition-colors duration-300 ease-in-out"
              onClick={() => setIsEditing(!isEditing)}
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
});

export default Review;
