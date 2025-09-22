"use client";

import Link from "next/link";
import LoadingSpinner from "./loading";
import React from "react";
import { cn } from "@/lib/utils";

type ButtonTheme = "pink" | "transparentPink" | "transparentGray";
type ButtonSize = "small" | "base" | "large";

type HeroBtnProps = {
  text: string;
  theme: ButtonTheme;
  size?: ButtonSize;
  type?: "button" | "submit";
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  link?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  role?: "button" | "link";
  className?: string;
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "text-sm px-4 py-2",
  base: "text-base px-6 py-2",
  large: "text-lg px-8 py-2",
};

const themeClasses: Record<ButtonTheme, string> = {
  pink: "bg-pink text-white rounded-md  hover:bg-pink/90 hover:shadow-lg",
  transparentPink:
    "bg-transparent text-pink border border-pink rounded-md hover:bg-pink hover:text-white hover:shadow-lg",
  transparentGray:
    "bg-transparent text-darkgray border border-darkgray rounded-md hover:bg-darkgray hover:text-white hover:shadow-xl",
};

export function Button({
  text,
  theme,
  size = "base",
  type = "button",
  isDisabled = false,
  isLoading = false,
  onClick,
  link,
  target = "_self",
  role = "button",
  className = "",
}: HeroBtnProps) {
  const sizeClass = sizeClasses[size];
  const themeClass = themeClasses[theme];

  const content = isLoading ? (
    <LoadingSpinner classes="w-6 h-6" />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: text }} />
  );

  if (role === "link" && link) {
    return (
      <Link
        href={link}
        target={target}
        className={cn(
          ` inline-flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`,
          themeClass,
          sizeClass,
          className
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        ` inline-flex items-center justify-center cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`,
        themeClass,
        sizeClass,
        className
      )}
    >
      {content}
    </button>
  );
}
