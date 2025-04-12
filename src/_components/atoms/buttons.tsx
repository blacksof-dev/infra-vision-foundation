"use client";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const sizeMap = {
  small: "text-sm",
  base: "text-base",
  md: "text-md",
  large: "text-lg",
  extralarge: "text-sm sm:text-base lg:text-xl",
};

type MasterBtnProps<T extends "submit" | "button"> = {
  classes?: string;
  text: string;
  type?: T;
  size?: keyof typeof sizeMap;
  isDisabled?: boolean;
  role: "button" | "submit" | "link";
  link?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: T extends "submit" ? never : () => void;
  
  borderColor: string;
  color: string;
  aarowColor?:string,
  bgColor?: string;
};

export function HeroBtn<T extends "submit" | "button">({
  text,
  classes,
  type,
  size = "base",
  isDisabled,
  role = "button",
  link = "/",
  target = "_self",
  borderColor,
  bgColor,
  color,
  aarowColor,
  ...rest
}: MasterBtnProps<T>) {
  const sizeClass: string = sizeMap[size];

  function handleClick() {
    if (role == "link") {
      console.log("Button for external links");
    } else if (role == "button") {
      console.log("Button for callback function");
    } else {
      console.log("fallback");
    }
  }

  // const baseStyles = `w-7 h-7 md:w-10 md:h-10 rounded-sm p-1 md:p-2 border-2 
  //                   border-${borderColor} text-${color} bg-${bgColor}
  //                    text-xl 
  //                   transition-all duration-300`;

  return (
    <div className="w-fit">
      {  (role === "link" && link!= ' ')  ? (
        <Link
          href={link}
          target={target}
          className={`flex gap-2 lg:gap-4 items-center justify-center ${classes}`}
          role={role}
          onClick={handleClick}
          {...rest}
        >
          <h5 className={`text-${color} ${sizeClass}`}>{text}</h5>
          <div
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} bg-${bgColor} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300`}
          >
           <GoArrowRight className={`text-${aarowColor} text-2xl`}/>
          </div>
        </Link>
      ) : (
        <div className="flex gap-2 lg:gap-4 items-center justify-center w-fit">
          <h5 className={`text-${color} ${sizeClass}`}>{text}</h5>
          <button
            role={role}
            disabled={isDisabled}
            onClick={handleClick}
            {...rest}
            type={type === "button" ? "button" : "submit"}
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} bg-${bgColor} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes}`}
          >
            <GoArrowRight className={`text-${aarowColor} text-2xl`}/>
          </button>
        </div>
      )}
    </div>
  );
}

type MasterUnderlineBtnProps<T extends "submit" | "button"> = {
  classes?: string;
  type?: T;
  size?: keyof typeof sizeMap;
  isDisabled?: boolean;
  role: "button" | "submit" | "link";
  link?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: T extends "submit" ? never : () => void;
  color?: string;
  title: string;
  underlineColor?:string;
};

export function UnderlineCta<T extends "submit" | "button">(
  props: MasterUnderlineBtnProps<T>
) {
  const { title, color,underlineColor} = props;
  return (
    <div>
      <button className={`text-${color} text-md lg:text-xl relative font-medium`}>
          {title}
          <span
            className="w-10 sm:w-15 h-[1px] sm:h-[2px]  absolute bottom-0 left-0 top-7"
            style={{ backgroundColor: underlineColor }}
          ></span>
        </button>
    </div>
  );
}
