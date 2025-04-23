import Newsletter from "@/_components/molecules/newsletter";
import newsletterbg from "@/../public/assets/resource/newsletterbg.png"
export default function ResourceNewsLetter(){
    return(
        <>
       <Newsletter
        bgImage={newsletterbg}
        mobilebg={newsletterbg}
        tag="The Infravision Talk"
        title="Want to keep up with <br/> <span class='font-medium text-white'>The Infravision Foundation?</span>"
        desc="  Subscribe to our free monthly newsletter now!"
        herobtntitle="Subscribe"
        UnderlineCtatitle="Explore all newsletters" 
      />
        </>
    )
}