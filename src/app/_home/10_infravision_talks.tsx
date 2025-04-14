import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
import { HeroBtn, UnderlineCta } from "@/_components/atoms/buttons";
import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";
export default function InfravisionTalks() {
  return (
    <>
      <section>
        <div className="relative h-[35rem] lg:h-[38rem]">
          {/* Desktop Background */}
          <div
            style={{ backgroundImage: `url(${infravisionfoundationBg.src})` }}
            className="bg-cover bg-center absolute inset-0 hidden md:block"
          ></div>

          {/* Mobile Background */}
          <div
            style={{ backgroundImage: `url(${infravisionTalkMobile.src})` }}
            className="bg-cover bg-center absolute inset-0 md:hidden block"
          ></div>

          {/* Content Layer (on top of background) */}
          <div className="relative z-10 w-container blade-top-padding-lg blade-bottom-padding-xl">
            <div className="flex flex-row items-center gap-2 md:gap-3">
              <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-white"></span>
              <h5 className="text-white font-medium">The Infravision Talk</h5>
            </div>
            <div className="py-4  w-[75%] sm:w-full">
              <h1 className="text-white font-light">
                Want to keep up with <br className="hidden md:block" />
                <span className="font-medium">The Infravision Foundation?</span>
              </h1>
              <h4 className="text-white font-light py-1 md:py-3">
                Subscribe to our free monthly newsletter now!
              </h4>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-start md:items-center">
              
              <div>
                <form className="w-full">
                  <div className="flex flex-row  md:w-[35rem]  bg-white rounded md:rounded-md overflow-hidden border border-darkgray/30 ">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="flex-1 px-1 sm:px-6 sm:py-3  text-base tracking-[-0.3px] outline-none text-darkgray"
                    />

                    <div className="border-l-1 border-darkgray/20 ">
                      <HeroBtn
                        text="Subscribe"
                        role="link"
                        borderColor="pink"
                        color="pink"
                        bgColor="white"
                        size="extralarge"
                        classes="w-full sm:w-auto p-1 sm:p-2 text-sm font-medium"
                        
                      />
                    </div>
                  </div>
                </form>

                

                <div className=" pt-3 sm:pt-6">
                  <UnderlineCta
                    title="Explore all newsletters"
                    color="white"
                    underlineColor="white"
                    role="link"
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
