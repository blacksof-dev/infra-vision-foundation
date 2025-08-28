"use client";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

import Loading from "@/app/loading";
import { useApiHook } from "@/lib/useApi";

const iconMap: Record<string, React.ElementType> = {
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebook,
};

interface SocialMedia {
  id: string;
  slug: string;
  value: string;
  active: boolean;
}

export default function SocialMedia() {
  const { data, isLoading, error } = useApiHook<SocialMedia[]>({
    url: "/social-profiles",
    cacheKey: "socialMedia",
  });

  if (isLoading) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <Loading />
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="w-full h-[40rem] flex items-center justify-center">
        <p>Something went wrong</p>
      </section>
    );
  }

  return (
    <div className="flex flex-row gap-5 py-2">
      {data
        .filter((item) => item.active && iconMap[item.slug])
        .map((item) => {
          const Icon = iconMap[item.slug];
          return (
            <Link
              key={item.id}
              href={item.value}
              target="_blank"
              className="group"
            >
              <Icon className="text-4xl border border-darkgray p-1 rounded-sm text-darkgray group-hover:bg-pink group-hover:text-white group-hover:border-pink" />
            </Link>
          );
        })}
    </div>
  );
}
