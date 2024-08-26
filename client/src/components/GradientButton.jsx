import React, { useState } from "react";
import { createNewBooking } from "../helperFuncs/TourHandlers";
import { loadStripe } from "@stripe/stripe-js";

export default function GradientButton({ tourId }) {
  const [session, setSession] = useState();

  const bookingHandler = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PpH4w02HM0a7YapZjIUbsYYmxQ7WlfbOvw78larN0BNFQp3w697rBfA8qq9izq5ytHbs04PVdh4gk8tnXfEaa3300PvNaWUkm"
      );
      const res = await createNewBooking(tourId);
      if (res) {
        setSession(res.data.session.id);
        await stripe.redirectToCheckout({
          sessionId: res.data.session.id,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="relative">
      <div className="absolute -inset-5">
        <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-30 blur-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-green-600"></div>
      </div>
      <a
        onClick={() => bookingHandler()}
        className="relative z-10 inline-flex items-center justify-center w-full px-8 py-3 text-lg border-[3px] border-black font-bold text-white transition-all duration-200 bg-[#1f1f67]  border-transparent sm:w-auto rounded-xl font-pj hover:bg-[#0c0c24]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        role="button"
      >
        Purchase Tour Now!
      </a>
    </div>
  );
}
