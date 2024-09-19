import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { generateOtp } from "../helperFuncs/auth";
import { toast } from "sonner";

export default function GenerateOtp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await generateOtp(email);
      if (res) {
        toast.success(
          "If an account exists with this email, OTP has been sent!"
        );
        navigate("/reset-password");
      }
    } catch (err) {
      toast.error(
        (err.message.includes("E11000") && "OTP has already been sent!") ||
          err.message
      );
    }
  };

  return (
    <section className="relative">
      <img
        src="/generateOtp.jpg"
        className="inset-0 object-cover h-screen w-screen"
        alt="Background"
      />
      <div className="inset-0 flex absolute bg-white/10 backdrop-blur-sm">
        <div className="m-auto p-6 rounded-xl max-w-[95%] sm:max-w-[30%] flex flex-col gap-5 border bg-white">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-600 font-bold">Reset Password</h1>
            <p className="text-sm text-gray-600 font-semibold">
              Enter your email linked with your account. We'll send an OTP to
              reset your password.
            </p>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-3">
            <label htmlFor="email" className="absolute">
              <MdOutlineEmail className="text-2xl text-gray-600 my-[8px] ml-2" />
            </label>
            <input
              id="resetEmail"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(""); // Clear error on change
              }}
              className={`bg-transparent pl-10 border text-sm text-gray-700 font-semibold border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-900 rounded-lg p-2 placeholder:text-sm placeholder:font-bold ${
                emailError ? "border-red-500" : ""
              }`}
              required
            />
            {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
            <button
              type="submit"
              className="text-[13px] font-bold text-gray-100 text-center px-10 py-3 bg-gray-600 hover:bg-gray-900 rounded-lg transition-all"
            >
              Send Reset OTP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
