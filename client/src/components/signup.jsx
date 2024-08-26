import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./tempComp";
import DotsLoader from "./loader";
import { signup } from "../helperFuncs/auth";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add confirm password field
  const [loading, setLoading] = useState(false); //false it when need it to work :D

  //will start working with this later but soon :)
  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoader(false);
  //     }, 2000);
  //   }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      setLoading(true);
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const res = await signup(username, email, password, confirmPassword);
      if (res.status === 201) {
        toast.success("Success");
        navigate("/");
      }
    } catch (err) {
      let msgArray = err.message.split(" "); //It returns the array not directly modify :)
      msgArray.splice(1, 1); // remove the element at index 1 and second 1 shows how many more from that index it manipulates the original array and returns the removed elements
      let msg = msgArray.join(" "); // Remove the element at index 1 it converts the array into string and return it dont directly change like pass by ref :)
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[100vh]">
      <img
        className="object-cover w-full h-full"
        src="/signup.jpeg"
        alt="Sign Up Image"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="fixed top-0 right-10">
          <Loader />
        </div>
        <div className="text-white text-center p-4 w-[80%] max-w-lg">
          <h1 className="text-5xl font-thin mb-4">Welcome</h1>
          <p className="mb-6 text-4xl font-thin">Create an account</p>
          <form
            className="flex flex-col items-center gap-5"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300 autofill:bg-opacity-0"
              placeholder="Username"
              aria-label="Username"
              name="username"
              type="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300 autofill:bg-opacity-0"
              placeholder="Email"
              aria-label="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300"
              placeholder="Password"
              aria-label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="bg-white bg-opacity-10 h-[3rem] w-[100%] rounded-full pl-[1rem] pb-[3px] border border-transparent focus:bg-opacity-0 hover:bg-opacity-0 hover:border hover:border-white transition-all duration-300"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-[3rem] border-[2px] border-[#a1231a] border-transparent py-[12px] bg-[#a1231a] bg-opacity-80 rounded-full text-white hover:bg-opacity-0 hover:border-[2px] hover:border-[#a1231a] transition-all duration-200"
            >
              {loading ? <DotsLoader /> : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
