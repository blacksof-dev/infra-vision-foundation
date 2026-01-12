"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image2 from "@/../public/assets/knowledeg/blogs/02.jpg";
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
            Agri-Warehousing: A problem of capacity
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Nitin Zamre
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              November 25, 2023
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
              src={image2}
              alt="Agri-Warehousing"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray text-lg md:text-xl leading-relaxed text-justify">
                Warehousing is a critical element of supply chain management,
                enabling the storage of commodities and smoothening of the
                supply-demand and price fluctuations. To improve scientific
                warehousing, enhance credit availability in rural areas, and
                smoothen the exchange functions, the Warehousing Development and
                Regulatory Authority (WDRA) was set up in India on October 26,
                2010. The National Logistics Policy (NLP) also recognises
                warehousing as a critical element. To reduce logistics costs
                from ~14% to ~8%, NLP identifies adequate investment in
                improving efficiency, productivity, and quality services of
                warehouses, as well as digitisation as key strategies.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                However, the warehousing ecosystem has failed to meet the
                intended outcomes. The issuance of e-Negotiable Warehouse
                Receipts (NWR) and warehouse-based sales of agri-commodities,
                the primary objective of WDRA, have fallen short of the desired
                levels. The total lending against NWR/e-NWR as a proportion of
                institutional credit for agriculture is negligible and
                stagnant. While states like Rajasthan, Gujarat, and Maharashtra
                made noteworthy progress, many are yet to issue any e-NWR.
                Warehouse-based sales are almost non-existent in many states. A
                new research paper published by The Infravision Foundation (TIF)
                and IIM-B analyses these issues and recommends measures to
                improve them.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The warehousing ecosystem faces two primary challenges. The
                first is related to warehouse registration. Estimates show that
                only 6.35% of the warehouses and 32.02% of the warehousing
                capacity are registered with WDRA. There is a general lack of
                awareness regarding the registration process. More importantly,
                data shows that WDRA registration per se doesn’t guarantee
                improved warehouse capacity utilisation. Contrarily, in major
                commercial centres (for example, Tumkur, Karnataka), warehouse
                capacity utilisation is high even without registration.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                WDRA does not guarantee the security of quantity or quality of
                stored commodities, even in registered warehouses. Since
                warehousemen also do not assume custodianship of the goods
                stored, banks involve collateral managers to ensure the security
                of stock, adding to the cost burden. The paper estimates that
                warehousing registration increases costs by about 10%. Warehouse
                owners feel that this cost burden comes with no noticeable
                benefits.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The second challenge relates to the poor regulatory capacity of
                WDRA, which ultimately impacts the warehouse-based sales and
                issuance of e-NWRs. WDRA aims to directly regulate about 1.2
                lakh geographically spread-out warehouses with poor/incomplete
                data. WDRA is thus trying to regulate warehouses with no clear
                knowledge of what it is regulating.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Warehouse inspections is another, perhaps more critical aspect.
                WDRA’s inspections focus primarily on compliance with the
                specified registration requirements relating mostly to the
                physical infrastructure. Inspections to ascertain the quantity
                and quality of stock are not at desirable levels and don’t give
                confidence to the banks to lend against e-NWRs. Additionally,
                very few warehouses are connected to the exchange, limiting
                warehouse-based sales. Other challenges include a shortage of
                skilled workforce for handling the warehouse business
                operations.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                These challenges must be overcome to give confidence to lenders.
                The TIF and IIM-B research paper proposes a multi-pronged
                approach to enhance e-NWR-based lending and warehouse-based
                sales.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                It recommends mandatory WDRA registration for warehouses, but
                delinks the requirement of a security deposit to bring all
                warehouses on one platform. The research paper then proposes
                periodic grading and ratings of warehouses based on size,
                infrastructure for maintaining the quality of the commodity and
                professional management. Rigorous stakeholder consultation can
                help identify appropriate parameters for rating warehouses,
                including compliance with physical infrastructure as per WDRA
                guidelines, availability and adequacy of trained warehouse
                managers, adequate security measures, facilities to ensure the
                quality of commodities, office amenities, and access to
                infrastructure for assaying and testing.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The paper further recommends the creation of a cadre of
                ‘Chartered Warehouse Auditors’ to assess the quality of the
                warehouses. They will bring in professional management to
                enhance the credibility of the warehouses and improve lenders’
                confidence.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                A platform accessible through a portal/mobile app can make
                available information like ratings, space availability,
                location, and commodities stored for prospective users. The
                platform should enable seamless registration and online
                updating of transactions.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Only good-quality warehouses with better ratings should be
                allowed to issue e-NWRs. To incentivise upgradation and better
                ratings, financial incentives may be offered to improve
                warehouse infrastructure and technology adoption. To be able to
                issue e-NWRs, the warehouses must take custodianship of the
                stock and ensure the security of the quality and quantity of
                stock. Failure to do so must attract hefty fines and a ratings
                downgrade. Registered warehouses issuing e-NWRs must enhance the
                frequency and quality of inspections. Significant public
                investment is needed to upgrade the systems for quality
                inspection, assaying facilities, standardising quality, and
                establishing warehouses and commodity market linkages.
                Systematic research on dispute-causing issues (e.g., losses) and
                a better dispute resolution mechanism must be established.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                WDRA must proactively create awareness about the professional
                management of warehouses and their regulation. The state
                governments must take responsibility for improving the ecosystem
                and promoting warehouse-based sales. Ultimately, commodity
                owners and lenders must see the value in warehousing.
              </p>

              <div className="mt-12">
                <div className="w-fit py-3 px-2 overflow-hidden">
                  <UnderlineWithHover
                    size="small"
                    color="pink"
                    bgColor="pink"
                    text="Read presentation"
                    role="link"
                    target="_blank"
                    link="/assets/knowledeg/blogsPdf/warehousing.pdf"
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
