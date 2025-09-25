"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { ArrowRight } from "lucide-react";
import EventDetailsPopup from "./EventDetails";

// Event & Month Types
interface EventData {
  id: string;
  date: string;
  dayTime: string;
  meetingType: string;
  desc: string;
  ctaText: string | null;
  details?: any;
}

interface MonthData {
  month: string;
  events: EventData[];
}

const Upcoming = () => {
  const [years, setYears] = useState<string[]>([]);
  const [year, setYear] = useState<string>("");
  const [filterData, setFilteredData] = useState<MonthData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<EventData | null>(null);

  // 🔹 Fetch available years
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/outreach-and-engagements/years`)
      .then((res) => {
        const fetchedYears = res.data.years.map(String);
        setYears(fetchedYears);
        if (fetchedYears.length > 0) {
          setYear(fetchedYears[0]); 
        }
      })
      .catch((err) => console.error("Error fetching years:", err));
  }, []);


  useEffect(() => {
    if (!year) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/outreach-and-engagements/year/${year}`)
      .then((res) => {
        const events = res.data.data || [];

        // 🔹 Group events by month
        const grouped: { [key: string]: EventData[] } = {};
        events.forEach((event: EventData) => {
          const monthName = new Date(event.date).toLocaleString("default", {
            month: "long",
          });
          if (!grouped[monthName]) grouped[monthName] = [];
          grouped[monthName].push(event);
        });

      
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

        const formatted: MonthData[] = monthOrder.map((month) => ({
          month,
          events: grouped[month] || [], 
        }));

        setFilteredData(formatted);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, [year]);

  // 🔹 Popup open handler
  const handleEventPopup = (data: EventData) => {
    setIsOpen(true);
    setPopupData(data);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

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
                {years.map((y, idx) => (
                  <SelectItem key={idx} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className="bg-[#F6F6F6]  blade-top-margin-sm p4 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap6">
          {filterData.map((monthData, idx) => (
            <div
      className="p-4 border-l border-t border-[#E0E0E0] first:border-l-0 min-h-[300px] flex flex-col" 
      key={idx}
    >
              <h4 className="font-medium text-[#C82249] mb-3 text-lg inline-block">
                {monthData.month} {year}
              </h4>{" "}
              

              {monthData.events.length === 0 ? (
                <div className="">
                 
                </div>
              ) : (
                monthData.events.map((event, eventIdx) => (
                  <div
                    key={eventIdx}
                    className="bg-white p-4 mb-4 rounded shadow hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
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
                      <p className="text-base text-black mt-2">{event.desc}</p>

                      <button
                        onClick={() => handleEventPopup(event)}
                        className="pt-3 text-pink flex items-center gap-2 cursor-pointer group"
                      >
                        See more
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
