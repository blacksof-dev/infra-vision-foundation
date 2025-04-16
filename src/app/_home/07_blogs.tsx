import { HeroBtn, BorderGrayHeroBtn } from "@/_components/atoms/buttons";
import Image from "next/image";
import blogsImg from "@/../public/assets/home/blogsImg.jpg";
import BlogsDetails from "./blogsDetails";

export default function Blogs() {
  return (
    <>
      <section className="bg-[#F6F6F6]">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div>
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-pink">Blogs</h5>
            </div>
            <div className="pt-4 pb-2 md:py-5  flex flex-col md:flex-row justify-between ">
              <div>
                <h1 className="text-black font-light">
                  Fresh perspectives, expert <br /> thoughts,{" "}
                  <span className="text-black font-medium">and beyond</span>{" "}
                </h1>
              </div>
              <div className=" pt-5 md:py-5  lg:py-0 mt-auto">
                <HeroBtn
                  text="View all"
                  role="link"
                  borderColor="pink"
                  color="black"
                  bgColor="white"
                  size="extralarge"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row  xl:gap-20  ">
            <div className="pt-4 relative   xl:w-[50%]">
              <Image src={blogsImg} alt="Blogs" className=" w-full h-full rounded" />

              <div className="hidden md:block  px-6 py-4 2xl:py-8  absolute rounded bg-white lg:w-[55rem]  lg:h-[12rem] xl:w-[33rem]  xl:h-[11rem] 2xl:w-[40rem]   3xl:w-[43rem]  2xl:h-[12rem] bottom-4 left-3 right-3 ">
                <div className="flex flex-row justify-between ">
                   <div>
                    <p className="text-sm text-darkgray/80">
                      October 16, 2024
                    </p>
                  </div>
                </div>
                <div className="flex  flex-row justify-between ">
                  <div>
                    <h4 className="text-black font-medium py-2">
                      How to make India’s highways safe
                    </h4>
                    <div className="w-[80%]">
                      <p className="text-base ">
                        A fully empowered National Road Safety Authority, as
                        proposed in the 2014 Draft Road Transport and Safety
                        Bill
                      </p>
                    </div>
                  </div>
                  <div className="pt-1 pb-6 xl:py-5 mt-auto ">
                    <BorderGrayHeroBtn
                      text=""
                      role="link"
                      borderColor="darkgray/40"
                      color="black"
                      bgColor="white"
                       size="base"
                      target="_blank"
                      link="https://theinfravisionfoundation.org/wp-content/uploads/2025/03/Study-on-Implementation-of-Compensatory-Afforestation-in-India.pdf"
                      classes="text-base"
                    />
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="xl:w-[50%]">
              {BlogsData.map((item, index) => (
                <div
                  key={index}
                  className={`border-darkgray/40 ${index !== BlogsData.length - 1 ? 'border-b' : ''}`}
                >
                  <BlogsDetails
                    date={item.date}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
              <div className="lg:ml-6 block md:hidden border-t-1 border-darkgray/40 py-3">
                <div className="pt-2 md:py-3">
                  <p className=" text-sm text-darkgray">October 16, 2024</p>
                </div>
                <div className=" flex flex-row justify-between">
                  <div className="w-full md:w-[65%]  lg:w-[60%]">
                    <h4 className="py-2 font-medium">
                      How to make India’s highways safe
                    </h4>
                    <p className="text-base line-clamp-2 ">
                      {" "}
                      A fully empowered National Road Safety Authority, as
                      proposed in the 2014 Draft Road Transport and Safety Bill
                    </p>
                  </div>
                  <div className=" py-2  md:py-5 lg:py-0 lg:block hidden">
                    <BorderGrayHeroBtn
                       text="Read more"
                      role="link"
                      borderColor="darkgray/40"
                      color="black"
                      bgColor="white"
                      size="base"
                    />
                </div>
                </div>
                <div className=" py-2  md:py-5 lg:py-0 ">
                    <BorderGrayHeroBtn
                       text="Read more"
                      role="link"
                      borderColor="darkgray/40"
                      color="black"
                      bgColor="white"
                       size="base"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const BlogsData = [
  {
    date: "September 25, 2023",
    title: "India Needs Sustainability Ratings for Infrastructure Projects",
    description:
      "India’s ongoing economic transition will make it a $5 trillion economy by 2026-27 and possibly the third-largest global economy soon.",
  },
  {
    date: "November 25, 2023",
    title: "Agri-Warehousing: A problem of capacity",
    description:
      "Warehousing is a critical element of supply chain management, enabling the storage of commodities",
  },
  {
    date: "October 16, 2024",
    title: "Multi-utility Infra, the way to go!",
    description:
      "The infrastructure and construction sectors account for a significant share of the world’s consumption of material.",
  },
];

// <!-- Elfsight Twitter Feed | Untitled Twitter Feed -->
// <script src="https://static.elfsight.com/platform/platform.js" async></script>
// <div class="elfsight-app-959e97e0-03f6-4d6a-bcac-def6f92e6ba1" data-elfsight-app-lazy></div>
