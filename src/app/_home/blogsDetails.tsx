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
              <p className="text-sm text-darkgray/80">{date}</p>
            </div>
            <div className=" flex flex-row justify-between">
              <div className="w-full md:w-[65%]  lg:w-[60%]">
                <h4 className="py-2 font-medium ">{title}</h4>
                <p className="text-base line-clamp-2  ">{description}</p>
              </div>
              <div className=" py-2   md:py-5 lg:py-0 mt-auto hidden lg:block">
                <BorderGrayHeroBtn
                  text="Read more"
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
            <div className="lg:hidden  block py-3 md:py-5 lg:py-0 mt-auto">
              <BorderGrayHeroBtn
                text="Read more"
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
      </section>
    </>
  );
}
