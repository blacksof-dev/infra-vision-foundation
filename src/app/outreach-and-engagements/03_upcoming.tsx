import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";

const Upcoming = () => {
  const [month, setMonth] = useState("All");

  const data = [
      {
        month: "January",
        events: [
          {
            date: '19',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
          {
            date: '24',
            dayTime: "Friday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "Feburary",
        events: [
          {
            date: '02',
            dayTime: "Wednesday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "March",
        events: [
          {
            date: '12',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
          {
            date: '30',
            dayTime: "Friday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "April",
        events: [
          {
            date: '02',
            dayTime: "Wednesday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "May",
        events: [
          {
            date: '07',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "June",
        events: [
          {
            date: '15',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
          {
            date: '28',
            dayTime: "Friday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "July",
        events: [
          {
            date: '16',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "August",
        events: [
          {
            date: '14',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
          {
            date: '29',
            dayTime: "Friday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "September",
        events: [
          {
            date: '17',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "October",
        events: [
          {
            date: '28',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "November",
        events: [
          {
            date: '02',
            dayTime: "Monday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
          {
            date: '27',
            dayTime: "Friday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
      {
        month: "December",
        events: [
          {
            date: '19',
            dayTime: "Wednesday, 7:00 PM",
            desc: "InfraKatha #7, with Mr. William <br/> Dalrymple, Historian and Author"
          },
        ]
      },
    ];

  const filteredData = month === "All"
    ? data
    : data.filter(item => item.month === month);

  return (
    <section className='blade-top-padding blade-bottom-padding-lg'>
      <div className='w-container'>
        <div>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
            <h5 className="font-medium text-pink">Upcoming Programmes</h5>
          </div>
          <div className="pt-4 pb-2 md:py-5 flex flex-col md:flex-row justify-between gap-4">
            <h1 className="text-black font-light text-2xl md:text-3xl">
              See <span className='font-medium'>what’s on</span> the horizon
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 w-full md:w-[70%] mt-6'>
          <div className="relative">
            <h5 className='text-[#0A0A0A] mb-2'>Month</h5>
            <Select value={month} onValueChange={(value) => setMonth(value)}>
              <SelectTrigger className='text-[#C82249]'>
                <SelectValue placeholder="Select the month" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-lightgray rounded-sm">
                <SelectItem value="All">All</SelectItem>
                {data.map((elem, idx) => (
                  <SelectItem key={idx} value={elem.month}>
                    {elem.month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <h5 className='text-[#0A0A0A] mb-2'>Event category</h5>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-lightgray rounded-sm">
                <SelectItem value="All">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Grid */}
        <div className='bg-[#F6F6F6] blade-top-margin-sm p4 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap6'>
          {filteredData.map((monthData, idx) => (
            <div className='p-4 border-l border-t border-[#E0E0E0] first:border-l-0' key={idx}>
              <h4 className="font-medium text-[#C82249] mb-3 text-lg">{monthData.month}</h4>
              {monthData.events.map((event, eventIdx) => (
                <div
                  key={eventIdx}
                  className='bg-white p-4 mb-4 rounded shadow hover:shadow-md transition-shadow duration-200'
                >
                  <div className='flex items-center gap-2 mb-2'>
                    <h3 className='font-semibold text-lg'>{event.date}</h3>
                    <div className='h-6 w-[1px] bg-[#6E7478]' />
                    <p className='text-[#5D6468] text-sm'>{event.dayTime}</p>
                  </div>
                  <div
                    className='text-sm text-[#333]'
                    dangerouslySetInnerHTML={{ __html: event.desc }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
