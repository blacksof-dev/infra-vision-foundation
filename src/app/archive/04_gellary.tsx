"use client";
import { useEffect, useState, useMemo } from "react";

import image_01 from "@/../public/assets/archive/newsAndMedia/01.jpg";
import image_02 from "@/../public/assets/archive/newsAndMedia/02.jpg";
import image_03 from "@/../public/assets/archive/newsAndMedia/03.jpg";

import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";

// Gallery image data with random year and event type
const galleryImages = [
    { image: "assets/archive/gallery/image1.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image6.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image8.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image2.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image7.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image10.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image3.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image5.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image12.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image4.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image11.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image9.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image13.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image14.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image15.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image16.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image17.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image18.png", year: 2025, event: "Infrashakti" },
    { image: "assets/archive/gallery/image19.png", year: 2025, event: "Infrashakti" },
];

// Types
type FilterType = 'All' | 'Year' | 'Event';
type EventType = 'All' | 'Caira' | 'Infrashakti' | 'Infrapandit';


interface NewsletterCard {
    id: number;
    img: any; // Consider using a more specific type for images
    category: string;
    title: string;
    event: EventType;
    date: string;
    description: string;
    link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ['All', 'Year', 'Event'];
const YEARS = [2024, 2025] as const;
const SECTORS: EventType[] = ['All', 'Caira', 'Infrashakti', 'Infrapandit'];
const INITIAL_VISIBLE_COUNT = 19;

export default function Gallery() {
    const [selectedTab, setSelectedTab] = useState<FilterType>('All');
    // Default filter: if Year tab, default to 2025, else All
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    // Filtering logic
    const filteredImages = useMemo(() => {
        if (selectedTab === 'Year' && selectedFilter !== 'All') {
            return galleryImages.filter(img => img.year.toString() === selectedFilter);
        }
        if (selectedTab === 'Event' && selectedFilter !== 'All') {
            return galleryImages.filter(img => img.event === selectedFilter);
        }
        return galleryImages;
    }, [selectedTab, selectedFilter]);

    // Tab click handler
    const handleTabClick = (tab: FilterType) => {
        setSelectedTab(tab);
        if (tab === 'Year') {
            setSelectedFilter('2025');
        } else {
            setSelectedFilter('All');
        }
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    // Filter button click handler
    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter);
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    // Render filter buttons for Year or Event
    const renderFilterButtons = (filters: readonly string[]) => (
        <div className="pt-5">
            <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`text-base cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3 ${selectedFilter === filter.toString() ? 'border border-pink text-white bg-pink font-medium' : 'border border-lightgray/30'}`}
                        onClick={() => handleFilterClick(filter.toString())}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white">
            <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
                {/* Header Section */}
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                    <h5 className="font-medium text-pink">Gallery</h5>
                </div>

                <div className="py-3 mb-4">
                    <h1 className="text-black font-light">
                        In frames
                        <span className="text-black font-medium">
                            — The spirit of change
                        </span>
                    </h1>
                </div>
                {/* Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-6 border-b border-darkgray/20">
                    <div className="sm:border-r sm:border-darkgray/20">
                        <h5 className="text-darkgray/80 sm:py-5 pr-5 text-nowrap">
                            Filter by
                        </h5>
                    </div>
                    <div className="flex flex-row gap-5">
                        {FILTER_TYPES.map((tab) => (
                            <button
                                key={tab}
                                className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4 ${selectedTab === tab ? 'border border-pink text-pink font-medium' : 'border border-lightgray/30'}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Conditional filter buttons for Year or Event */}
                {selectedTab === 'Year' && renderFilterButtons(YEARS.map(String))}
                {selectedTab === 'Event' && renderFilterButtons(SECTORS)}
                {/* Gallery Grid */}
                <div className="pt-8">
                    <div className="columns-2  sm:columns-3 lg:columns-4 xl:columns-5 gap-1 sm:gap-3 space-y-1 sm:space-y-3">
                        {filteredImages.slice(0, visibleCount).map((img, idx) => (
                            <div key={idx} className="overflow-hidden mb-1 sm:mb-3 break-inside-avoid shadow-sm bg-white">
                                <Image
                                    src={img.image}
                                    alt={`Gallery Photo ${idx + 1}`}
                                    width={300}
                                    height={256}
                                    className="w-full h-auto object-cover"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

