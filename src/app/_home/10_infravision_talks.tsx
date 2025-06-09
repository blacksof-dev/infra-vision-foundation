import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";
import Newsletter from "@/_components/molecules/Newsletter";

export default function InfravisionTalks() {
  return (
    <>
      <Newsletter
       bgImage={infravisionfoundationBg}
       mobilebg={infravisionTalkMobile}
       tag="The Infravision Talk"
       title="Want to keep up with <br/> <span class='font-medium text-white'>The Infravision Foundation?</span>"
       desc="  Subscribe to our free monthly newsletter now!"
       herobtntitle="Subscribe"
       UnderlineCtatitle="Explore all newsletters" 
      />
    </>
  );
}
