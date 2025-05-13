import MediaSection from "@/_components/molecules/mediaSectionTemplate";
import workshop from "@/../public/assets/home/workshop.png";
import rail from "@/../public/assets/home/rail.png";
import agriExports from "@/../public/assets/home/agriExports.png";
import publications from "@/../public/assets/home/publications.png";
import publicationDesktop from "@/../public/assets/home/publicationDesktop.png";

export default function Publication(){
  return(
    <>
     <MediaSection
      title="Featured publications"
      desc="Insights that illuminate,<br/> <span class='text-black font-medium'> update, and foster impact</span>"
      ctatitle="Explore our publications"
      img1={publicationDesktop}
      blog1title="Research paper"
      blog1date="November, 2024"
      blog1desc="Study on implementation of compensatory afforestation in India"
      blog1link="https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf"
      cards={CardData}
      data={Publicationdata}
     />
    </>
  )
}


const Publicationdata = [
  {
    category: "Research paper",
    date: "November, 2024",
    title: "Study on implementation of compensatory afforestation in India",
    img: publications.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf",
  },
  {
    category: "Newsletter",
    date: "Aug 2024",
    title: "Workshop on trees outside forests",
    img: workshop.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/02/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
];



const CardData = [
  {
    category: "Newsletter",
    date: "Aug  2024",
    title: "Workshop on trees outside forests",
    img: workshop.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/01/INFRAVISION-TALK-January-2025.pdf",
  },
  {
    category: "Research paper",
    date: "July, 2024",
    title: "The case for developing high-speed rail corridors in India",
    img: rail.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/02/The-Case-For-Developing-High-Speed-Rail-Corridors-In-India.pdf",
  },
  {
    category: "Newsletter",
    date: "February, 2025",
    title: "CAIRA Roundtable on Agri Exports is a success",
    img: agriExports.src,
    link: "https://theinfravisionfoundation.org/wp-content/uploads/2025/03/INFRAVISION-TALK-February-2025-Newsletter.pdf",
  },
];