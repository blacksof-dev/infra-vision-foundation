"use client";
import dynamic from "next/dynamic";

const Newsletter = dynamic(() => import("@/_components/molecules/newsletter"), {
  ssr: true,
});

export default function InfravisionTalks() {
  return <Newsletter />;
}
