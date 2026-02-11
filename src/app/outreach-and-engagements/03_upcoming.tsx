"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { ArrowRight } from "lucide-react";
import EventDetailsPopup from "./EventDetails";

// Interface Definitions
interface EventImage {
  image: string;
  description?: string;
}

interface EventDetails {
  images: EventImage[];
  date: string;
  content: string;
  cta?: {
    ctaText: string;
    link: string;
  };
}

interface EventData {
  id: string;
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  details?: EventDetails;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  ctaText?: string;
}

interface YearsResponse {
  years: number[];
  count: number;
  lastUpdated: string;
}

interface EventsResponse {
  data: EventData[];
  year: number;
  count: number;
  lastUpdated: string;
}

interface MonthData {
  month: string;
  events: EventData[];
}

const Upcoming = () => {
  const [year, setYear] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<EventData | null>(null);

  // 1. Fetch Years
  const { data: yearsData, isSuccess: yearsLoaded } = useQuery<YearsResponse>({
    queryKey: ["outreach-years"],
    queryFn: () => getFetch<YearsResponse>("/outreach-and-engagements/years"),
  });

  // Set initial year when years are fetched
  useEffect(() => {
    if (
      yearsLoaded &&
      yearsData?.years &&
      yearsData.years.length > 0 &&
      !year
    ) {
      setYear(String(yearsData.years[0]));
    }
  }, [yearsData, yearsLoaded, year]);

  // 2. Fetch Events for selected year
  const { data: eventsData } = useQuery<EventsResponse>({
    queryKey: ["outreach-events", year],
    queryFn: () =>
      getFetch<EventsResponse>(`/outreach-and-engagements/year/${year}`),
    enabled: !!year,
  });

  // 3. Process/Group Events by Month
  const filteredData: MonthData[] = useMemo(() => {
    if (!eventsData?.data) return [];

    const grouped: { [key: string]: EventData[] } = {};

    // Initialize all months with empty arrays
    const monthOrder = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthOrder.forEach((m) => (grouped[m] = []));

    eventsData.data.forEach((event) => {
      const dateObj = new Date(event.date);
      // Valid date check
      if (!isNaN(dateObj.getTime())) {
        const monthName = dateObj.toLocaleString("default", { month: "long" });
        if (grouped[monthName]) {
          grouped[monthName].push(event);
        }
      }
    });

    return monthOrder.map((month) => ({
      month,
      events: grouped[month] || [],
    }));
  }, [eventsData]);

  // Popup handlers
  const handleEventPopup = (data: EventData) => {
    // Create a copy of the data to avoid mutating the original query cache
    // and transform image URLs
    const processedData = {
      ...data,
      details: data.details
        ? {
            ...data.details,
            images: data.details.images.map((img) => ({
              ...img,
              image: getUrl(img.image),
            })),
          }
        : undefined,
    };

    setPopupData(processedData);
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const sortedYears = yearsData?.years?.map(String) || [];

  return (
    <section className="blade-top-padding blade-bottom-padding-lg relative">
      <img
        className="absolute opacity-60 z-0 top-0 right-0 hidden lg:block"
        src="/assets/outreach-and-engagements/highlight/circle.png"
        alt="Decorative Circle"
      />

      <div className="w-container">
        {/* Heading */}
        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Calendar</h5>
          </div>
          <div className="pt-2 sm:pt-4 flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-black font-light">
              A glance at our
              <span className="font-medium">
                {" "}
                past and <br /> upcoming engagements
              </span>
            </h1>
          </div>
        </div>

        {/* Year Filter */}
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-6 w-full md:w-[70%] mt-9">
          <div className="relative">
            <h5 className="text-[#0A0A0A] mb-2">Year</h5>
            <Select value={year} onValueChange={(value) => setYear(value)}>
              <SelectTrigger className="text-[#C82249]">
                <SelectValue placeholder="Select the year" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-lightgray rounded-sm">
                {sortedYears.map((y, idx) => (
                  <SelectItem key={idx} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="bg-[#F6F6F6]  blade-top-margin-sm  rounded-t-none rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
          {filteredData.map((monthData, idx) => (
            <div
              className="p-4 border-l border-t border-[#E0E0E0] first:border-l-0 min-h-[300px] flex flex-col"
              key={idx}
            >
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {monthData.month} {year}
              </h4>

              {monthData.events.length === 0 ? (
                <div className=""></div>
              ) : (
                monthData.events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="bg-white p-4 mb-4 rounded shadow hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {/* Ensure valid date before calling getDate */}
                      <h3 className="font-semibold text-lg">
                        {new Date(event.date).getDate()}
                      </h3>
                      <div className="h-6 w-[1px] bg-[#6E7478]" />
                      <p className="text-[#5D6468] text-sm">{event.dayTime}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink rounded-full block"></span>
                      <p className="text-sm text-[#333]">{event.meetingType}</p>
                    </div>
                    <div>
                      <p className="text-base text-black mt-2 line-clamp-3">
                        {event.desc}
                      </p>

                      <button
                        onClick={() => handleEventPopup(event)}
                        className="pt-3 text-pink flex items-center gap-2 cursor-pointer group"
                      >
                        {/* {event.details?.cta?.ctaText || "See details"} */}
                        {"See details"}
                        <span className="flex justify-center items-center border border-lightgray rounded-sm p-1 group-hover:bg-pink group-hover:text-white group-hover:border-pink transition duration-300 ease-linear">
                          <ArrowRight width={14} height={14} />
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Event Popup */}
      {isOpen && popupData && (
        <EventDetailsPopup onClose={() => setIsOpen(false)} data={popupData} />
      )}
    </section>
  );
};

export default Upcoming;
