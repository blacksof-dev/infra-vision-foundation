import Image from "next/image";
const images = [
  "assets/infraShakti/gallery/image1.png",
  "assets/infraShakti/gallery/image6.png",
  "assets/infraShakti/gallery/image8.png",
  "assets/infraShakti/gallery/image2.png",
  "assets/infraShakti/gallery/image7.png",
  "assets/infraShakti/gallery/image10.png",
  "assets/infraShakti/gallery/image3.png",
  "assets/infraShakti/gallery/image5.png",
  "assets/infraShakti/gallery/image12.png",
  "assets/infraShakti/gallery/image4.png",
  "assets/infraShakti/gallery/image11.png",
  "assets/infraShakti/gallery/image9.png",
  "assets/infraShakti/gallery/image13.png",
  "assets/infraShakti/gallery/image14.png",
  "assets/infraShakti/gallery/image15.png",
];

export default function Gallery() {
  return (
    <>
      <div className="bg-whitesmoke">
        <div className="blade-top-padding-lg blade-bottom-padding-lg w-container">
          <div className="flex   flex-row  items-center gap-2 md:gap-3 ">
            <span className="w-[7px] h-[7px] md:w-[15px] md:h-[15px] rounded-full bg-pink "></span>
            <h5 className="font-medium text-pink">Gallery</h5>
          </div>
          <div className="py-2 ">
            <h1 className="text-black  font-light">
              In frames
              <span className="text-black/90 font-medium ">
                — The spirit of change
              </span>
            </h1>
          </div>
          <div className="columns-3  overflow-visible md:columns-3 lg:columns-5 gap-3 pt-8 space-y-2">
            {images.map((src, index) => (
              <div key={index} className="overflow-hidden rounded">
                <Image
                  src={src}
                  alt={`InfraShakti Photo ${index + 1}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded"
                  unoptimized
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
