import image2 from "@/../public/assets/knowledeg/blogs/07.jpg";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[27%] sm:pt-[20%] lg:pt-[10%] blade-bottom-padding-lg">
        <div className="px-4 ">
          <h2 className="font-poppins text-black font-medium">
            Getting Surety Bonds Market Ready
          </h2>
          <div>
            <div className="flex-col md:flex-row flex justify-between pt-3">
              <div>
                <h6 className="text-sm sm:text-base  text-lightgray max-w-xl ">
                  Author: Nitin Zamre, Former COO, The Infravision Foundation, with
                  technical inputs provided from Mr Supratim Sarkar and Prof
                  Manoj Mohan (SPJIMR)
                </h6>
              </div>
              <div className="">
                <h6 className="text-base text-lightgray md:border-l md:border-lightgray/30 md:ps-4 py-2">May 18, 2023</h6>
              </div>
            </div>
            <div className="py-4 md:py-8">
              <div className="w-full h-full ">
                <Image
                  src={image2}
                  alt="Highways safe"
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="py-3">
               
                <div>
                  <p className="text-darkgray font-medium text-sm sm:text-base">
                    There is still some distance to go before Surety Bonds start
                    replacing Bank Guarantees.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    In Budget 2022, the Finance Minister made an announcement,
                    introducing Surety Bonds (SB) as an insurance product that
                    could potentially replace Bank Guarantees (BG) in India.
                    Insurance Regulatory & Development Authority of India
                    (IRDAI) permitted general insurers to issue Surety Insurance
                    Bonds from April 2022. In December 2022, the first SB
                    product was introduced by insurer Bajaj Allianz. In March
                    2023, New India Assurance, the largest non-life insurer,
                    entered the surety bonds business. These developments are
                    not just welcome but are critical for India’s US$ 1.5
                    trillion National Infrastructure Pipeline (NIP).
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    What is a Surety Bond? It is a legally binding contract
                    entered into by the Principal (contractor), the Obligee
                    (e.g. NHAI), and the Surety (Insurer) that underwrites the
                    contractor’s performance by providing monetary compensation
                    to the Obligee in case of the contractor’s failure to
                    perform. However, there is a fundamental difference between
                    SB and BG. While BG needs collateral, SB is like insurance
                    and needs a premium. SB, therefore, does not lock in funds.
                    However, unlike the usual insurance products, SB has the
                    right to recover the claim from the Principal.
                  </p>

                  <p className="text-darkgray  pt-3 text-sm sm:text-base">
                    BGs are needed throughout the project cycle — from bidding
                    till completion of the defect liability period. Providing a
                    BG is dependent on many things — Principal’s overall
                    borrowing limits and creditworthiness, bank’s risk limits,
                    project cost and risks, et al. The last 15 years’ huge
                    growth in India’s EPC industry necessitated contractors to
                    borrow more, provide more BGs. Banks also ran into stressed
                    assets, limiting their risk appetite and seeking higher
                    margin money. This effectively squeezed the contractors’
                    growth. The most affected were the medium-sized contractors.
                  </p>

                  <p className="text-darkgray  pt-3 text-sm sm:text-base">
                    India plans to spend ~INR 115 lakh crore on infrastructure
                    through NIP over the next five years. A recent Research
                    Paper published by The Infravision Foundation estimates that
                    such an investment would need BGs that could go up to as
                    high as INR 95 lakh crore. The banking system is unlikely to
                    be able to provide BGs of this value, making critical
                    alternate instrument like SB to fill in the gap.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Globally, SBs are a $ 20 billion market, growing at about 6%
                    CAGR, dominated by North America and Europe with a 75%
                    share. They are extensively used to support infrastructure
                    building with laws that mandate their use. The US even has
                    an SB Guarantee program to help small, emerging contractors
                    who lack the experience and financial strength to obtain
                    commercial BGs.
                  </p>

                  <p className="text-darkgray font-medium pt-3 text-sm sm:text-base">
                    In India, SBs were introduced over a year ago but have not
                    taken off due to the severe challenges related to adoption
                    and scale-up, pricing, and recovery of claims.
                  </p>

                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    The first challenge is a lack of awareness about the
                    product. While NHAI has shown willingness to accept SB, many
                    other agencies, including state governments, have not.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    The second challenge is a lack of data. An insurance product
                    needs Actuarial Pricing Models, using extensive historic
                    customer data. In the case of the SB market in India, the
                    insurance companies do not have enough data.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    Lastly, there are huge concerns about recovery in case of a
                    claim. Insurance companies are not part of the Insolvency &
                    Bankruptcy Code (IBC), and therefore may not get recourse to
                    the project assets on default.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    <span className="text-darkgray font-medium">
                      {" "}
                      Development of the SB market is extremely important as the
                      system’s inability to provide BGs can choke infrastructure
                      development.
                    </span>{" "}
                    The Infravision Foundation’s research presents a set of
                    recommendations to effectively overcome SB’s challenges.
                  </p>

                  <ul className="list-decimal list-inside py-3 text-sm sm:text-base text-darkgray">
                    <li className="py-1">
                      <span className="text-darkgray font-medium">
                        Awareness Campaign:
                      </span>{" "}
                      Awareness needs to be created among all the authorities by
                      bringing them on the same page on the acceptance of SBs.
                      The unique nature of SBs needs to be understood and
                      factored into structuring, pricing, and capital
                      guidelines.
                    </li>

                    <li className="py-1">
                      <span className="text-darkgray font-medium ">
                        Solvency Ratios:
                      </span>{" "}
                      Unlike the standard insurance products, SB issuers enjoy
                      access to project assets and cashflows in the event of a
                      claim. The Solvency Regulations for SB issuers need to
                      take these into account.
                    </li>

                    <li className="py-1">
                      <span className="text-darkgray font-medium">
                        Credit Rating of Surety Bonds:
                      </span>{" "}
                      Actuarial Pricing Models will not work in India due to a
                      lack of data. Regulators could permit insurance companies
                      to use an external credit rating of the Principals to
                      assess the underwriting risk and the associated
                      probability of default under the counter indemnity. These
                      can be used to price the SB.
                    </li>

                    <li className="py-1">
                      <span className="text-darkgray font-medium ">
                        Indemnity Agreement:
                      </span>{" "}
                      SB issuers need Indemnity Agreements to recover money in
                      case of a claim. Standard Indemnity Agreements should be
                      made mandatory as part of the SBs, wherein the Principal
                      unconditionally indemnifies the losses of the SB issuer.
                      The government may also think of providing partial
                      counter-indemnity for MSMEs not having an acceptable
                      credit rating to back the indemnity. Alternatively, the SB
                      issuer can be recognised as a financial creditor under the
                      IBC, removing the need for providing an explicit
                      indemnity.
                    </li>

                    <li className="py-1">
                      {" "}
                      <span className="text-darkgray font-medium ">
                        Right of Subrogation and IBC:
                      </span>{" "}
                      Effective implementation of SBs can be increased by
                      providing the Right of Subrogation/Substitution. That
                      would allow the Issuer to “step into the shoes of” the
                      Principal and use the contractual rights to recover the
                      cost of making payment or performing on the Principal’s
                      behalf.
                    </li>
                  </ul>

                  <p className="text-darkgray  pt-3 text-sm sm:text-base">
                    Three things can be implemented immediately — create
                    awareness campaigns, introduce indemnity agreements in
                    standard SB, and permit insurance companies to rely on
                    external credit rating for pricing.
                  </p>
                  <p className="text-darkgray pt-3 text-sm sm:text-base">
                    The remaining action points will require a broader
                    engagement with multiple stakeholders. However, a roadmap
                    for implementing these should be drawn up to ensure the SB
                    market develops to its fullest extent. This is necessary and
                    urgent.
                  </p>

                  <div className="my-7">
                    <div className="w-fit py-3 px-2 overflow-hidden">
                      <UnderlineWithHover
                        size="small"
                        color="pink"
                        bgColor="pink"
                        text="Read research Paper"
                        role="link"
                        target="_blank"
                        link="/assets/knowledeg/blogsPdf/surety.pdf"
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
