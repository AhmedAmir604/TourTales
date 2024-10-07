import React from "react";

export default function AboutPage() {
  return (
    <section className="">
      <div>
        <div className="inset-0 bg-black/60 absolute" />
        <img className="h-[100vh] w-full object-cover" src="/AboutPage.jpg" />
      </div>
      <div className="absolute flex flex-col gap-5 top-1/4 p-10">
        <h1 className="text-pink-700 text-xl font-bold">ABOUT US</h1>
        <h3 className="text-gray-100 text-2xl">We are Trail Makers</h3>
        <p className="text-gray-200 text-sm">
          Founded in 1996 in Amsterdam, Trail Makers has grown from a small
          Dutch start-up to one of the world's leading digital travel companies.
          Part of Travelocity Holdings inc. Trail Markers mission is to make it
          easier for everyone to experience the world.
        </p>
        <p className="text-gray-200 text-sm">
          By investing in technology that takes the friction out of travel,
          Trail Makers seamlessly connects millions of travelers to memorable
          experiences, a variety of transportation options, and an incredible
          place to stay - from homes to mountains, and much more. As one of the
          world's largest travel marketplaces for both established brands and
          entrepreneurs of all sizes, Trail Makers enable properties around the
          world to reach a global audience and grow their businesses.
        </p>
      </div>
    </section>
  );
}
