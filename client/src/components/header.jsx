import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./myButton";
import { isLoggedIn, logout } from "../helperFuncs/auth";
import React from "react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [img, setImg] = useState();
  const [expand, setExpand] = useState(false);

  const clickHandler = () => {
    navigate("/users/me");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await isLoggedIn();
        if (res.data.data) {
          setUser(res.data.data.currentUser);
          setName(res.data.data.currentUser.name.split(" ")[0]);
          setImg(res.data.data.currentUser.photo);
        }
        console.log(import.meta.env.VITE_ENV);
      } catch (err) {
        throw err.response.data.message;
      }
    };
    fetchUser();
  }, []);

  const getLikedTours = () => {
    navigate("/bookmarks");
  };

  const handleClick = (path) => {
    navigate(path);
  };

  const logMeOut = async () => {
    try {
      await logout();
      setUser("");
      setName("");
      setImg("");
      navigate("/");
    } catch (err) {
      throw Error(err.response.data.message);
    }
  };

  const hamburgerHandler = () => {
    setExpand(!expand);
  };

  return (
    <section className="fixed z-30 top-5 w-[90vw]">
      <div className="text-white flex justify-between items-center bg-gray-200/10 w-[80vw] mx-auto rounded-xl py-1">
        <div className="flex justify-between w-[100%] gap-[2rem] pr-[2rem]">
          <div className="ml-5 my-auto">
            <MyButton
              color="#3a317c"
              text="Tours"
              handler={() => handleClick("/tours")} // Update this path as needed
              // textColor="white"
            />
          </div>
          <div className="hidden md:block">
            {user ? (
              <div className=" flex gap-[2rem] justify-between items-center">
                <MyButton
                  color="#3a317c"
                  text="My Tours"
                  handler={() => getLikedTours()}
                  textColor="white"
                />
                <MyButton
                  color="#3a317c"
                  text="Logout"
                  handler={() => logMeOut()}
                  textColor="white"
                />
                <div>
                  <div className="flex items-center justify-between gap-[1rem] hover:-translate-y-1 transition-all duration-150 ">
                    <img
                      onClick={clickHandler}
                      src={`/users/${img}`}
                      alt="user-image"
                      className="w-[4rem] rounded-full cursor-pointer"
                    />
                    <h1 className="text-lg text-gray-100 cursor-pointer">
                      {name}
                    </h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-20 my-0.5 ">
                <MyButton
                  color="#3a317c"
                  text="Signup"
                  handler={() => handleClick("/signup")} // Update this path as needed
                  textColor="white"
                />
                <MyButton
                  // color="#3a317c"
                  text="Login"
                  handler={() => handleClick("/login")} // Navigate to the login page
                  // textColor="white"
                />
              </div>
            )}
          </div>
          <div className="md:invisible visible absolute top-0 right-14">
            <button
              onClick={() => hamburgerHandler()}
              className="relative group"
            >
              <div
                className={`relative flex overflow-hidden items-center justify-center rounded-full w-[45px] h-[45px] transform transition-all bg-[#0e0f22] ring-0 ring-gray-300 hover:ring-8 ${
                  expand && "ring-4"
                } ring-opacity-30 duration-200 shadow-md`}
              >
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div
                    className={`bg-gray-300 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                      expand && `translate-x-10`
                    }`}
                  ></div>
                  <div
                    className={`bg-gray-300 h-[2px] w-7 rounded transform transition-all duration-300 ${
                      expand && `translate-x-10`
                    } delay-75`}
                  ></div>
                  <div
                    className={`bg-gray-300 h-[2px] w-7 transform transition-all duration-300 origin-left ${
                      expand && `translate-x-10`
                    } delay-150`}
                  ></div>

                  <div
                    className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 ${
                      expand && "   translate-x-0"
                    } flex w-0 ${expand && "w-12"}`}
                  >
                    <div
                      className={`absolute bg-gray-300 h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${
                        expand && "rotate-45"
                      }`}
                    ></div>
                    <div
                      className={`absolute bg-gray-300 h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300  ${
                        expand && "-rotate-45"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div
            className={`${
              expand
                ? "visible opacity-100 "
                : "opacity-0 invisible translate-x-40"
            } absolute transition-all duration-300 py-[2rem] px-[1rem] rounded-2xl flex top-16 right-10 bg-white/30`}
          >
            {user ? (
              <div className="flex flex-col gap-[3rem] justify-between items-center">
                <MyButton
                  color="#3a317c"
                  text="Logout"
                  handler={() => logMeOut()} // Update this path as needed
                  textColor="white"
                />
                <MyButton
                  color="#3a317c"
                  text="My Tours"
                  handler={() => getLikedTours()} // Update this path as needed
                  textColor="white"
                />
                <div className="flex flex-col items-center w-[4rem]  justify-between gap-[0.5rem] ">
                  <img
                    onClick={clickHandler}
                    src={`/users/${img}`}
                    alt="user-image"
                    className="w-[4rem] rounded-full cursor-pointer"
                  />
                  <h1 className="text-lg text-gray-100 cursor-pointer bg-gray-700 p-1 rounded-lg">
                    {name}
                  </h1>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-10 my-0.5 ">
                <MyButton
                  color="#3a317c"
                  text="Signup"
                  handler={() => handleClick("/signup")} // Update this path as needed
                  textColor="white"
                />
                <MyButton
                  // color="#3a317c"
                  text="Login"
                  handler={() => handleClick("/login")} // Navigate to the login page
                  // textColor="white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
