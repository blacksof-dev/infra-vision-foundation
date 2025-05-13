import image1 from "@/../public/assets/resource/blogs/image1.png";
import image2 from "@/../public/assets/resource/blogs/image2.png";
import image3 from "@/../public/assets/resource/blogs/image3.png";
import Card from "@/_components/molecules/cardTemplate";

export default function RecentPostDetails() {
  return (
    <>
      <div>
        <h3 className="text-darkgray font-medium py-3">Recent Post</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          {allcards.map((ele, index) => {
            return (
              <div key={index} className="mb-4">
                <Card
                  date={ele.date}
                  title={ele.title}
                  image={ele.img}
                  link={ele.link}
                  category={ele.category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

const allcards = [
  {
    img: image1.src,
    category: "Transportation",
    date: "October, 2024",
    title: "How to make India’s highways safe",
    link: "https://theinfravisionfoundation.org/2024/10/16/a-national-road-safety-authority-crucial-for-improving-indias-deteriorating-road-safety/",
  },
  {
    img: image2.src,
    category: "Transportation",
    date: "October, 2024",
    title: "Multi-utility Infra, the way to go!",
    link: "https://theinfravisionfoundation.org/2023/10/09/newsletter-images-do-not-remove/",
  },
  {
    img: image3.src,
    category: "Rural and Agri Infra",
    date: "November, 2023",
    title: "Agri-Warehousing: A problem of capacity",
    link: "https://theinfravisionfoundation.org/2023/11/25/poor-regulatory-capacity-of-the-warehousing-and-development-regulatory-authority-impacts-warehouse-based-sales-of-agri-commodities-and-issue-of-e-negotiable-warehouse-receipts/",
  },
];
