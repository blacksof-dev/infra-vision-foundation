"use client";

import React, { useState } from "react";
import Tooltip from "./tooltip";

const MessageInput = ({
  errors,
  label,
  placeholder,
  register,
  registerer,
  tooltip,
}: {
  errors: any;
  label: string;
  placeholder: string;
  register: any;
  registerer: string;
  tooltip?: string;
}) => {
  return (
    <div>
      <div className="font-medium pb-1.5 flex justify-between">
        <label>{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div
        className={`border-[#ecedec] border-1 overflow-hidden rounded-lg h-auto flex items-center pl-3 transition-colors font-regular focus-within:border-orange
            ${errors ? "!border-red-500" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 24 24"
          className="self-start mt-1"
        >
          <path
            fill="currentColor"
            d="M4 17V7zm.615 1q-.69 0-1.152-.462Q3 17.075 3 16.385v-8.77q0-.69.463-1.152Q3.925 6 4.615 6h14.77q.69 0 1.152.463q.463.462.463 1.152v5.275q-.233-.188-.473-.322q-.24-.133-.527-.256V7.615q0-.23-.192-.423Q19.615 7 19.385 7H4.615q-.23 0-.423.192Q4 7.385 4 7.615v8.77q0 .23.192.423q.193.192.423.192h7.427q-.011.135-.014.247q-.003.113-.003.253t.003.253q.003.112.014.247zm3.616-3.77v1.54h4.061q.143-.422.337-.807q.194-.384.44-.732zm-3-3v1.54h1.538v-1.54zm3 0v1.54h1.538v-1.54zm3 0v1.54h1.538v-1.54zm3 0v1.54h.315q.28-.2.587-.344q.305-.143.636-.268v-.927zm3 0v.62q.115-.012.228-.027q.112-.015.233-.015q.275 0 .542.034q.266.035.535.085v-.696zm-12-3v1.54h1.538V8.23zm3 0v1.54h1.538V8.23zm3 0v1.54h1.538V8.23zm3 0v1.54h1.538V8.23zm3 0v1.54h1.538V8.23zm.461 12.558l-.688-.688L19.06 18h-4.868v-1h4.868l-2.056-2.1l.688-.688l3.289 3.288z"
          />
        </svg>
        <textarea
          rows={3}
          type={"text"}
          {...register(registerer)}
          className={`ml-2.5 rounded-lg border-none w-11/12 h-full outline-none font-regular pt-1`}
          placeholder={placeholder}
        />
      </div>
      {errors && (
        <p className="text-red-500 text-[15px] pt-1">{errors.message}</p>
      )}
    </div>
  );
};

export default MessageInput;
