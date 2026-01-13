


import image1 from "@/../public/assets/knowledeg/blogs/transit.png";
import delhi from "@/../public/assets/knowledeg/blogs/delhi.png";
import Image from "next/image";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Progessbar } from "@/_components/molecules/timelineBlog";
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Transit-Oriented Development and Urban Mobility in India',
    description:
        'India’s TOD moment: metros, RRTS, land value capture, and governance reforms shaping sustainable urban mobility and city growth..',
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://infravisionfoundation.org/blogs/why-arunachal-agriculture-needs-better-infrastructure',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://infravisionfoundation.org/blogs/why-arunachal-agriculture-needs-better-infrastructure',
        siteName: 'The Infravision Foundation',
        title: 'Transit-Oriented Development and Urban Mobility in India',
        description:
            'India’s TOD moment: metros, RRTS, land value capture, and governance reforms shaping sustainable urban mobility and city growth..',
        images: [
            {
                url: 'https://infravisionfoundation.org/assets/knowledeg/blogs/transit.png',
                width: 1200,
                height: 630,
                alt: 'The Infravision Foundation',
                type: 'image/jpg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Transit-Oriented Development and Urban Mobility in India',
        description:
            'India’s TOD moment: metros, RRTS, land value capture, and governance reforms shaping sustainable urban mobility and city growth..',
        images: ['https://infravisionfoundation.org/assets/knowledeg/blogs/transit.png'],
    },
};
export default function Page() {


    return (
        <>

            <Progessbar />
            <div className="max-w-5xl mx-auto pt-[15%] sm:pt-[12%] lg:pt-[8%] blade-top-padding-lg blade-bottom-padding-lg px-4 md:px-6">
                <Link
                    href="/knowledge"
                    className="flex items-center gap-2 text-lightgray hover:text-black transition-colors mb-8 group w-fit"
                >
                    <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Knowledge</span>
                </Link>

                <header className="mb-4">
                    <h1

                        className="font-poppins text-black font-semibold text-2xl md:text-4xl lg:text-5xl mb-6"
                    >
                        Transit-Oriented Development and urban mobility in India
                    </h1>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-darkgray font-medium border-b border-gray/10 pb-6">
                        <span className="text-sm sm:text-base">By Mutum Chaobisana</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
                        <span className="text-sm sm:text-base text-lightgray font-normal">
                            December 31, 2025
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-pink/20" />
                        <span className="text-sm sm:text-base text-lightgray font-normal italic">
                            7 min read
                        </span>
                    </div>
                </header>

                <article className="md:space-y-16 space-y-8">
                    <div

                        className="rounded-md md:rounded-2xl overflow-hidden shadow-2xl shadow-black/5"
                    >
                        <Image
                            src={image1}
                            alt="Transit-Oriented Development and Urban Mobility in India"
                            className="w-full max-h-[350px] md:max-h-[550px] object-cover"
                            quality={100}
                            priority
                        />
                    </div>

                    <div className="space-y-4 md:space-y-16">
                        <div className="py-3">
                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black mb-6">
                                Why Transit-Oriented Development Matters Now
                            </h2>
                            <p className="text-darkgray text-base md:text-xl leading-relaxed text-justify">
                                Union Minister Shri Manohar Lal, at the 18th Urban Mobility
                                India (UMI) Conference & Exhibition 2025<b>,</b> underscored
                                that the Delhi Metro Rail Corporation (DMRC) will act through
                                its subsidiaries to support the planning and coordination of
                                Mass Rapid Transit Systems (MRTS) across the country, reflecting
                                a push for cohesive rapid transit networks. He also noted that
                                transport systems like the Regional Rapid Transit System (RRTS)
                                will be developed in other major cities to enhance regional
                                connectivity and decongest urban cores. As cities across India
                                grapple with congestion, air pollution, rising infrastructure
                                costs, and declining quality of life, TOD has emerged as a
                                powerful framework to realign urban growth with sustainable
                                mobility. At its core, TOD promotes compact, mixed-use,
                                high-density development within walking distance of mass
                                transit, enabling cities to move people efficiently while
                                reducing dependence on private vehicles.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Globally, TOD has proven its ability to simultaneously deliver
                                mobility efficiency, fiscal sustainability, and urban vibrancy.
                                From Hong Kong’s <b>Rail + Property model</b> to London’s{" "}
                                <b>Crossrail-funded regeneration corridors</b>, the lesson is
                                clear that transit works best when land use, finance, and
                                governance are integrated.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                This framing aligns with The Infravision Foundation’s (TIF) work
                                on integrated urban transport and land-use planning, which
                                focuses on legally empowering governance and financing
                                structures and embedding transport infrastructure within
                                coordinated spatial planning, rather than treating projects as
                                standalone investments.
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/novemberNewsletter.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    1
                                </Link>{" "}
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/Metro-Rail-Systems-Whitepaper.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    2
                                </Link>{" "}
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    3
                                </Link>{" "}
                                <Link
                                    href="https://www.linkedin.com/posts/the-infravision-foundation_gtpro-transportplanning-theinfravisionfoundation-activity-7394624213615075329-W1ZN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAANzG6oBTXD-0m_WdFEzGtRIj9bE3_G0vDE"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    4
                                </Link>{" "}
                                India now stands at a critical juncture where TOD can determine
                                whether its massive investments in metro and rail systems
                                translate into long-term economic and environmental dividends.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4  md:pt-10">
                                Global Experience: TOD as an Economic and Fiscal Tool
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                International experience demonstrates that TOD is not merely an
                                urban design concept but a financial and institutional strategy.
                                Hong Kong’s Mass Transit Railway (MTR) remains the most widely
                                cited example. Instead of relying on fare revenue alone, the
                                government grants MTR development rights around stations. The
                                resulting real estate revenues cross-subsidise both capital and
                                operational costs of transit, allowing Hong Kong to operate one
                                of the world’s most financially resilient metro systems.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Similarly, London’s Crossrail project leveraged Land Value
                                Capture (LVC) instruments, including a Business Rate Supplement
                                and development charges, to fund a substantial share of its
                                capital cost. Tokyo, Seoul, and several cities in China follow
                                comparable models, combining high-density station-area
                                development with strong institutional coordination.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                TIF has been working rigorously on Land Value Creation and
                                Capture (LVCC) for infrastructure financing, showcasing that
                                TOD-linked LVCC mechanisms can materially improve project
                                bankability and reduce long-term fiscal stress on governments.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                The core principle is that transit investment generates land
                                value, and TOD provides the spatial and regulatory framework to
                                systematically capture and reinvest this value, strengthening
                                infrastructure capacity while enhancing the economic and urban
                                vibrancy of TOD areas.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                Opportunity and Risk for India
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                Over the last decade, India’s metro footprint has surged from
                                about 248 km in 2014 to just over 1,013 km across 23 cities by
                                May 2025, supported by about ₹2.5 lakh crore of investment in
                                metro expansion.
                                <Link
                                    href="https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155002&utm_source=chatgpt.com&reg=3&lang=2"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    5
                                </Link>{" "}
                                Annual central capital allocations for metro/urban transit have
                                also jumped sharply (capital outlays in recent budgets rose into
                                the tens of thousands of crores).
                                <Link
                                    href="https://timesofindia.indiatimes.com/business/india-business/budget-2025-metro-rail-network-may-be-more-doubled-over-next-5-years/articleshow/117727652.cms?utm_source=chatgpt.com"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    6
                                </Link>{" "}
                                Yet actual ridership often falls well short of DPR
                                forecasts—many systems operate at only <b>25–30% of projected
                                    ridership</b>, Delhi being an outlier at about <b>47%</b>,
                                producing persistent gaps between expected and realised
                                passenger revenue.
                                <Link
                                    href="https://www.business-standard.com/india-news/metros-in-india-have-less-than-50-projected-ridership-says-iit-d-report-124010200455_1.html?utm_source=chatgpt.com"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    7
                                </Link>{" "}
                                DMRC reported a loss before tax of ₹1,781.7 crore in FY 2023–24
                                and continues to rely on non-fare and subsidy support, a pattern
                                flagged by analysts and think-tanks as a core fiscal challenge
                                for Indian metros.
                                <Link
                                    href="https://timesofindia.indiatimes.com/city/delhi/experts-cite-balance-between-cost-and-quality-service/articleshow/123510352.cms"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    8
                                </Link>
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Large sections of Indian cities continue to show disconnected
                                land-use patterns<b>,</b> grow in low-density, car-oriented
                                formats, even along expensive metro nodes and corridors. TOD is
                                therefore essential to unlock the economic, social, and
                                environmental returns of transit investment. However,
                                implementation of TOD across Indian cities remains uneven, with
                                institutional capacity and inter-agency coordination emerging
                                as the principal bottlenecks.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                Delhi as a Case Study: Ambition Meets Implementation Gaps
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                Delhi offers one of India’s most instructive TOD case studies.
                                Despite operating one of the world’s largest metro systems,
                                development around many stations remains fragmented or
                                underutilised. While Delhi’s TOD policy was notified nearly a
                                decade ago, execution lagged due to fragmented governance, rigid
                                eligibility thresholds, and the absence of station-area
                                planning frameworks. The East Delhi Hub at Karkardooma, Delhi’s
                                first large-scale TOD project, illustrates both the promise and
                                the pitfalls of TOD implementation. Initiated in February 2015,
                                the project remains under construction, with online
                                registration for its housing component launched only in October
                                2025, more than a decade after inception.
                            </p>
                            <div className="my-6">
                                <Image
                                    src={delhi}
                                    alt="Transit-Oriented Development and Urban Mobility in India"
                                    className="w-full max-h-[350px] md:max-h-[550px] object-cover rounded-sm md:rounded-xl"
                                    quality={100}
                                    priority
                                />
                            </div>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                This experience reinforces TIF’s findings on{" "}
                                <b>implementation risk in urban infrastructure</b>, which
                                highlight the importance of clear institutional mandates,
                                predictable financial rules, and synchronised planning across
                                agencies.
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/niti.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    9
                                </Link>
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                The Draft Delhi TOD Policy 2025 was placed in the public domain
                                for objections and suggestions on 21 November 2025, against the
                                backdrop of the DDA’s decade-long struggle to operationalise a
                                workable and implementable TOD framework. However, a litany of
                                concerns remains regarding the lack of operational clarity and
                                high implementation risk. The policy provides a uniform 500 m
                                buffer-based catchment for all TOD Nodes, regardless of whether
                                they serve regional, city, and neighbourhood level footfalls.
                                Network-density and walk time could be useful in delineation of
                                TOD zones; however, even the station typology is not
                                differentiated between Metro and RRTS. Under-sized influence
                                zones, ridership–land-value mismatch, a flat TOD charge that
                                disregards the value of location—these are critical issues in
                                the draft policy. The Land Value Creation and Capture approach
                                that IIM Ahmedabad and TIF have been developing will help cities
                                understand that value capture is triggered by value creation in
                                the form of planning and urban design. Undefined TOD Fund
                                governance and the absence of a transparent mechanism of the
                                escrow/fiduciary safeguards combine with limited stakeholder
                                representation in the proposed oversight committee add to the
                                risks of opacity. There is scant attention to inter-agency
                                coordination, which is odd considering that the policy is with
                                a ministry that promotes UMTAs. The planning and implementation
                                risks include mono-functional development and ineffective TDR,
                                gentrification risk, excessive parking minimums, and future
                                transit corridors not integrated even in the notified Land
                                Pooling Zone. Lastly, the policy lacks temporality and does not
                                recognise the phasing gaps between infrastructure creation and
                                monetisation of FAR.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                Catchment Areas and the Economics of TOD
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                One of the most consequential TOD design choices is the
                                definition of the station influence area. Global and Indian
                                evidence indicate that 500 metres represents the most effective
                                walkable catchment, while 800–1,000 metres functions as a
                                secondary zone dependent on feeder services.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                The economic implications are significant. A 500-metre TOD zone
                                is effective in maximising walk-based ridership, pedestrian
                                activity, and localised land value premiums around transit
                                stations. In contrast, a 1,000-metre TOD zone significantly
                                expands the development catchment, enabling substantially higher
                                development capacity and land value creation, often up to four
                                times the aggregate land value, provided it is supported by
                                strong multimodal integration through feeder services, cycling
                                infrastructure, and last-mile connectivity.
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                Financial and Economic Benefits Across Stakeholders
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                When implemented effectively, TOD delivers tangible benefits to
                                all stakeholders. Well-designed TOD creates a virtuous cycle of
                                benefits across stakeholders. Governments capture higher land
                                values, generate increased tax revenues, and reduce per-capita
                                infrastructure costs through compact urban growth. Transit
                                agencies benefit from higher ridership, improved farebox
                                recovery, and enhanced non-fare revenues generated through
                                station-area development. Private developers gain access to
                                higher FAR, premium transit-accessible locations, and strong
                                market demand driven by improved accessibility. Most importantly,
                                citizens experience shorter commute times, lower transport
                                costs, better air quality, and improved access to jobs,
                                services, and urban amenities. Empirical evidence consistently
                                shows <b>10–30% property value premiums near high-quality
                                    transit</b>. TIF’s research emphasises that even modest capture
                                rates, if ring-fenced and transparently deployed, can
                                meaningfully support transit and urban infrastructure
                                financing.
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/Metro-Rail-Systems-Whitepaper.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    10
                                </Link>{" "}
                                And FAR is driven by market and concentrates where the demand
                                is, as proven in the study of a decade’s reregulation of FAR in
                                Hyderabad. Hyderabad’s experience shows that blanket FSI
                                deregulation can unlock density only where strong market demand
                                and infrastructure already exist; freedom to build alone does
                                not create vertical growth or equitable urban form. The broader
                                lesson for India’s current push on creative redevelopment and
                                land value capture is that FSI must be governed as a strategic
                                lever, explicitly linked to infrastructure financing, affordable
                                housing, and transit-oriented planning, if density is to
                                translate into inclusive and sustainable city-building.
                                <Link
                                    href="https://theinfravisionfoundation.org/assets/pdf/report-fsi-deregulation-in-hyderabad.pdf"
                                    target="_blank"
                                    className="text-xs align-top text-black underline ml-0.5"
                                >
                                    11
                                </Link>
                            </p>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                What Makes TOD Work: Four Non-Negotiables
                            </h2>
                            <div className="pt-4 text-base md:text-xl leading-relaxed text-justify space-y-4">
                                <p className="text-darkgray">
                                    Experience across India and globally converges on four
                                    essential conditions for successful TOD:
                                </p>
                                <ul className="list-decimal list-outside ml-6 space-y-2 text-darkgray">
                                    <li>
                                        <b>Integrated Governance</b> across transport, land use,
                                        finance, and utilities.
                                    </li>
                                    <li>
                                        <b>Clear Land Value Capture Toolkits</b> with predictable
                                        triggers and ring-fenced deployment.
                                    </li>
                                    <li>
                                        <b>Inclusion and Affordable Housing</b>, ensuring TOD
                                        benefits transit-dependent populations.
                                    </li>
                                    <li>
                                        <b>Performance Monitoring and Adaptive Policy</b>, using
                                        indicators such as modal share, walkability, and
                                        infrastructure adequacy.
                                    </li>
                                </ul>
                            </div>

                            <h2 className="text-xl md:text-3xl font-poppins font-semibold text-black pt-4 md:pt-10">
                                TOD as India’s Urban Growth Strategy
                            </h2>
                            <p className="text-darkgray pt-4 text-base md:text-xl leading-relaxed text-justify">
                                TOD is no longer a planning choice; it is a strategic necessity
                                for India’s cities. As public investment in urban transport
                                continues to scale up, TOD provides the mechanism to ensure
                                infrastructure spending translates into economic productivity,
                                environmental sustainability, and social inclusion.
                            </p>
                            <p className="text-darkgray pt-6 text-base md:text-xl leading-relaxed text-justify">
                                Delhi’s evolving TOD framework, while imperfect, offers critical
                                lessons for cities nationwide. The path forward lies not in
                                weakening TOD principles, but in strengthening planning,
                                financing, and governance systems so that density becomes an
                                asset rather than a liability. If implemented with discipline
                                and vision, TOD can help Indian cities transition toward
                                compact, connected, and climate-resilient urban futures, where
                                transit does not merely move people, but anchors inclusive
                                prosperity.
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}
