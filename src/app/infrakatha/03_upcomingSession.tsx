import EventTemplate from "@/_components/molecules/eventTemplate";
import React from "react";

export default function UpcomingSession() {
  return (
    <section className="bg-pink blade-top-padding-lg blade-bottom-padding-lg">
      <div className="w-container">
        <div className="flex flex-row items-center gap-2 mb-2">
          <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
          <h5 className="font-medium text-white">Upcoming Sessions</h5>
        </div>
        <div className="sm:py-3 ">
          <h1 className="text-white  font-light">
            A Glimpse of
            <span className="text-white font-medium ">{" "}What’s Next</span>
          </h1>
        </div>
        <EventTemplate />
      </div>
    </section>
  );
}
