import { useEffect, useState } from "react";
import { getAllTours } from "../helperFuncs/TourHandlers";
import TourCard from "./TourCard";
import { useNavigate } from "react-router-dom";
import Preloader from "./preLoader";
import React from "react";
import Header from "./header";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export default function Tours() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await getAllTours();
        setTours(res.data.data.doc);
        toast.success("Updated!");
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get("booking") === "success") {
          toast.success("Booking Successful");
          searchParams.delete("booking");
          navigate(`${location.pathname}?${searchParams.toString()}`, {
            replace: true,
          });
        }
      } catch (err) {
        toast.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleTour = (id) => () => {
    navigate(`/tours/${id}`);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] transition-all bg-animate">
          <Preloader />
        </div>
      ) : (
        <section className="">
          <Header />
          <div className="flex pt-[12rem] gap-[5rem] flex-wrap items-center justify-center md:justify-start w-[90%] mx-auto">
            {tours.map((tour, index) => (
              <TourCard getTour={handleTour(tour.id)} key={index} tour={tour} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
