import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../helperFuncs/auth";
import Preloader from "./preLoader";
import { updatePassword, updateSettings } from "../helperFuncs/userHandlers";
import { toast } from "sonner";
import DotsLoader from "./loader";

export default function EditProfile() {
  const [user, setUser] = useState(null); // Use null to differentiate from empty or default values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await isLoggedIn();
        if (res) {
          setUser(res.data.data);
          setPhoto(res.data.data.currentUser.photo);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    })();
  }, []);

  const updateProfile = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const name = [firstName, lastName].join(" ");
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("photo", file);
      await updateSettings(form);
      toast.success("Profile Updated!");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      toast.error(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  const updateMyPassword = async () => {
    setLoading(true);
    try {
      await updatePassword(currentPassword, newPassword, confirmPassword);
      toast.success("Password Updated!");
    } catch (err) {
      toast.error(err);
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
  };

  const userPhotoError = () => {
    setPhoto("../users/default.jpg");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await updateSettings({ file });
  //   } catch (err) {
  //     toast.error(err);
  //   }

  //   console.log(file);
  // };

  // Update state when user data changes
  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //   }
  // }, [user]);

  return (
    <>
      {!user ? (
        <div className="flex justify-center items-center h-[100vh] bg-[#20214d] transition-all bg-animate">
          <Preloader />
        </div>
      ) : (
        <div className="font-sans bg-[#161931] text-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
          <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-gray-700 top-12">
              <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
              <a
                href="#"
                className="flex items-center px-3 py-2.5 font-bold bg-[#202142] text-white border rounded-full hover:bg-indigo-700"
              >
                Public Profile
              </a>
              <a
                href="/my-tours"
                className="flex items-center px-3 py-2.5 font-bold bg-[#202142] text-white border rounded-full hover:bg-indigo-700"
              >
                My Bookings
              </a>
              <a
                href="/reviews/my-reviews"
                className="flex items-center px-3 py-2.5 font-bold bg-[#202142] text-white border rounded-full hover:bg-indigo-700"
              >
                My Reviews
              </a>
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg bg-[#202142] text-white">
                <h2 className="pl-0 pt-5 md:pl-6 text-2xl font-bold sm:text-xl">
                  Public Profile
                </h2>
                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <img
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-500"
                      src={`/users/${photo}`}
                      onError={userPhotoError}
                      alt="User Picture"
                    />
                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <form onSubmit={updateProfile} className="">
                        {file ? (
                          <button
                            type="submit"
                            className="py-3.5 px-7 text-base font-medium text-white bg-indigo-700 rounded-lg border border-indigo-200 hover:bg-indigo-800 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                          >
                            Confirm Upload
                          </button>
                        ) : (
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer py-3.5 px-10 text-base block font-medium text-white bg-indigo-700 rounded-lg border border-indigo-200 hover:bg-indigo-800 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                          >
                            {" "}
                            <p className="w-[120%]">Change picture</p>
                          </label>
                        )}
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </form>
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-gray-300 bg-[#161931] rounded-lg border border-indigo-500 hover:text-white hover:bg-indigo-800 focus:z-10 focus:ring-4 focus:ring-indigo-500"
                      >
                        Delete picture
                      </button>
                    </div>
                  </div>
                  <div className="items-center mt-8 sm:mt-14">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          Your first name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder={user.currentUser.name.split(" ")[0]}
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          Your last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder={user.currentUser.name.split(" ")[1]}
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-300"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder={user.currentUser.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          onClick={updateProfile}
                          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          {loading ? <DotsLoader /> : "Update Profile"}
                        </button>
                      </div>
                    </div>
                    <div className=" mb-6">
                      <h3 className="pl-0  md:pl-0 text-2xl font-bold sm:text-xl mb-4">
                        Change Password
                      </h3>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="current_password"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          id="current_password"
                          value={currentPassword || ""}
                          className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Current Password"
                        />
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="new_password"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          New Password
                        </label>
                        <input
                          type="password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          id="new_password"
                          value={newPassword || ""}
                          className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="New Password"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="confirm_password"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          id="confirm_password"
                          value={confirmPassword || ""}
                          className="bg-[#161931] border border-indigo-500 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                          placeholder="Confirm Password"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          onClick={updateMyPassword}
                          className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          {loading ? <DotsLoader /> : "Update Password"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
