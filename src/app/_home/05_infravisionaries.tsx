"use client";

import { UnderlineCta } from "@/_components/atoms/buttons";
import { useState, useEffect, useMemo } from "react";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import playSvg from "@/../public/assets/globals/playSvg.svg";
import Kiran from "@/../public/assets/home/trustees/Kiran.jpg";
import Rumjhum from "@/../public/assets/home/trustees/Rumjhum.jpg";

import Arun from "@/../public/assets/home/advisory/Arun.jpg";
import ArunNanda from "@/../public/assets/home/advisory/ArunNanda.jpg";
import AshishDhawan from "@/../public/assets/home/advisory/AshishDhawan.jpg";
import CyrilShroff from "@/../public/assets/home/advisory/CyrilShroff.png";
import DKSen from "@/../public/assets/home/advisory/DKSen.jpg";
import JanmejayaKSinha from "@/../public/assets/home/advisory/JanmejayaKSinha.jpg";
import GeetanjaliKirloskar from "@/../public/assets/home/advisory/GeetanjaliKirloskar.jpg";
import HemendraMKothari from "@/../public/assets/home/advisory/HemendraMKothari.jpg";
import jagan from "@/../public/assets/home/advisory/jagan.jpg";
import khurshed from "@/../public/assets/home/advisory/khurshed.jpg";
import NarotamSekhsaria from "@/../public/assets/home/advisory/NarotamSekhsaria.jpg";
import ProfessorGRaghuram from "@/../public/assets/home/advisory/ProfessorGRaghuram.jpg";
import NasserMunjee from "@/../public/assets/home/advisory/NasserMunjee.jpg";
import RajnishKumar from "@/../public/assets/home/advisory/RajnishKumar.jpg";
import SameerGupta from "@/../public/assets/home/advisory/SameerGupta.jpg";
import SNSubrahmanyan from "@/../public/assets/home/advisory/SNSubrahmanyan.jpg";
import SunilMathur from "@/../public/assets/home/advisory/SunilMathur.jpg";
import DilipCherian from "@/../public/assets/home/advisory/DilipCherian.jpg";
import ManojKSingh from "@/../public/assets/home/advisory/ManojKSingh.jpg";

import AkhileshTilotia from "@/../public/assets/home/fellows/AkhileshTilotia.jpg";
import rajajiMeshram from "@/../public/assets/home/fellows/rajajiMeshram.png";
import rajivRanjanMishra from "@/../public/assets/home/fellows/rajivRanjanMishra.jpg";
import rasikaAthawale from "@/../public/assets/home/fellows/rasikaAthawale.jpg";
import SoumyaKantiGhosh from "@/../public/assets/home/fellows/SoumyaKantiGhosh.jpg";
import supratimSarkar from "@/../public/assets/home/fellows/supratimSarkar.jpg";

import MutumChaobisana from "@/../public/assets/home/team/MutumChaobisana.png";
import KavereeBamzai from "@/../public/assets/home/team/KavereeBamzai.png";
import LawrenceCardoza from "@/../public/assets/home/team/LawrenceCardoza.jpg";
import PriyankaBains from "@/../public/assets/home/team/PriyankaBains.jpg";
import RumjhumChatterjee from "@/../public/assets/home/team/RumjhumChatterjee.jpg";
import Vinayak from "@/../public/assets/home/team/Vinayak.jpg";
import VrindaSingh from "@/../public/assets/home/team/VrindaSingh.png";

export default function Infravisionaries() {
  const [data, setdata] = useState("trustee");

  const trustee = [
    {
      image: Kiran,
      title: "Kiran",
    },
    {
      image: Rumjhum,
      title: "Rumjhum",
    },
    {
      image: Vinayak,
      title: "Vinayak",
    },
  ];

  const advisory = [
    {
      image: Arun,
      title: "Arun",
    },
    {
      image: ArunNanda,
      title: "Arun Nanda",
    },
    {
      image: AshishDhawan,
      title: "Ashish Dhawan",
    },
    {
      image: CyrilShroff,
      title: "Cyril Shroff",
    },
    {
      image: DKSen,
      title: "D. K. Sen",
    },
    {
      image: JanmejayaKSinha,
      title: "Janmejaya K. Sinha",
    },
    {
      image: GeetanjaliKirloskar,
      title: "Geetanjali Kirloskar",
    },
    {
      image: HemendraMKothari,
      title: "Hemendra M. Kothari",
    },
    {
      image: jagan,
      title: "Jagan",
    },
    {
      image: khurshed,
      title: "Khurshed",
    },
    {
      image: NarotamSekhsaria,
      title: "Narotam Sekhsaria",
    },
    {
      image: ProfessorGRaghuram,
      title: "Professor G. Raghuram",
    },
    {
      image: NasserMunjee,
      title: "Nasser Munjee",
    },
    {
      image: RajnishKumar,
      title: "Rajnish Kumar",
    },
    {
      image: SameerGupta,
      title: "Sameer Gupta",
    },
    {
      image: SNSubrahmanyan,
      title: "S. N. Subrahmanyan",
    },
    {
      image: SunilMathur,
      title: "Sunil Mathur",
    },
    {
      image: DilipCherian,
      title: "Dilip Cherian",
    },
    {
      image: ManojKSingh,
      title: "Manoj K. Singh",
    },
  ];

  const fellow = [
    {
      image: AkhileshTilotia,
      title: "Akhilesh Tilotia",
    },
    {
      image: rajajiMeshram,
      title: "Rajaji Meshram",
    },
    {
      image: rajivRanjanMishra,
      title: "Rajiv Ranjan Mishra",
    },
    {
      image: rasikaAthawale,
      title: "Rasika Athawale",
    },
    {
      image: SoumyaKantiGhosh,
      title: "Soumya Kanti Ghosh",
    },
    {
      image: supratimSarkar,
      title: "Supratim Sarkar",
    },
  ];

  const team = [
    {
      image: MutumChaobisana,
      title: "Mutum Chaobisana",
    },
    {
      image: KavereeBamzai,
      title: "Kaveree Bamzai",
    },
    {
      image: LawrenceCardoza,
      title: "Lawrence Cardoza",
    },
    {
      image: PriyankaBains,
      title: "Priyanka Bains",
    },
    {
      image: RumjhumChatterjee,
      title: "Rumjhum Chatterjee",
    },
    {
      image: Vinayak,
      title: "Vinayak",
    },
    {
      image: VrindaSingh,
      title: "Vrinda Singh",
    },
    {
      image: jagan,
      title: "Jagan",
    },
  ];

  useEffect(() => {});
  const cardData = useMemo(() => {
    switch (data) {
      case "trustee":
        return trustee;
      case "advisory":
        return advisory;
      case "fellow":
        return fellow;
      case "team":
        return team;
      default:
        return [];
    }
  }, [data]);

  return (
    <>
      <section className="bg-pink">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div>
            <h1 className="text-white font-medium">The Infravisionaries</h1>
            <div className="w-full md:w-[45%]">
              <h6 className="text-white font-extralight tracking-[1%] py-4">
                The Infravision Foundation is a confluence of seasoned leaders
                from across the infrastructure domain. With exceptional
                intellect, global experience, and shared purpose, this
                consortium propels India’s infrastructure and economic growth.
              </h6>
            </div>
          </div>

          <div className="flex flex-row gap-12 ">
            <div className="w-[20%]">
              <div className="py-4">
                <button
                  className="text-white text-md lg:text-xl relative font-medium"
                  onClick={() => setdata("trustee")}
                >
                  Trustee
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md lg:text-xl relative font-medium"
                  onClick={() => setdata("advisory")}
                >
                  Advisory Council
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md lg:text-xl relative font-medium"
                  onClick={() => setdata("fellow")}
                >
                  Distinguished Fellows
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
              <div className="py-4">
                <button
                  className="text-white text-md lg:text-xl relative font-medium"
                  onClick={() => setdata("team")}
                >
                  Team
                  <span className="w-10 sm:w-15 h-[1px] sm:h-[2px] bg-white absolute bottom-0 left-0 top-7"></span>
                </button>
              </div>
            </div>

            <div>
            <div className="w-full overflow-hidden">
  <Swiper
    modules={[Navigation, Pagination]}
    grabCursor
    spaceBetween={20}
    slidesPerView={cardData.length} // Show all cards
  >
    {cardData.map((ele, index) => (
      <SwiperSlide key={index} className="!w-auto"> {/* important */}
        <div className="flex flex-col items-center">
          <Image
            src={ele.image}
            alt={ele.title}
            className="w-32 h-32 object-cover rounded-lg"
          />
        
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


              {/* {cardData.map((ele, index) => (
                <div>
                  <section className="mt-3" key={index}>
                    <div className="flex flex-row gap-12">
                      <Image src={ele.image} alt={ele.title} className="" />
                    </div>
                    <div></div>
                  </section>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
