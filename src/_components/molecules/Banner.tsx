import Image from "next/image"
import bannerPublication from "@/../public/assets/publication/bannerPublication.png"

export default function Banner(){
    return(
      <>
       
       <section>
         <div>
            <Image src={bannerPublication} alt="Publication Banner" className="w-full h-full" ></Image>
         </div>
       </section>
      </>
    )
}