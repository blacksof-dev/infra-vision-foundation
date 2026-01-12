"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image1 from "@/../public/assets/knowledeg/blogs/04.jpg";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function Page() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-pink origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto pt-[15%] sm:pt-[12%] lg:pt-[8%] blade-top-padding-lg blade-bottom-padding-lg px-4 md:px-6">
        <Link
          href="/knowledge"
          className="flex items-center gap-2 text-lightgray hover:text-black transition-colors mb-8 group w-fit"
        >
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Knowledge</span>
        </Link>

        <header className="mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-poppins text-black font-semibold text-3xl md:text-4xl lg:text-5xl mb-6"
          >
            Our Metro Rail Systems must be sustainable, financially
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Nitin Zamre & Dr Sandip Chakrabarti
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              October 5, 2023
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal italic">
              5 min read
            </span>
          </div>
        </header>

        <article className="space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-black/5"
          >
            <Image
              src={image1}
              alt="Metro Rail Systems"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray text-lg md:text-xl leading-relaxed text-justify">
                Metro rail’s potential to improve urban traffic congestion, air
                quality, mobility, accessibility, and the local economy is
                globally recognised. India’s metro network has also increased
                significantly, from 229 km across five cities in 2014 to 860 km
                across 20 cities in April 2023. In the 2014-2022 period, about
                INR 90,000 Crore have been released by the Government of India
                for these projects. While metro rail systems have raised the bar
                for public transport quality, they are expensive, and their
                financial performance and patronage are not impressive. Existing
                revenue streams of most systems, including the large and mature
                ones, are unable to meet total expenses.{" "}
                <span className="font-semibold text-black">
                  The significant financial losses incurred by metro rail
                  systems may soon start to outweigh the large environmental
                  and social benefits they offer.
                </span>
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                A research paper by The Infravision Foundation (TIF) and
                IIM-Ahmedabad (IIM-A) recommends a comprehensive institutional
                and policy framework for ensuring financial sustainability that
                can guarantee continued political and social support and ensure
                that these systems can effectively deliver on their goals.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                While the selection of an appropriate transport system for a
                city is a separate problem (dealt with in TIF’s earlier
                research), ensuring satisfactory financial performance of the
                existing systems is essential.{" "}
                <span className="font-semibold text-black">
                  The key is to regularly set appropriate fares, boost non-fare
                  revenues, and promote ridership.
                </span>{" "}
                Non-fare revenue is the revenue generated by any means other
                than the cost of the travel ticket (e.g., parking charges,
                advertisements, and taxes).
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Indian metro rail systems suffer from a lack of periodic fare
                updates, leading to gradual erosion of the real value of fares,
                plummeting real revenues, increasing subsidy requirements, and
                sudden large fare increases after long gaps. Such increases
                cause significant customer dissatisfaction and ridership loss.{" "}
                <span className="font-semibold text-black">
                  The research paper recommends the necessary policy and
                  procedural changes, specifically highlighting the need for
                  systematic/automatic formula-based fare changes and the
                  establishment of an independent metro fare regulation standing
                  committee.
                </span>{" "}
                India’s extensive experience in determining user charges for
                infrastructure assets can be leveraged.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The central and state governments must also take on the
                responsibility of securing innovative, “justified” funding
                and/or revenue sources to supplement fare box and other
                operations-related non-fare revenues. This will ensure financial
                sustainability and avoid the vicious cycles of loan repayment
                defaults and service deterioration.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Justified sources include appropriating part of the resultant
                property value gain from investments, removing unjust subsidies
                on personal or carbon-intensive vehicles using pricing and
                taxes, and apportioning part of green funds for investments.
                Most of these sources should be local (i.e., where beneficiaries
                are concentrated), and new fees or taxes should aim at promoting
                equity by removing existing market inefficiencies (e.g., free
                parking). Such funding/revenue increases the government’s share
                of total funding support to metro rail to meet their financial
                responsibilities. If periodic fare reviews and revision
                processes are not established, such support may continue to
                increase to keep the metro rail fares affordable and socially
                acceptable.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                <span className="font-semibold text-black">
                  The research paper identifies effective, efficient, and
                  equitable non-fare revenue sources that can be leveraged for
                  funding and financing metro rail systems.
                </span>{" "}
                It provides three key guiding principles of such revenue –
                beneficiaries of positive spillovers of metro rail should pay,
                polluting urban transportation must pay for the damages caused,
                and urban public transit funds should, to the extent possible,
                be collected from where they are spent.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Based on global experiences and best practices, the research
                paper presents three revenue-generation avenues:
              </p>

              <ul className="list-disc list-outside ml-6 py-6 space-y-4 text-lg md:text-xl text-darkgray leading-relaxed">
                <li className="pl-2">
                  Land Value Capture (LVC) mechanisms (e.g., air rights
                  development).
                </li>
                <li className="pl-2">
                  Taxes and fees on carbon-intensive transportation modes (e.g.,
                  congestion charging).
                </li>
                <li className="pl-2">
                  Carbon and emission-related taxes (e.g., cap and trade), and
                  other local taxes, fees and financing (e.g., vehicle
                  registration surcharges).
                </li>
              </ul>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                In summary, there are 5 elements at the core of attempts to
                improve the financial health of Indian metro rail systems —
                activate innovative local revenue sources and remove subsidies
                on private vehicle ownership/usage, increase the financial
                powers and accountability of metro rail authorities,
                streamline/automate the fare review and revision processes,
                enhance private sector investment in metro rail, and ensure that
                public money is spent responsibly on metro rail projects.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The principal change that is essential to bring in the above
                elements is the establishment of Unified Metropolitan Transport
                Authorities (UMTAs). While the idea of a UMTA is not new,{" "}
                <span className="font-semibold text-black">
                  the research paper proposes the UMTA 2.0 model, where the
                  UMTA will serve as the planner, owner, builder, and operator
                  of all transportation systems and networks within their
                  urban/regional jurisdictions.
                </span>{" "}
                The study outlines UMTAs’ organisational structure, legal
                powers, functions and responsibilities, and accountability. It
                also proposes a dedicated Unified Metropolitan Transport Fund
                for multimodal transportation infrastructures in a city.
              </p>

              <div className="mt-12">
                <div className="w-fit py-3 px-2 overflow-hidden">
                  <UnderlineWithHover
                    size="small"
                    color="pink"
                    bgColor="pink"
                    text="Read research paper"
                    role="link"
                    target="_blank"
                    link="/assets/knowledeg/blogsPdf/metro.pdf"
                    borderColor="white"
                    classes="text-[16px] whitespace-nowrap"
                  />
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
