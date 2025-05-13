import { HeroBtn } from "@/_components/atoms/buttons";
import Card from "@/_components/molecules/cardTemplate";
import budgetSignals from "@/../public/assets/home/budgetSignals.jpg";
import infraOutlays from "@/../public/assets/home/infraOutlays.jpg";
import groupTaxation from "@/../public/assets/home/groupTaxation.jpg";
import CardSlider from "@/_components/molecules/slidercardTemplate";

export default function Champion() {
  return (
    <>
      <section className="bg-[#F6F6F6]">
        <div className="w-container blade-top-padding-lg blade-bottom-padding-lg">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">In the news</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5  flex flex-col md:flex-row justify-between ">
              <div>
                <h1 className="text-black font-light">
                  Championing the
                  <br />{" "}
                  <span className="text-black font-medium">
                    cause of infrastructure
                  </span>{" "}
                </h1>
              </div>
              <div className=" pt-5  md:py-5 lg:py-0 mt-auto">
                <HeroBtn
                  text="View all"
                  role="link"
                  borderColor="pink"
                  color="pink"
                  bgColor="white"
                  size="extralarge"
                   link="/resource#newsmedia"
                  target="_self"
                />
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-10 xl:gap-16 pt-14">
              {CardData.map((item, key) => (
                <div
                  key={key}
                  
                >
                  <Card
                    date={item.date}
                    title={item.title}
                    image={item.img}
                    link={item.link}
                    category={item.category}
                  />
                </div>
              ))}
            </div>
            <div className="lg:hidden block">
              <CardSlider details={CardData}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CardData = [
  {
    date: "Aug 15 2024",
    title: "Group taxation regime for infrastructure",
    img: groupTaxation.src,
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
    category: "News",
  },
  {
    date: "July 24, 2024",
    title: "Infra outlays: A strategic downplay",
    img: infraOutlays.src,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
    category: "News",
  },
  {
    date: "July 24, 2024",
    title: "Budget signals shift in infra strategy",
    img: budgetSignals.src,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
    category: "News",
  },
];
