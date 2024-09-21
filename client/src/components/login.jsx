import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../helperFuncs/auth";
import DotsLoader from "./loader";
import { toast } from "sonner";
// import { useUserContext } from "../contexts/userContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // const { user, setUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.status === 200) {
        navigate("/verify-otp"); // Navigate after setting user
        toast.success("Success!");
      }
    } catch (err) {
      toast.error(`${err.message}`); // Log the error
    } finally {
      setLoading(false);
    }
  };

  const handleSingup = () => {
    navigate("/signup");
  };
  const handlePasswordReset = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="relative w-full h-[100vh]">
      <img
        className="object-cover w-full h-full"
        src="/login.jpg"
        alt="Login Image"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-white text-center p-4 w-[80%] max-w-lg">
          <h1 className="text-3xl md:text-5xl font-thin mb-2 md:mb-4">
            Welcome
          </h1>
          <p className="mb-6 text-2xl md:text-4xl font-thin">
            Have an account?
          </p>
          <form
            className="flex flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300 autofill:bg-opacity-0"
              placeholder="Email"
              aria-label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300"
              placeholder="Password"
              aria-label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-[3rem] border-[2px] border-[#a1231a] border-transparent py-[12px] bg-[#a1231a] bg-opacity-80 rounded-full text-white hover:bg-opacity-0 hover:border-[2px] hover:border-[#a1231a] transition-all duration-200"
            >
              {loading ? <DotsLoader /> : "SIGN IN"}
            </button>
          </form>
          <div className="flex flex-col justify-center">
            <a
              onClick={() => handleSingup()}
              className="mt-4 hover:cursor-pointer hover:underline block text-[14px] "
            >
              Dont have an account? Sign Up!
            </a>
            <a
              onClick={() => handlePasswordReset()}
              className="mt-2 hover:cursor-pointer hover:underline block text-[14px] "
            >
              Want help signing in?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
