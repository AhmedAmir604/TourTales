import React, { useEffect, useState } from "react";
import Review from "./Review";
import { deleteReview, getAllReviews } from "../helperFuncs/reviewHandlers";
import ToastMessage from "../subComponents/ToastMessage";
import { toast } from "sonner";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
      toast.success("Deleted Sucesfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getAllReviews();
        if (res && res.data.reviews) {
          setReviews(res.data.reviews);
          ToastMessage("success", {
            title: "Your Reviews!",
            description: "Reviews fetched successfully!",
          });
        }
      } catch (err) {
        ToastMessage("error", {
          title: "Something went very wrong :(",
          description: err.message,
        });
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="">
      {reviews.length > 0 ? (
        <div className="w-[90%] mx-auto flex flex-col gap-4 pt-10">
          {reviews.map((review, index) => (
            <Review
              rating={review}
              key={index}
              onDelete={() => handleDelete(review.id)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[100vh] w-[100%] flex">
          <h1 className="m-auto">No reviews :( </h1>
        </div>
      )}
    </div>
  );
}
