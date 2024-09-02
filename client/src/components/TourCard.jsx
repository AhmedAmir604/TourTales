import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "sonner";
import { addLikedTour } from "../helperFuncs/userHandlers";
import { useLocation } from "react-router-dom";

function TempCard({ tour, getTour, bookmarks }) {
  const location = useLocation();
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    (() => {
      if (bookmarks.includes(tour.id)) {
        setBookmark(true);
      } else {
        setBookmark(false);
      }
    })();
  }, [location.pathname, bookmarks, tour.id]);

  const bookmarkHandler = async () => {
    try {
      await addLikedTour(tour.id);
      const action = !bookmark ? "added" : "removed";
      toast.success(`${tour.name} has been ${action} to your bookmarks!`);
      setBookmark((prev) => !prev);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="group hover:shadow-lg hover:shadow-black transition-all duration-300 rounded-xl ">
      <div className="relative w-[14rem] h-[25rem] overflow-hidden rounded-xl">
        {bookmark ? (
          <FaBookmark
            onClick={bookmarkHandler}
            className="absolute text-[#8A2BE2] right-4 cursor-pointer z-20 hover:scale-110 transition-all duration-100 active:scale-125"
            size={30}
          />
        ) : (
          <FaRegBookmark
            onClick={bookmarkHandler}
            className="absolute text-[#8A2BE2] right-4 cursor-pointer z-20 hover:scale-110 transition-all duration-100 active:scale-125"
            size={30}
          />
        )}
        <img
          src={`/tours/${tour.imageCover}`}
          className="h-[25rem] object-cover"
          alt={`${tour.name} cover`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-200"></div>

        <div className="absolute inset-0 z-10 text-white flex flex-col justify-around items-center gap-[10rem]">
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
            className="cursor-pointer w-1/2 text-[14px] flex justify-center px-[1.5rem] py-[5px] bg-[#20214d] rounded-full text-gray-100 transition-all duration-200 hover:text-white hover:bg-[#3e3f8a] hover:shadow-xl shadow-lg hover:scale-105 font-bold"
          >
            Details
          </a>
        </div>
      </div>
    </section>
  );
}

// React.memo is a higher-order component (HOC) used to optimize functional components in React by preventing unnecessary re-renders. It does this by memoizing the rendered output of the component and only re-rendering if its props change.

const MemoizedTempCard = React.memo(TempCard);
MemoizedTempCard.displayName = "TempCard";
export default MemoizedTempCard;
