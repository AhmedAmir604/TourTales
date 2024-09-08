import React, { useEffect, useState } from "react";
import { getAllTours } from "../helperFuncs/getAllTours";

export default function UserBar() {
  const [user, setUser] = useState();
  useEffect(() => {
    const res = getAllTours();
  }, []);

  return (
    <section className="flex items-center justify-between gap-[1rem]">
      <img
        src="users/user-1.jpg"
        alt="user-image"
        className="w-[5rem] rounded-full"
      />
      <h1 className="text-xl text-gray-200">JONAS</h1>
    </section>
  );
}
