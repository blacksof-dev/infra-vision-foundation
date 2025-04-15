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

const colorMap = {
   white:" bg-white group-hover:bg-pink ",
   pink:" bg-pink group-hover:bg-white ",
   transparent:"bg-transparent"
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
   btnrole?:string
  borderColor: string;
  color: string;
  aarowColor?:string,
  bgColor?: keyof typeof colorMap;
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
  const colorClass = colorMap[bgColor ?? "white"];



  function handleClick() {
    if (role == "link") {
      console.log("Button for external links");
    } else if (role == "button") {
      console.log("Button for callback function");
    } else {
      console.log("fallback");
    }
  }



  return (
    <div className="w-fit group">
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
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300`}
          >
           <GoArrowRight className={`text-${aarowColor} group-hover:text-${bgColor} text-2xl`}/>
          </div>
        </Link>
      ) : (

        <div className="flex gap-2 lg:gap-4 items-center justify-center  w-fit">
          <h5 className={`text-${color} ${sizeClass}`}>{text}</h5>
          <button
            role={role}
            disabled={isDisabled}
            onClick={handleClick}
            {...rest}
            type={type === "button" ? "button" : "submit"}
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
           <GoArrowRight className={`   text-${aarowColor}  text-2xl`}/>
          </button>
        </div>
      
      )}
    </div>
  );
}


export function HeroBtnPink<T extends "submit" | "button">({
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
  const colorClass = colorMap[bgColor ?? "white"];



  function handleClick() {
    if (role == "link") {
      console.log("Button for external links");
    } else if (role == "button") {
      console.log("Button for callback function");
    } else {
      console.log("fallback");
    }
  }



  return (
    <div className="w-fit group">
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
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300`}
          >
           <GoArrowRight className={`text-white group-hover:text-pink text-2xl`}/>
          </div>
        </Link>
      ) : (

        <div className="flex gap-2 lg:gap-4 items-center justify-center  w-fit">
          <h5 className={`text-${color} ${sizeClass}`}>{text}</h5>
          <button
            role={role}
            disabled={isDisabled}
            onClick={handleClick}
            {...rest}
            type={type === "button" ? "button" : "submit"}
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
           <GoArrowRight className={`   text-${aarowColor}  text-2xl`}/>
          </button>
        </div>
      
      )}
    </div>
  );
}



export function BorderGrayHeroBtn<T extends "submit" | "button">({
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
  const colorClass = colorMap[bgColor ?? "white"];



  function handleClick() {
    if (role == "link") {
      console.log("Button for external links");
    } else if (role == "button") {
      console.log("Button for callback function");
    } else {
      console.log("fallback");
    }
  }



  return (
    <div className="w-fit group">
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
            className={`rounded-sm p-1 md:p-2 border-2 border-darkgray/50  w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 group-hover:bg-pink group-hover:border-pink`}
          >
           <GoArrowRight className={`text-pink group-hover:text-white text-2xl`}/>
          </div>
        </Link>
      ) : (

        <div className="flex gap-2 lg:gap-4 items-center justify-center  w-fit">
          <h5 className={`text-${color} ${sizeClass}`}>{text}</h5>
          <button
            role={role}
            disabled={isDisabled}
            onClick={handleClick}
            {...rest}
            type={type === "button" ? "button" : "submit"}
            className={`rounded-sm p-1 md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
            <GoArrowRight className={`text-${aarowColor}  text-2xl`}/>
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
    <div className="group">
      <button className={`text-${color}  text-md lg:text-xl relative font-medium`}>
          {title}
          <span
            className="w-10 sm:w-15 h-[1px] sm:h-[2px]  absolute bottom-0 left-0 top-7 group-hover:w-full"
            style={{ backgroundColor: underlineColor }}
          ></span>
        </button>
    </div>
  );
}
