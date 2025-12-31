"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image1 from "@/../public/assets/knowledeg/blogs/03.jpg";
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
            Multi-utility Infra, the way to go!
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Nitin Zamre & Mukesh Khandelwal
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              October 9, 2023
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal italic">
              4 min read
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
              alt="Multi-utility Infra"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray text-lg md:text-xl leading-relaxed text-justify">
                It not only drives resource efficiency but also improves the
                economics of infrastructure projects.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Back-of-the-envelope estimates suggest that capturing 25% of
                Delhi’s intracity freight traffic, Delhi Metro could earn an
                additional INR 750 cr p.a. and generate a margin of INR 270 cr
                while displacing nearly 17,000 small goods vehicles from the
                city’s roads and reducing carbon emissions by nearly 3.2 million
                tonnes. That’s the power of multi-utility infrastructure!
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The infrastructure and construction sectors account for a
                significant share of the world’s consumption of material
                resources. One way to address our ever-increasing resource
                challenge is to ensure that infrastructure is conceived,
                developed, and operated from a resource-efficiency mindset.
                Multi-utility infrastructure can drive significant resource
                optimisation.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Resource extraction has already reached unsustainable levels
                globally. The Global Resource Outlook 2019 of UNEP highlights
                that the extraction of material resources from the earth has
                grown 340% since 1970. The bulk of this resource extraction was
                non-renewable (marine animals, non-farmed timber, fossil fuels,
                metal ores, and non-metallic minerals).
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Infrastructure and construction are particularly
                resource-intensive. They account for nearly half the world’s
                material resource footprint. It is estimated that $1 bn in
                infrastructure investment consumes ~50,000 tonnes of steel,
                ~3,00,000 tonnes of cement, 10,00,000 tonnes of sand and
                ~17,50,000 tonnes of gravel and crushed stone.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                With the estimated annual investments at about $ 3.9 trillion on
                global infrastructure and $ 5-6 trillion on building
                construction through 2040, we are staring at the demand for 500
                million tonnes of steel, 3 billion tonnes of cement, and 28
                billion tonnes of sand and aggregates annually. This is
                staggering at the least.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                This issue of resource efficiency has been acknowledged. The
                current efforts focus on better maintenance, demand-responsive
                planning, and the utilisation of recycled materials. For
                example, UNEP proposes the following pathways towards
                resource-efficient infrastructure:
              </p>

              <ul className="list-disc list-outside ml-6 py-6 space-y-4 text-lg md:text-xl text-darkgray leading-relaxed">
                <li className="pl-2">
                  Retrofitting and maintenance of existing infrastructure to
                  potentially reduce investments by up to 15%.
                </li>
                <li className="pl-2">
                  Integrated systems-level approaches, e.g., improved
                  transportation infrastructure to reduce fuel needs.
                </li>
                <li className="pl-2">
                  Nature-based solutions, e.g., the use of natural ponds to
                  treat raw sewage and wastewater.
                </li>
                <li className="pl-2">
                  Innovative and disruptive technologies, e.g., the reuse of
                  previous structures in new buildings.
                </li>
              </ul>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                However, the ability of an asset to be multi-utility and drive
                resource efficiency is overlooked. Most infrastructure is
                currently designed for a single primary purpose. A highway asset
                is typically built to carry passenger and goods vehicles.
                Several components of the asset remain under-utilised – e.g.,
                the land under the highway, or the airspace above it. As an
                exception, infrastructure assets such as urban roads often
                double up as carriers of various utility lines to support the
                distribution of water, electricity, sewage, telephone, and data
                lines.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                We propose that current and future infrastructure be developed
                as multi-utility. We define multi-utility when:
              </p>
              <ul className="list-disc list-outside ml-6 py-6 space-y-4 text-lg md:text-xl text-darkgray leading-relaxed">
                <li className="pl-2">
                  The project assets are used for purposes beyond the primary
                  purpose (secondary purposes), with no or small incremental
                  investments.
                </li>
                <li className="pl-2">
                  Any such incremental investments for the secondary purpose are
                  lower than if the infrastructure were created as a greenfield.
                </li>
                <li className="pl-2">
                  This asset usage for secondary purposes doesn’t adversely
                  impact the primary purpose and may provide additional
                  benefits.
                </li>
              </ul>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Designing infrastructure for multiple uses can thus deliver
                several benefits — resource efficiency and sustainability,
                improved economics, and additionalities.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Let’s look at some examples of multi-utility infrastructure:
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                We applied this principle to the Delhi Metro to see the impact.
                In 2023, Delhi has an estimated intra-city goods movement at
                ~83,000 tonnes, utilising ~68,000 vehicles for movement. These
                vehicles not only drive congestion on the city’s already
                over-burdened roads but being predominantly CNG-fueled, also add
                to global warming via higher emissions of greenhouse gases.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Delhi Metro is the country’s most extensive system, with 12
                lines covering a total of 390 km track length and serving 286
                passenger terminals across the National Capital Region. The
                network served 2.52 million passenger rides daily in FY-22.
                Traffic operations earned revenues of INR 1,976 cr and incurred
                an operating loss of INR 1,251 cr.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                As a multi-utility infrastructure, shifting the intracity
                freight traffic to Delhi Metro’s network can enhance the
                network’s revenues significantly and reduce losses while
                contributing to a massive reduction in the small goods vehicles
                on the city’s roads. This initiative can leverage existing track
                infrastructure and will require relatively small incremental
                investments for dedicated goods terminals with associated
                warehousing facilities at major traffic origin and destination
                points, and dedicated freight rolling stock. The benefits of
                such usage are huge, as indicated above.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Designing and operating multi-utility infrastructure not only
                drives resource efficiency and sustainability but also
                significantly improves the economics of infrastructure projects.
                It’s time to take this seriously before we run out of
                resources.
              </p>

              <div className="mt-12">
                <div className="w-fit py-3 px-2 overflow-hidden">
                  <UnderlineWithHover
                    size="small"
                    color="pink"
                    bgColor="pink"
                    text="Read blog"
                    role="link"
                    target="_blank"
                    link="/assets/knowledeg/blogsPdf/multiInfra.pdf"
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
