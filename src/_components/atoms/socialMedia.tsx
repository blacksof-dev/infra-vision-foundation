"use client";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { getFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const iconMap: Record<string, React.ElementType> = {
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  instagram: FaInstagram,
};

interface socialMedia {
  slug: string;
  value: string;
  active: boolean;
}

export default function SocialMedia() {
  const { data } = useQuery({
    queryKey: ["social-profile"],
    queryFn: () => getFetch<socialMedia[]>("/social-profiles"),
  });

  if (!data || !Array.isArray(data)) return null;

  return (
    <>
      <div className="flex flex-row gap-5 py-2 ">
        {data
          .filter((elem) => elem.active && iconMap[elem.slug])
          .map((elem) => {
            const Icon = iconMap[elem.slug];
            return (
              <Link
                key={elem.slug}
                href={elem.value}
                target="_blank"
                className="group"
              >
                <Icon className="text-4xl border-1 active:bg-pink active:border-transparent active:text-white  group-hover:bg-pink rounded-sm border-darkgray/50  p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
              </Link>
            );
          })}
      </div>
    </>
  );
}
