import MediaSection from "@/_components/molecules/mediaSectionTemplate";
import news1 from "@/../public/assets/resource/newsMedia/news1.png"
import news2 from "@/../public/assets/resource/newsMedia/news2.png"
import news3 from "@/../public/assets/resource/newsMedia/news3.png"
import news4 from "@/../public/assets/resource/newsMedia/news4.png"

export default function Publication(){
  return(
    <>
     <MediaSection
      title="News and media"
      desc="<span class ='text-black font-medium'> The Infravision Foundation <br /> </span> in the public sphere"
      img1={news1}
      blog1title="Article"
      blog1date="August, 2024"
      blog1desc="Group taxation regime for infrastructure"
      blog1link="https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html"
      cards={CardData}
      data={resourcedata}
     />
    
    </>
  )
}


const resourcedata = [
  {
    category: "Article",
    date: "August, 2024",
    title: "Group taxation regime for infrastructure",
    img: news1,
    link: "https://www.business-standard.com/opinion/columns/group-taxation-regime-for-infrastructure-124081500813_1.html",
  },
  {
    category:"Company News",
    date:"July, 2024",
    title:"Infra outlays: A strategic downplay as the budget signals a move out of the era of large infra",
    img: news2,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    category: "Company News",
    date: "July, 2024",
    title: "Budget signals shift in infra strategy as govt pushes states, private sector to pitch in",
    img: news3,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
  },
  {
    category: "Company News",
    date: "September, 2024",
    title: "Robust private sector investment taking place in various sectors: Vinayak Chatterjee",
    img: news4,
    link: "",
  },
];



const CardData = [
  {
    category:"Company News",
    date:"July, 2024",
    title:"Infra outlays: A strategic downplay as the budget signals a move out of the era of large infra",
    img: news2,
    link: "https://www.financialexpress.com/opinion/nbspinfra-outlays-a-strategic-downplay-the-budget-signals-a-move-out-of-the-era-of-large-infra-spends-pump-priming-the-economy/3563263/#:~:text=stressful%20Covid%20period.-,Across%20the%20last%20few%20years%2C%20India%20saw%20Union%20Budget%20infra,11%25%20to%20Rs%2011.1%20trillion.",
  },
  {
    category: "Company News",
    date: "July, 2024",
    title: "Budget signals shift in infra strategy as govt pushes states, private sector to pitch in",
    img: news3,
    link: "https://www.moneycontrol.com/news/business/economy/budget-signals-shift-in-infra-strategy-as-govt-pushes-states-private-sector-to-pitch-in-12777120.html",
  },
  {
    category: "Company News",
    date: "September, 2024",
    title: "Robust private sector investment taking place in various sectors: Vinayak Chatterjee",
    img: news4,
    link: "",
  },
];