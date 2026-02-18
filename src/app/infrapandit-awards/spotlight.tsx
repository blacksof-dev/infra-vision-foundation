"use client";
import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Spotlight() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const activeIndex = (index: number) =>
    hoveredIndex === index || clickedIndex === index;

  return (
    <section className=" blade-top-padding blade-bottom-padding-sm">
      <div className="w-container">
        <div>
          <div className="flex items-center gap-2 md:gap-3 text-pink">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-sm xl:text-lg">In the Spotlight</h5>
          </div>
          <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
            <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
              The first InfraPandits
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8 xl:gap-14 mt-8">
          {data.map((elem, index) => (
            <div key={index}>
              <div
                className="relative w-full h-[18rem] rounded-md overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={elem.thumbnailImage}
                  width={500}
                  height={500}
                  alt="Image"
                  quality={100}
                  className="w-full h-full object-cover object-top"
                />

                {/* Description Overlay on Image */}
                <AnimatePresence>
                  {activeIndex(index) && (
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 flex items-end"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 40%, transparent 100%)",
                      }}
                    >
                      <p
                        className="text-white text-sm md:text-base text-center font-poppins p-5 pb-8"
                        dangerouslySetInnerHTML={{ __html: elem.description }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between flex-col">
                <div>
                  <div className="pt-3">
                    <p className="text-pink font-medium">{elem.awardName}</p>
                  </div>
                  <h6 className="text-black font-medium xl:text-xl">
                    {elem.name}
                  </h6>
                </div>
                {/* Mobile Read More Button */}
                <div className="pt-3 pb-6 md:hidden">
                  <div
                    onClick={() =>
                      setClickedIndex((prev) => (prev === index ? null : index))
                    }
                    className="w-fit cursor-pointer"
                  >
                    <BorderGrayHeroBtn
                      text={clickedIndex === index ? "Read less" : "Read more"}
                      role="button"
                      borderColor="darkgray/40"
                      color="black"
                      bgColor="white"
                      size="base"
                      classes="font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const data = [
  {
    name: "Dr Shubham Jain",
    awardName: "Uttam Award",
    title: "Enabling long-term solar access",
    description:
      "For developing <span class='font-bold'>solar-powered thermal energy </span> storage solutions with applications in clean cooking and industrial heat, contributing to sustainable infrastructure solutions in India.",
    thumbnailImage: "/assets/infrapandit/spotlight/shubham.png",
  },
  {
    name: "Dr Paresh Jawarilal Chhajed",
    awardName: "Mahaan Award",
    title: "Neutralising hazard with innovation",
    description:
      "For advancing scalable faecal-sludge management models and governance frameworks tailored to small Indian cities, with significant potential for grassroots-level impact.",
    thumbnailImage: "/assets/infrapandit/spotlight/paresh.png",
  },
];
