"use client";

import { motion, useScroll, useSpring } from "motion/react";
import image1 from "@/../public/assets/knowledeg/blogs/09.jpg";
import hill from "@/../public/assets/knowledeg/blogs/hill.jpg";
import tawang from "@/../public/assets/knowledeg/blogs/tawang.jpg";
import tawangMonastery from "@/../public/assets/knowledeg/blogs/tawangMonastery.jpg";
import agricultureTrade from "@/../public/assets/knowledeg/blogs/agriculture-trade.jpg";
import culture1 from "@/../public/assets/knowledeg/blogs/culture1.jpg";
import culture2 from "@/../public/assets/knowledeg/blogs/culture2.jpg";

import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function Page() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-pink origin-left z-50"
                style={{ scaleX }}
            />

            <div className="max-w-5xl mx-auto pt-[15%] sm:pt-[12%] lg:pt-[8%] blade-top-padding-lg blade-bottom-padding-lg px-4 md:px-6">
                <Link
                    href="/knowledge"
                    className="flex items-center gap-2 text-lightgray hover:text-black transition-colors mb-8 group w-fit"
                >
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Knowledge</span>
                </Link>

                <header className="mb-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-poppins text-black font-semibold text-2xl md:text-4xl lg:text-5xl mb-6"
                    >
                        Two Days to Tawang: Why Arunachal’s Agriculture Needs Better Infrastructure
                    </motion.h1>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
                        <span className="text-sm sm:text-base">
                            By Priyanka
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
                        <span className="text-sm sm:text-base text-lightgray font-normal">
                            December 31, 2025
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
                        <span className="text-sm sm:text-base text-lightgray font-normal italic">
                            8 min read
                        </span>
                    </div>
                </header>

                <article className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="rounded-md md:rounded-2xl overflow-hidden shadow-2xl shadow-black/5"
                    >
                        <Image
                            src={image1}
                            alt="Tawang, Arunachal Pradesh Landscape"
                            className="w-full max-h-[350px] md:max-h-[550px] object-cover"
                            quality={100}
                            priority
                        />
                    </motion.div>

                    <div className="space-y-4 md:space-y-16">
                        <div className="py-3">
                            <p className="text-darkgray text-base md:text-xl leading-relaxed text-justify">
                                In April this year, I travelled to Tawang, Arunachal Pradesh for the <span className="font-semibold text-black">Buyer-Seller Meet organised by APEDA and NERMAC, an effort to directly connect farmers with major buyers</span>. It took me two full days by road to reach Tawang, a journey that could have been completed in just 45 minutes by helicopter. That contrast sums up Arunachal Pradesh: a land rich in potential but held back by weak infrastructure. What I saw was a lesson in how geography, connectivity, and agriculture intertwine.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-6">
                                Day 1 – The Starting Point
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                On April 8th, I caught the 9 a.m. flight from Delhi to Guwahati, Assam. I spent the evening meeting with Food Corporation of India officers who spoke candidly about the challenges of food distribution in the Northeast—long distances, tough terrain, and inadequate transport facilities.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-10">
                                Day 2 – Into the Hills
                            </h2>
                            <div className="my-6">
                                <Image
                                    src={hill}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>

                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                We left Guwahati at 11 a.m. for the 10-hour drive into Arunachal Pradesh. The transformation was striking. Lush paddy fields gave way to subtropical forests, and as we climbed above 5,000 feet, the landscape shifted to pine-covered slopes.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                We pushed through lunch and deeper into the hills, passing Bomdila at 8,000 feet, where neat wooden houses sat surrounded by gardens in full bloom. Women labourers, some with babies tied to their backs, worked on road construction—a scene that captured both the region's beauty and the quiet resilience of its people. The contrast was striking. Pristine mountain villages on one side, and on the other, the arduous work of building the very infrastructure that could transform their livelihoods. By the time we reached Dirang, exhaustion had set in. I kept thinking: if it takes this much effort for us to arrive, what must it mean for farmers trying to move their produce?
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-10">
                                Day 3 – Tawang and the Buyer-Seller Meet
                            </h2>
                            <div className="my-6">
                                <Image
                                    src={tawang}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                I woke up before sunrise to mountain views from Dirang and set off for the final stretch to Tawang. Crossing the Sela Tunnel at 13,800 feet, one of the world's highest road tunnels, felt symbolic. This single piece of infrastructure has already cut travel time to Tawang significantly. It showed me how one intervention can change the rhythm of an entire region.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                We reached Tawang after four hours and rushed to freshen up before the event.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                At the meet, buyers had come from across India. Many farmers had travelled for two full days from remote corners of Arunachal. The irony wasn't lost on me: it took them the same time to reach Tawang as it took us coming from Delhi. This absurdity perfectly captures Arunachal's connectivity crisis. Their stories echoed the same frustration: slow, unreliable, and costly transport. Yet the produce was exceptional, with kiwi, apples, large cardamom, ginger, and oranges, to name a few.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Arunachal is a default organic state, and as the <span className="font-semibold italic text-black">largest kiwi producer in India</span> (accounting for nearly 40% of India’s kiwi production), its horticultural goods could command premium prices in growing domestic and international markets. At the same time, India has just concluded a Free Trade Agreement (FTA) with New Zealand that will gradually open Indian markets to a larger volume of imported kiwi. This emerging trade landscape makes Arunachal’s infrastructure gap—cold storage, reliable road and rail connectivity, and efficient transport—even more urgent to address, because without them its farmers will struggle to compete on price and speed, regardless of their organic advantage and superior production volumes.
                            </p>
                            <div className="my-6">
                                <Image
                                    src={tawangMonastery}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                One buyer shared candid insights: with no central processing or quality checks, procurement becomes costly and chaotic. Transport alone costs around Rs. 10 per kilo by truck, and the absence of organised supply chains means larger farmers often buy cheaply from smallholders and sell at a premium. By sourcing directly from small farmers, he believed costs could drop, benefiting both producers and buyers. He was particularly interested in large cardamom from Lohit district, which offers a uniform variety unlike other districts where farming is unorganised. But the logistics were daunting: while it takes just 5 days to move produce from Meghalaya to his factory in Noida, it takes 10 days from Lohit. This delay, plus the added costs, makes procurement commercially unviable without transport subsidies from the state.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Even buyers from the neighbouring country, Bhutan, admitted preferring West Bengal over Arunachal. The reason? It is cheaper and easier to move produce into Bhutan from West Bengal than from Arunachal Pradesh, even though both states share a border with Bhutan.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Without collection centres, cold storage, and reliable transport, buyers are forced to spend days and extra money to source produce. That's not a model for scaling agricultural trade.
                            </p>
                            <div className="my-6">
                                <Image
                                    src={agricultureTrade}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-10">
                                Day 4 – A Glimpse of Culture, Then Back to the Road
                            </h2>
                            <div className="my-6">
                                <Image
                                    src={culture1}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <div className="my-6">
                                <Image
                                    src={culture2}
                                    alt="Tawang, Arunachal Pradesh Landscape"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-md md:rounded-2xl"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                On April 11th, before leaving Tawang, I visited the serene Tawang Monastery, just five minutes from our hotel. The air was crisp, prayer flags fluttered in the wind, and the monastery's golden roof glistened against the snow peaks.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                I had hoped to visit the Bum La Pass, a high-altitude crossing near the Indo-China border, but our schedule didn't allow it. This pass, if better utilised, could be a vital trade link for Tawang, potentially opening up faster movement of goods and even creating cross-border economic opportunities down the line. I picked up local spices before we began the nine-hour journey from Tawang to Tezpur in Assam, winding down from alpine forests into subtropical valleys.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-10">
                                Day 5 – Home, Eventually
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                From Tezpur, we drove to Guwahati Airport, only for the flight to be delayed three hours. By the time we landed in Delhi, it was 8 p.m. Two full days of driving for a journey that a helicopter could cover in under an hour.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-10">
                                The Bigger Picture – Why This Matters for Agriculture
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                This trip left me with one certainty: Arunachal Pradesh has the produce, the organic advantage, and the ambition. What it lacks is the infrastructure to deliver. Three urgent investments stand out:
                            </p>

                            <ul className="list-decimal list-outside ml-6 py-6 space-y-8 text-base md:text-xl text-darkgray leading-relaxed">
                                <li className="pl-2">
                                    <span className="font-semibold text-black">Collection Centres:</span> Buyers should be able to fly into one hub and access produce aggregated from across the state. The state lacks even basic infrastructure for sorting, grading, or packaging. Farmers are forced to sell immediately after harvest at distressed prices. Strategic aggregation centres at locations like Pasighat, Dirang, and Roing, equipped with sorting, grading, and pre-cooling facilities, would allow buyers to access produce from multiple districts without spending days travelling between remote farms.
                                </li>
                                <li className="pl-2">
                                    <span className="font-semibold text-black">Cold Storage & Processing:</span> High-value crops like kiwi, ginger, and apples need preservation to retain freshness and value. Arunachal has only two cold storage facilities with a combined capacity of 6,000 metric tonnes, the lowest among the Northeastern states. Compare this to Assam's 43 facilities holding over 2 lakh metric tonnes. Without cold chains, kiwis from Ziro take 12-16 hours to reach Guwahati in non-refrigerated trucks, leading to massive spoilage. The lack of processing infrastructure also means oranges are exported to Bangladesh for processing and re-export, a value that should stay with our farmers.
                                </li>
                                <li className="pl-2">
                                    <span className="font-semibold text-black">Transport Connectivity:</span> Strategic tunnels, all-weather roads, and short air links can turn two-day journeys into a matter of hours. The Sela Tunnel has already proven this, cutting travel time to Tawang significantly. But roadways remain the only real option, with rail connectivity minimal and air cargo services limited despite the new Donyi Polo Airport. When transport alone costs Rs. 10 per kilo from Lohit and takes 10 days, compared to just 5 from Meghalaya, Arunachal farmers simply can't compete.
                                </li>
                            </ul>

                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                When I look back at the photos of serpentine roads, snow-capped passes, bustling market halls, I see more than just memories. I see a roadmap. If we follow it, Arunachal's farmers won't just grow treasures in hidden valleys; they'll have the means to bring them to the world.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}
