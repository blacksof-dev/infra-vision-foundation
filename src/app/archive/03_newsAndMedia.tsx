"use client";
import { useState, useMemo, useRef } from "react";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import { NewsCard } from "@/_components/molecules/newsCard";
import Link from "next/link";

// Types
type FilterType = "All" | "Publication year" | "sectors";
type SectorType =
  | "All"
  | "Transportation"
  | "Water and Sanitation"
  | "Energy"
  | "Urban Planning"
  | "Rural and Agri Infra"
  | "Education"
  | "Health Infra";

interface NewsletterCard {
  id: number;
  img: any; // Consider using a more specific type for images
  category: string;
  title: string;
  sectors: SectorType;
  date: string;
  description: string;
  link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ["All", "Publication year"];
const YEARS = ["2025","2024","2023", "2022"] as const;
const SECTORS: SectorType[] = [
  "All",
  "Transportation",
  "Water and Sanitation",
  "Energy",
  "Urban Planning",
  "Rural and Agri Infra",
  "Education",
  "Health Infra",
];
const INITIAL_VISIBLE_COUNT = 3;

const allcards = [
    {
    id:62,
    img: "/assets/archive/newsAndMedia/budget.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "December 2025",
    description: "Budget should reemphasise infrastructure",
    link: "/assets/pdf/budget.jpg",
  },


   {
    id:61,
    img: "/assets/archive/newsAndMedia/confidence.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 2025",
    description: "Confidence in India's logistics cost",
    link: "/assets/pdf/confidence.pdf",
  },

    {
    id:60,
    img: "/assets/archive/newsAndMedia/crumbling.avif",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 2025",
    description: "Indian Cities are Crumbling",
    link: "/assets/pdf/crumbling.pdf",
  },
  {
    id:59,
    img: "/assets/archive/newsAndMedia/vande-bharat.jpg",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "September-October 2025",
    description: "Fast Forwarding Bharat: The Next Leap",
    link: "/assets/pdf/infrastructure.pdf",
  },
   {
    id:57,
    img: "/assets/archive/newsAndMedia/rail.webp",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 2025",
    description: "High-speed rail is the big move India",
    link: "/assets/pdf/highSpeedRail.pdf",
  },
   {
    id:58,
    img: "/assets/archive/newsAndMedia/image11.webp",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 2025",
    description: "Project choice key for Urban Challenge Fund",
    link: "/assets/pdf/projectChoice.pdf",
  },
  {
    id:56,
    img: "/assets/archive/newsAndMedia/energy.jpg",
    category: "News",
    title: "D.K. Sen",
    sectors: "",
    date: "",
    description: "India's Energy Security - The Road Ahead",
    link: "/assets/pdf/energySecurity.pdf",
  },
  {
    id:55,
    img: "/assets/knowledeg/researchPapers/02.jpg",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Sepetember 19, 2025",
    description: "Next game changer: High-speed rail",
    link: "/assets/pdf/speedRail.jpg",
  },
  {
    id:54,
    img: "/assets/archive/newsAndMedia/vrinda.png",
    category: "News",
    title: "Vrinda Singh and Priyanka Bains",
    sectors: "",
    date: "August 9, 2025",
    description: "Cold Rooms in Local Markets: Securing Farmers, Delivering Nutrition",
    link: "/assets/pdf/vrinda-singh-priyanka-bains.pdf",
  },
  {
    id:53,
    img: "/assets/archive/newsAndMedia/hyderbad.webp",
    category: "News",
    title: "Dr. Mutum Chaobisana",
    sectors: "",
    date: "August 9, 2025",
    description: "Hyderabad's FSI deregulation:  A missed opportunity",
    link: "/assets/pdf/hyderabad-fSI-deregulation.pdf",
  },
   {
    id:52,
    img: "/assets/archive/newsAndMedia/womanEmpowerment.jpg",
    category: "News",
    title: "Rumjhum Chatterjee",
    sectors: "",
    date: "August 9, 2025",
    description: "Empowering Women for Viksit Bharat 2047",
    link: "/assets/pdf/empowering-women-for-viksit-bharat.pdf",
  },
    {
    id:51,
    img: "/assets/archive/newsAndMedia/urbanFund.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 20, 2025",
    description: "Shaping the Urban Challenge Fund",
    link: "/assets/pdf/shaping-the-urban-challenge-fund.pdf",
  },
   {
    id:50,
    img: "/assets/archive/newsAndMedia/coal.jpg",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 18,2025",
    description: "Coal, Clean, Air and  a Welcome Resolution",
    link: "/assets/pdf/coalClean.pdf",
  },
  {
    id:49,
    img: "/assets/archive/newsAndMedia/ropeway.jpg",
    category: "News",
    title: "Kaveree Bamzai",
    sectors: "",
    date: "July 18,2025",
    description: "Long haul:A national ropeway policy would aid urban mobility",
    link: "/assets/archive/newsAndMedia/kaveeryMamRopways.jpeg",
  },

   {
    id:48,
    img: "/assets/archive/newsAndMedia/planning.jpeg",
    category: "News",
    title: "Jagan Shah",
    sectors: "",
    date: "May 26, 2025",
    description: "Why India needs a National Plan for building new cities",
    link: "/assets/pdf/nationPlan.jpeg",
  },
     {
    id:47,
    img: "/assets/archive/newsAndMedia/urbanCity.jpg",
    category: "News",
    title: "Jagan Shah",
    sectors: "",
    date: "June 29, 2016",
    description: "Achieving urban transformation",
    link: "https://www.livemint.com/Specials/0wxSvak7tbTqqjYXjjD1LO/Achieving-urban-transformation.html",
  },
  {
    id: 1,
    img: "/assets/archive/newsAndMedia/newsMedia9.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "January 4, 2023",
    description: "Infra brushstrokes for the budget ",
    link: "/assets/pdf/1.pdf",
  },
  {
    id: 2,
    img: "/assets/archive/newsAndMedia/newsMedia3.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "December 9, 2022",
    description:
      "Infravisioning: It's time to embrace the idea of coastal economic zones",
    link: "https://www.ndtvprofit.com/business/its-time-to-embrace-the-idea-of-coastal-economic-zones-infravisioning-with-vinayak-chatterjee",
  },
  {
    id: 3,
    img: "/assets/archive/newsAndMedia/newsMedia4.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 25, 2022",
    description:
      "Infravisioning: Funding done, focus now must shift to project execution",
    link: "https://www.ndtvprofit.com/opinion/funding-done-focus-now-must-shift-to-project-execution-infravisioning",
  },
  {
    id: 4,
    img: "/assets/archive/newsAndMedia/newsMedia1.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 11, 2022",
    description:
      "Infravisioning: Nine reasons India needs a new highway services authority",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-nine-reasons-india-needs-a-new-highway-services-authority",
  },
  {
    id: 5,
    img: "/assets/archive/newsAndMedia/newsMedia2.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 28, 2022",
    description:
      "Infravisioning: Why green is the best among many colours of hydrogen",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-why-green-is-the-best-among-many-colours-of-hydrogen",
  },
  {
    id: 6,
    img: "/assets/archive/newsAndMedia/newsMedia5.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 20, 2022",
    description: "Infravisioning: How safe are India's dams?",
    link: "/assets/pdf/2.pdf",
  },

  {
    id: 7,
    img: "/assets/archive/newsAndMedia/newsMedia8.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "September 29, 2022",
    description:
      "Infravisioning: India’s big attempt to fix its logistics snarl",
    link: "https://www.ndtvprofit.com/business/infravisioning-indias-big-attempt-to-fix-its-logistics-snarl",
  },
  {
    id: 8,
    img: "/assets/archive/newsAndMedia/newsMedia7.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "September 16, 2022",
    description:
      "Infravisioning: How the screws are getting tightened on power Discoms",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-how-the-screws-are-getting-tightened-on-power-discoms",
  },
  {
    id: 9,
    img: "/assets/archive/newsAndMedia/newsMedia11.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 31, 2022",
    description: "A quarter century of PPP",
    link: "https://www.business-standard.com/article/opinion/a-quarter-century-of-public-private-partnership-122083101156_1.html",
  },
  {
    id: 10,
    img: "/assets/archive/newsAndMedia/newsMedia6.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 25, 2022",
    description: "Infravisioning: A historic reform in public procurement",
    link: "https://www.ndtvprofit.com/opinion/infravisioning-a-historic-reform-in-public-procurement",
  },
  {
    id: 11,
    img: "/assets/archive/newsAndMedia/newsMedia13.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 3, 2022",
    description: "IFS: Getting set to make an impact ",
    link: "/assets/pdf/3.pdf",
  },

  {
    id: 12,
    img: "/assets/archive/newsAndMedia/newsMedia16.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 6, 2022",
    description: "Unleashing the ropeways",
    link: "/assets/pdf/4.pdf",
  },
  {
    id: 13,
    img: "/assets/archive/newsAndMedia/newsMedia10.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "June 7, 2022",
    description: "Urban mining",
    link: "/assets/pdf/5.pdf",
  },
  {
    id: 14,
    img: "/assets/archive/newsAndMedia/newsMedia12.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "May 4, 2022",
    description: "How safe are India’s dams?",
    link: "/assets/pdf/6.pdf",
  },
  {
    id: 15,
    img: "/assets/archive/newsAndMedia/newsMedia15.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "April 6, 2022",
    description: "Measures to rejunevate Public-Private Partnerships",
    link: "https://www.business-standard.com/article/opinion/measures-to-rejuvenate-public-private-partnerships-122040501433_1.html",
  },
  {
    id: 16,
    img: "/assets/archive/newsAndMedia/newsMedia18.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "March 2, 2022",
    description: "Procurement policy needs to cover more ground",
    link: "/assets/pdf/7.pdf",
  },
  {
    id: 17,
    img: "/assets/archive/newsAndMedia/newsMedia17.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "Feburary 4, 2022",
    description: "Time to focus on project execution ",
    link: "/assets/pdf/8.pdf",
  },
  {
    id: 18,
    img: "/assets/archive/newsAndMedia/newsMedia14.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "January 10, 2022",
    description: "Infra expectations from Budget",
    link: "/assets/pdf/9.pdf",
  },
  {
    id: 19,
    img: "/assets/archive/newsAndMedia/newsMedia19.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "June 20, 2025",
    description: "Private capital to revive nuclear agenda",
    link: "/assets/pdf/privateCapital.pdf",
  },
  {
    id: 20,
    img: "/assets/archive/newsAndMedia/newsMedia20.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "May 16, 2025",
    description: "Leading private capital to social infra",
    link: "/assets/pdf/leadingPrivate.pdf",
  },
  {
    id: 21,
    img: "/assets/archive/newsAndMedia/newsMedia21.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "April 18, 2025",
    description: "Flying commutes: Air taxes set for takeoff",
    link: "/assets/pdf/flyingCommutes.pdf",
  },
   {
    id: 22,
    img: "/assets/archive/newsAndMedia/newsMedia22.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "March 21, 2025",
    description: "Recasting India’s infra ambitions",
    link: "/assets/pdf/recastingIndia.pdf",
  },
  {
    id: 23,
    img: "/assets/archive/newsAndMedia/newsMedia23.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "February 19, 2025",
    description: "Move fast on high-speed rail",
    link: "/assets/pdf/moveFast.pdf",
  },
  {
    id: 24,
    img: "/assets/archive/newsAndMedia/newsMedia24.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "January 17, 2025",
    description: "Infra outlays: Hopes from the Budget",
    link: "/assets/pdf/infraOutlays.pdf",
  },
  {
    id: 25,
    img: "/assets/archive/newsAndMedia/newsMedia25.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "December 20, 2024",
    description: "Forests await better compensation",
    link: "/assets/pdf/forestsAwait.pdf",
  },
   {
    id: 26,
    img: "/assets/archive/newsAndMedia/newsMedia26.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 15, 2024",
    description: "Time to assess impact of procurement reforms",
    link: "/assets/pdf/timeAssess.pdf",
  },
   {
    id: 27,
    img: "/assets/archive/newsAndMedia/newsMedia27.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 18, 2024",
    description: "India should join World Bank’s dispute centre",
    link: "/assets/pdf/indiaWorldBank.pdf",
  },
  {
    id: 28,
    img: "/assets/archive/newsAndMedia/newsMedia28.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "September 13, 2024",
    description: "New smart cities: Packing more punch",
    link: "/assets/pdf/newSmart.pdf",
  },
   {
    id: 29,
    img: "/assets/archive/newsAndMedia/newsMedia29.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 16, 2024",
    description: "Group taxation regime for infrastructure",
    link: "/assets/pdf/groupTaxation.pdf",
  },
  {
    id:30,
    img: "/assets/archive/newsAndMedia/newsMedia30.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 16, 2024",
    description: "Agri-warehousing needs attention",
    link: "/assets/pdf/agriWarehousing.pdf",
  },
  {
    id:31,
    img: "/assets/archive/newsAndMedia/newsMedia31.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "June 6, 2024",
    description: "RBI’s draft provisions create a flutter",
    link: "/assets/pdf/rbiDraft.pdf",
  },
  {
    id:32,
    img: "/assets/archive/newsAndMedia/newsMedia32.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "April 23, 2024",
    description: "Digital infra: Pushing chips hard",
    link: "/assets/pdf/digitalInfra.pdf",
  },
   {
    id:33,
    img: "/assets/archive/newsAndMedia/newsMedia48.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "March 20, 2024",
    description: "Infra visions in manifestos",
    link: "/assets/pdf/infraManiframe.pdf",
  },
  {
    id:34,
    img: "/assets/archive/newsAndMedia/newsMedia34.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "February 28, 2024",
    description: "Elections, manifestos, and the infra agenda",
    link: "/assets/pdf/elections.pdf",
  },
  {
    id:35,
    img: "/assets/archive/newsAndMedia/newsMedia35.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "January 26, 2024",
    description: "Getting to grips with logistics cost",
    link: "/assets/pdf/getting.pdf",
  },
   {
    id:36,
    img: "/assets/archive/newsAndMedia/newsMedia36.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "December 28, 2023",
    description: "Storage: New challenge for renewables",
    link: "/assets/pdf/storage.pdf",
  },
  {
    id:37,
    img: "/assets/archive/newsAndMedia/newsMedia47.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "November 22, 2023",
    description: "Mundra Port@25: Trailblazing entrepreneurship",
    link: "/assets/pdf/mundraPort.pdf",
  },
  {
    id:38,
    img: "/assets/archive/newsAndMedia/newsMedia38.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "October 11, 2023",
    description: "The essentials of G20’s corridor initiative",
    link: "/assets/pdf/theEssentials.pdf",
  },
  {
    id:39,
    img: "/assets/archive/newsAndMedia/newsMedia39.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "September 13, 2023",
    description: "Stopping by at Galathea Bay",
    link: "/assets/pdf/stopping.pdf",
  },
  {
    id:40,
    img: "/assets/archive/newsAndMedia/newsMedia40.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "August 3, 2023",
    description: "Electricity: Getting the timing right",
    link: "/assets/pdf/electricity.pdf",
  },
  {
    id:41,
    img: "/assets/archive/newsAndMedia/newsMedia41.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "July 18, 2023",
    description: "Moving ahead with small modular reactors",
    link: "/assets/pdf/movingAhead.pdf",
  },
  {
    id:42,
    img: "/assets/archive/newsAndMedia/newsMedia42.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "June 29, 2023",
    description: "Transmission needs a level playing field",
    link: "/assets/pdf/transmission.pdf",
  },
  {
    id:43,
    img: "/assets/archive/newsAndMedia/newsMedia43.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "May 12, 2023",
    description: "SC directions to benefit electricity consumers",
    link: "/assets/pdf/scDirections.pdf",
  },
  {
    id:44,
    img: "/assets/archive/newsAndMedia/newsMedia45.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "April 19, 2023",
    description: "Private enterprise & renaissance of ports sector",
    link: "/assets/pdf/privateEnterprise.pdf",
  },
  {
    id:45,
    img: "/assets/archive/newsAndMedia/newsMedia44.png",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "March 22, 2023",
    description: "Moving ahead with Gati Shakti",
    link: "/assets/pdf/movingGatiShakti.pdf",
  },
  {
    id:46,
    img: "/assets/archive/newsAndMedia/newsMedia46.jpg",
    category: "News",
    title: "Vinayak Chatterjee",
    sectors: "",
    date: "February 22, 2023",
    description: "Rooftop solar for poverty alleviation",
    link: "https://www.business-standard.com/article/opinion/rooftop-solar-for-poverty-alleviation-123022101397_1.html",
  },
 
 
  
  
];

export default function NewsAndMedia() {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<FilterType>("All");
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const scrollToCenter = (index: number) => {
    const tab = tabRefs.current[index];
    const container = containerRef.current;

    if (tab && container) {
      const offset =
        tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  const handleTabClick = (tab: FilterType) => {
    setSelectedTab(tab);
    setSelectedFilter(
      tab === "Publication year"
        ? YEARS[0]
        : tab === "sectors"
        ? SECTORS[0]
        : "All"
    );
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterClick = (filterName: string, index: number) => {
    setSelectedFilter(filterName);
    scrollToCenter(index);
  };

  const filteredCards = useMemo(() => {
    if (selectedTab === "Publication year") {
      return allcards.filter(
        (card) => card.date.split(" ").pop() === selectedFilter
      );
    }
    if (selectedTab === "sectors" && selectedFilter !== "All") {
      return allcards.filter((card) => card.sectors === selectedFilter);
    }
    return allcards;
  }, [selectedTab, selectedFilter]);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const renderFilterButtons = (filters: readonly string[]) => (
    <div ref={containerRef} className="pt-5 overflow-scroll no-scrollbar">
      <div className="flex  gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            ref={(el: HTMLButtonElement | null) => {
              tabRefs.current[index] = el;
            }}
            className={`text-base cursor-pointer text-nowrap rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                            ${
                              selectedFilter === filter
                                ? "border border-pink text-white bg-pink font-medium"
                                : "border border-lightgray/30"
                            }`}
            onClick={() => handleFilterClick(filter, index)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <section id="news-and-media" className="bg-whitesmoke">
      <div className="w-container blade-top-padding-sm blade-bottom-padding ">
        {/* Header Section */}
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
          <h5 className="font-medium text-pink">In the News</h5>
        </div>

        <div className="py-3 max-w-3xl">
          <h1 className="text-black font-light">
            <span className="text-black font-medium">
              {" "}
              The Infravision Foundation{" "}
            </span>
            in the public sphere
          </h1>
        </div>

        {/* Filter Section */}
        <div className="pt-5">
          <div className="flex flex-col sm:flex-row gap-6 border-b border-darkgray/20">
            <div className="sm:border-r sm:border-darkgray/20">
              <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                Filter by
              </h5>
            </div>

            <div className="flex flex-row gap-5">
              {FILTER_TYPES.map((tab) => (
                <button
                  key={tab}
                  className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4
                                        ${
                                          selectedTab === tab
                                            ? "border border-pink text-pink font-medium"
                                            : "border border-lightgray/30"
                                        }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Buttons */}
          {selectedTab === "Publication year" && renderFilterButtons(YEARS)}
          {selectedTab === "sectors" && renderFilterButtons(SECTORS)}

          {/* Newsletter Cards */}
          <div
            className={`${
              selectedTab === "Publication year" ? "pt-8" : "pt-8"
            }`}
          >
            {filteredCards.length === 0 && (
              <div className="flex justify-center"> No results </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 xlg:gap-24">
              {filteredCards.slice(0, visibleCount).map((card) => (
                <div key={card.id}>
                  <NewsCard
                    date={card.date}
                    title={card.title}
                    image={card.img}
                    link={card.link}
                    category={card.category}
                    description={card.description}
                    
                    classes="line-clamp-3"
                    ctaType="read more"
                  />
                </div>
              ))}
            </div>
            {visibleCount < filteredCards.length && (
              <div className="flex w-full blade-top-padding-sm">
                <button
                  onClick={handleSeeMore}
                  className={`group mx-auto text-xl lg:text-2xl   text-pink hover:text-white   text-nowrap w-40  py-3 block text-center font-medium relative  overflow-hidden    transition-all duration-300`}
                >
                  <span className="z-20 relative">See more</span>
                  <span
                    className={`w-full  h-[1px] bg-pink absolute bottom-0 left-0 transition-all duration-300`}
                  ></span>
                  <span className="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-transparent group-hover:bg-pink rounded-full  group-hover:scale-[5] transition-all duration-700 ease-in-out z-0"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}





{/* <script async src="https://cse.google.com/cse.js?cx=850e8def017d04e42">
</script>
<div class="gcse-search"></div> */}