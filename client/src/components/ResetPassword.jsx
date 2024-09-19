import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../helperFuncs/auth";
import { toast } from "sonner";
import ToastMessage from "../subComponents/ToastMessage";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(false);

  const checkPassword = (e) => {
    e != password ? setError(true) : setError(false);
    setConfirmPassword(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return ToastMessage("error", {
        title: "Error",
        description: "Password does not match!",
      });
    }
    try {
      const id = location.pathname.split("/")[2];
      const res = await resetPassword({ password }, id);
      if (res) {
        toast.success("Password reset Successfully Login to conitnue!");
      }
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="h-screen relative">
      {/* Background Image */}
      <img
        className="h-full w-full object-cover absolute inset-0"
        src="/forgotPassword.jpg"
        alt="Background"
      />
      {/* Glassy Overlay */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-5 md:p-20 bg-white/20 backdrop-blur-md rounded-lg">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
            Reset Your Password to Continue
          </h1>
          <p className="text-gray-800 text-lg md:text-xl">
            Explore our app with a fresh start!
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-5 md:mt-0">
          <div className="w-full max-w-md p-6 bg-white/40 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Change Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-black/20 placeholder:text-gray-100 border-none focus:ring-2 focus:ring-gray-800 text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                  required
                />
              </div>
              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  onChange={(e) => checkPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`bg-black/20 placeholder:text-gray-100 focus:ring-2 focus:ring-gray-800 text-gray-100 text-sm rounded-lg block w-full p-2.5 focus:outline-none ${
                    error && "border-[2px] border-red-600"
                  }`}
                  required
                />
              </div>
              {/* Reset Password Button */}
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
