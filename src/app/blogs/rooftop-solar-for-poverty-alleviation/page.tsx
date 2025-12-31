"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image1 from "@/../public/assets/knowledeg/blogs/08.jpg";
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
            Rooftop Solar for Poverty Alleviation
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Vinayak Chatterjee
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              March 2, 2023
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal italic">
              7 min read
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
              alt="Rooftop Solar"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray font-semibold text-lg md:text-xl leading-relaxed text-justify">
                Read about the Sooraj se Rozgaari scheme in an article written
                by Vinayak Chatterjee and published in Business Standard.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Centralised Procurement and Decentralised Deployment of
                Photovoltaic Modules could transform rural India.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                A detailed white-paper prepared by The Infravision Foundation
                proposes a central government-sponsored scheme that
                fundamentally looks at Rooftop Solar Photovoltaics (RTPV) as the
                next trailblazing income-enhancing opportunity, targeted largely
                to those at the bottom of the pyramid, and largely in rural
                areas. It has the potential to be a hugely impactful
                intervention to aid poverty alleviation by converting the free
                sunlight falling on rooftops and courtyards into income for
                households. For instance, in China, RTPV is one of the idenThe
                Infravision Foundationied ten initiatives rolled out by the
                government to uplift rural households out of poverty. Last year,
                the 100% solarisation of the village of Modhera in the Mehsana
                district of Gujarat has demonstrated the transformative
                potential of rooftop solar in an Indian village.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                For a variety of reasons, Rooftop Solar in India has not yet
                been the success it was planned to be. That is a pity. A scheme,
                of the type suggested, seeks to breathe fresh life into this
                area, targeting not just “green”, but even more importantly, an
                innovative income-generating scheme. It could well be called
                Sooraj Se Rozgaari (or, Earnings from Sunlight).
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                As per this customer configuration, the Central Government gets
                involved through the Indian Renewable Energy Development Agency
                (IREDA). With central government financial assistance, IREDA
                procures and deploys rooftop modules and assists infrastructure
                via its extended arm of State Renewable Energy Development
                Agencies (SRDAs). Bulk procurement by IREDA is expected to
                reduce capital costs by providing high-volume orders to module
                manufacturers. SRDAs secure state regulatory approvals on
                benchmark costs of RTPV, including state-specific grid
                installation charges and a fair developer margin. Benchmark
                costs reflect locational and services markup on top of the
                capital cost discovered by IREDA.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                A new generation of local “Developers” has to market the scheme
                and source consumer interest and thereafter, approach SRDAs with
                the request for necessary modules and infrastructure. They then
                install the same at consumers’ premises and are responsible for
                maintenance for at least fifteen years. They get paid a fixed
                installation fee and yearly maintenance fees from SRDAs for
                their services.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Consumers may have to share part of the benchmark costs
                depending upon which category they fit in, from low-income
                households to institutional or small businesses. They will have
                to agree upon their share of self-use of the electricity
                generated from RTPV and the balance that will be considered as
                sold to SRDAs (unless bought by the discom), for which they will
                be suitably compensated.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The SRDAs aggregate such balance electricity from all
                participating consumers, and are encouraged to maximise revenue
                by sale of this power to other discoms, large consumers, and
                power exchanges. Price arbitrage opportunities — that is
                difference between compensation paid to participating consumers
                and the realised sale price for electricity sold to other
                parties — will ultimately determine the net financial assistance
                support by the central government.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Currently, the rooftop subsidy programs run by the Ministry of
                New and Renewable Energy require consumers to bear about 60% of
                the total costs. For the suggested program, it is recommended
                that consumers be grouped into three distinct categories: (i)
                low-income households; (ii) social, institutional and small
                businesses such as municipal schools & district hospitals, NGOs,
                Farmer Produce Organizations, SME or micro-SME businesses and,
                (iii) regular income households. It is proposed that the
                low-income households get a full capital grant, that is, they do
                not have to pay for any share at all of the costs for RTPV
                installation and maintenance. The social/institutional/small
                businesses bear 80% of the total costs, while the households
                with regular incomes bear 60% of the cost, which is as per the
                current practice.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Developers have the responsibility to market the program
                benefits to consumers and agglomerate the demand. Once the
                consumer puts in his/her contribution (as per set guidelines),
                the Developer installs the requisite RTPV on consumers’
                premises. The developer gets paid a fixed installation fee and
                yearly maintenance fees from SRDAs for its services. This
                naturally creates a new set of local energy sector
                entrepreneurs, in line with the government’s vision of creating
                such opportunities at the district level.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The proposed centralised scheme is expected to add a total of 20
                GW residential RTPV capacity over a five-year period. The “NET”
                central sector budgetary support required will be approximately
                INR 19,950 cr over a fifteen year life assumed for the scheme.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Above all, a low income household with limited roof-space stands
                to benefit (based on the final interplay of assumptions)
                anything from INR 3500–INR 6000 per annum from the “free”
                sunlight on its abode. Combined with the ‘green effect’ such a
                poverty alleviating opportunity can surely not be left
                unexploited.
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
                    link="/assets/knowledeg/blogsPdf/massRooftop.pdf"
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
