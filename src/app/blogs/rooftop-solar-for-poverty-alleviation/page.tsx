import image1 from "@/../public/assets/knowledeg/blogs/08.jpg";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import RecentPostDetails from "../02_recentPost";

export default function Page() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[27%] sm:pt-[20%] lg:pt-[10%] blade-bottom-padding-lg">
        <div className="px-4 ">
          <h2 className="font-poppins text-black font-medium">
            Rooftop Solar for Poverty Alleviation
          </h2>
          <div>
            <div className="flex-col md:flex-row flex justify-between pt-3 ">
              <div>
                <h6 className="  text-lightgray max-w-xl text-sm sm:text-base">
                  {" "}
                  Vinayak Chatterjee, Founder and Managing Trustee, The
                  Infravision Foundation, with technical inputs from Rasika
                  Athawale, Distinguished Fellow, The Infravision Foundation
                </h6>
              </div>

              <div>
                <h6 className="text-base text-lightgray md:border-l md:border-lightgray/30 md:ps-4 py-2">March 2, 2023</h6>
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
              
                <div className="py-3">
                  <p className="text-darkgray font-medium text-sm sm:text-base">
                    Read about the Sooraj se Rozgaari scheme in an article
                    written by Vinayak Chatterjee and published in Business
                    Standard.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Centralised Procurement and Decentralised Deployment of
                    Photovoltaic Modules could transform rural India.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base ">
                    A detailed white-paper prepared by The Infravision
                    Foundation proposes a central government-sponsored scheme
                    that fundamentally looks at Rooftop Solar Photovoltaics
                    (RTPV) as the next trailblazing income-enhancing
                    opportunity, targeted largely to those at the bottom of the
                    pyramid, and largely in rural areas. It has the potential to
                    be a hugely impactful intervention to aid poverty
                    alleviation by converting the free sunlight falling on
                    rooftops and courtyards into income for households. For
                    instance, in China, RTPV is one of the idenThe Infravision
                    Foundationied ten initiatives rolled out by the government
                    to uplift rural households out of poverty. Last year, the
                    100% solarisation of the village of Modhera in the Mehsana
                    district of Gujarat has demonstrated the transformative
                    potential of rooftop solar in an Indian village.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    For a variety of reasons, Rooftop Solar in India has not yet
                    been the success it was planned to be. That is a pity. A
                    scheme, of the type suggested, seeks to breathe fresh life
                    into this area, targeting not just “green”, but even more
                    importantly, an innovative income-generating scheme. It
                    could well be called Sooraj Se Rozgaari (or, Earnings from
                    Sunlight).
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    As per this customer configuration, the Central Government
                    gets involved through the Indian Renewable Energy
                    Development Agency (IREDA). With central government
                    financial assistance, IREDA procures and deploys rooftop
                    modules and assists infrastructure via its extended arm of
                    State Renewable Energy Development Agencies (SRDAs). Bulk
                    procurement by IREDA is expected to reduce capital costs by
                    providing high-volume orders to module manufacturers. SRDAs
                    secure state regulatory approvals on benchmark costs of
                    RTPV, including state-specific grid installation charges and
                    a fair developer margin. Benchmark costs reflect locational
                    and services markup on top of the capital cost discovered by
                    IREDA.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    A new generation of local “Developers” has to market the
                    scheme and source consumer interest and thereafter, approach
                    SRDAs with the request for necessary modules and
                    infrastructure. They then install the same at consumers’
                    premises and are responsible for maintenance for at least
                    fifteen years. They get paid a fixed installation fee and
                    yearly maintenance fees from SRDAs for their services.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Consumers may have to share part of the benchmark costs
                    depending upon which category they fit in, from low-income
                    households to institutional or small businesses. They will
                    have to agree upon their share of self-use of the
                    electricity generated from RTPV and the balance that will be
                    considered as sold to SRDAs (unless bought by the discom),
                    for which they will be suitably compensated.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    The SRDAs aggregate such balance electricity from all
                    participating consumers, and are encouraged to maximise
                    revenue by sale of this power to other discoms, large
                    consumers, and power exchanges. Price arbitrage
                    opportunities — that is difference between compensation paid
                    to participating consumers and the realised sale price for
                    electricity sold to other parties — will ultimately
                    determine the net financial assistance support by the
                    central government.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Currently, the rooftop subsidy programs run by the Ministry
                    of New and Renewable Energy require consumers to bear about
                    60% of the total costs. For the suggested program, it is
                    recommended that consumers be grouped into three distinct
                    categories: (i) low-income households; (ii) social,
                    institutional and small businesses such as municipal schools
                    & district hospitals, NGOs, Farmer Produce Organizations,
                    SME or micro-SME businesses and, (iii) regular income
                    households. It is proposed that the low-income households
                    get a full capital grant, that is, they do not have to pay
                    for any share at all of the costs for RTPV installation and
                    maintenance. The social/institutional/small businesses bear
                    80% of the total costs, while the households with regular
                    incomes bear 60% of the cost, which is as per the current
                    practice.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Developers have the responsibility to market the program
                    benefits to consumers and agglomerate the demand. Once the
                    consumer puts in his/her contribution (as per set
                    guidelines), the Developer installs the requisite RTPV on
                    consumers’ premises. The developer gets paid a fixed
                    installation fee and yearly maintenance fees from SRDAs for
                    its services. This naturally creates a new set of local
                    energy sector entrepreneurs, in line with the government’s
                    vision of creating such opportunities at the district level.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    The proposed centralised scheme is expected to add a total
                    of 20 GW residential RTPV capacity over a five-year period.
                    The “NET” central sector budgetary support required will be
                    approximately INR 19,950 cr over a fifteen year life assumed
                    for the scheme.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Above all, a low income household with limited roof-space
                    stands to benefit (based on the final interplay of
                    assumptions) anything from INR 3500–INR 6000 per annum from
                    the “free” sunlight on its abode. Combined with the ‘green
                    effect’ such a poverty alleviating opportunity can surely
                    not be left unexploited.
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
                        text="Read research paper"
                        role="link"
                        target="_blank"
                        link="/assets/knowledeg/blogsPdf/massRooftop.pdf"
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
