import { HeroBtn } from "@/_components/atoms/buttons";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <section className="h-screen flex-col flex justify-center items-center">
      <h1 className=" banner-heading text-[10rem] md:text-[15rem] 2xl:text-[20rem] text-pink font-semibold leading-none">
        404
      </h1>
      <h5 className="text-black font-semibold">PAGE NOT FOUND</h5>
      <div className="my-8">
        <Link
          className={`group  text-lg lg:text-xl py-2 px-8  text-pink hover:text-white cursor-pointer  text-nowrap  block text-center  relative  overflow-hidden    transition-all duration-300`}
          href="/"
        >
          <span className="z-50 relative ">Home</span>
          <span
            className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
          ></span>
          <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[6.5] transition-all duration-700 ease-in-out z-0"></span>
        </Link>
      </div>
    </section>
  );
}
