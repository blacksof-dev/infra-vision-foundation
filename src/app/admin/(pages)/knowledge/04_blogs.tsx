"use client";
import React, { useState } from "react";
import MarkdownEditor from "./markdownEditor";
import SectionHeading from "../../components/sectionHeading";

export default function Blogs() {
  const [markDownValue, setMarkDownValue] = useState<string>("");
  return (
    <section className="blade-top-padding">
      <SectionHeading
        heading="Section - 04 (Blogs)"
        ctaText="Add new"
        cta
      />
      <MarkdownEditor value={markDownValue} setValue={setMarkDownValue} />
      
    </section>
  );
}
