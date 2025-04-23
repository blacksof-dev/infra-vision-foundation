import Newsletter from "@/_components/molecules/newsletter";
import infratalkBook from "@/../public/assets/publication/infratalkBook.png"


export default function InfravisionTalk() {
  return (
    <>
      <Newsletter
        bgColor="pink"
        title="Want to keep up with <br/> <span class='font-medium text-white'>The Infravision Foundation?</span>"
        desc="Subscribe to our free monthly newsletter now!"
        herobtntitle="Subscribe"
        image={infratalkBook}
      />
    </>
  );
}
