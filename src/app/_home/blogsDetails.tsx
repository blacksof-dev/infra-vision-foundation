import { BorderGrayHeroBtn } from "@/_components/atoms/buttons";

type CardProps = {
  date: string;
  title: string;
  description: string;
};
export default function BlogsDetails({ date, title, description }: CardProps) {
  return (
    <>
      <section>
        <div className="py-3 lg:py-4 lg:border-l-1   md:border-darkgray/40">
          <div className="lg:ml-6">
            <div className="pt-2 md:py-3 ">
              <p className=" text-darkgray/80">{date}</p>
            </div>
            <div className=" flex flex-row justify-between">
              <div className="w-full md:w-[65%]  lg:w-[60%]">
                <h4 className="pb-2 font-medium">{title}</h4>
                <p>{description}</p>
              </div>
              <div className=" py-2 md:py-5 lg:py-0 mt-auto">
                <BorderGrayHeroBtn
                  text=""
                  role="link"
                  borderColor="darkgray/40"
                  color="pink"
                  bgColor="white"
                  size="extralarge"
                  //   link="https://x.com/Infra_VinayakCh/status/1773515311419191457"
                  //   target="_blank"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
