import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventDetailsPopup from "./EventDetails";
import InfrapanditAward from "./infraPanditAward";

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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupDate, setPopUpData] = useState();
  const data: DataType = {
    "2025": [
      {
        month: "January",
        events: [
          {
            date: "18",

            dayTime: "Saturday, New Delhi",
            meetingType: "External engagements",
            desc: "Centre for Agri Infrastructure Research and Action's (CAIRA) first Roundtable on Boosting India's agri exports by transforming infrastructure",
            ctaText: "See details",
            details: {
              date: "January 18, 2025, New Delhi",
              images: [
                "/assets/outreach-and-engagements/eventImages/caira_01.png",
                "/assets/outreach-and-engagements/eventImages/caira_02.png",
                "/assets/outreach-and-engagements/eventImages/caira_03.png",
                "/assets/outreach-and-engagements/eventImages/caira_04.png",
              ],
              content: `
              CAIRA’s first Roundtable on “Boosting India's agri exports by transforming infrastructure” brought together a distinguished assembly of public and private sector leaders. The event featured key decision-makers, including Subrata Gupta, Secretary of Food Processing; Santosh Sarangi, Director General of Foreign Trade; Abhishek Dev, Chairman of APEDA; and Siraj Hussain, former Union Agriculture Secretary and Chairman of CAIRA's Governing Council.\n

               Notable industry voices included representatives from ITC, Tata Consumer Products, Sahyadri Farms, and Gram Unnati, ensuring a comprehensive dialogue on export infrastructure.
`,
              cta: {
                ctaText: "Download report",
                link: "/assets/pdf/CAIRA-Background-Paper-1.pdf",
              },
            },
          },
        ],
      },
      {
        month: "Feburary",
        events: [],
      },
      {
        month: "March",
        events: [],
      },
      {
        month: "April",
        events: [
          {
            date: "17",
            dayTime: "Thursday",
            meetingType: "Internal engagements",
            desc: "Annual get-together",
            ctaText: "See details",
            details: {
              date: "April 17, 2025",
              images: [
                "/assets/outreach-and-engagements/eventImages/april1_2025.png",
                "/assets/outreach-and-engagements/eventImages/april2_2025.png",
                "/assets/outreach-and-engagements/eventImages/april3_2025.png",
                "/assets/outreach-and-engagements/eventImages/april4_2025.png",
              ],
              content: `
                
The Infravision Community huddled to celebrate achievements and strengthen collaborative networks to advance India's infrastructure agenda. This annual gathering showcased the Foundation's growing influence while fostering deeper connections among policy practitioners and thought leaders.\n


The celebration featured a compelling short film documenting the Foundation's comprehensive impact, highlighting published research papers and advocacy events that shaped national infrastructure discourse. The presentation revealed the Foundation's expanding influence across policy circles and public discourse.\n


Distinguished sitarist Mehtab Ali Niazi provided cultural enrichment, masterfully blending classical Indian music with English classics and contemporary pop, including Ed Sheeran adaptations.\n


The evening demonstrated the Foundation's belief that creativity, ideas, and inspiration extend beyond boardrooms and conference halls into cultural expression and community building.\n


The Foundation convened the Strategic Leadership Summit and launched the InfraPandit Awards in Mumbai. It announced a convening of its Council of Advisors and Distinguished Fellows alongside the landmark launch of its prestigious InfraPandit Awards, marking a significant milestone in recognising excellence within India's infrastructure sector.\n


Recognising the need for enhanced strategic coordination and public recognition of infrastructure achievements, the Foundation convened its Council of Advisors and Distinguished Fellows at Mumbai's iconic Royal Bombay Yacht Club on June 20, 2025.\n


The dual-purpose gathering strengthened the Foundation's governance while establishing the InfraPandit Awards as the Foundation's signature platform for celebrating outstanding contributions to India's infrastructure development, advancing the organisation's mission to elevate industry standards through recognition and thought leadership.
`,
            },
          },
          {
            date: "10",
            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Conclave-cum-Buyer-Seller meet on Expanding Arunachal Pradesh's agriculture through infrastructure development",
            ctaText: "See details",
            details: {
              images: [
                "/assets/outreach-and-engagements/eventImages/Conclave-cum-Buyer-Seller.png",
              ],
              date: "April 10, 2025",

              content: `
The Infravision Foundation made a field visit and did a detailed report on the potential in the state's agri exports and the infrastructure bottlenecks for the Agricultural & Processed Food Products Export Development Authority (APEDA).

`,
            },
          },
          {
            date: "8",
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "High-level roundtable: Decarbonising urban transport using ITMS data",
            ctaText: "See details",
            details: {
              images: [
                "/assets/outreach-and-engagements/eventImages/High-level-roundtable-5.png",
              ],
              date: "April 8, 2025",

              content: `
The Infravision Foundation organised a national seminar on “Decarbonising Urban Transport using ITMS data” based on a pioneering study conducted jointly by The Infravision Foundation and IIT Delhi.\n

The study identified Noida as having exceptional potential to become a model city for data-driven decarbonisation initiatives. The seminar was widely covered by the media, including stories by DD News, IANS, and The Print.

`,
            },
          },
          {
            date: "1",
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "Formal presentation of the Compensatory Afforestation Management and Planning Authority (CAMPA) report",
            ctaText: "See details",
            details: {
              date: "April 1, 2025",
              images: [
                "/assets/outreach-and-engagements/eventImages/Formal-presentation.png",
              ],
              content: `
              The Infravision Foundation’s Co-Founder Rumjhum Chatterjee, CEO Jagan Shah, and Advocacy Head Kaveree Bamzai presented crucial findings to Union Environment Minister Shri Bhupender Yadav, recommending comprehensive reforms to the Compensatory Afforestation Management and Planning Authority (CAMPA).\n
               This collaborative research with The Energy and Resources Institute (TERI) identified systemic weaknesses, including poor fund utilisation, inadequate plantation outcomes, and fragmented institutional record-keeping.

`,
            },
          },
        ],
      },
      {
        month: "May",
        events: [],
      },
      {
        month: "June",
        events: [
          {
            date: "20",
            dayTime: "Friday",
            meetingType: "External engagements",
            desc: "InfraPandit Awards",
            ctaText: "See details",
            details: {
              date: "June 20, 2025",
              cta: {
                ctaText: "Tell me more",
                link: "/infrapandit-awards",
              },
              images: [
                "/assets/outreach-and-engagements/eventImages/june1_2025.jpg",
                "/assets/outreach-and-engagements/eventImages/june2_2025.jpg",
                "/assets/outreach-and-engagements/eventImages/june3_2025.jpg",
              ],
              content: `
             The first InfraPandit Awards will honour and celebrate groundbreaking doctoral research critical for India's infrastructure growth. Discover future leaders shaping India's development.

`,
            },
          },
          {
            date: "10",
            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "Infra projects in India are invariably only 90% complete",
            ctaText: "See details",
            details: {
              date: "June 10, 2025",
              images: [
                "/assets/outreach-and-engagements/eventImages/june10_2025.png",
              ],
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=w6oJTRqeB4A",
              },
              content: `
             While India's infrastructure projects are 90% complete, land acquisition issues and exorbitant pricing hinder the crucial last 10%. Additionally, last-mile connectivity remains a significant challenge due to a lack of planned transportation systems and overcrowded metros.\n
              Watch the video to delve deeper into these and other related topics as Pratap Padode, Founder of First Construction Council and author of "Tarmac to Towers: India’s Infrastructure Story", joins Infravision Conversation with The Infravision Foundation’s Head of Advocacy, Kaveree Bamzai, to break it down.

`,
            },
          },
          {
            date: "5",
            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Why India needs a national plan to build new cities",
            ctaText: "See details",
            details: {
              date: "June 5, 2025",
              images: [
                "/assets/outreach-and-engagements/eventImages/june5_2025.png",
              ],
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=g5aA3Q3af1g&t=8s",
              },
              content: `
              Watch Jagan Shah, CEO of The Infravision Foundation, and Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, discuss India's critical need for a comprehensive national urban plan. They underscore the vital role of historical "brownfield" cities and renewed and newly developed "greenfield" cities in managing rapid population growth and urban chaos.\n
               Learn why effective planning, resource utilisation, and local self-governance are essential to transform India's urban landscape and achieve prosperity.
               `,
            },
          },
        ],
      },
      {
        month: "July",
        events: [],
      },
      {
        month: "August",
        events: [],
      },
      {
        month: "September",
        events: [],
      },
      {
        month: "October",
        events: [],
      },
      {
        month: "November",
        events: [],
      },
      {
        month: "December",
        events: [],
      },
    ],
    "2024": [
      {
        month: "January",
        events: [
          {
            date: "12",

            dayTime: "Friday",
            meetingType: "External engagements ",
            desc: "Renewable energy 2024: Storage will be the main focus with Nitin Zamre",
            ctaText: "See details",
            details: {
              date: "Jan 12, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/januray12_2024.png",
              ],
              content: `
                  
              Join energy expert Nitin Zamre as he discusses India's evolving energy landscape with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. The discussion highlights the ongoing reliance on coal despite a strong push for renewable energy. While coal provides domestic energy security, its use is slowly declining as India commits to cleaner sources and emission reduction targets.\n
              The discussion also touches upon the uneven access to 24/7 power and the decreasing cost of solar energy. Ultimately, the conversation underscores a shift towards a diversified energy mix, with a notable acceleration in electric vehicle adoption and the potential for decentralised, solar-powered solutions to empower rural communities.\n
            


    
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=q25SQpLHlDc",
              },
            },
          },
        ],
      },
      {
        month: "Feburary",
        events: [
          {
            date: "17",

            dayTime: "Saturday",
            meetingType: "External engagements ",
            desc: "Third quarterly meeting: Brainstorming for the future",
            ctaText: "See details",
            details: {
              date: "February 17, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
                  
                The Infravision Foundation’s third quarterly meeting provided fascinating insights into ongoing and future projects.\n
               Among the members of the Council of Advisers and Distinguished Fellows who attended for the first time were former Planning Commission member Arun Maira, Toyota Kirloskar Systems Chairperson Geetanjali Kirloskar, JM Financial Vice Chairman Vishal Kampani, former DG Namami Gange Rajiv Ranjan Mishra, and SBI Chief Economic Adviser Soumya Kanti Ghosh.\n
               Many new ideas were born, and many died a quick death. A defining insight emerged: "Do not gauge your impact by what the government says but by how you impact people." This principle now guides the Foundation's approach to measuring meaningful change in India's infrastructure landscape.



    
              `,
            },
          },
        ],
      },
      {
        month: "March",
        events: [
          {
            date: "22",

            dayTime: "Friday",
            meetingType: "External engagements ",
            desc: "High-level Roundtable on ESG ratings for infrastructure projects",
            ctaText: "See details",
            details: {
              date: "March 22, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
                  
                The Infravision Foundation collaborated with Envint Global to develop the S-I Rating mechanism and orchestrated a comprehensive stakeholder engagement strategy in Mumbai in collaboration with CII in the presence of 25 senior professionals. The Foundation's comprehensive research proposed a robust framework incorporating 102 Key Performance Indicators (KPI) across 15 themes, enabling objective assessment of environmental and social considerations in infrastructure projects.\n
                The study recommends establishing a Sustainable Infrastructure Development Cell (SIDC) under NaBFID to administer and promote the adoption of these ratings. Senior executives from SBI, including Managing Director Ashwini Kumar Tewari and ESG Head Jaicy Paul, provided critical insights on how the framework will help financial institutions make informed lending decisions while managing climate risks.

    
              `,
            },
          },
        ],
      },
      {
        month: "April",
        events: [],
      },
      {
        month: "May",
        events: [
          {
            date: "30",

            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Wild areas are necessary in cities, they allow nature to breathe with Anita Mani",
            ctaText: "See details",
            details: {
              date: "May 30, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/mayImg1_30_2024.png",
                "/assets/outreach-and-engagements/eventImages/mayImg2_30_2024.png",
              ],
              content: `
               Join Anita Mani, founder of Indian Pitta Books, as she converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this Infravision Conversation.\n
               Mani discusses the critical need for biodiversity and natural spaces within urban environments, highlighting the alarming rate at which green habitats are disappearing due to unchecked urbanisation, citing the poignant example of the Basai wetland. She advocates for allowing wild places to simply "be", rather than converting them into manicured parks or tourism complexes. The discussion also touches upon the limitations of "compensatory afforestation" and praises successful models like the Aravalli Biodiversity Park, arguing for a shift in urban planning philosophy to prioritise ecological preservation alongside development.
             



   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=S4gStG-y7qM",
              },
            },
          },
          {
            date: "30",

            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "A walk for a cause with Gita Balakrishnan",
            ctaText: "See details",
            details: {
              date: "May 30, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
              Join Gita Balakrishnan, an architect and author, as she converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this Infravision Conversation. Balakrishnan discusses her book, "1700 in 70: A Walk for a Cause," which chronicles her 70-day, 1,700-kilometre walk from Kolkata to Delhi\n
              The interaction highlights Balakrishnan's motivation to experience India on foot and understand its diverse realities, particularly concerning urban design, infrastructure, and social dynamics. She discusses six key areas of focus identified during her walk, including the plight of construction workers, the need for Universal Design and design literacy, the preservation of traditional wisdom, and environmental concerns.\n
              The conversation also delves into Balakrishnan's remarkable resilience in overcoming personal trauma and her commitment to fostering empathy and driving policy change through her work.


             



   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=5jrEtMe-t6c",
              },
            },
          },
        ],
      },
      {
        month: "June",
        events: [
          {
            date: "7",

            dayTime: "Friday",
            meetingType: "External engagements",
            desc: "Mythology & infrastructure with Devdutt Pattanaik",
            ctaText: "See details",
            details: {
              date: "June 7, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/june7_2024.png",
             
              ],
              content: `
                 Catch renowned mythologist Devdutt Pattanaik and The Infravision Foundation’s Founder and Managing Trustee Vinayak Chatterjee in the inaugural session of InfraKatha.\n
                 The discussion on the topic “Mythology & Infrastructure" evolves into an awe-inspiring journey of thoughts, facts, and perspectives. They delve into the profound connections between ancient Indian mythology and the concept of infrastructure.\n
                 Pattanaik emphasises that infrastructure is a man-made phenomenon shaped by underlying belief systems, trade, and the human need for connection. Through mythical stories and historical examples, from the Ram Setu to the ancient Harappan cities, the discussion explores the philosophical and practical aspects of building, exchanging, and coexisting, underscoring that true societal well-being stems from a mindset of "give and receive."



   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=9v61vpPmXEk",
              },
            },
          },
          {
            date: "13",

            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Wastewater Reuse",
            ctaText: "See details",
            details: {
              date: "June 13, 2024, New Delhi",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
                 The Municipal Finance Champions Lab on Integrated Wastewater Management and Circularity convened key stakeholders across government, industry, and academia to accelerate project preparation for water reuse in Indian cities. Organised by The Infravision Foundation and The World Bank, the Lab underscored the urgent need to address urban water scarcity through innovative, finance-ready reuse projects.
              `,
            },
          },
        ],
      },
      {
        month: "July",
        events: [
          {
            date: "3",

            dayTime: "Wednesday",
            meetingType: "External engagements",
            desc: "Infrashakti Awards: The first edition",
            ctaText: "See details",
            details: {
              date: "July 3, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
                  The NDTV Infra Shakti Awards 2024 is a significant initiative by The Infravision Foundation in association with NDTV, dedicated to promoting equitable and sustainable infrastructure development across India. Watch the first edition of the awards celebrate "change makers" — individuals, institutions, and projects — that have made substantial contributions to improving connectivity, livability, and sustainability within the nation's infrastructure landscape   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://youtu.be/7nkY4yY0I-g?feature=shared",
              },
            },
          },
          {
            date: "5",

            dayTime: "Friday",
            meetingType: "External engagements",
            desc: "Infrashakti Awards: The first edition",
            ctaText: "See details",
            details: {
              date: "July 5, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
                 The second session of Infrakatha featured Dr Deepa Malik, para-athlete, former President of the Paralympic Committee of India, and a prominent figure in inclusive infrastructure and disability advocacy.\n
                 Learn about her incredible journey from overcoming personal health challenges to becoming a celebrated athlete and champion for accessibility in India. The discussion underlines and expands on the urgent need for inclusive infrastructure that goes beyond physical accessibility to encompass policy, mindset, and equal opportunities for all, particularly for persons with disabilities, the elderly, women, and children.
  
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=5uzHmHzU7q0",
              },
            },
          },
          {
            date: "26",

            dayTime: "Friday",
            meetingType: "External engagements",
            desc: "Indian infrastructure: The difficulty of being good with Dilip Cherian",
            ctaText: "See details",
            details: {
              date: "July 26, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/august1_2024.png",
                "/assets/outreach-and-engagements/eventImages/august2_2024.png",
              ],
              content: `
                 Join eminent author Gurcharan Das and “Image Guru” Dilip Cherian in this InfraKatha session as they delve into "Indian infrastructure: The difficulty of being good." They explore India's economic journey since 1991, highlighting impressive growth in services and agriculture, contrasting it with a critical failure in manufacturing.\n
                The discussion uncovers the historical reasons for this shortfall, including the "License Raj" and bureaucratic hurdles, before examining the current government's focus on physical infrastructure. While acknowledging progress, they address challenges like poor quality infrastructure, environmental concerns, and the crucial need for job creation, especially in labour-intensive manufacturing. The conversation also touches on future scenarios, the role of AI, and more, including attitudinal changes within the bureaucracy and incentivising private sector investment through export-focused policies.


   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=FCDeGlsb7q0",
              },
            },
          },
        ],
      },
      {
        month: "August",
        events: [
          {
            date: "13",

            dayTime: "Tuesday",
            meetingType: "External engagements",
            desc: "Land Value Capture (LVC) Lab",
            ctaText: "See details",
            details: {
              date: "August 13, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/august1_2024.png",
                "/assets/outreach-and-engagements/eventImages/august2_2024.png",
              ],
              content: `
                  The Municipal Finance Champions Lab on Land Value Capture (LVC) for Public Transport Projects brought together policymakers, transit authorities, and urban planners to explore the transformative potential of LVC in funding sustainable transit infrastructure. Organised by The Infravision Foundation in collaboration with IIM Mumbai and supported by the World Bank, the Lab served as a platform to showcase successful case studies and dissect the challenges of implementing LVC in dense, complex urban environments.   
              `,
            },
          },
          {
            date: "22",

            dayTime: "Thursday",
            meetingType: "External engagements",
            desc: "Saraswati, the lost river: Lessons for today with Sanjeev Sanyal",
            ctaText: "See details",
            details: {
              date: "August 22, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/august22_2024.png",
              ],
              content: `
                  Join economist, author, and historian Sanjeev Sanyal in this InfraKatha session alongside Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation. Sanyal presents compelling geological, archaeological, and textual evidence to argue for the now lost Saraswati River’s historical existence and its profound influence on ancient Indian civilisation, particularly the Harappan cities.\n
                  He highlights how ancient Indian texts frequently acknowledge a changing landscape and the impact of climate shifts, offering valuable lessons for contemporary challenges like climate change and sustainable urban planning.

   
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=sygLq4cccIY",
              },
            },
          },
        ],
      },
      {
        month: "September",
        events: [
          {
            date: "2",

            dayTime: "Monday",
            meetingType: "External engagements ",
            desc: "High-level roundtable on “Warehousing infrastructure as a service: Opportunities & challenges” ",
            ctaText: "See details",
            details: {
              date: "September 2, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/september3_2024.png",
                "/assets/outreach-and-engagements/eventImages/september4_2024.png",
              ],
              content: `
              In collaboration with the National e-Repository Limited (NeRL), The Infravision Foundation brought together key stakeholders from both public and private sectors. Participants included senior representatives from NeRL, NCDEX, NABARD, the Ministry of Consumer Affairs, Food and Public Distribution, along with banks, warehouse owners, and farmer-producer organisations — all united by the common goal of alleviating financial stress on India's agricultural community.
              `,
            },
          },
          {
            date: "17",

            dayTime: "Tuesday",
            meetingType: "External engagements ",
            desc: "Heritage tourism infrastructure with Aman Nath",
            ctaText: "See details",
            details: {
              date: "September 17, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
              Catch Aman Nath, founder of Nimrana Hotels and a renowned expert in heritage tourism, at Infrakatha. The discussion highlights the nation's often poor relationship with its rich historical sites due to a lack of investment, imaginative marketing, and a "colonised mindset." Nath advocates for a "revitalisation" approach, transforming ruined sites into experiential destinations that blend history with present-day needs.\n 
              `,

              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=u-SEobnWU6U",
              },
            },
          },
          {
            date: "28",

            dayTime: "Saturday",
            meetingType: "Internal engagements",
            desc: "The Infravision Foundation half-yearly meeting 2024",
            ctaText: "See details",
            details: {
              date: "September 28, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/sepetember1_2024.png",
                "/assets/outreach-and-engagements/eventImages/sepetember2_2024.png",
              ],
              content: `
              Recognition and gratitude anchored The Infravision Foundation's half-yearly celebration, honouring Distinguished Fellows whose contributions advance India's infrastructure discourse. This gathering demonstrated the Foundation’s commitment to acknowledging exceptional service while charting future collaborative pathways.\n
              Founder Vinayak Chatterjee presented certificates of excellence to Distinguished Fellows Supratim Sarkar and Akhilesh Tilotia, recognising their outstanding contributions to the Foundation’s mission. The ceremony celebrated expertise spanning banking, public policy, and cross-sector leadership.\n
               Tilotia emphasised The Infravision Foundation's unique value proposition: "We need to support the public policy process via well-thought-out analyses and appropriate conceptual frameworks." He praised the diverse professional network, noting how multiple perspectives enable robust solution design across infrastructure challenges.\n
               Certificates were also announced for Rajiv Ranjan Mishra for excellence in water conservation, Rajaji Meshram in transport, and Dr Soumya Kanti Ghosh in economic policy.


              
              `,
            },
          },
        ],
      },
      {
        month: "October",
        events: [
          {
            date: "14",

            dayTime: "Wednesday",
            meetingType: "External engagements ",
            desc: "Artificial Intelligence: Reshaping the digital infra landscape with Shailesh Kochhar",
            ctaText: "See details",
            details: {
              date: "October 14, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
              Catch  AI specialist Shailesh Kochhar and Jagan Shah, CEO of The Infravision Foundation, in the sixth InfraKatha session as they delve into “Artificial intelligence: Reshaping the digital infrastructure landscape”. The discussion highlights AI's pervasive impact, its potential to automate global jobs, and fundamentally alter the nature of work. From AI's current limitations to the importance of competition, it projects the profound questions AI raises for the future of labour and education. The speakers also touch upon AI's practical applications in infrastructure and its ethical considerations.\n 
              `,

              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=hIzp4YhZcMo",
              },
            },
          },
        ],
      },
      {
        month: "November",
        events: [
          {
            date: "24",

            dayTime: "Sunday",
            meetingType: "External engagements ",
            desc: "Indosphere: How Indian trade grew with William Dalrymple",
            ctaText: "See details",
            details: {
              date: "November 24, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
              Watch renowned historian William Dalrymple as he passionately argues for a re-evaluation of ancient India's global influence and its "Indosphere." He critiques prevailing historical narratives, particularly the "Silk Road" concept, which he believes minimises India's pivotal role in classical trade and the spread of ideas. Dalrymple meticulously presents evidence of India's significant contributions in the diffusion of Buddhism, the economic dominance of Indian trade with the Roman Empire, and the profound impact of Indian mathematical concepts on the world.\n
               Open yourself to a fresh perspective of India's historical soft power.
              `,

              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=ae8InU9IGgk",
              },
            },
          },
        ],
      },
      {
        month: "December",
        events: [
          {
            date: "14",

            dayTime: "Saturday",
            meetingType: "External engagements",
            desc: "Can Public Private Partnerships (PPP) be revitalised? with Montek Singh Ahluwalia",
            ctaText: "See details",
            details: {
              date: "Dec 14, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                "/assets/outreach-and-engagements/eventImages/dummy.png",
              ],
              content: `
              Watch Montek Singh Ahluwalia, a distinguished Indian economist and former Deputy Chairman of the Planning Commission and Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation, as they discuss the evolution and challenges of Public-Private Partnerships (PPPs) in India. The discussion shares insights into the historical context of infrastructure development, the reasons for involving private capital, and the institutional and political hurdles that have impacted PPP success, such as issues with contract renegotiation, environmental clearances, and judicial intervention.\n`,

              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=o6nb3IejARc",
              },
            },
          },
          {
            date: "16",

            dayTime: "Monday",
            meetingType: "External engagements",
            desc: "Trees Outside Forests in India (TOFI) Workshop",
            ctaText: "See details",
            details: {
              date: "December 16, 2024",
              images: [
                "/assets/outreach-and-engagements/eventImages/december1_2024.png",
                "/assets/outreach-and-engagements/eventImages/december2_2024.png",
              ],
              content: `
              A consultation workshop on “Revising building codes and evolving strategies to enhance demand for TOF-based products in India’s construction sector” under the Trees Outside Forests in India (TOFI) Program, organised by CIFOR-ICRAF in collaboration with The Infravision Foundation.\n`,
            },
          },
        ],
      },
    ],
    "2023": [
      {
        month: "January",
        events: [
          {
            date: "21",

            dayTime: "Saturday",
            meetingType: "Internal engagements",
            desc: "The Infravision Foundation’s first annual meeting",
            ctaText: "See details",
            details: {
              date: "January 21, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
        Along with its Council of Advisors and Distinguished Fellows, The Infravision Foundation took stock of the studies undertaken and the future direction of research and advocacy. Opinions were sought and feedback noted.\n
              `,
            },
          },
        ],
      },
      {
        month: "Feburary",
        events: [],
      },
      {
        month: "March",
        events: [
          {
            date: "4",

            dayTime: "Saturday",
            meetingType: "External engagements",
            desc: "Panel discussion: The challenges ahead for core & social infra",
            ctaText: "See details",
            details: {
              date: "Mar 4, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
          Join a distinguished panel of experts from government, academia, industry, and finance in this panel discussion facilitated by Vinayak Chatterjee, Founder and Managing Trustee, The Infravision Foundation.\n
        Centred on the topic "The Challenges Ahead for Core & Social Infra," the panel explores the revival of Public Private Partnerships (PPP) and the successes and challenges in India's infrastructure development, particularly in roads and railways. The panellists highlight the crucial role of private sector involvement and the often-overlooked importance of social infrastructure and "the people" as a "fourth P" in successful partnerships. The discussion emphasises the need for clearer policy roadmaps, equitable risk allocation, efficient contract execution, and institutional reform to drive future growth and ensure infrastructure truly serves its beneficiaries.\n

              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=PX-s_58ixLk",
              },
            },
          },
        ],
      },
      {
        month: "April",
        events: [],
      },
      {
        month: "May",
        events: [],
      },
      {
        month: "June",
        events: [],
      },
      {
        month: "July",
        events: [
          {
            date: "2 & 3",

            dayTime: "Sunday & Monday",
            meetingType: "Internal engagements",
            desc: "First quarterly meeting: Infrastructure investment priorities",
            ctaText: "See details",
            details: {
              date: "July 2 and 3, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
           A provocative question launched The Infravision Foundation's inaugural quarterly meeting: "Is there enough butter to spread on the infrastructure toast?" This foundational gathering examined whether social infrastructure investment has been sacrificed for core infrastructure development, sparking unprecedented policy discourse.\n
          The panel, convened by Founder and Managing Trustee Vinayak Chatterjee, revealed striking perspectives on India's infrastructure priorities and investment strategies.\n
          Diverse expert viewpoints emerged. PK Sinha highlighted budget disparities (INR 2 lakh crore in health and education versus INR 10 lakh crore in core infrastructure), while Rajnish Kumar defended prioritising core infrastructure in developing economies. Ashish Dhawan advocated higher core infrastructure investment to boost GDP and Human Development Index scores.\n
          Dynamic floor interventions enriched the debate. Amarjeet Sinha emphasised the multiplier effect of educating girls, citing East Asian success stories. Kiran Karnik posed a critical question: "Do we need more highways or i-ways?"\n
          The second day of our inaugural quarterly meeting on transformed organisational thinking through comprehensive realignment and refinement.
              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=-INuUJJwYdk",
              },
            },
          },
        ],
      },
      {
        month: "August",
        events: [
          {
            date: "27",

            dayTime: "Sunday",
            meetingType: "Virtual Conversations",
            desc: "Selecting the appropriate urban transport system for India's cities with Prof Geetam Tiwari",
            ctaText: "See details",
            details: {
              date: "August 27, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
         Watch a transportation expert’s perspective as Professor Geetam Tiwari engages in a discussion focused on “Selecting the appropriate urban transport system for India's cities”, particularly Delhi with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. Tiwari argues that metro is not the only solution for urban mobility. shes emphasises the need for a holistic and integrated approach that considers diverse travel demands, highlighting Delhi's decline in public transport ridership despite significant investment.\n
        The expert stresses the importance of government commitment to providing safe, reliable public transport and infrastructure for active travel, advocating for a shift in mindset from private to public assets, and the establishment of overarching institutional mechanisms to plan and integrate different transport modes based on actual city travel patterns.\n
              `,
              cta: {
                ctaText: "Watch Video",
                link: "https://www.youtube.com/watch?v=Sr17ZN7FLA4",
              },
            },
          },
        ],
      },
      {
        month: "September",
        events: [
          {
            date: "18",

            dayTime: "Monday",
            meetingType: "External engagements",
            desc: "High-level Roundtable: Interactive session on Surety Bonds with Debasish Panda, Chairman, IRDAI",
            ctaText: "See details",
            details: {
              date: "September 18, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
            The Infravision Foundation and Confederation of Indian Industry (CII) organised a roundtable in which the Foundation presented its research, developed in collaboration with the SP Jain Institute of Management and Research.\n
           Presented by Distinguished Fellow Supratim Sarkar, the research outlined key recommendations for effective surety bond implementation. With India's National Infrastructure Pipeline (NIP) requiring INR 100 lakh crore investment over five years, the discussions revealed that banks lack capacity for traditional guarantees, positioning surety bonds as an essential complement. IRDAI Chairman Debasish Panda emphasised the regulatory framework's readiness, noting recent guidelines that opened the sector and removed business restrictions.\n
           
              `,
            },
          },
          {
            date: "15",

            dayTime: "Friday",
            meetingType: "Virtual Conversations",
            desc: "Sustainability ratings: An idea whose time has come with Rajaji Meshram",
            ctaText: "See details",
            details: {
              date: "Sep 15, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
          Join Rajaji, a transport and logistics expert and Distinguished Fellow at The Infravision Foundation, as he shares his thoughts on the critical need for Sustainability Ratings for infrastructure projects in India. Rajaji explains that as India aims for significant economic growth and a "step jump in infrastructure," this growth must be sustainable and not at the environment's or society's expense. The core idea is to implement a standardised rating system, similar to financial credit ratings, that would simplify the assessment of a project's environmental, social, and long-term climate impact.\n
           The discussion also highlights the importance of systematic processes, building trust in the ratings, and securing buy-in from key stakeholders like the government and financial institutions to ensure the successful adoption and effectiveness of these sustainability ratings.\n
              `,
              cta: {
                ctaText: "Watch Video",
                link: "https://www.youtube.com/watch?v=Jis2Q7oOfr0&t=1s",
              },
            },
          },
        ],
      },
      {
        month: "October",
        events: [
          {
            date: "7",

            dayTime: "Saturday",
            meetingType: "Internal engagements",
            desc: "Second quarterly meeting: Ideas aplenty",
            ctaText: "See details",
            details: {
              date: "October 7, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/december1_2023.png",
                "/assets/outreach-and-engagements/eventImages/december2_2023.png",
                "/assets/outreach-and-engagements/eventImages/december3_2023.png",
              ],
              content: `
                  
              The Infravision Foundation transformed ambition into actionable roadmaps during an intensive ideas marathon that redefined our trajectory. This session brought together the Council of Advisors and Distinguished Fellows to crystallise the Foundation’s evolving mission and operational framework.\n
             The meeting established ambitious institutional benchmarks: positioning The Infravision Foundation among India's most respected infrastructure policy destinations, with a strategic balance of 40% constituting intellectual output and 60% advocacy work. Many suggestions were made and accepted with alacrity.\n
             A pivotal discussion between Distinguished Fellow Jagan Shah and World Bank expert Bhavna Bhatia explored two critical focus areas — energy and urban infrastructure — generating actionable insights for future initiatives.\n
             Key participants included Trustee PK Sinha, Advisory Council members Arun Nanda, Sunil Mathur, Ashish Dhawan, DK Sen, Rajnish Kumar, Dilip Cherian, and G Raghuram, alongside Distinguished Fellows Supratim Sarkar, Rajaji Meshram, and Shah.
              `,
            },
          },
          {
            date: "11",

            dayTime: "Wednesday",
            meetingType: "Virtual Conversations",
            desc: "Making metro systems financially viable with Prof Sandip Chakrabarti",
            ctaText: "See details",
            details: {
              date: "Oct 11, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
      Most metro systems, especially in smaller Indian cities, are not financially viable due to low ridership, insufficient fare revenues, and a lack of non-fare income. Watch Professor Sandip Chakrabarti from IIM-Ahmedabad share his thoughts and insights on the financial sustainability of India's Metro systems. The core issue discussed is that\n
     Professor Chakrabarti advocates for a comprehensive, integrated approach to urban transportation through the concept of "AMTA 2.0," which envisions a single entity responsible for planning, owning, building, operating, and setting policy for all modes of public transit in a city, including innovative funding mechanisms like land value capture and congestion pricing.\n
    The overall purpose is to encourage a shift towards sustainable, financially healthy urban mobility by making beneficiaries pay and fostering a strategic vision for integrated public transport.

              `,
              cta: {
                ctaText: "Watch Video",
                link: "https://www.youtube.com/watch?v=H34LNACsKZw&t=51s",
              },
            },
          },
          {
            date: "11",

            dayTime: "Wednesday",
            meetingType: "Virtual Conversations",
            desc: "How to save our hill cities with Rajiv Ranjan Mishra",
            ctaText: "See details",
            details: {
              date: "Oct 11, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
   Rajiv Ranjan Mishra - Distinguished Fellow, The Infravision Foundation, and former Director General, National Mission for Clean Ganga.\n
 Join Rajiv Ranjan Mishra, former Director General of the National Mission for Clean Ganga and Distinguished Fellow, The Infravision Foundation, as he converses with Kaveree Bamzai, Head of Advocacy at The Infravision Foundation. The discussion focuses on the carrying capacity of Himalayan hill cities in India, emphasising the urgent need to assess and manage human impact on these fragile ecosystems due to recent environmental damage. Mishra talks about the multidimensional nature of carrying capacity, encompassing resource availability, environmental assimilation, and infrastructure, and the necessity of integrating ecological sensitivity into urban planning. \n
   The conversation also highlights the challenges of implementation across diverse states and the critical role of capacity building for city managers and regional planning to foster sustainable development in these vital regions.


              `,
              cta: {
                ctaText: "Watch video",
                link: "https://www.youtube.com/watch?v=ZdLcdjJShW8",
              },
            },
          },
        ],
      },
      {
        month: "November",
        events: [
          {
            date: "14",

            dayTime: "Tuesday",
            meetingType: "Virtual Conversations",
            desc: "Air pollution: The solution has to be multi-sectoral",
            ctaText: "See details",
            details: {
              date: "November 14, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/dummy.png",
                ,
              ],
              content: `
                  
      Join Jagan Shah, urban planning expert and CEO of The Infravision Foundation, alongside Kaveree Bamzai, Head of Advocacy at The Infravision Foundation, in this episode of the Infravision Conversation.\n
      The discussion addresses air pollution as a critical human development issue with far-reaching consequences, extending beyond immediate health impacts to long-term societal and economic burdens. They emphasise air pollution as a complex outcome of current development models, with significant contributors including construction dust, vehicular emissions, and solid waste.\n
      Drawing inspiration from London's successful long-term efforts to combat smog through a dedicated metropolitan agency, Shah argues for a multi-sectoral, national approach to solutions. He highlights the inadequacy of isolated, reactive measures and advocates for proactive strategies involving various government ministries and public consensus.
              `,
              cta: {
                ctaText: "Download report",
                link: "https://www.youtube.com/watch?v=OjrOlknqzu4",
              },
            },
          },
        ],
      },
      {
        month: "December",
        events: [
          {
            date: "4",

            dayTime: "Monday",
            meetingType: "External engagements ",
            desc: "High-level Roundtable on Urban mobility: Towards seamless integration",
            ctaText: "See details",
            details: {
              date: "December 4, 2023",
              images: [
                "/assets/outreach-and-engagements/eventImages/december1_2023.png",
                "/assets/outreach-and-engagements/eventImages/december2_2023.png",
                "/assets/outreach-and-engagements/eventImages/december3_2023.png",
              ],
              content: `
                  
              Partnering with the Confederation of Indian Industry (CII), The Infravision Foundation convened "Urban mobility: Towards seamless integration", bringing together policymakers, academics, technology providers, and metro operators.\n
             The conference examined two critical knowledge papers developed with IIT Delhi's Prof Geetam Tiwari and IIM Ahmedabad's Prof Sandip Chakrabarti, analysing appropriate urban transport systems and metro financial sustainability. Twenty-two speakers over six hours delivered comprehensive insights, revealing that most metros face insufficient ridership and financial unsustainability.
              `,
            },
          },
        ],
      },
    ],
  };

  const years = Object.keys(data);

  useEffect(() => {
    setFilteredData(data[year] || []);
  }, [year]);

  const handleEventPopup = (data: any) => {
    setIsOpen(true);
    setPopUpData(data);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);
  return (
    <section className="blade-top-padding blade-bottom-padding-lg relative">
      <img
        className="absolute opacity-60 z-0 top-0 right-0 hidden lg:block"
        src="/assets/outreach-and-engagements/highlight/circle.png"
        alt="Decorative Circle"
      />
      <div className="w-container">
        {/* <div className="blade-top-margin-sm blade-bottom-margin-sm p-2 border border-gray-300 bg-white rounded relative">
          <InfrapanditAward
            ctaText="Register now"
            link="https://docs.google.com/forms/d/e/1FAIpQLSdjpffzJCT6qmQXNUmoUau7giN4qVTsm5j3ysGZ0r8QxiG05g/viewform?usp=sharing&ouid=118204303619309850521"
          />
        </div> */}

        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Calendar</h5>
          </div>
          <div className=" pt-2 sm:pt-4 flex flex-col md:flex-row justify-between gap-4 ">
            <h1 className="text-black font-light ">
              A glance at our <br />
              <span className="font-medium">
                {" "}
                past and upcoming engagements
              </span>
            </h1>
          </div>
        </div>

        {/* Year Filter Only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-[70%] mt-9">
          <div className="relative">
            <h5 className="text-[#0A0A0A] mb-2">Year</h5>
            <Select value={year} onValueChange={(value) => setYear(value)}>
              <SelectTrigger className="text-[#C82249]">
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
        <div className="bg-[#F6F6F6] blade-top-margin-sm p4 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap6">
          {filterData.map((monthData: MonthData, idx: number) => (
            <div
              className="p-4 border-l border-t border-[#E0E0E0] first:border-l-0"
              key={idx}
            >
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {monthData.month},
              </h4>{" "}
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {year}
              </h4>
              {monthData.events.map((event: EventData, eventIdx: number) => (
                <div
                  key={eventIdx}
                  className="bg-white p-4 mb-4 rounded  shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{event.date}</h3>
                    <div className="h-6 w-[1px] bg-[#6E7478]" />
                    <p className="text-[#5D6468] text-sm">{event.dayTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink rounded-full block"></span>
                    <p className="text-sm text-[#333]">{event.meetingType}</p>
                  </div>
                  <div>
                    <p
                      className="text-base text-black mt-2"
                      dangerouslySetInnerHTML={{ __html: event.desc }}
                    ></p>

                    <button
                      onClick={() => handleEventPopup(event)}
                      className="pt-3 text-pink flex items-center gap-2 cursor-pointer  group"
                    >
                      {event.ctaText}{" "}
                      <span className="flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear">
                        <ArrowRight
                          width={14}
                          height={14}
                          className="text-sm"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {isOpen && popupDate && (
        <EventDetailsPopup onClose={() => setIsOpen(false)} data={popupDate} />
      )}
    </section>
  );
};

export default Upcoming;
