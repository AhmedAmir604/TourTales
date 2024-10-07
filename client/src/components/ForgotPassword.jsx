import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { verfiy2fa, verifyOtp } from "../helperFuncs/auth";
import ToastMessage from "../subComponents/ToastMessage";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRef = useRef([]);

  const setOtpValue = (val, index) => {
    if (isNaN(val)) {
      inputRef.current[index].value = "";
      return toast.error("Only Enter Numbers");
    }

    if (val) {
      const values = [...otp];
      values[index] = val;
      setOtp(values);

      if (index < otp.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").split("").slice(0, otp.length);
    const newOtp = [...otp];

    data.forEach((char, index) => {
      if (inputRef.current[index]) {
        newOtp[index] = char;
        inputRef.current[index].value = char;
      }
    });
    setOtp(newOtp);
    inputRef.current[Math.min(data.length, otp.length - 1)].focus();
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      inputRef.current[index].value === ""
    ) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname.includes("verify-otp")) {
        await verfiy2fa(otp.join(""));
        ToastMessage("success", {
          title: "Success",
          description: "OTP Verified",
        });
        navigate("/tours");
      } else {
        const res = await verifyOtp(otp.join(""));
        console.log(res);
        ToastMessage("success", {
          title: "Success",
          description: "OTP Verified",
        });
        // window.location.href = `/reset-password/${res.data.token}`;

        navigate(`/reset-password/${res.data.token}`);
      }
    } catch (err) {
      ToastMessage("error", {
        title: "Error",
        description: err.message,
      });
    }
  };

  return (
    <section className="h-screen relative bg-gray-50 flex items-center justify-center px-[1rem]">
      {/* Background Image */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="forgotPassword.jpg"
        alt="Background"
      />
      {/* Glassy Overlay */}
      <div className="relative px-2 py-6 sm:p-6 md:p-10 bg-white/30 backdrop-blur-md rounded-xl shadow-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="md:text-2xl text-xl font-bold text-slate-900 mb-1">
            Enter OTP Code
          </h1>
          <p className="text-sm text-slate-500">
            Enter the 4-digit code sent to your Email.
          </p>
        </header>
        <form id="otp-form" onSubmit={handleSubmission} className="space-y-4">
          <div className="flex justify-center gap-3">
            {otp.map((_, index) => (
              <input
                name={`otp-${index}`}
                ref={(el) => (inputRef.current[index] = el)}
                key={index}
                onChange={(e) => setOtpValue(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                type="text"
                className="w-8 h-8 md:w-14 md:h-14 text-center text-lg md:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 rounded-lg p-0 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength="1"
                inputMode="numeric"
                aria-label={`OTP digit ${index + 1}`}
                required
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-lg bg-gray-600 hover:bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
          <div className="text-sm text-slate-900 mt-4 text-center">
            Didn’t receive the code?{" "}
            <a
              className="font-medium text-gray-800 hover:text-gray-900 hover:underline"
              href="#0"
            >
              Resend
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
