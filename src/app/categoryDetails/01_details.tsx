import image1 from "@/../public/assets/resource/blogs/image1.png";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";
import CategoryDetailForm from "./03_form";
import RecentPostDetails from "./02_recentPost";

export default function Details() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[27%] sm:pt-[20%] lg:pt-[10%] blade-bottom-padding-lg">
        <div className="px-4 ">
          <h1 className="font-poppins text-black font-medium">
            How to make India’s highways safe
          </h1>
          <div>
            <div className="flex gap-4 py-2 ">
              <h6 className="text-base  text-lightgray ">By Admin</h6>
              <div className="border border-lightgray/30"></div>
              <h6 className="text-base text-lightgray">October 16, 2024</h6>
            </div>
            <div className=" lg:pt-8">
              <div className="w-full h-full ">
                <Image
                  src={image1}
                  alt="Highways safe"
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div>
                <h2 className="text-black font-medium my-7">Description</h2>
                <div>
                  <p className="text-darkgray">
                    A fully empowered National Road Safety Authority, as
                    proposed in the 2014 Draft Road Transport and Safety Bill,
                    to maintain standards, conduct audits, ensure compliance,
                    and bridge central and state efforts, may well be the
                    solution for India’s rising number of road accidents. The
                    authority could penalise non-compliant agencies and
                    contractors, thereby fostering accountability. This is one
                    of several suggestions made in a road safety study by The
                    Infravision Foundation and IIT Delhi’s Transportation
                    Research and Injury Prevention Centre. India’s expanding
                    highway network boosts the economy but also destroys lives.
                    While these arterial and trunk roads expand, they are
                    increasingly becoming corridors of death, claiming thousands
                    of lives each year. Experts and policymakers are calling for
                    a radical shift in the approach to safety. As Minister for
                    Road Transport and Highways Nitin Gadkari said recently,
                    more people have lost their lives in road crashes than in
                    wars, militancy, and Naxalism combined. He has called it a
                    governmental failure, a “dark issue” for his ministry, and
                    symptomatic of a society lacking both “fear and respect for
                    the law.”
                  </p>
                  <p className="text-darkgray pt-3">
                    The Ministry of Road Transport and Highways (MoRTH) reports
                    that in 2022 alone, India witnessed 4,61,312 road accidents
                    that resulted in 1,68,491 deaths and 4.43,366 injuries — an
                    increase of 11.9 per cent in accidents, 9.4 per cent in
                    fatalities, and 15.3 per cent in injuries, compared to the
                    previous year. National highways claim the highest toll: 45
                    deaths annually per 100 km. Fatalities due to road traffic
                    crashes rank as the sixth leading cause of death among the
                    working-age population (15-49 years). The ministry has
                    estimated the socio-economic impact of road accidents at 3.5
                    per cent to 5 per cent of national gross domestic product.
                  </p>

                  <p className="text-darkgray pt-3">
                    The challenges of road safety are multifaceted, including
                    infrastructure deficiencies, driver behaviour and
                    enforcement challenges. Inadequate road design, poor
                    lighting, and lack of pedestrian crossings contribute to
                    accidents. Driver negligence, such as speeding and ignoring
                    traffic signals, further exacerbates the problem. Black
                    spots — dangerous stretches of highways where accidents
                    frequently occur — are a significant concern, with over
                    5,800 identified across the national highways, particularly
                    concentrated in states like Tamil Nadu, West Bengal, and
                    Telangana. Despite the National Highways Authority of India
                    (NHAI) spending Rs 15,702.80 crore on repairs and
                    improvements over the past five financial years, new black
                    spots continue to emerge each year. In a recent speech, Mr
                    Gadkari admitted that the number of black spots is rising
                    due to poor detailed project reports (DPRs) for road
                    projects.
                  </p>

                  <p className="text-darkgray pt-3">
                    While India’s road safety record continues to deteriorate,
                    other countries in the Indo-Pacific region, such as
                    Indonesia, Thailand and Sri Lanka, have successfully reduced
                    road traffic fatalities despite rising motorisation. Traffic
                    deaths were increasing in all countries prior to 1960, but
                    most high-income nations experienced a decline due to a
                    shift in scientific understanding. The Swedish parliament
                    fundamentally redefined global responses to road safety by
                    introducing the “Vision Zero” approach in 1997, which posits
                    that no loss of life is acceptable within the road transport
                    system and that safety must take precedence over mobility.
                    All components of the transport system — road
                    infrastructure, vehicle design, trauma centres, institutions
                    and legislation — must work cohesively to prevent fatal
                    accidents, with other parts acting as safeguards if one
                    fails.
                  </p>

                  <p className="text-darkgray pt-3">
                    The Infravision Foundation-IIT Delhi study suggests that
                    India must align with global best practices to make its
                    highways safer. Road-owning and operating agencies,
                    primarily the NHAI and state public works departments
                    (PWDs), have a crucial role and bear responsibility for
                    ensuring highway safety. These agencies must incorporate
                    safety audits at the design stage of highway projects, as
                    mandated by NHAI’s Standard EPC (Engineering, Procurement
                    and Construction) Agreement, which requires the appointment
                    of a safety consultant whose recommendations must be
                    integrated into the highway design, with engineers and
                    contractors held professionally liable for compliance.
                  </p>

                  <p className="text-darkgray pt-3">
                    A multifaceted approach is necessary, combining
                    institutional reforms, technological advancements, and
                    comprehensive policy measures. In the short term, MoRTH must
                    undertake comprehensive analyses to understand, for example,
                    why and how public funds are being used to build highways
                    that do not meet all Indian Roads Congress (IRC) standards.
                    It is crucial and time-sensitive to identify and rectify
                    gaps in contract documents that address safety compliance
                    and liability.In the medium term, MoRTH should spearhead the
                    development of new standards in areas where IRC or global
                    standards are currently lacking. It should also mandate the
                    establishment of safety sections or cells within all
                    road-owning agencies and state PWDs. These units should be
                    staffed with permanently appointed and trained safety
                    officers and consultants, ensuring that safety remains a top
                    priority at every stage of highway development.
                  </p>

                  <p className="text-darkgray pt-3">
                    Technological solutions play a crucial role in this
                    endeavour. MoRTH has initiated a programme for black spot
                    identification and rectification since 2015. The recent
                    implementation of the Advanced Traffic Management System
                    (ATMS) on National Highways, mandated by the Motor Vehicles
                    (Amendment) Act, 2019, includes electronic monitoring
                    devices like speed cameras and Automatic Number Plate
                    Recognition (ANPR) systems. These advancements align with Mr
                    Gadkari’s commitment to reducing road accident deaths by 50
                    per cent by 2030, focusing on the “4Es” of road safety:
                    Engineering, Enforcement, Education, and Emergency medical
                    services. While a lot is happening in education and
                    emergency services, the first two Es must also receive due
                    attention.As India continues its journey towards Viksit
                    Bharat, ensuring the safety of its citizens on its highways
                    is paramount. Adopting a holistic approach that combines
                    global best practices, technological innovation, and a
                    robust institutional framework, can transform its highways
                    from deadly corridors into safe arteries of progress.
                  </p>

                  <div className="my-7">
                    <p className="text-darkgray ">By Jagan Shah </p>
                    <p className="text-darkgray ">
                      [Jagan Shah is the CEO, The Infravision Foundation]{" "}
                    </p>
                    <div className="py-5">
                      <UnderlineWithHover
                        size="small"
                        color="pink"
                        bgColor="pink"
                        text="Research paper"
                        role="link"
                        link="https://theinfravisionfoundation.org/wp-content/uploads/2024/08/Safe-Highways-in-India-Challenges-and-Solutions_August-2024.pdf"
                        target="_blank"
                        borderColor="white"
                       
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RecentPostDetails/>
            <CategoryDetailForm/>
          </div>
        </div>
      </div>
    </>
  );
}
