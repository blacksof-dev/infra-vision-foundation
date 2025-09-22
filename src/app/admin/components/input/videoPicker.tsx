"use client";

import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";

const VideoPicker = ({
  errors,
  label,
  register,
  registerer,
  watcher,
  accept,
  tooltip,
}: {
  errors: any;
  label: string;
  register: any;
  registerer: string;
  watcher: any;
  accept: string;
  tooltip?: string;
}) => {
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    if (typeof watcher === "string") {
      setVideoURL(watcher);
    } else if (watcher?.length > 0) {
      setVideoURL(URL.createObjectURL(watcher[0]));
    }
  }, [watcher]);

  return (
    <div>
      <div className="font-medium pb-1.5 flex justify-between">
        <label>{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div
        className={`border-[#ecedec] border-1 relative cursor-pointer rounded-lg h-[50px] flex items-center pl-3 transition-colors font-regular focus-within:border-orange
          ${errors ? "!border-red-500" : ""}`}
      >
        {videoURL && (
          <video src={videoURL} aria-hidden className="max-h-11 w-auto" />
        )}
        {!videoURL && " No file choosen"}
        <input
          type={"file"}
          {...register(registerer)}
          className="opacity-0 d w-full h-full absolute left-0 top-0 cursor-pointer z-10 file:cursor-pointer"
          title=""
          accept={accept}
        />
      </div>
      {errors && (
        <p className="text-red-500 text-[15px] pt-1">{errors.message}</p>
      )}
    </div>
  );
};

export default VideoPicker;
