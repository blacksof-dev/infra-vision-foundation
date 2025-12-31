"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image2 from "@/../public/assets/knowledeg/blogs/06.jpg";
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
            Urban Mobility in India – Why Metro is not the only solution!
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Nitin Zamre & Prof Geetam Tiwari
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              August 26, 2023
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal italic">
              6 min read
            </span>
          </div>
        </header>

        <article className="space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden   "
          >
            <Image
              src={image2}
              alt="Urban Mobility in India"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray text-lg md:text-xl leading-relaxed text-justify">
                Globally, a variety of Public Transport (PT) systems have been
                developed and used to meet urban travel demand. These include
                high-capacity systems like metro, Light Rail Transit (LRT),
                suburban rail, trams, trolley bus, Bus Rapid Transit (BRT) and
                the ubiquitous three plus four-wheelers (rickshaws, taxis, etc.).
                Some difficult terrains have adopted ropeway transport.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Urban India has been experiencing an upgrade of its PT systems to
                meet the rapidly growing travel demand.{" "}
                <span className="font-semibold text-black">
                  Without a doubt, the most significant upgrade is the
                  implementation of the metro system, redefining the standards of
                  PT.
                </span>{" "}
                Metro systems are now operating in 13 cities, and 29 more are
                either under construction or approved or proposed.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                <span className="font-semibold text-black">
                  However, these metro networks have not yet achieved the expected
                  benefits primarily because the ridership is much lower than
                  expected.
                </span>{" "}
                Delhi Metro, with the largest network in any city, often compared
                to the London Underground, has 47% of the projected ridership.
                Most operating systems have less than 15% and some have even less
                than 10% of the projected ridership. This is a double whammy — not
                enough people enjoy the benefits, and operations become
                financially unsustainable. Metro systems are capital-intensive and
                cost about INR 220 cr (elevated) to INR 550 cr (underground) per
                km. They create massive NPAs when rendered financially
                unsustainable!{" "}
                <span className="font-semibold text-black">
                  Thus, any decision to set up a metro system must be thoroughly
                  scrutinised and not taken as a populist measure.
                </span>
              </p>

              <p className="text-darkgray font-semibold pt-6 text-lg md:text-xl leading-relaxed text-justify">
                A research paper published by The Infravision Foundation in
                collaboration with IIT Delhi presents a framework to understand
                the suitability of various PT system options for Indian cities.
              </p>

              <p className="text-darkgray font-semibold pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The suitability of various PT systems is dictated by what urban
                planners call “differentiated travel demand”.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Differentiated travel demand is characterised by the number of
                trips per day, distance travelled per trip, ability to spend, city
                population, and vehicle ownership. This demand must guide the
                choice of PT systems to ensure access to and benefit for most
                citizens.
              </p>

              <p className="text-darkgray font-semibold pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Urban Indian trip length data shows that the majority (30%–60%) of
                the urban trips are less than 5 km, and more than 75% of the trips
                are less than 10 km, regardless of population density and per
                capita income.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Different PT systems are suitable for different travel demands.
                While metro-like systems suit long-distance trips ( &gt; 10 km), bus
                systems, Light Rail Transits (LRT), trams, and trolleybuses can
                meet medium-range trips (5 km–10 km). Intermediate Public
                Transport (IPT) systems like e-rickshaws, auto-rickshaws, and
                taxis can cover trips of less than 5 km for small cities and serve
                as a feeder for larger systems like metro, LRT, or bus systems.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Therefore, an integrated public transport system is essential to
                meet the differentiated travel demand in different city sizes.{" "}
                <span className="font-semibold text-black">
                  This integration must be at the policy, planning, operations,
                  and infrastructure design stage and requires a strong policy and
                  implementation framework.
                </span>
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                For commuters, convenience and reliability dictate the preference.
                PT systems have a fixed route and many commuters need to make
                transfers in reaching their destination, which is both cumbersome
                and time-consuming. Therefore, a PT commuter may spend significant
                time accessing and exiting the PT system.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                In contrast, private vehicles (PVs) are under the control of the
                user offering convenience, adaptability and flexibility as a
                door-to-door unimodal service. Rising incomes and affordability of
                PVs have resulted in increasing use of PVs by a large proportion
                of commuters for daily commutes, leading to traffic snarls and
                pollution. An efficient PT system, therefore, must compete with
                the convenience and comfort offered by personal vehicles.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                So how should the city managers and urban planners plan an
                appropriate mobility infrastructure?
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Responses to the following questions can guide them:
              </p>
              <ul className="list-disc list-outside ml-6 py-6 space-y-4 text-lg md:text-xl text-darkgray leading-relaxed">
                <li className="pl-2">How to reduce dependence on PVs?</li>
                <li className="pl-2">
                  How to retain current PT users as incomes rise and PV ownership grows?
                </li>
                <li className="pl-2">
                  How to increase the share of PT users, pedestrians and bicyclists?
                </li>
                <li className="pl-2">
                  What proportion of the population can be served by the selected PT system?
                </li>
                <li className="pl-2">
                  What level of subsidy will be required to run quality PT services?
                </li>
              </ul>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                WDRA must proactively create awareness about the professional
                management of warehouses and their regulation. The state
                governments must take responsibility for improving the ecosystem
                and promoting warehouse-based sales. Ultimately, commodity owners
                and lenders must see the value in warehousing.
              </p>

              <p className="text-darkgray font-semibold pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The key, therefore, lies in understanding the differentiated
                travel demand, the complementarity of different PT systems and
                providing an integrated solution at all levels — policy, planning,
                design, and operations.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                For example, in megacities like Delhi with about 300 km of
                operating metro, the existing bus system must be strengthened.
                The operational integration of the bus system with the metro
                (common ticket, running on all arterial and sub-arterial roads,
                maximum frequency of 5 mins, exclusive lanes on congested
                corridors) is also required. In smaller cities like Patiala (~1
                million population), bus systems running on all arterial and
                sub-arterial roads, with a few sections of exclusive lanes, can
                meet the travel demand. IPT vehicles are suitable for shorter
                trips in Patiala and the last-mile connectivity to bus and metro
                systems in Delhi.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Such a robust and scientific framework can help Indian cities and
                their managers provide a comfortable and accessible PT system and
                improve the “ease of living” for citizens.
              </p>

              <div className="mt-12">
                <div className="w-fit py-3 px-2 overflow-hidden">
                  <UnderlineWithHover
                    size="small"
                    color="pink"
                    bgColor="pink"
                    text="Read research Paper"
                    role="link"
                    target="_blank"
                    link="/assets/knowledeg/blogsPdf/urban.pdf"
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
