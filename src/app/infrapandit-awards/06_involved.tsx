import infravisionfoundationBg from "@/../public/assets/home/infravisionfoundationBg.png";
import infravisionTalkMobile from "@/../public/assets/home/infravisionTalkMobile.jpg";
import Newsletter from "@/_components/molecules/newsletter";

export default function InfravisionTalks() {
  return (
    <>
      <Newsletter
        bgImage={infravisionfoundationBg}
        mobilebg={infravisionTalkMobile}
        tag="Get involved"
        title="Engage and contribute to change with  <span class='font-medium text-white'> The Infravision Foundation</span>"
        desc="Join our family, ask questions, suggest solutions, and participate in building a resilient India."
        ctatext="Connect with us"
        ctaLink="/get-involved"
      />
    </>
  );
}
