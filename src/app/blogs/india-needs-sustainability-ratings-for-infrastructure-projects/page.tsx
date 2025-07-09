import image1 from "@/../public/assets/knowledeg/blogs/05.jpg";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import RecentPostDetails from "../02_recentPost";

export default function Page() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[27%] sm:pt-[20%] lg:pt-[10%] blade-bottom-padding-lg">
        <div className="px-4 ">
          <h2 className="font-poppins text-black font-medium">
            India Needs Sustainability Ratings for Infrastructure Projects
          </h2>
          <div>
            <div className="flex-col md:flex-row flex justify-between pt-3 ">
              <div>
                <h6 className="text-base  text-lightgray max-w-xl">
                  {" "}
                  Nitin Zamre, Former COO, The Infravision Foundation
                </h6>
              </div>
              <div>
                <h6 className="text-base text-lightgray md:border-l md:border-lightgray/30 md:ps-4 py-2">September 25, 2023</h6>
              </div>
            </div>
            <div className=" py-4 md:py-8">
              <div className="w-full h-full ">
                <Image
                  src={image1}
                  alt="Highways safe"
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div>
                <h3 className="text-black font-medium my-4 md:my-7">Description</h3>
                <div>
                  <p className="text-darkgray">
                    India’s ongoing economic transition will make it a $ 5
                    trillion economy by 2026-27 and possibly the third-largest
                    global economy soon. This remarkable growth hinges on
                    substantial investments in infrastructure, spanning roads,
                    airports, ports, railways, energy, etc. The National
                    Infrastructure Pipeline (NIP) outlines an investment of INR
                    111 lakh crore by 2025. These investments carry significant
                    economic potential, with a rupee spent on infrastructure
                    yielding a potent multiplier effect of 2.45 in the following
                    year, and 3.14 in subsequent ones.
                  </p>
                  <p className="text-darkgray pt-3">
                    The Government is also equally committed to India’s
                    environmental and social (E&S) goals.{" "}
                    <span className="font-medium text-darkgray">
                      India’s Nationally Determined Contributions (NDCs)
                    </span>{" "}
                    commit to reducing the emission intensity of GDP by 45% by
                    2030 over 2005 levels. India has also committed to Net Zero
                    emissions by 2070 and is a signatory to the Sustainable
                    Development Goals (SDGs) to be met by 2030.
                  </p>

                  <p className="text-darkgray pt-3">
                    <span className="font-medium text-darkgray">
                      An inherent flipside of infrastructure development is its
                      significant negative E&S impact, creating conflict with
                      India’s NDC and SDG goals.
                    </span>{" "}
                    For instance, cement and steel are amongst the largest
                    emitting sectors and could increase their carbon emissions
                    six-fold by 2050. Large-scale infrastructure development
                    will likely exacerbate India’s climate risks and
                    socio-economic vulnerabilities. Climate-related risks such
                    as increasing intensity of rains and landslides are already
                    visible, and the debate about ‘infrastructure at what cost’
                    has already begun.
                  </p>

                  <p className="text-darkgray pt-3">
                    <span className="font-medium text-darkgray">
                      However, economic growth can still be achieved without
                      compromising on E&S goals by adopting a sustainable
                      infrastructure development model.
                    </span>{" "}
                    Institutions such as the IFC and ADB have their own
                    infrastructure project assessment frameworks for determining
                    their E&S risks. These, however, are adopted only by
                    projects they fund and not by others. The current project
                    development approach globally is compliance-led without
                    considering the larger E&S goals.
                  </p>

                  <p className="text-darkgray pt-3">
                    <span className="font-medium text-darkgray">
                      The Infravision Foundation’s (TIF) research paper,
                      published in collaboration with Envint,
                    </span>{" "}
                    suggests an alternative approach,{" "}
                    <span className="font-medium text-darkgray">
                      integrating sustainability considerations into the
                      infrastructure project lifecycle and objectively measuring
                      project-level impact through a ‘sustainability rating’
                      framework.
                    </span>{" "}
                    Many other countries have adopted similar project-level
                    sustainability ratings, such as BREEAM, BCA Green Mark,
                    Envision, GRESB, PIERS, etc. India needs to develop and
                    adopt a sustainability rating framework to balance its
                    aspirations and commitments.
                  </p>

                  <p className="text-darkgray pt-3">
                    The proposed sustainability ratings mechanism adds to the
                    existing regulations and embeds E&S considerations in the
                    project lifecycle. It outlines a ratings regulation
                    mechanism, including rating ownership and accreditation,
                    applicability, adoption of ratings and the ratings process.
                  </p>

                  <p className="text-darkgray pt-3">
                    This research paper proposes S-I Rating, a sustainability
                    ratings mechanism for infrastructure projects based on
                    environmental and social Key Performance Indicators (KPIs)
                    to help objectively assess the project’s sustainability
                    considerations. The mechanism incorporates 102 KPIs across
                    15 themes. The themes covered include Access and Equity;
                    Biodiversity and Ecology; Construction Activity, Emissions;
                    Land Use and Efficiency; Materials and Resources; Risk and
                    Resilience; Waste and Circularity; and Water Use and
                    Management, among others.
                  </p>

                  <p className="text-darkgray pt-3">
                    These KPIs range from the basics related to compliance
                    (e.g., Environmental Management) to aspirational (e.g.,
                    carbon mitigation plans). The responses could range from
                    ‘not met’ to ‘full compliance’. Each of the KPIs has a
                    weightage, and based on the responses and the weightages, a
                    ratings score is generated.
                  </p>
                  <p className="text-darkgray pt-3">
                    Such a mechanism will likely benefit all the stakeholders.
                    It will enable governments and project sponsors to make ‘go
                    no-go’ decision-making based on sustainability parameters,
                    minimise stakeholder conflicts and conserve common property
                    resources. Developers will be able to access responsible
                    investors and minimise long-term E&S risks. It will provide
                    investors with transparent risk assessment and efficient
                    capital allocation. Finally, it will improve the user
                    experience.
                  </p>

                  <p className="text-darkgray pt-3">
                    Implementation of the S-I Ratings mechanism needs a robust
                    institutional framework with clear roles and
                    responsibilities. TIF’s research paper recommends the
                    creation of a ‘Sustainable Infra Development Cell’ (SIDC)
                    under the aegis of the National Bank for Financing
                    Infrastructure and Development
                  </p>
                  <p className="text-darkgray pt-3">
                    (NaBFID) to act as the owner and promoter for the
                    administration, developing the process and promotion of
                    adoption of such ratings. As the principal Infrastructure
                    Development Finance Institution, NaBFID may be the
                    appropriate body to take forward the implementation of the
                    sustainability ratings. The SIDC would create an ecosystem
                    of accredited independent ‘S-I Ratings Service Providers’
                    (SIRPs) to assess individual projects.
                  </p>

                  <div className="my-7">
                    {/* <p className="text-black/80 font-medium">
                      {" "}
                      Nitin Zamre, Former COO, The Infravision Foundation and
                      Mukesh Khandelwal, Founder, PSmith Advisors LLP
                    </p>
                    <p className="text-black/80 font-medium pt-3">
                      [Jagan Shah is the CEO, The Infravision Foundation]{" "}
                    </p> */}
                    <div className="w-fit py-3 px-2 overflow-hidden">
                      <UnderlineWithHover
                        size="small"
                        color="pink"
                        bgColor="pink"
                        text="Read research Paper"
                        role="link"
                        target="_blank"
                        link="/assets/knowledeg/blogsPdf/sustainability.pdf"
                        borderColor="white"
                         classes="text-[16px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <RecentPostDetails /> */}
            {/* <CategoryDetailForm/> */}
          </div>
        </div>
      </div>
    </>
  );
}
