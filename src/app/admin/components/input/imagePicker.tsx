"use client";

import React, { useEffect, useState } from "react";
import Tooltip from "./tooltip";

const ImagePicker = ({
  errors,
  label,
  register,
  registerer,
  accept,
  watcher,
  tooltip,
}: {
  errors: any;
  label: string;
  register: any;
  registerer: string;
  accept: string;
  watcher: any;
  tooltip?: string;
}) => {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    if (typeof watcher === "string") {
      setImgURL(`${process.env.NEXT_PUBLIC_HOST_URL}` + watcher);
    } else if (watcher?.length > 0) {
      setImgURL(URL.createObjectURL(watcher[0]));
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
        {imgURL && <img src={imgURL} aria-hidden className="max-h-11 w-auto" />}
        {!imgURL && " No file choosen"}
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

export default ImagePicker;
