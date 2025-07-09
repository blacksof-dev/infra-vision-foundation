import image2 from "@/../public/assets/knowledeg/blogs/02.jpg";
import { UnderlineWithHover } from "@/_components/atoms/buttons";
import Image from "next/image";


export default function Page() {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-[27%] sm:pt-[20%] lg:pt-[10%] blade-bottom-padding-lg">
        <div className="px-4 ">
          <h2 className="font-poppins text-black font-medium">
            Agri-Warehousing: A problem of capacity
          </h2>
          <div>
            <div className="flex gap-4 py-2 ">
              <h6 className="text-base  text-lightgray ">
                Nitin Zamre, Former COO, The Infravision Foundation, with
                technical inputs from Gopal Naik, Professor, IIM-B, and Gopi
                Shankar, Assistant Professor, Azim Premji University, Bangalore
              </h6>
              <div className="border border-lightgray/30"></div>
              <h6 className="text-base text-lightgray">November 25, 2023</h6>
            </div>
            <div className=" lg:pt-8">
              <div className="w-full h-full ">
                <Image
                  src={image2}
                  alt="Highways safe"
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div>
                <h3 className="text-black font-medium my-7">Description</h3>
                <div>
                  <p className="text-darkgray">
                    Warehousing is a critical element of supply chain
                    management, enabling the storage of commodities and
                    smoothening of the supply-demand and price fluctuations. To
                    improve scientific warehousing, enhance credit availability
                    in rural areas, and smoothen the exchange functions, the
                    Warehousing Development and Regulatory Authority (WDRA) was
                    set up in India on October 26, 2010. The National Logistics
                    Policy (NLP) also recognises warehousing as a critical
                    element. To reduce logistics costs from ~14% to ~8%, NLP
                    identifies adequate investment in improving efficiency,
                    productivity, and quality services of warehouses, as well as
                    digitisation as key strategies.
                  </p>
                  <p className="text-darkgray pt-3">
                    However, the warehousing ecosystem has failed to meet the
                    intended outcomes. The issuance of e-Negotiable Warehouse
                    Receipts (NWR) and warehouse-based sales of
                    agri-commodities, the primary objective of WDRA, have fallen
                    short of the desired levels. The total lending against
                    NWR/e-NWR as a proportion of institutional credit for
                    agriculture is negligible and stagnant. While states like
                    Rajasthan, Gujarat, and Maharashtra made noteworthy
                    progress, many are yet to issue any e-NWR. Warehouse-based
                    sales are almost non-existent in many states. A new research
                    paper published by The Infravision Foundation (TIF) and
                    IIM-B analyses these issues and recommends measures to
                    improve them.
                  </p>

                  <p className="text-darkgray pt-3">
                    The warehousing ecosystem faces two primary challenges. The
                    first is related to warehouse registration. Estimates show
                    that only 6.35% of the warehouses and 32.02% of the
                    warehousing capacity are registered with WDRA. There is a
                    general lack of awareness regarding the registration
                    process. More importantly, data shows that WDRA registration
                    per se doesn’t guarantee improved warehouse capacity
                    utilisation. Contrarily, in major commercial centres (for
                    example, Tumkur, Karnataka), warehouse capacity utilisation
                    is high even without registration.
                  </p>

                  <p className="text-darkgray pt-3">
                    WDRA does not guarantee the security of quantity or quality
                    of stored commodities, even in registered warehouses. Since
                    warehousemen also do not assume custodianship of the goods
                    stored, banks involve collateral managers to ensure the
                    security of stock, adding to the cost burden. The paper
                    estimates that warehousing registration increases costs by
                    about 10%. Warehouse owners feel that this cost burden comes
                    with no noticeable benefits.
                  </p>

                  <p className="text-darkgray pt-3">
                    The second challenge relates to the poor regulatory capacity
                    of WDRA, which ultimately impacts the warehouse-based sales
                    and issuance of e-NWRs. WDRA aims to directly regulate about
                    1.2 lakh geographically spread-out warehouses with
                    poor/incomplete data. WDRA is thus trying to regulate
                    warehouses with no clear knowledge of what it is regulating.
                  </p>

                  <p className="text-darkgray pt-3">
                    Warehouse inspections is another, perhaps more critical
                    aspect. WDRA’s inspections focus primarily on compliance
                    with the specified registration requirements relating mostly
                    to the physical infrastructure. Inspections to ascertain the
                    quantity and quality of stock are not at desirable levels
                    and don’t give confidence to the banks to lend against
                    e-NWRs. Additionally, very few warehouses are connected to
                    the exchange, limiting warehouse-based sales. Other
                    challenges include a shortage of skilled workforce for
                    handling the warehouse business operations.
                  </p>

                  <p className="text-darkgray pt-3">
                    These challenges must be overcome to give confidence to
                    lenders. The TIF and IIM-B research paper proposes a
                    multi-pronged approach to enhance e-NWR-based lending and
                    warehouse-based sales.
                  </p>
                  <p className="text-darkgray pt-3">
                    It recommends mandatory WDRA registration for warehouses,
                    but delinks the requirement of a security deposit to bring
                    all warehouses on one platform. The research paper then
                    proposes periodic grading and ratings of warehouses based on
                    size, infrastructure for maintaining the quality of the
                    commodity and professional management. Rigorous stakeholder
                    consultation can help identify appropriate parameters for
                    rating warehouses, including compliance with physical
                    infrastructure as per WDRA guidelines, availability and
                    adequacy of trained warehouse managers, adequate security
                    measures, facilities to ensure the quality of commodities,
                    office amenities, and access to infrastructure for assaying
                    and testing.
                  </p>
                  <p className="text-darkgray pt-3">
                    The paper further recommends the creation of a cadre of
                    ‘Chartered Warehouse Auditors’ to assess the quality of the
                    warehouses. They will bring in professional management to
                    enhance the credibility of the warehouses and improve
                    lenders’ confidence.
                  </p>
                  <p className="text-darkgray pt-3">
                    A platform accessible through a portal/mobile app can make
                    available information like ratings, space availability,
                    location, and commodities stored for prospective users. The
                    platform should enable seamless registration and online
                    updating of transactions.
                  </p>
                  <p className="text-darkgray pt-3">
                    Only good-quality warehouses with better ratings should be
                    allowed to issue e-NWRs. To incentivise upgradation and
                    better ratings, financial incentives may be offered to
                    improve warehouse infrastructure and technology adoption. To
                    be able to issue e-NWRs, the warehouses must take
                    custodianship of the stock and ensure the security of the
                    quality and quantity of stock. Failure to do so must attract
                    hefty fines and a ratings downgrade. Registered warehouses
                    issuing e-NWRs must enhance the frequency and quality of
                    inspections. Significant public investment is needed to
                    upgrade the systems for quality inspection, assaying
                    facilities, standardising quality, and establishing
                    warehouses and commodity market linkages. Systematic
                    research on dispute-causing issues (e.g., losses) and a
                    better dispute resolution mechanism must be established.
                  </p>
                  <p className="text-darkgray pt-3">
                    WDRA must proactively create awareness about the
                    professional management of warehouses and their regulation.
                    The state governments must take responsibility for improving
                    the ecosystem and promoting warehouse-based sales.
                    Ultimately, commodity owners and lenders must see the value
                    in warehousing.
                  </p>

                  <div className="my-7">
                    <p className="text-black/80 font-medium">By Nitin Zamre, Former COO, The Infravision Foundation, with
                technical inputs from Gopal Naik, Professor, IIM-B, and Gopi
                Shankar, Assistant Professor, Azim Premji University, Bangalore </p>
                    <p className="text-black/80 font-medium pt-3">
                      [The author is COO of The Infravision Foundation]{" "}
                    </p>
                    <div className="w-fit py-3 px-2 overflow-hidden">
                      <UnderlineWithHover
                        size="small"
                        color="pink"
                        bgColor="pink"
                        text="Read presentation"
                        role="link"
                        target="_blank"
                        link="/assets/knowledeg/blogsPdf/warehousing.pdf"
                        borderColor="white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <RecentPostDetails /> */}
            {/* <CategoryDetailForm/> */}
          </div>
        </div>
      </div>
    </>
  );
}
