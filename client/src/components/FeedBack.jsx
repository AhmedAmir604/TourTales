import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../helperFuncs/reviewHandlers";
import StarRating from "../subComponents/StarRating";
import ToastMessage from "../subComponents/ToastMessage";

export default function FeedBack() {
  const [hoverdStars, setHoverdStars] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const stars = [1, 2, 3, 4, 5];
  const { tourId } = useParams();

  const submitReview = async () => {
    try {
      const res = await addReview({ rating, review, tourId });
      const toastMessage =
        rating < 3
          ? {
              title: "Sorry you had a bad experience 😔",
              description: "We value your feedback and will work to improve.",
            }
          : {
              title: "We're glad you had fun! 🎉",
              description: "Thanks for sharing your experience with us!",
            };
      ToastMessage(rating < 3 ? "error" : "success", toastMessage);
    } catch (err) {
      ToastMessage("error", {
        title: "😔",
        description: err.message,
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full p-6 bg-[#161855] rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
        <div className="px-12 py-5">
          <h2 className="text-center font-semibold text-[#dddfe4] sm:text-xl">
            Your opinion matters to us!
          </h2>
        </div>
        <div className="flex flex-col items-center bg-[#0c0c24] rounded-xl rounded-b-none p-6 shadow-lg">
          <div className="flex flex-col items-center space-y-3 py-6">
            <span className="text-lg font-medium text-[#dddfe4]">
              How was your experience?
            </span>
            <div className="flex space-x-3">
              <StarRating
                rating={rating}
                hoverdStars={hoverdStars}
                setRating={setRating}
                setHoverdStars={setHoverdStars}
                color={"red-500"}
                size={"h-10 w-10"}
                space={"2"}
              />
            </div>
          </div>
          <div className="flex w-3/4 flex-col">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="3"
              className="resize-none rounded-xl bg-[#20214d] p-4 text-gray-200 outline-none focus:ring focus:ring-purple-400 transition-all"
              placeholder="Write your thoughts about the tour!"
            ></textarea>
            <button
              onClick={() => submitReview()}
              className="my-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 py-3 text-base text-white transition-transform duration-300 transform hover:scale-105"
            >
              Rate now
            </button>
          </div>
        </div>
        <a
          href="/"
          className="flex items-center justify-center py-5 bg-black hover:bg-black/60 group rounded-b-xl shadow-inner"
        >
          <p className="text-sm text-gray-200 group-hover:underline">
            Maybe later
          </p>
        </a>
      </div>
    </section>
  );
}
