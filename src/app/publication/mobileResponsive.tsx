// "use client";
// import volume15 from "@/../public/assets/publication/newsletter/volume15.png";
// import volume16 from "@/../public/assets/publication/newsletter/volume16.png";
// import volume17 from "@/../public/assets/publication/newsletter/volume17.png";
// import volume18 from "@/../public/assets/publication/newsletter/volume18.png";
// import volume19 from "@/../public/assets/publication/newsletter/volume19.png";
// import volume20 from "@/../public/assets/publication/newsletter/volume20.png";
// import { UnderlineWithHover } from "@/_components/atoms/buttons";
// import { useState } from "react";
// import Image from "next/image";

// export default function MobileResponsive() {
//   const visiblecount = 3;

//   let [limit, setlimit] = useState(visiblecount);

//   const [tab, setTab] = useState("All");
//   const [filtertab, setfiltertab] = useState("2025");


//   const handleSeeMoreCta = () => {
//     setlimit((prev) => prev + 3);
//   };

//   const FilteredCard = () => {
//     if (tab === "Publication Year") {
//       return filtertab === "All"
//         ? allcards
//         : allcards.filter(
//             (card) => card.date.split(" ").pop() === filtertab
//           );
//     }
//     return allcards;
//   };

//   return (
//     <>
//       <section className="blade-top-padding">
//         <div>
//           <div className="grid grid-cols-1 sm:grid-cols-2  gap-10  ">
//             {FilteredCard().slice(0, visiblecount).map((ele, index) => (
//               <div>
//                 <div>
//                   <Image src={ele.img} alt={ele.category} className="" />
//                 </div>
//                 <div className="flex flex-row justify-between py-4">
//                   <div className="flex flex-row gap-2 justify-center items-center">
//                     <span className="w-[7px]  h-[7px] md:w-[12px] md:h-[12px] rounded-full  bg-darkgray/30"></span>
//                     <p>{ele.category}</p>
//                   </div>

//                   <p className="text-darkgray">{ele.date}</p>
//                 </div>
//                 <div>
//                   <h5 className="text-blacksecond font-medium">{ele.title}</h5>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-center mt-8 ">
//             {visiblecount <= allcards.length && (
//               <div className="flex justify-center mt-8 ">
//                 <UnderlineWithHover
//                   size="xxlsize"
//                   color="pink"
//                   bgColor="pink"
//                   text="See more"
//                   role="button"
//                   borderColor="white"
//                   handlefun={handleSeeMoreCta}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// const allcards = [
//   {
//     id: 1,
//     img: volume20,
//     category: "Volume 20",
//     date: "January, 2025",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 2,
//     img: volume19,
//     category: "Volume 19",
//     date: "December, 2024",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 3,
//     img: volume18,
//     category: "Volume 18",
//     date: "November, 2024",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 4,
//     img: volume17,
//     category: "Volume 17",
//     date: "October, 2024",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 5,
//     img: volume16,
//     category: "Volume 16",
//     date: "September 2024",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 6,
//     img: volume15,
//     category: "Volume 15",
//     date: "August, 2024",
//     title:
//       "A power-packed month featuring CAIRA’s first roundtable on agri exports...",
//     link: "",
//   },
//   {
//     id: 7,
//     img: volume15,
//     category: "dummy",
//     date: "dummy,2023",
//     title: "dummy content to set see more section....",
//     link: "",
//   },
// ];
