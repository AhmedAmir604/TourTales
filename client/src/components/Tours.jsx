import { useEffect, useState } from "react";
import { getAllTours } from "../helperFuncs/TourHandlers";
import TourCard from "./TourCard";
import { useNavigate } from "react-router-dom";
import Preloader from "./preLoader";
import React from "react";
import Header from "./header";
import { toast } from "sonner";

export default function Tours() {
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await getAllTours();
        // console.log(res);
        setTours(res.data.data.doc);
        toast.success("Updated!");
      } catch (err) {
        // console.log(err);
        toast.error("Failed to fetch data!");
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
          <div className="flex pt-[12rem] gap-[5rem] flex-wrap items-center justify-start w-[90%] mx-auto">
            {tours.map((tour, index) => (
              <TourCard getTour={handleTour(tour.id)} key={index} tour={tour} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
