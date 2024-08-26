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
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchUser();
  }, []);

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

  return (
    <section className="fixed z-20 top-5 w-[90vw]">
      <div className=" text-white flex justify-between items-center bg-gray-200/10 w-[80vw] mx-auto rounded-xl py-1">
        <div className="flex justify-between w-[100%] gap-[5rem] pr-[2rem]">
          <div className="ml-5 my-auto">
            <MyButton
              color="#3a317c"
              text="Tours"
              handler={() => handleClick("/tours")} // Update this path as needed
              // textColor="white"
            />
          </div>
          {user ? (
            <div className="flex gap-[3rem] justify-between items-center">
              <MyButton
                color="#3a317c"
                text="Logout"
                handler={() => logMeOut()} // Update this path as needed
                textColor="white"
              />
              <div>
                <div className="flex items-center justify-between gap-[1rem] ">
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
            <div className="flex gap-20 my-0.5">
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
    </section>
  );
}

// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MyButton from "./myButton";
// import { isLoggedIn, logout } from "../helperFuncs/auth";

// export default function Header() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState();
//   const [name, setName] = useState();
//   const [img, setImg] = useState();

//   const clickHandler = () => {
//     navigate("/users/me");
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await isLoggedIn();
//         if (res.data.data) {
//           setUser(res.data.data.currentUser);
//           setName(res.data.data.currentUser.name.split(" ")[0]);
//           setImg(res.data.data.currentUser.photo);
//         }
//       } catch (err) {
//         console.log(err.response.data.message);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleClick = (path) => {
//     navigate(path);
//   };

//   const logMeOut = async () => {
//     try {
//       await logout();
//       setUser("");
//       setName("");
//       setImg("");
//       navigate("/");
//     } catch (err) {
//       throw Error(err.response.data.message);
//     }
//   };

//   return (
//     <section className="fixed z-20 top-10 w-[90vw]">
//       <div className="w-[100%] text-white flex justify-between items-center">
//         <div className="ml-[4rem]">
//           <MyButton
//             // color="#3a317c"
//             text="Tours"
//             handler={() => handleClick("/tours")} // Update this path as needed
//             // textColor="white"
//           />
//         </div>
//         <div className="flex gap-[5rem] pr-[2rem]">
//           {user ? (
//             <div className="flex gap-[3rem] justify-between items-center">
//               <MyButton
//                 // color="#3a317c"
//                 text="Logout"
//                 handler={() => logMeOut()} // Update this path as needed
//                 // textColor="white"
//               />
//               <div>
//                 <div className="flex items-center justify-between gap-[1rem] ">
//                   <img
//                     onClick={clickHandler}
//                     src={`/users/${img}`}
//                     alt="user-image"
//                     className="w-[4rem] rounded-full cursor-pointer"
//                   />
//                   <h1 className="text-lg text-gray-100 cursor-pointer">
//                     {name}
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <MyButton
//                 color="#3a317c"
//                 text="Signup"
//                 handler={() => handleClick("/signup")} // Update this path as needed
//                 textColor="white"
//               />
//               <MyButton
//                 // color="#3a317c"
//                 text="Login"
//                 handler={() => handleClick("/login")} // Navigate to the login page
//                 // textColor="white"
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
