import React from "react";
import { Button } from "./button";

type SectionHeadingType = {
  heading: string;
  description?: string;
  cta?: boolean;
  handleClick?: () => void;
  ctaText?: string;
};
export default function SectionHeading({
  heading,
  description,
  ctaText,
  handleClick,
  cta,
}: SectionHeadingType) {
  return (
    <div className="flex justify-between py-3 border-b border-b-gray">
      <div className="">
        <h3>{heading}</h3>
        {description && <p className="pt-1">{description}</p>}
      </div>
      {cta && ctaText && (
        <div className=" flex items-end">
          <Button
            theme="pink"
            text={ctaText}
            size="base"
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}
