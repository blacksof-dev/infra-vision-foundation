"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GoArrowUp } from "react-icons/go";

export default function ArrowScope() {
  const [visible, setVisible] = useState<boolean>(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 1000) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed z-[999] cursor-pointer bottom-2 sm:bottom-4 right-4 sm:right-2 md:right-10 w-12 h-12 sm:w-14 sm:h-14 hover:scale-[1.1] transition-all duration-300 ease-linear flex justify-center items-center rounded-full border  border-pink bg-white m-6 ms-auto`}
      >
        <GoArrowUp className="text-pink  text-xl" />
      </motion.button>
    </>
  );
}
