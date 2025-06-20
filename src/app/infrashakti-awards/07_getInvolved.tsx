import Newsletter from "@/_components/molecules/newsletter";
import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";


export default function GetInvolved() {
  return (
    <>
      <Newsletter
        bgImage={infravisionfoundationBg}
        mobilebg={infravisionTalkMobile}
        tag="Get involved"
        title="Engage and contribute to change  <span class='font-medium text-white'>with The Infravision Foundation</span>"
        desc="Join our family, ask questions, suggest solutions, and participate in building a resilient India."
        ctatext="Connect with us"
      />
    </>
  );
}
