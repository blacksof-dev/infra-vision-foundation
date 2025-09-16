"use client"
import TwitterPost from "./twittersection";
import SocialMedia from "@/_components/atoms/socialMedia";
import { useApiHook } from "@/lib/useApi";
import Loading from "../loading";
import { ApiResponse } from "./01_banner";

export default  function StayConnected() {

  // const { data, isLoading, error } = useApiHook<ApiResponse[]>({
  //    url: "/content/home",
  //    cacheKey: "homeContent",
  //  });

  //  if (isLoading) {
  //      return (
  //        <section className="w-full h-[40rem] flex items-center justify-center">
  //          <Loading />
  //        </section>
  //      );
  //    }

  //      if (error || !data) {
  //     return (
  //       <section className="w-full h-[40rem] flex items-center justify-center">
  //         <p>Something went wrong</p>
  //       </section>
  //     );
  //   }
   
  //    if (!data) return null;
   
  //    const socialMedia = data.find(
  //      (section) => section.sectionKey === "socialMedia"
  //    );
   
  //    if (!socialMedia) return null;
   
  //    const response = socialMedia.data;
  return (
  
    <section id="homepage-section-6">
      <div className="blade-top-padding-lg blade-bottom-padding-lg">
        <div className="w-container flex flex-col lg:flex-row gap-7 sm:gap-6 lg:gap-20">
          {/* <div className="w-full lg:w-[50%] xl:w-[40%] ">
            <div className="flex  flex-row  items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
              <h5 className="font-medium text-black">{response.tagName}</h5>
            </div>
            <div className=" pt-4 pb-2 sm:py-4">
              <h1
                className="font-light text-black"
                dangerouslySetInnerHTML={{ __html: response.title }}
              />
            </div>

            <h6 className="text-black ">{response.description}</h6>
            <div className=" py-2 sm:py-4 hidden lg:block ">
              <h6 className="text-pink font-medium py-2">Follow us on</h6>
                <SocialMedia/>
            </div>
          </div> */}
          <div className="w-full lg:w-[50%] xl:w-[60%]  ">
            {/* <TwitterPost ctaName={response.cta?.text??""} ctaLink={response.cta?.target??""} /> */}
          </div>
          <div className=" py-2 sm:py-4 block lg:hidden">
            <h6 className="text-pink font-medium">Follow us on</h6>
              <SocialMedia/>
          </div>
        </div>
      </div>
    </section>
  );
}
