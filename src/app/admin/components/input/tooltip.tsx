"use client";

import React from "react";

const Tooltip = ({ text }: { text: string }) => {
  return (
    <span className="group relative grid place-content-center cursor-pointer z-[9009]">
      <span
        dangerouslySetInnerHTML={{ __html: text }}
        className="pointer-events-none bg-black absolute top-1/2 right-full -translate-y-1/2 -translate-x-2 whitespace-nowrap 
                    rounded bg-dark px-2 py-1 text-white text-xs opacity-0 transition before:absolute before:left-full
                    before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent scale-0
                    before:border-l-black before:content-[''] group-hover:opacity-100 group-hover:scale-100
                    origin-right font-light tracking-wide
                  "
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 my-auto z-10"
        viewBox="0 0 50 50"
      >
        <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 25 11 A 3 3 0 0 0 25 17 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 23 23 L 23 36 L 21 36 L 21 38 L 29 38 L 29 36 L 27 36 L 27 21 L 21 21 z"></path>
      </svg>
    </span>
  );
};

export default Tooltip;
