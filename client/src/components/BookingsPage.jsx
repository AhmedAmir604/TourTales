import { getBookings } from "../helperFuncs/TourHandlers";
import Booking from "./Booking";
import { toast } from "sonner";
import Preloader from "./preLoader";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import MyButton from "./myButton";

export default function BookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getBookings();
        if (res) {
          // console.log(res);
          setBookings(res.data.bookings);
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const redirectHome = () => {
    navigate("/tours");
  };

  return (
    <>
      {!loading ? (
        <section className="flex mx-auto justify-start flex-wrap w-[90vw] flex-col gap-10 md:gap-y-10 md:flex-row pt-[8rem]">
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <Booking key={index} booking={booking} />
            ))
          ) : (
            <div className="h-[80vh] w-full flex flex-col items-center justify-center p-4">
              <h1 className="text-3xl md:text-5xl font-thin text-center text-white mb-4">
                No Bookings Found!
              </h1>
              <img
                src="/NoContent.png"
                className="w-full max-w-xs md:max-w-md object-contain"
                alt="No Content"
              />
              <MyButton
                // color="#3a317c"
                text="Go Back Home!"
                handler={() => redirectHome()} // Update this path as needed
                // textColor="white"
              />
            </div>
          )}
        </section>
      ) : (
        <div className="flex justify-center items-center h-[100vh] bg-[#20214d] transition-all bg-animate">
          <Preloader />
        </div>
      )}
    </>
  );
}
