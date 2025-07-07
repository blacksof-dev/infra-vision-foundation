"use client";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import Fuse from "fuse.js";
import rawSearchIndex from "@/../public/searchIndex.json";
import Highlighter from "react-highlight-words";
import { RxCross1 } from "react-icons/rx";

interface SearchItem {
  slug: string;
  title: string;
  sections: SectionItem[];
}

interface SectionItem {
  id: string;
  title: string;
  content: string;
}

interface FilteredResult {
  id: string;
  slug: string;
  pageTitle: string;
  sectionTitle: string;
  content: string;
}

export default function SearchContent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FilteredResult[]>([]);
  const [contentData, setContentData] = useState<SearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
  const searchIndex = rawSearchIndex as SearchItem[];
  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const validData = searchIndex.filter(
        (item: SearchItem) =>
          item.sections &&
          item.sections.some((section) => section.content.trim() !== "")
      );
      setContentData(validData);
      const fuseInstance = new Fuse(searchIndex, {
        keys: [
          { name: "slug", weight: 0.6 },
          { name: "title", weight: 0.4 },
          { name: "sections.title", weight: 0.5 },
          { name: "sections.content", weight: 0.4 },
        ],
        includeMatches: false,
        threshold: 0.4,
        distance: 800,
        minMatchCharLength: 2,
      });
      setFuse(fuseInstance);

      setResults([]);
    };
    fetchData();
  }, []);

useEffect(() => {
  const handleScroll = () => {
  
    if (window.innerWidth >= 768) {
      setResults([]);
      setHasSearched(false);
    }
  };

  if (results.length > 0) {
    window.addEventListener("scroll", handleScroll);
  }

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [results.length]);


  const formatSearchResults = (data: SearchItem[]) => {
    return data.flatMap((page) =>
      page.sections.map((section) => ({
        id: section.id,
        slug: page.slug,
        pageTitle: page.title,
        sectionTitle: section.title,
        content: section.content,
      }))
    );
  };

  const handleSubmit = useCallback(
    debounce((searchQuery: string) => {
      if (!searchQuery) {
        setResults(formatSearchResults(contentData));
        setHasSearched(false);
        return;
      }

      if (fuse) {
        const fuzzyResults = fuse.search(searchQuery);
        const processedResults = fuzzyResults.flatMap(({ item }) =>
          item.sections
            .filter(
              (section) =>
                section.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                section.content
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
            )
            .map((section) => ({
              id: section.id,
              slug: item.slug,
              pageTitle: item.title,
              sectionTitle: section.title,
              content: section.content,
            }))
        );
        setResults(processedResults);
        setHasSearched(true);
      }
    }, 300),
    [contentData, fuse]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <section className="blade-bottom-padding relative ">
      

      <div className=" ">
        <div className="w-full px-4">
          <form
            className="flex gap-2 max-w-4xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(query);
            }}
          >
            <input
              type="text"
              placeholder="Enter your query..."
              value={query}
              onChange={handleChange}
              className="w-full  p-2 px-3 border  border-lightgray/70 rounded-lg shadow-sm  outline-none "
            />
            <button
              type="submit"
              className="md:block hidden rounded-lg cursor-pointer bg-pink hover:bg-pink text-white px-6 py-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {hasSearched && results.length === 0 && query ? (
        <div className=" flex justify-center items-center">
          <h6 className="text-gray-500 mt-2 font-worksansMedium">
            No results found
          </h6>
        </div>
      ) : (
        <ul
          className={`sm:mt-2 max-w-4xl mx-auto bg-white overflow-y-scroll transition-all duration-300 ${
            results.length > 0 ? "pb-8 mb:pb-0 h-[40rem] md:h-[30rem]" : "h-0"
          }`}
        >
          {results.map((content, index) => (
            <li
              key={index}
              className="py-3 px-4 last:border-0  border-b border-lightgray/40 -4"
            >
              <Highlighter
                searchWords={[query]}
                className="capitalize text-black font-medium text-sm hover:text-pink "
                textToHighlight={content.pageTitle}
                highlightStyle={{ backgroundColor: "#979797", color: "#fff" }}
              />
              :{" "}
              <Link
                href={`${content.slug}#${content.id}`}
                className="text-lightgray  transition-all duration-200"
              >
                <Highlighter
                  searchWords={[query]}
                  className="text-black font-medium hover:text-pink  text-sm"
                  textToHighlight={content.sectionTitle}
                  highlightStyle={{ backgroundColor: "#979797", color: "#fff" }}
                />
                <br />
                <Highlighter
                  searchWords={[query]}
                  className="text-darkgray text-sm"
                  textToHighlight={content.content}
                  highlightStyle={{ backgroundColor: "#979797", color: "#fff" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
