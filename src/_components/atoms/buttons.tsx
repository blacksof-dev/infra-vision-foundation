"use client";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const sizeMap = {
  small: "text-sm",
  base: "text-base",
  md: "text-md",
  large: "text-lg",
  extralarge: "text-lg lg:text-xl",
  xxlsize: "text-xl lg:text-2xl",
};

const colorMap = {
  white: " bg-white group-hover:bg-pink ",
  pink: " bg-pink group-hover:bg-white ",
  transparent: "bg-transparent",
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
  btnrole?: string;
  borderColor: string;
  color: string;
  aarowColor?: string;
  bgColor?: keyof typeof colorMap;
  handlefun?: () => void;
  handlepopup?:()=> void;
};
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
  underlineColor?: string;
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
      {role === "link" && link != " " ? (
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
            className={`rounded-sm p-1 relative md:p-2 border-2 border-pink overflow-hidden   w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300  `}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-pink  group-hover:text-white text-2xl z-[2]`}
            />
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
            className={`rounded-sm relative p-1 md:p-2 border-2 border-${borderColor} overflow-hidden text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-pink  group-hover:text-white text-2xl z-[2]`}
            />
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
      {role === "link" && link != " " ? (
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
            className={`rounded-sm p-1 relative overflow-hidden md:p-2 border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center  transition-all duration-300`}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-white  group-hover:text-pink text-2xl z-[2]`}
            />
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
            className={`rounded-sm p-1 md:p-2 relative overflow-hidden border-2 border-${borderColor} text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-white  group-hover:text-white text-2xl z-[2]`}
            />
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
  handlepopup,
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
      {role === "link" && link != " " ? (
        <Link
          href={link}
          target={target}
          className={`flex gap-2 lg:gap-4 items-center justify-center ${classes}`}
          role={role}
          onClick={handleClick}
          {...rest}
        >
          <h5 className={`text-${color} ${sizeClass} font-medium`}>{text}</h5>
          <div
            className={`rounded-sm p-1  relative md:p-2 border-2 border-darkgray/50 group-hover:border-transparent  overflow-hidden group-hover:rounded  w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300  `}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-pink  group-hover:text-white text-2xl z-[2]`}
            />
          </div>
        </Link>
      ) : (
        <div  onClick={handlepopup} className="flex gap-2 lg:gap-4 items-center justify-center  w-fit">
          <h5 className={`text-${color} ${sizeClass} cursor-pointer font-medium`}>{text}</h5>
          <button
            role={role}
            disabled={isDisabled}
           

            {...rest}
            type={type === "button" ? "button" : "submit"}
            className={`cursor-pointer  relative p-1 md:p-2 border-2 border-darkgray/50  rounded overflow-hidden text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center group-hover:border-transparent transition-all duration-300 ${classes} `}
          >
            <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight
              className={`   text-pink  group-hover:text-white text-2xl z-[2]`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

export function UnderlineCta<T extends "submit" | "button">(
  props: MasterUnderlineBtnProps<T>
) {
  const { title, color, underlineColor, size = "base" } = props;
  const sizeClass: string = sizeMap[size];

  return (
    <div className="group">
      <button className={`text-${color}  ${sizeClass} relative font-medium`}>
        {title}
        <span
          className="w-10 sm:w-15 h-[1px] sm:h-[2px]  absolute bottom-0 left-0 top-7 group-hover:w-full transition-all duration-1000"
          style={{ backgroundColor: underlineColor }}
        ></span>
      </button>
    </div>
  );
}

export function UnderlineWithHover<T extends "submit" | "button">({
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
  handlefun,
  ...rest
}: MasterBtnProps<T>) {
  const sizeClass: string = sizeMap[size];
  return (
    <>

      
       <div className="group ">
        <div className="">
          <button
              onClick={handlefun}
            className={`${sizeClass} text-${color}  group-hover:w-40 px-4 py-3 font-medium relative group-hover:bg-pink overflow-hidden  group-hover:text-white transition-all duration-300`}
          >
            {text}
            <span
              className={`w-full  h-[1px] group-hover:hidden bg-${bgColor} absolute bottom-0 left-0 transition-all duration-300`}
            ></span>
          </button>
        </div>
      </div>
      
    </>
  );
}


export function NavgHeroBtn<T extends "submit" | "button">({
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
            className={`rounded-sm p-1 relative md:p-2 border-2 border-pink overflow-hidden   w-7 h-7 md:w-8 md:h-8 flex items-center justify-center transition-all duration-300  `}
          >
             <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
             <GoArrowRight className={`   text-pink  group-hover:text-white text-2xl z-[2]`}/>
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
            className={`rounded-sm relative p-1 md:p-2 border-2 border-${borderColor} overflow-hidden text-${color} ${colorClass} w-7 h-7 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${classes} `}
          >
             <span className="absolute w-0 h-0 group-hover:w-full group-hover:scale-[1.5] group-hover:h-full rounded-full bg-pink  z-[1] transition-all duration-500"></span>
            <GoArrowRight className={`   text-pink  group-hover:text-white text-2xl z-[2]`}/>
          </button>
        </div>
      
      )}
    </div>
  );
}
