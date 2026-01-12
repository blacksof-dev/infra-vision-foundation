"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image1 from "@/../public/assets/knowledeg/blogs/05.jpg";
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
            India Needs Sustainability Ratings for Infrastructure Projects
          </motion.h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
            <span className="text-sm sm:text-base">
              By Nitin Zamre
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
            <span className="text-sm sm:text-base text-lightgray font-normal">
              September 25, 2023
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
              alt="Sustainability Ratings"
              className="w-full h-auto object-cover"
              quality={100}
              priority
            />
          </motion.div>

          <div className="space-y-8">
            <div className="py-3">
              <p className="text-darkgray text-lg md:text-xl leading-relaxed text-justify">
                India’s ongoing economic transition will make it a $ 5 trillion
                economy by 2026-27 and possibly the third-largest global economy
                soon. This remarkable growth hinges on substantial investments in
                infrastructure, spanning roads, airports, ports, railways,
                energy, etc. The National Infrastructure Pipeline (NIP) outlines
                an investment of INR 111 lakh crore by 2025. These investments
                carry significant economic potential, with a rupee spent on
                infrastructure yielding a potent multiplier effect of 2.45 in the
                following year, and 3.14 in subsequent ones.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The Government is also equally committed to India’s environmental
                and social (E&S) goals.{" "}
                <span className="font-semibold text-black">
                  India’s Nationally Determined Contributions (NDCs)
                </span>{" "}
                commit to reducing the emission intensity of GDP by 45% by 2030
                over 2005 levels. India has also committed to Net Zero emissions
                by 2070 and is a signatory to the Sustainable Development Goals
                (SDGs) to be met by 2030.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                <span className="font-semibold text-black">
                  An inherent flipside of infrastructure development is its
                  significant negative E&S impact, creating conflict with India’s
                  NDC and SDG goals.
                </span>{" "}
                For instance, cement and steel are amongst the largest emitting
                sectors and could increase their carbon emissions six-fold by
                2050. Large-scale infrastructure development will likely
                exacerbate India’s climate risks and socio-economic
                vulnerabilities. Climate-related risks such as increasing
                intensity of rains and landslides are already visible, and the
                debate about ‘infrastructure at what cost’ has already begun.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                <span className="font-semibold text-black">
                  However, economic growth can still be achieved without
                  compromising on E&S goals by adopting a sustainable
                  infrastructure development model.
                </span>{" "}
                Institutions such as the IFC and ADB have their own infrastructure
                project assessment frameworks for determining their E&S risks.
                These, however, are adopted only by projects they fund and not by
                others. The current project development approach globally is
                compliance-led without considering the larger E&S goals.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                <span className="font-semibold text-black">
                  The Infravision Foundation’s (TIF) research paper, published in
                  collaboration with Envint,
                </span>{" "}
                suggests an alternative approach,{" "}
                <span className="font-semibold text-black">
                  integrating sustainability considerations into the
                  infrastructure project lifecycle and objectively measuring
                  project-level impact through a ‘sustainability rating’
                  framework.
                </span>{" "}
                Many other countries have adopted similar project-level
                sustainability ratings, such as BREEAM, BCA Green Mark, Envision,
                GRESB, PIERS, etc. India needs to develop and adopt a
                sustainability rating framework to balance its aspirations and
                commitments.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                The proposed sustainability ratings mechanism adds to the existing
                regulations and embeds E&S considerations in the project
                lifecycle. It outlines a ratings regulation mechanism, including
                rating ownership and accreditation, applicability, adoption of
                ratings and the ratings process.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                This research paper proposes S-I Rating, a sustainability ratings
                mechanism for infrastructure projects based on environmental and
                social Key Performance Indicators (KPIs) to help objectively
                assess the project’s sustainability considerations. The mechanism
                incorporates 102 KPIs across 15 themes. The themes covered include
                Access and Equity; Biodiversity and Ecology; Construction
                Activity, Emissions; Land Use and Efficiency; Materials and
                Resources; Risk and Resilience; Waste and Circularity; and Water
                Use and Management, among others.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                These KPIs range from the basics related to compliance (e.g.,
                Environmental Management) to aspirational (e.g., carbon mitigation
                plans). The responses could range from ‘not met’ to ‘full
                compliance’. Each of the KPIs has a weightage, and based on the
                responses and the weightages, a ratings score is generated.
              </p>
              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Such a mechanism will likely benefit all the stakeholders. It will
                enable governments and project sponsors to make ‘go no-go’
                decision-making based on sustainability parameters, minimise
                stakeholder conflicts and conserve common property resources.
                Developers will be able to access responsible investors and
                minimise long-term E&S risks. It will provide investors with
                transparent risk assessment and efficient capital allocation.
                Finally, it will improve the user experience.
              </p>

              <p className="text-darkgray pt-6 text-lg md:text-xl leading-relaxed text-justify">
                Implementation of the S-I Ratings mechanism needs a robust
                institutional framework with clear roles and responsibilities.
                TIF’s research paper recommends the creation of a ‘Sustainable
                Infra Development Cell’ (SIDC) under the aegis of the National
                Bank for Financing Infrastructure and Development (NaBFID) to act
                as the owner and promoter for the administration, developing the
                process and promotion of adoption of such ratings. As the
                principal Infrastructure Development Finance Institution, NaBFID
                may be the appropriate body to take forward the implementation of
                the sustainability ratings. The SIDC would create an ecosystem of
                accredited independent ‘S-I Ratings Service Providers’ (SIRPs) to
                assess individual projects.
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
                    link="/assets/knowledeg/blogsPdf/sustainability.pdf"
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
