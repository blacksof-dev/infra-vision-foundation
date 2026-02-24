"use client";
import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../admin/components/button";

export default function ServiceUnavailablePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-pink/10 rounded-full flex items-center justify-center text-pink">
            <AlertTriangle size={40} />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-black mb-4">503</h1>
        <h2 className="text-2xl font-semibold text-black mb-4">
          Service Temporarily Unavailable
        </h2>

        <p className="text-darkgray text-lg mb-8">
          The server is currently unable to handle the request.   Please try
          again later.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            text="Try Again"
            theme="pink"
            size="large"
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2"
          />

          {/* <div className="flex items-center justify-center gap-2 text-sm text-lightgray">
            <RefreshCw size={14} className="animate-none" />
            <span>Automatic check in progress</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
