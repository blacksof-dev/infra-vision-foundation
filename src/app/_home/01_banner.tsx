import Image from "next/image";
import BannerBg from "@/../public/assets/home/BannerBg.png";
import Updates from "./updates";
import { getData } from "@/lib/getServerData";

interface ApiResponse {
  title: string;
  description: string;
  image: string;
}
export default async function Banner() {
  const data = await getData<ApiResponse>("/content/home/bannerContent");
 
  return (
    <>
      <section id="homepage-section-01">
        <div className="relative overflow-hidden">
          <div className="relative  w-full h-[40rem] xl:h-[47rem] 2xl:h-screen">
            <Image
              src={`/assets/home/${data.image}`}
              fill
              alt="InfraVision Foundation"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-container">
            <div className="  absolute top-[24%]  md:top-[30%] xl:top-[25%]">
              <div data-aos="fade-up" className="sm:w-[70%] md:w-[50%] lg:w-[50%]">
                  <h1 className="tracking-[-4%] font-light txt-black/90 "   dangerouslySetInnerHTML={{__html:data.title}} />
                   
    
              </div>
              <div className="w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%]   py-4">
                <h5 className="text-black ">{data.description}</h5>
              </div>
            </div>
            <div className="absolute bottom-8 xl:bottom-8 w-screen p-1">
              <Updates />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
