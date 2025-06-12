"use client";
import { useEffect, useState, useMemo } from "react";

import volume15 from "@/../public/assets/archive/newsletter/volume15.png";
import volume16 from "@/../public/assets/archive/newsletter/volume16.png";
import volume17 from "@/../public/assets/archive/newsletter/volume17.png";
import volume18 from "@/../public/assets/archive/newsletter/volume18.png";
import volume19 from "@/../public/assets/archive/newsletter/volume19.png";
import volume20 from "@/../public/assets/archive/newsletter/volume20.png";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import Image from "next/image";
import { NewsCard } from "@/_components/molecules/newsCard";

// Types
type FilterType = 'All' | 'Publication Year' | 'sectors';
type SectorType = 'All' | 'Transportation' | 'Water and Sanitation' | 'Energy' | 'Urban Planning' | 'Rural and Agri Infra' | 'Education' | 'Health Infra';

interface NewsletterCard {
    id: number;
    img: any; // Consider using a more specific type for images
    category: string;
    title: string;
    sectors: SectorType;
    date: string;
    description: string;
    link: string;
}

// Constants
const FILTER_TYPES: FilterType[] = ['All', 'Publication Year', 'sectors'];
const YEARS = ["2025", "2024"] as const;
const SECTORS: SectorType[] = ['All', 'Transportation', 'Water and Sanitation', 'Energy', 'Urban Planning', 'Rural and Agri Infra', 'Education', 'Health Infra'];
const INITIAL_VISIBLE_COUNT = 3;

const secondFilter = ["2025", "2024"];
const thridFilter = ['All', 'Transportation', 'Water and Sanitation', 'Energy', 'Urban Planning', 'Rural and Agri Infra', 'Education', 'Health Infra']
const allcards = [
    {
        id: 1,
        img: volume20,
        category: "Volume 20",
        title: '',
        sectors: "Rural and Agri Infra",
        date: "January, 2025",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
    {
        id: 2,
        img: volume19,
        category: "Volume 19",
        title: '',
        sectors: 'Water and Sanitation',
        date: "December, 2024",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
    {
        id: 3,
        img: volume18,
        category: "Volume 18",
        title: '',
        sectors: 'Transportation',
        date: "November, 2024",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
    {
        id: 4,
        img: volume17,
        category: "Volume 17",
        title: '',
        sectors: 'Water and Sanitation',
        date: "October, 2024",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
    {
        id: 5,
        img: volume16,
        category: "Volume 16",
        title: '',
        sectors: 'Education',
        date: "September 2024",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
    {
        id: 6,
        img: volume15,
        category: "Volume 15",
        title: '',
        sectors: 'Water and Sanitation',
        date: "August, 2024",
        description:
            "A power-packed month featuring CAIRA's first roundtable on agri exports...",
        link: "#",
    },
];

export default function Newsletters() {
    const [selectedTab, setSelectedTab] = useState<FilterType>('All');
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const handleTabClick = (tab: FilterType) => {
        setSelectedTab(tab);
        setSelectedFilter(tab === 'Publication Year' ? YEARS[0] : tab === 'sectors' ? SECTORS[0] : 'All');
        setVisibleCount(INITIAL_VISIBLE_COUNT);
    };

    const handleFilterClick = (filterName: string) => {
        setSelectedFilter(filterName);
    };

    const filteredCards = useMemo(() => {
        if (selectedTab === 'Publication Year') {
            return allcards.filter(card => card.date.split(' ').pop() === selectedFilter);
        }
        if (selectedTab === 'sectors' && selectedFilter !== 'All') {
            return allcards.filter(card => card.sectors === selectedFilter);
        }
        return allcards;
    }, [selectedTab, selectedFilter]);

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + INITIAL_VISIBLE_COUNT);
    };

    const renderFilterButtons = (filters: readonly string[]) => (
        <div className="pt-5">
            <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={`text-base cursor-pointer rounded-[50px] px-3 py-1 sm:px-6 sm:py-3
                            ${selectedFilter === filter
                                ? 'border border-pink text-white bg-pink font-medium'
                                : 'border border-lightgray/30'
                            }`}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div>
            <div className="w-container blade-top-padding-sm blade-bottom-padding-sm">
                {/* Header Section */}
                <div className="flex flex-row items-center gap-2 md:gap-3">
                    <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink"></span>
                    <h5 className="font-medium text-pink">Newsletters</h5>
                </div>

                <div className="py-3 max-w-4xl">
                    <h1 className="text-black font-light">
                        Data and findings from the ground,
                        <span className="text-black font-medium">
                            fuelled by expert foresight
                        </span>
                    </h1>
                </div>

                {/* Filter Section */}
                <div className="pt-5">
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
                                    className={`mt-auto text-base cursor-pointer rounded-[50px] px-4 py-2 mb-3 sm:px-6 sm:py-3 sm:mb-4
                                        ${selectedTab === tab
                                            ? 'border border-pink text-pink font-medium'
                                            : 'border border-lightgray/30'
                                        }`}
                                    onClick={() => handleTabClick(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    {selectedTab === 'Publication Year' && renderFilterButtons(YEARS)}
                    {selectedTab === 'sectors' && renderFilterButtons(SECTORS)}

                    {/* Newsletter Cards */}
                    <div className={`${selectedTab === 'Publication Year' ? 'pt-8' : 'pt-12'}`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-24">
                            {filteredCards
                                .slice(0, visibleCount)
                                .map((card) => (
                                    <div key={card.id}>
                                        <NewsCard
                                            date={card.date}
                                            title={card.title}
                                            image={card.img.src}
                                            link={card.link}
                                            category={card.category}
                                            description={card.description}
                                            classes="line-clamp-3"
                                            ctaType="read more"
                                        />
                                    </div>
                                ))}
                        </div>
                        {visibleCount < filteredCards.length && (
                            <div className="flex justify-center mt-8">
                                <UnderlineWithHover
                                    size="xxlsize"
                                    color="pink"
                                    bgColor="pink"
                                    text="See more"
                                    role="button"
                                    borderColor="white"
                                    handlefun={handleSeeMore}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

