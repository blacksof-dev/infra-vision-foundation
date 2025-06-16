import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";
import GetInvolved from "@/_components/molecules/newsletter";


export default function GetInvolvedSection() {
  return (
    <>
      <GetInvolved
        bgImage={infravisionfoundationBg}
        mobilebg={infravisionTalkMobile}
        tag="Get involved"
        title="Engage and contribute to change with <span class='font-medium text-white'> The Infravision Foundation</span>"
        desc="Join our community, ask questions, or participate in building a resilient India."
        ctatext="Connect with us"
      />
    </>
  );
}
