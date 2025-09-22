import React from "react";
import KnowledgeBanner from "./01_banner";
import KnowledgeResearchPapers from "./02_reserch_paper";
import SectorsManager from "./sectorsManager";
import KnowledgeConversations from "./03_conversation";
import Blogs from "./04_blogs";

export default function Page() {
  return (
    <>
      <KnowledgeBanner />
      <SectorsManager />
      <KnowledgeResearchPapers />
      <KnowledgeConversations />
      <Blogs/>
    </>
  );
}
