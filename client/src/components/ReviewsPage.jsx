import React, { useEffect, useState, useCallback } from "react";
import Review from "./Review";
import { deleteReview, getAllReviews } from "../helperFuncs/reviewHandlers";
import ToastMessage from "../subComponents/ToastMessage";
import { toast } from "sonner";
import Preloader from "./preLoader";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteReview(id);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== id)
      );
      toast.success("Deleted Successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  }, []);

  const handleUpdate = useCallback((updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((r) => (r.id === updatedReview.id ? updatedReview : r))
    );
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] bg-[#20214d] transition-all bg-animate">
          <Preloader />
        </div>
      ) : reviews.length > 0 ? (
        <div className="w-[90%] mx-auto flex flex-col gap-4 pt-10">
          <div className="text-4xl md:text-5xl text-gray-100 mx-auto my-4 font-bold">
            {" "}
            My Reviews{" "}
          </div>
          {reviews.map((review) => (
            <Review
              rating={review}
              key={review.id}
              onDelete={() => handleDelete(review.id)}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="h-[100vh] w-[100%] flex">
          <h1 className="m-auto">No reviews yet. Be the first to leave one!</h1>
        </div>
      )}
    </div>
  );
}
