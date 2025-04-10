import { ReactNode } from "react";
import Link from "next/link";

const sizeMap = {
  small: " text-sm",
  navlink: "2xl:text-base xl:text-sm text-xs",
  base: " text-sm 2xl:text-base",
  large: " text-sm  2xl:text-lg",
  xl: " text-base md:text-xl",
  xxl: " text-xl xl:text-2xl",
  "3xl": " text-xl md:text-2xl xl:text-3xl",
};
const colorMap = {
  dark: "text-[#5D6468]",
  light: "text-white",
};

type MasterAnchorProps = {
  size?: keyof typeof sizeMap;
  text: string;
  href: string;
  target?: "_self" | "_blank";
  className?: string;
};

export function Anchor({
  href,
  children,
  className =' ',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      <Link className={className} href={href}>
        {children}
      </Link>
    </>
  );
}

export function TextAnchor({
    text,
    target,
    href,
    color = "dark",
    size = "base",
    className,
    ...rest
  }: MasterAnchorProps & { color?: "dark" | "light" }) {
    const sizeClass: string = sizeMap[size];
    const colorClass: string = colorMap[color];
    return (
      <Link
        target={target}
        href={href}
        {...rest}
        className={`${sizeClass} ${colorClass} ${className} text-opacity-80 hover:text-opacity-100 focus:outline-none 
                    focus:underline decoration-from-font underline-offset-4 focus:text-opacity-100 transition-all font-be-vietnam-pro-light`}
      >
        {text}
      </Link>
    );
  }