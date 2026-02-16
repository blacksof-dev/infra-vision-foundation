"use client";

import {
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";
import { getUrl } from "@/lib/getUrl";

// Types
interface SocialMediaContent {
  label: string;
  heading: string;
  description: string;
}

interface SocialProfile {
  id: string;
  slug: string;
  value: string;
  active: boolean;
}

const SOCIAL_ICONS: Record<string, any> = {
  youtube: FaYoutube,
  linkedin: FaLinkedin,
  twitter: FaXTwitter,
  x: FaXTwitter,
  instagram: FaInstagram,
  facebook: FaFacebookF,
};

const renderFormattedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={index} className="font-medium text-black">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};

export default function StayConnected() {
  // Fetch Content
  const { data: content } = useQuery({
    queryKey: ["homepage-social-media"],
    queryFn: () => getFetch<SocialMediaContent>("/content/social-media"),
  });

  // Fetch Social Profiles
  const { data: profiles = [] } = useQuery({
    queryKey: ["social-profiles"],
    queryFn: () => getFetch<SocialProfile[]>("/social-profiles"),
  });

  const activeProfiles = profiles.filter((p) => p.active);

  const SocialLinks = () => (
    <div className="flex flex-row gap-5 py-2">
      {activeProfiles.map((profile) => {
        const Icon = SOCIAL_ICONS[profile.slug];
        if (!Icon) return null;
        return (
          <Link
            key={profile.id}
            href={getUrl(profile.value)}
            target="_blank"
            className="group"
          >
            <Icon className="text-4xl border-1 group-hover:bg-pink rounded-sm border-darkgray p-1 text-darkgray group-hover:text-white group-hover:border-pink" />
          </Link>
        );
      })}
    </div>
  );

  return (
    <section id="homepage-section-6">
      <div className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="w-container flex flex-col lg:flex-row gap-7 sm:gap-6 lg:gap-20">
          <div className="w-full lg:w-[65%] xl:w-[70%] ">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-black">
                {content?.label || "Social Media"}
              </h5>
            </div>
            <div className="pt-4 pb-2 sm:py-4">
              <h1 className="font-light text-black">
                {content ? (
                  renderFormattedText(content.heading)
                ) : (
                  <>
                    Stay connected to{" "}
                    <span className="font-medium text-black">
                      The Infravision Foundation
                    </span>
                  </>
                )}
              </h1>
            </div>

            <h6 className="text-black ">
              {content?.description ||
                "Be part of India's infrastructure transformation. Join our community of infrastructure experts, featuring exclusive conversations, in-depth analysis and research, and more."}
            </h6>
            <div className="py-2 sm:py-4 hidden lg:block">
              <h6 className="text-pink font-medium py-2">Follow us on</h6>
              <SocialLinks />
            </div>
          </div>
          <div className="py-2 sm:py-4 block lg:hidden">
            <h6 className="text-pink font-medium">Follow us on</h6>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
