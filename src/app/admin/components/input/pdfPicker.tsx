"use client";

import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";

const PdfPicker = ({
  errors,
  label,
  register,
  registerer,
  watcher,
  accept = ".pdf",
  tooltip,
}: {
  errors: any;
  label: string;
  register: any;
  registerer: string;
  watcher: any;
  accept?: string;
  tooltip?: string;
}) => {
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (typeof watcher === "string") {
      const parts = watcher.split("/");
      setFileName(parts[parts.length - 1] || "");
    } else if (watcher?.length > 0) {
      setFileName(watcher[0]?.name || "");
    } else {
      setFileName("");
    }
  }, [watcher]);

  return (
    <div>
      <div className="font-medium pb-1.5 flex justify-between">
        <label>{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div
        className={`border-[#ecedec] border-1 relative cursor-pointer rounded-lg h-[50px] flex items-center px-3 transition-colors font-regular focus-within:border-orange w-full overflow-hidden
          ${errors ? "!border-red-500" : ""}`}
      >
        <span className="truncate text-sm text-darkgray/80">
          {fileName || "No file chosen"}
        </span>
        <input
          type={"file"}
          {...register(registerer)}
          className="opacity-0 w-full h-full absolute left-0 top-0 cursor-pointer z-10 file:cursor-pointer"
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

export default PdfPicker;
