import { BorderGrayHeroBtn, UnderlineCta } from "@/_components/atoms/buttons";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const AboutInfraPandit = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <section className="bg-[#F6F6F6]">
        <div className="w-container blade-top-padding blade-bottom-padding-lg flex flex-col justify-between md:flex-row gap-8 md:gap-20 md:items-center">
          <div className="max-w-full md:max-w-sm lg:max-w-md xl:max-w-2xl">
            <div className="flex items-center gap-2 md:gap-3 text-pink">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
              <h5 className="font-medium text-sm xl:text-lg">
                About InfraPandit Awards
              </h5>
            </div>
            <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
              <h1 className="leading-snug font-light text-2xl md:text-3xl xl:text-5xl">
                Connecting{" "}
                <span className="font-medium">academic excellence</span> to
                national progress
              </h1>
            </div>
            <div className="">
              <h4 className="font-light text-base xl:text-xl">
                {" "}
                The InfraPandit Awards honour and reward first-rate research
                that can accelerate India towards becoming a{" "}
                <span className="font-semibold">Viksit Bharat</span>. It
                identifies and recognises young minds for their fresh outlook on
                core infrastructure issues and groundbreaking insights.
              </h4>
              <h4 className="font-normal mt-5 text-base xl:text-xl">
                Instituted by The Infravision Foundation, the awards aim to
                foster tangible outcomes in infrastructure research and
                development through effective collaboration among industry,
                academia, and government.
              </h4>
            </div>
            <div className="mt-4">
              <h4 className="font-medium  mb-4">For the awardees</h4>
              <div className="flex items-center gap-2 md:gap-3 mb-2">
                <span className="w-[6px] h-[6px] md:w-[13px] md:h-[13px] rounded-full bg-pink"></span>
                <h5 className="font-light text-sm xl:text-xl">
                  The{" "}
                  <span className="font-medium">Uttam Award (INR 5 lakh)</span>{" "}
                  and the{" "}
                  <span className="font-medium">
                    Mahaan Award (INR 3 lakh).
                  </span>
                </h5>
              </div>
              <div className="flex items-start gap-2 md:gap-3 ">
                <span className="w-[6px] h-[6px] md:w-[13px] md:h-[13px] rounded-full mt-2 bg-pink shrink-0"></span>
                <h5 className="font-light text-sm xl:text-xl">
                  A citation by{" "}
                  <span className="font-medium">
                    The Infravision Foundation
                  </span>{" "}
                  highlighting the dissertation's significance.
                </h5>
              </div>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 sm:items-center">
              <BorderGrayHeroBtn
                text="Register now"
                role="link"
                borderColor="pink"
                color="black"
                bgColor="white"
                size="large"
                classes="font-medium"
                link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
                target="_blank"
              />
              <div
                role="button"
                onClick={() => setShowPopup(true)}
                className="cursor-pointer"
              >
                <UnderlineCta
                  title="Eligibility and process"
                  color="black"
                  underlineColor="pink"
                  role="link"
                  size="extralarge"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              className=""
              src="/assets/infrapandit/award.png"
              alt="Infrapandit Awards"
            />
          </div>
        </div>
      </section>
      {showPopup && (
        <EligibilityProcessPopup onClose={() => setShowPopup(false)} />
      )}
    </>
  );
};

// Popup Component
const EligibilityProcessPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0  flex items-cente  justify-center bg-black/70 backdrop-blur-sm px-2 py-10 z-[9999]">
      <div className="relative bg-white rounded-md  max-w-[800px]  h-full my-auto flex flex-col">
        {/* Header with close button */}
        <div className="flex items-center justify-between px-2 py-2 sm:px-6 sm:py-4 ">
          <button
            onClick={onClose}
            className="bg-pink cursor-pointer rounded-full p-1 text-white text-2xl ml-auto focus:outline-none"
          >
            <MdClose />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-2 px-2 sm:px-6 py-4 text-[13px] md:text-base mr-5 sm:mr-9 ">
          <h2 className="text-pink font-semibold mb-4">Eligibility</h2>
          <p className="text-base sm:text-lg font-light">
            Eligible candidates must be{" "}
            <span className="font-medium"> Indian citizens </span> who have been
            awarded a PhD from an Indian university or an institute recognised
            by the University Grants Commission (UGC) and accredited by NAAC or
            any autonomous institute or institutions of national importance,
            during the preceding three years.
          </p>
          <p className="text-base sm:text-lg font-light">
            The awarded dissertations will be in fields directly relevant to
            infrastructure, including{" "}
            <span className="font-medium">
              {" "}
              engineering, technology, management, finance, economics, and
              others.
            </span>{" "}
            The submitted dissertation may have been published.
          </p>
          <div>
            <h2 className="text-pink font-semibold mb-2 mt-6 md:mt-10">
              The awards
            </h2>
            <ul className="list-disc pl-5 mb-2 text-pink text-2xl space-y-2">
              <li className=" text-base font-light sm:text-lg">
                <span className="text-black">
                  Two InfraPandits will be selected in the first year of the
                  award.
                </span>
              </li>
              <li className=" text-base font-light sm:text-lg">
                <span className="text-black">
                  The award will consist of a citation from The Infravision
                  Foundation stating the significance of the dissertation and a
                  cash prize in one of the following amounts:
                </span>
              </li>
              <ul className="pl-5">
                <li className="list-disc text-black text-base">
                  Uttam Award (INR 5 lakh)
                </li>
                <li className="list-disc text-black text-base">
                  Mahaan Award (INR 3 lakh)
                </li>
              </ul>
            </ul>
          </div>
          <div className="">
            <h2 className="text-pink font-semibold mb-2 mt-6 md:mt-10">
              Timeline
            </h2>
            <ul className="list-disc pl-5 mb-2 text-pink text-2xl space-y-2">
              <li className=" text-base font-light sm:text-lg">
                <span className="text-black">
                  The awards program will be announced along with a call for
                  online applications on 20th June 2025 on The
                  <span className="font-medium">
                    {" "}
                    Infravision Foundation’s official website.
                  </span>
                </span>
              </li>
              <li className=" text-base font-light sm:text-lg">
                <span className="text-black">
                  The <span className="font-medium">last date</span> for
                  submitting the applications will be 14th August, 2025.
                </span>
              </li>
              <li className=" text-base font-light sm:text-lg">
                <span className="text-black">
                  The <span className="font-medium">results</span> will be
                  announced latest by 15th November, 2025.
                </span>
              </li>
              <ul className="pl-5">
                <li className="list-disc text-black text-base">
                  Uttam Award (INR 5 lakh)
                </li>
                <li className="list-disc text-black text-base">
                  Mahaan Award (INR 3 lakh)
                </li>
              </ul>
            </ul>
          </div>
          <div>
            <h2 className="text-pink font-semibold mb-2 mt-6 md:mt-10">
              About the jury
            </h2>
            <p className="text-base sm:text-lg font-light">
              The jury panel for the award will feature eminent experts from
              fields directly relevant to infrastructure development and
              innovation in India. It will comprise{" "}
              <span className="font-medium">
                five (5) members, representing academia, technology &
                innovation, industry, and finance.
              </span>
            </p>
            <p className="text-base sm:text-lg font-light">
              While the members of the jury may change in later cycles of the
              award, the sectors they represent will remain constant.
            </p>
          </div>
          <div>
            <h2 className="text-pink font-semibold mb-2 mt-6 md:mt-10">
              Process
            </h2>
            <p className="text-base sm:text-lg font-light">
              The process to be followed is described below:
            </p>
            <p className="text-base sm:text-lg ">
              1. Receipt of applications as per the standard online format
            </p>
            <p className="text-base sm:text-lg ">
              2. Screening of applications
            </p>
            <p className="text-base sm:text-lg font-light pl-5">
              Verification of authentic documents and confirmation of
              eligibility.
            </p>
            <p className="text-base sm:text-lg ">
              3. Evaluation of dissertation (Stage 1: Desk Review)
            </p>
            <p className="text-base sm:text-lg font-light pl-5">
              Three criteria will be evaluated in Stage 1. It will cover 70% of
              the marks.
            </p>
          </div>
          <div className=" mt-6 md:mt-10">
            <h5 className="text-pink font-semibold relative flex items-center">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink my-auto mr-2"></span>
              Quality (30%)
            </h5>
            <ul className="space-y-2 pt-2 list-disc list-outside pl-5 font-light text-base sm:text-lg">
              <li>Originality of the research</li>
              <li>Quality of data collected and the analysis</li>
              <li>Theoretical framework and literature review</li>
              <li>Methodology</li>
              <li>Quality of research documentation</li>
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="text-pink font-semibold relative flex items-center">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink my-auto mr-2"></span>
              Relevance (20%)
            </h5>
            <ul className="space-y-2 pt-2 list-disc list-outside pl-5 font-light text-base sm:text-lg">
              <li>
                Potential for practical application in the infrastructure sector
              </li>
              <li>Relevance to current infrastructure challenges in India</li>
              <li>Economic and social impact potential</li>
              <li>Scalability of the solutions proposed</li>
            </ul>
          </div>
          <div className="mt-4">
            <h5 className="text-pink font-semibold relative flex items-center">
              <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink my-auto mr-2"></span>
              Outcomes (20%)
            </h5>
            <ul className="space-y-2 pt-2 list-disc list-outside pl-5 font-light text-base sm:text-lg">
              <li>Publications in peer-reviewed journals</li>
              <li>Conference presentations</li>
              <li>Patents and other efforts to build intellectual property</li>
              <li>Industry collaboration/s initiated</li>
            </ul>
          </div>
          <div className="mb-2 mt-6 md:mt-10">
            <p className="text-base sm:text-lg font-medium">
              4. Shortlisting of candidates for interview
            </p>
            <p className="text-base sm:text-lg font-light pl-5">
              Based on the Stage 1 evaluation, shortlisted candidates will be
              invited to present before the jury. The candidates must cover
              their own travelling costs when invited to appear for the
              presentation/jury interaction.
            </p>
          </div>
          <div className="mb-2 mt-6 md:mt-10">
            <p className="text-base sm:text-lg font-medium">
              5. Presentation before the jury (Stage 2: Presentation)
            </p>
            <ul className="space-y-2 pt-2 list-disc list-outside pl-5 font-light text-base sm:text-lg">
              <li>Stage 2 accounts for 30% of the total marks.</li>
              <li>
                The shortlisted candidates will be requested to present their
                dissertation using an MS PowerPoint presentation containing a
                maximum of 20 slides (inclusive of the cover and the closing
                slides).
              </li>
              <li className="">
                The presentation shall cover:
                <ol className="space-y-1 sm:pl-7 mt-1 text-sm sm:text-base ">
                  <li>a. Research objectives and methodology</li>
                  <li>b. Key findings and innovations</li>
                  <li>
                    c. Practical applications and impact (including prototypes
                    and/or pilots)
                  </li>
                  <li>
                    d. Implementation roadmap and go-to-market strategy, as
                    appropriate
                  </li>
                  <li>
                    e. Downstream research & development enabled by PhD
                    dissertation
                  </li>
                </ol>
              </li>
              <li>
                The jury's interaction with each candidate will be for 60
                minutes.
                <ol className="sm:pl-7 space-y-1 mt-1 text-sm sm:text-base">
                  <li>a. Duration of presentation: 30 minutes</li>
                  <li>b. Q&A: 30 minutes</li>
                </ol>
              </li>
              <li>
                Evaluation criteria{" "}
                <ol className="space-y-1 sm:pl-7 mt-1 text-sm sm:text-base">
                  <li>a. Clarity and coherence of presentation</li>
                  <li>b. Effectiveness of verbal and visual communication</li>
                  <li>c. Quality of response to Jury questions</li>
                </ol>
              </li>
            </ul>
          </div>
          <p className="text-base sm:text-lg font-medium mt-4">
            6. Jury deliberation and final decision
          </p>
          <p className="text-base sm:text-lg font-medium mt-4">
            7. Announcement of results
          </p>
          <p className="text-base sm:text-lg font-medium mt-4">
            8. The awards ceremony
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutInfraPandit;
