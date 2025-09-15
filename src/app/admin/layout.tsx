import React from "react";
import Sidebar from "./components/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex ">
      <div className="w-75 shrink-0">
        <Sidebar />
      </div>

      <div className="w-full p-4 ">{children}</div>
    </div>
  );
}
