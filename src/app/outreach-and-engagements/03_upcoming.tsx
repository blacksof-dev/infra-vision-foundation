import React, { useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import EventDetailsPopup from './EventDetails';
import InfrapanditAward from './infraPanditAward';

interface EventData {
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  ctaText: string;
  details?: any;
}

interface MonthData {
  month: string;
  events: EventData[];
}

interface DataType {
  [year: string]: MonthData[];
}

const Upcoming = () => {
  const [year, setYear] = useState<string>("2025");
  const [filterData, setFilteredData] = useState<MonthData[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [popupDate, setPopUpData] = useState()
  const data: DataType = {

    "2025": [
      {
        month: "January",
        events: [
          {
            date: '18',

            dayTime: "Saturday, New Delhi",
            meetingType: "External engagements",
            desc: "Centre for Agri Infrastructure Research and Action's (CAIRA) first Roundtable on Boosting India's agri exports by transforming infrastructure",
            ctaText: "See details",
            details: {
              date: "January 18, 2025, New Delhi",
              images: [
                "/assets/infrapandit/eventImages/caira_01.png", "/assets/infrapandit/eventImages/caira_02.png", "/assets/infrapandit/eventImages/caira_03.png", "/assets/infrapandit/eventImages/caira_04.png"
              ],
              content: `
              CAIRA’s first Roundtable on “Boosting India's agri exports by transforming infrastructure” brought together a distinguished assembly of public and private sector leaders. The event featured key decision-makers, including Subrata Gupta, Secretary of Food Processing; Santosh Sarangi, Director General of Foreign Trade; Abhishek Dev, Chairman of APEDA; and Siraj Hussain, former Union Agriculture Secretary and Chairman of CAIRA's Governing Council.\n

Notable industry voices included representatives from ITC, Tata Consumer Products, Sahyadri Farms, and Gram Unnati, ensuring a comprehensive dialogue on export infrastructure.
`,
              cta: {
                ctaText: "Download report",
                link: "/assets/pdf/CAIRA-Background-Paper-1.pdf"
              },

            }
          },
        ]

      },
      {
        month: "Feburary",
        events: [

        ]
      },
      {
        month: "March",
        events: [

        ]
      },
      {

        month: "April",
        events: [
          {
            date: '17',
            dayTime: "Thursday",
            meetingType: "Internal Meeting",
            desc: "Annual get-together",
            ctaText: "See details",
            details: {
              date: "April 17, 2025",
              images: [
                "/assets/infrapandit/eventImages/dummy.png"
              ],
              content: `
                
The Infravision Community huddled to celebrate achievements and strengthen collaborative networks to advance India's infrastructure agenda. This annual gathering showcased the Foundation's growing influence while fostering deeper connections among policy practitioners and thought leaders.\n


The celebration featured a compelling short film documenting the Foundation's comprehensive impact, highlighting published research papers and advocacy events that shaped national infrastructure discourse. The presentation revealed the foundation's expanding influence across policy circles and public discourse.\n


Distinguished sitarist Mehtab Ali Niazi provided cultural enrichment, masterfully blending classical Indian music with English classics and contemporary pop, including Ed Sheeran adaptations.\n


The evening demonstrated the Foundation's belief that creativity, ideas, and inspiration extend beyond boardrooms and conference halls into cultural expression and community building.\n


The Foundation convened the Strategic Leadership Summit and launched the InfraPandit Awards in Mumbai. The Infravision Foundation announced a convening of its Council of Advisors and Distinguished Fellows alongside the landmark launch of its prestigious InfraPandit Awards, marking a significant milestone in recognising excellence within India's infrastructure sector.\n


Recognising the need for enhanced strategic coordination and public recognition of infrastructure achievements, TIF convened its Council of Advisors and Distinguished Fellows at Mumbai's iconic Royal Bombay Yacht Club on June 20th, 2025.\n


The dual-purpose gathering strengthened the Foundation's governance while establishing the InfraPandit Awards as the Foundation's signature platform for celebrating outstanding contributions to India's infrastructure development, advancing the organisation's mission to elevate industry standards through recognition and thought leadership.
`
            }
          },
          {
            date: '10',
            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Conclave-cum-Buyer-Seller meet on Expanding Arunachal Pradesh's agriculture through infrastructure development",
            ctaText: "See details",
            details: {
              images: [
                "/assets/infrapandit/eventImages/Conclave-cum-Buyer-Seller.png"
              ],
              date: "April 10, 2025",

              content: `
The Infravision Foundation made a field visit and did a detailed report on the potential in the state's agri exports and the infrastructure bottlenecks for the Agricultural & Processed Food Products Export Development Authority (APEDA).

`
            }
          },
          {
            date: '8',
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "High-level roundtable: Decarbonising urban transport using ITMS data",
            ctaText: "See details",
            details: {
              images: [
                "/assets/infrapandit/eventImages/High-level-roundtable-5.png"
              ],
              date: "April 8, 2025",

              content: `
The Infravision Foundation organised a national seminar on “Decarbonising Urban Transport using ITMS data” based on a pioneering study conducted jointly by The Infravision Foundation and IIT Delhi.\n

The study identified Noida as having exceptional potential to become a model city for data-driven decarbonisation initiatives. The seminar was widely covered by the media, including stories by DD News, IANS, and The Print.

`}
          },
          {
            date: '1',
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "Formal presentation of the Compensatory Afforestation Management and Planning Authority (CAMPA) report",
            ctaText: "See details",
            details: {
              date: "April 1, 2025",
              images: [
                "/assets/infrapandit/eventImages/Formal-presentation.png"
              ],
              content: `
              The Infravision Foundation’s Co-Founder Rumjhum Chatterjee, CEO Jagan Shah, and Advocacy Head Kaveree Bamzai presented crucial findings to Union Environment Minister Shri Bhupender Yadav, recommending comprehensive reforms to the Compensatory Afforestation Management and Planning Authority (CAMPA). This collaborative research with The Energy and Resources Institute (TERI) identified systemic weaknesses, including poor fund utilisation, inadequate plantation outcomes, and fragmented institutional record-keeping.

`}
          },
        ]
      },
      {
        month: "May",
        events: [

        ]
      },
      {
        month: "June",
        events: [
          {
            date: '20',
            dayTime: "Friday",
            meetingType: "External engagements",
            desc: "InfraPandit Awards",
            ctaText: "See details",
            details: {

              date: "June 20, 2025",
              cta: {
                ctaText: "Tell me more",
                link: "/infrapandit-awards"
              },
              images: [
                "/assets/infrapandit/eventImages/InfraPandit-awards.png"
              ],
              content: `
             The first InfraPandit Awards will honour and celebrate groundbreaking doctoral research critical for India's infrastructure growth. Discover future leaders shaping India's development.

`}

          },
          {
            date: '10',
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "Infra projects in India are invariably only 90% complete",
            ctaText: "See details",
            details: {
              date: "June 10, 2025",
              images: [
                "/assets/infrapandit/eventImages/dummy.png"
              ],
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=w6oJTRqeB4A"
              },
              content: `
             While India's infrastructure projects are 90% complete, land acquisition issues and exorbitant pricing hinder the crucial last 10%. Additionally, last-mile connectivity remains a significant challenge due to a lack of planned transportation systems and overcrowded metros. Watch the video to delve deeper into these and other related topics as Pratap Padode, founder of First Construction Council and author of Tarmac to Towers: India’s Infrastructure Story, joins Infravision Conversations with The Infravision Foundation’s Head of Advocacy, Kaveree Bamzai, to break it down.

`}
          },
          {
            date: '5',
            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Why India needs a national plan to build new cities",
            ctaText: "See details",
            details: {
              date: "June 5, 2025",
              images: [
                "/assets/infrapandit/eventImages/dummy.png"
              ],
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=g5aA3Q3af1g&t=8s"
              },
              content: `
              Watch Jagan Shah, CEO of The Infravision Foundation, and Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, discuss India's critical need for a comprehensive national urban plan. They underscore the vital role of historical "brownfield" cities and renewed and newly developed "greenfield" cities in managing rapid population growth and urban chaos. Learn why effective planning, resource utilisation, and local self-governance are essential to transform India's urban landscape and achieve prosperity.
`}
          },
        ]
      },
      {
        month: "July",
        events: [

        ]
      },
      {
        month: "August",
        events: [

        ]
      },
      {
        month: "September",
        events: [

        ]
      },
      {
        month: "October",
        events: [

        ]
      },
      {
        month: "November",
        events: [

        ]
      },
      {
        month: "December",
        events: [

        ]
      },],


  };

  const years = Object.keys(data)

  useEffect(() => {
    setFilteredData(data[year] || []);
  }, [year])

  const handleEventPopup = (data: any) => {
    setIsOpen(true)
    setPopUpData(data);
  }

  return (
    <section className='blade-top-padding blade-bottom-padding-lg relative'>
      <img
        className="absolute opacity-60 top-0 right-0 hidden lg:block"
        src="/assets/outreach-and-engagements/highlight/circle.png"
        alt="Decorative Circle"
      />
      <div className='w-container'>

        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Upcoming Programmes</h5>
          </div>
          <div className=" pt-2 sm:pt-4 flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-black font-light ">
              See <span className='font-medium'>what's on</span> the horizon
            </h1>
          </div>
        </div>
        <div className='blade-top-margin-sm blade-bottom-margin-sm p-2 border border-gray-300 bg-white rounded'>

          <InfrapanditAward ctaText='Register now'
            link='https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521'
          />
        </div>
        {/* Year Filter Only */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-[70%] mt-6'>
          <div className="relative">
            <h5 className='text-[#0A0A0A] mb-2'>Year</h5>
            <Select value={year} onValueChange={(value) => setYear(value)}>
              <SelectTrigger className='text-[#C82249]'>
                <SelectValue placeholder="Select the year" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-lightgray rounded-sm">
                {years.map((year, idx) => (
                  <SelectItem key={idx} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className='bg-[#F6F6F6] blade-top-margin-sm p4 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap6'>
          {filterData.map((monthData: MonthData, idx: number) => (
            <div className='p-4 border-l border-t border-[#E0E0E0] first:border-l-0' key={idx}>
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">{monthData.month},</h4>{" "}
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">{year}</h4>
              {monthData.events.map((event: EventData, eventIdx: number) => (
                <div
                  key={eventIdx}

                  className='bg-white p-4 mb-4 rounded  shadow hover:shadow-md transition-shadow duration-200'
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 className='font-semibold text-lg'>{event.date}</h3>
                    <div className='h-6 w-[1px] bg-[#6E7478]' />
                    <p className='text-[#5D6468] text-sm'>{event.dayTime}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 bg-pink rounded-full block'></span>
                    <p className='text-sm text-[#333]'>{event.meetingType}</p>
                  </div>
                  <div>
                    <p
                      className='text-base text-black mt-2'
                      dangerouslySetInnerHTML={{ __html: event.desc }}
                    >
                    </p>

                    <button
                      onClick={() => handleEventPopup(event)}
                      className='pt-3 text-pink flex items-center gap-2 cursor-pointer  group'>
                      {event.ctaText} <span className='flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear'><ArrowRight width={14} height={14} className='text-sm' /></span>
                    </button>

                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {
        (isOpen && popupDate) &&
        <EventDetailsPopup onClose={() => setIsOpen(false)} data={popupDate} />
      }
    </section>
  );
};

export default Upcoming;
