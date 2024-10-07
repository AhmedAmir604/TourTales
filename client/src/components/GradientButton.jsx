import React, { useState } from "react";
import { createNewBooking } from "../helperFuncs/TourHandlers";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";

export default function GradientButton({ disabled, date, tourId }) {
  const [session, setSession] = useState();

  const bookingHandler = async () => {
    if (!date) {
      return toast.error("Please select Tour Date!", {
        duration: 1000,
        position: "top-center",
        style: { backgroundColor: "#333", color: "#fff" }, // Custom styling
      });
    }
    try {
      const stripe = await loadStripe(
        "pk_test_51PpH4w02HM0a7YapZjIUbsYYmxQ7WlfbOvw78larN0BNFQp3w697rBfA8qq9izq5ytHbs04PVdh4gk8tnXfEaa3300PvNaWUkm"
      );
      const res = await createNewBooking(tourId, date);
      if (res) {
        setSession(res.data.session.id);
        await stripe.redirectToCheckout({
          sessionId: res.data.session.id,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="relative flex">
      <div className="absolute -inset-5 ">
        <div className="md:w-full w-1/3 h-[90%] max-w-sm m-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600"></div>
      </div>
      <button
        disabled={disabled}
        onClick={bookingHandler}
        className="relative z-10 inline-flex items-center justify-center w-[10rem] h-[5rem] mx-auto px-8 py-3 text-sm md:text-lg border-[3px] border-black font-bold text-white transition-all duration-200 bg-[#1f1f67]  border-transparent sm:w-auto rounded-xl font-pj hover:bg-[#0c241c]  focus:outline-none"
        role="button"
      >
        Purchase Tour Now!
      </button>
    </div>
  );
}
