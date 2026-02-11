"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/sidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/admin/login";

  return (
    <div className="flex max-w-[1920px] w-full mx-auto">
      {showSidebar && (
        <div className="w-75 shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="w-full p-4 h-screen overflow-x-hidden overflow-y-scroll ">
        {children}
      </div>
    </div>
  );
}
