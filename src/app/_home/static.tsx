import Kiran from "@/../public/assets/home/trustees/Kiran.jpg";
import Rumjhum from "@/../public/assets/home/trustees/Rumjhum.jpg";
import kiranImg from "@/../public/assets/home/trustees/kiranImg.png";
import rumjhumImg from "@/../public/assets/home/trustees/rumjhumImg.png";
import vinayakImg from "@/../public/assets/home/trustees/vinayakImg.png";

import Arun from "@/../public/assets/home/advisory/Arun.jpg";
import ArunNanda from "@/../public/assets/home/advisory/ArunNanda.jpg";
import AshishDhawan from "@/../public/assets/home/advisory/AshishDhawan.jpg";
import CyrilShroff from "@/../public/assets/home/advisory/CyrilShroff.png";
import DKSen from "@/../public/assets/home/advisory/DKSen.jpg";
import JanmejayaKSinha from "@/../public/assets/home/advisory/JanmejayaKSinha.jpg";
import GeetanjaliKirloskar from "@/../public/assets/home/advisory/GeetanjaliKirloskar.jpg";
import HemendraMKothari from "@/../public/assets/home/advisory/HemendraMKothari.jpg";
import jagan from "@/../public/assets/home/team/jagan.jpg";
import khurshed from "@/../public/assets/home/advisory/khurshed.jpg";
import NarotamSekhsaria from "@/../public/assets/home/advisory/NarotamSekhsaria.jpg";
import ProfessorGRaghuram from "@/../public/assets/home/advisory/ProfessorGRaghuram.jpg";
import NasserMunjee from "@/../public/assets/home/advisory/NasserMunjee.jpg";
import RajnishKumar from "@/../public/assets/home/advisory/RajnishKumar.jpg";
import SameerGupta from "@/../public/assets/home/advisory/SameerGupta.jpg";
import SNSubrahmanyan from "@/../public/assets/home/advisory/SNSubrahmanyan.jpg";
import SunilMathur from "@/../public/assets/home/advisory/SunilMathur.jpg";
import DilipCherian from "@/../public/assets/home/advisory/DilipCherian.jpg";
import ManojKSingh from "@/../public/assets/home/advisory/ManojKSingh.jpg";
import VishalKampani from "@/../public/assets/home/advisory/VishalKampani.png";

import AkhileshTilotia from "@/../public/assets/home/fellows/AkhileshTilotia.jpg";
import rajajiMeshram from "@/../public/assets/home/fellows/rajajiMeshram.png";
import rajivRanjanMishra from "@/../public/assets/home/fellows/rajivRanjanMishra.jpg";
import rasikaAthawale from "@/../public/assets/home/fellows/rasikaAthawale.jpg";
import SoumyaKantiGhosh from "@/../public/assets/home/fellows/SoumyaKantiGhosh.jpg";
import supratimSarkar from "@/../public/assets/home/fellows/supratimSarkar.jpg";

import MutumChaobisana from "@/../public/assets/home/team/MutumChaobisana.png";
import KavereeBamzai from "@/../public/assets/home/team/KavereeBamzai.png";
import LawrenceCardoza from "@/../public/assets/home/team/LawrenceCardoza.jpg";
import PriyankaBains from "@/../public/assets/home/team/PriyankaBains.jpg";
import RumjhumChatterjee from "@/../public/assets/home/team/RumjhumChatterjee.jpg";
import Vinayak from "@/../public/assets/home/team/Vinayak.jpg";
import VrindaSingh from "@/../public/assets/home/team/VrindaSingh.png";

import { StaticImageData } from "next/image";

export type CardData = {
  image: StaticImageData;
  title: string;
  desig: string;
  link?: string;
  popupImg: string;
  popupdesc: string;
};

export const trustee = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
    popupImg: vinayakImg.src,

    popupdesc:
      `Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021. Since stepping down from active management, he now dedicates his time and energy to infrastructure policy and advocacy, as well as to nurturing educational institutions.\n

Mr Chatterjee is frequently called upon to play a strategic advisory role to leading domestic and international corporates, the Government of India, various ministries involved in infrastructure, and multilateral and bilateral institutions in the areas of infrastructure policy, planning, and implementation. He is a leading proponent of the Public-Private Partnership (PPP) model for developing India’s infrastructure. His more recent engagements with the Government of India include being a member of the Committee on setting up a Development Finance Institution (DFI) and a member of the Consultative Group on PPPs at NITI Aayog.\n

In 1998, the World Economic Forum at Davos recognised him as one of the 100 Global Leaders of Tomorrow. In 2011, the Indian Institute of Management, Ahmedabad, conferred on him the “Distinguished Alumnus Award”.\n

Mr Chatterjee is currently the Chairman of the Confederation of Indian Industry’s (CII) National Council on Infrastructure and has chaired various infrastructure and economic committees at the national level of CII since 2001. He is on the Board of Directors of ACC Ltd, Apollo Hospitals Enterprise Ltd, KEC International Ltd, and L&T Infotech Ltd; and is a member of the Advisory Board of JCB India. He serves as the Chairman of the Board of Governors of the Indian Institute of Technology, Dharwad, and on the Boards of the Indian Institute of Management, Sirmaur, and the National Rail and Transportation Institute, Vadodara.\n

He is a popular columnist and writes a monthly column on infrastructure for Business Standard called “INFRATALK”. He has also authored a book titled “Getting it Right – India’s Unfolding Infrastructure Agenda”, published in 2011.\n

Mr Chatterjee graduated in Economics (Hons.) from St. Stephen's College, Delhi University (1976-1979) and completed his MBA from the Indian Institute of Management, Ahmedabad (1979–1981).
`,
  },
  {
    image: Rumjhum,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
    link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
    popupImg: rumjhumImg.src,

    popupdesc:
      `
Rumjhum Chatterjee co-founded the Feedback Infra Group. Following a successful tenure, she recently stepped down from her role as Group Managing Director and Head-Human Capital within the organisation.\n

She is currently the Chairperson of the Feedback Foundation Charitable Trust. The Trust is deeply involved in rural and urban sanitation, including solid waste management, and has successfully implemented numerous projects nationwide through community engagement. Ms Chatterjee pioneered community-led interventions for Resettlement and Rehabilitation (R&R) post land acquisition for infrastructure projects. Her paper, “Sustainable Rehabilitation Interventions through Community Engagement,” was published in the India Infrastructure Report 2009, issued by the 3iNetwork.\n

A leading practitioner in human capital management within the infrastructure sector, she was recognised as one of the 20 Most Talented HR Leaders in India by the World HRD Congress in 2013. She plays an active role in the Confederation of Indian Industry (CII), notably as the first woman Chairperson for the CII Northern Regional Council (2016-17). With a deep interest in women's empowerment, she chaired CII’s Women Exemplar Program (2015-17) and has served on its Jury Selection Committee since its inception in 2005. She also chaired the CII National Women’s Empowerment Committee for several years, representing industry perspectives on this critical issue before Parliamentarians in India. Furthermore, she participated in a closed-door interaction to discuss this topic with the Prime Minister of Japan, Mr. Shinzo Abe, during his visit to India in January 2014.\n

Currently, she co-chairs CII’s National Committee on CSR. She previously served as an Independent Director on the Board of Blue Star Ltd. and presently serves on the Boards of Somany Ceramics Ltd. and C&S Electric Ltd. (a subsidiary of Siemens India Ltd.). She is the Vice Chairperson and a member of the Governing Body of HelpAge India, the country’s largest not-for-profit organisation dedicated to the welfare of the aged. She is also a Trustee of HDFC Schools. Ms Chatterjee holds a degree in Psychology from Calcutta University.

      `
  },

  {
    image: Kiran,
    title: "Kiran Karnik",
    desig: "Trustee",
    popupImg: kiranImg.src,

    popupdesc:
      `Kiran Karnik is a distinguished professional with a career spanning public service and the corporate world, known for his pioneering contributions to India's communications industry. He has consistently operated at the cutting edge of technology, from working with the great Vikram Sarabhai to establish the Satellite Instructional Television Experiment, to laying the foundations of the Discovery Channel and Animal Planet in India.\n

Governments frequently rely on his expertise in times of crisis, as demonstrated by his leadership in managing NASSCOM following the sudden passing of Dewang Mehta, and heading the Satyam Computer Services board after its disbandment due to irregularities. His remarkable ability to navigate technological transitions and mentor others has positioned him as a valuable national asset.\n

Mr Karnik has served as President of the India Habitat Centre and Chairman of IIITD, and currently chairs HelpAge India. He has also been conferred the prestigious Padma Shri award. We are honoured that he guides us as a Trustee.

      `
  },
];

export const advisory = [
  {
    image: NasserMunjee,
    title: "Nasser Munjee",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/nasser-munjee-8aaa5316/",
    popupImg: vinayakImg.src,

    popupdesc:
      `
      Naseer Munjee was educated at Cambridge and the London School of Economics in the UK, and the University of Chicago in the US. His career has focused on the creation of financial institutions in India and addressing development challenges in emerging economies.\n

He was instrumental in establishing Housing Development Finance Corporation (HDFC), India's first mortgage company, where he served for twenty years, rising to Executive Director. At the request of the HDFC Chairman, he then founded Infrastructure Development Finance Company, a joint partnership with government and domestic and international institutions, which he led as Managing Director and CEO for seven years.\n

Mr Munjee currently serves on the Boards of ten public companies in India, including Cummins India Limited, Ambuja Cements Limited (Holcim Group), Tata Motor Finance Ltd (where he is Group Chairman), and The Indian Hotels Company Limited. Internationally, his board appointments include Jaguar Land Rover Plc, UK Greenko, Mauritius, and Adsum Capital Ltd, Dubai. He is also a member of the Advisory Group of the City of London and the Executive Committee of the World Islamic Economic Forum.\n

His extensive institutional involvement includes chairing the Aga Khan Foundation (India), the Aga Khan Rural Support Programme (India), and Global Infrasys Limited. He is also a member of the Advisory Board of the South Asian Centre, London School of Economics, and the Bombay City Policy and Research Foundation (Bombay Chamber of Commerce). Previously, he served as a Board member or Trustee for institutions such as Welham Boys School, the Indian Institute for Human Settlements (Life Trustee), Charles Correa Urban Foundation, Currimbhoy Orphanage, the Advisory Board of the Schulich School of Management (University of Toronto), CanCare Trust, Miracle Feet, and Sommerville College, Oxford India Centre.\n

Mr Munjee has provided consultancy services in housing finance to the Asian Development Bank, the World Bank, the UNCDF (United Nations Capital Development Fund), and the UN (Habitat) in Sri Lanka, Bhutan, Ethiopia, Thailand, and Indonesia.

      `
  },
  {
    image: HemendraMKothari,
    title: "Hemendra M. Kothari",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,

    popupdesc:
      `
    Hemendra Kothari represents the fourth generation of a family of prominent stockbrokers and is the ex-President of the Bombay Stock Exchange. He has over 50 years of experience in the financial services industry.\n

He is currently the Chairman of DSP Investment Managers Pvt Ltd, one of the leading asset management companies in India, which was in a decade-long joint venture with BlackRock. He also served as Chairman of DSP Merrill Lynch, a joint venture with Merrill Lynch, until his retirement in 2009.\n

Mr Kothari is a Member of the Governing Council of the National Investment and Infrastructure Fund (NIIF), which was created by the Government of India to maximise economic impact through infrastructure development. He has also served as a member on various boards and committees, including The National Institute of Securities Market (NISM), set up by the Securities and Exchange Board of India (SEBI); the Corporatisation and Demutualization of Stock Exchanges Committee; Infrastructure Financing, Department of Economic Affairs (Infrastructure), Ministry of Finance; and the Standing Committee on Money Markets, Reserve Bank of India. He currently serves on the Investment Advisory Committee of the Army Group Insurance Fund.\n

He was a Member of the Indo-UK Roundtable, which was established by the British Foreign and Commonwealth Office and the Ministry of External Affairs, Government of India. He is currently a Member of the India-UK Financial Partnership (IUKFP).\n

Mr Kothari is the Founder, Chairman and Managing Trustee of the Wildlife Conservation Trust (WCT), a non-religious and non-political, not-for-profit Trust that endeavours to strengthen the protection of forest ecosystems and mitigate climate change. He is also one of the largest individual donors in wildlife and environmental conservation in India. He is a Member of the State Board for Wildlife of Rajasthan, under the Chairmanship of the Chief Minister. He also served as a Member of the State Board of Maharashtra. He serves as the India Chairman of The Nature Conservancy (TNC), the largest environmental organisation in the world. He has served as a Member of The Energy and Resources Institute (TERI) Governing Council. He founded the Hemendra Kothari Foundation (HKF), a philanthropic organisation which assists other NGOs, particularly in the areas of education, healthcare, art, culture, heritage, and sports.
`
  },
  {
    image: JanmejayaKSinha,
    title: "Dr. Janmejaya K. Sinha",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,

    popupdesc:
      `Dr Janmejaya Sinha is Chairman of BCG's India Practice and also a BCG Fellow researching Family Businesses. He is a member of The Boston Consulting Group’s Henderson Institute Innovation Sounding Board, dedicated to supporting, inspiring, and guiding upstream innovation at BCG. He previously served as Chairman of the Asia-Pacific region between 2009 and 2018 and as a member of the firm's Executive Committee between 2006 and 2018.\n

He possesses deep expertise in managing conflict in family-owned businesses. He has worked extensively with clients worldwide on a range of issues encompassing large-scale organisation transformation, strategy, governance, family business matters, and operations turnaround.\n

Dr Sinha has been a member of various committees set up by the Government of India, Reserve Bank of India (RBI), and Indian Banks' Association (IBA). He chairs the Confederation of Indian Industry's Committee on Financial Inclusion and Fintech. He was also a member of the Committee of Chief Ministers on the adoption of Digital Payments.\n

He writes extensively in the press and is a regular speaker at the WEF, CII, IBA, FICCI, RBI, and other media events. He is a co-author of the book titled "Your Strategy Needs a Strategy", published by Harvard Business Review Press, and has co-edited the book titled "Own The Future", published by Wiley. In 2010, Consulting Magazine named him one of the Top 25 most influential consultants in the world.\n

Before joining The Boston Consulting Group, he worked with the Reserve Bank of India for several years across different departments. He has also worked briefly for the World Bank.\n

Dr Sinha holds a PhD from the Woodrow Wilson School of Public and International Affairs, Princeton University, US; a BA and an MA in Economics from Clare College, Cambridge University, UK; and a BA and an MA in History from St Stephen’s College, Delhi University, India.
`
  },
  {
    image: NarotamSekhsaria,
    title: "Narotam Sekhsaria",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,

    popupdesc:
      `
    Narotam Sekhsaria, Chairman of Ambuja Cements Ltd and Chairman of ACC Ltd, is a prominent figure in the Indian cement industry. He introduced new standards in manufacturing, management, marketing efficiency, and corporate social responsibility to an industry he helped transform.\n

A first-generation industrialist, Mr Sekhsaria completed his Bachelor’s in Chemical Engineering with honours and distinction from the University of Bombay. He was the principal founder-promoter of Ambuja Cement, and its Chief Executive and Managing Director from its inception in April 1983 until January 2006. He is currently the non-executive Chairman of the company.\n

He built Ambuja Cement into a highly efficient and profitable cement company in India. He also redefined industry practices by turning cement from a commodity into a brand, bringing cement plants closer to cement markets, and linking plants to lucrative coastal markets by setting up ports and a fleet of bulk cement ships for the first time in India. During his tenure as Managing Director from inception until 2006, the company grew from 0.7 million tonne capacity to 22 million tonnes, expanding from one location to a pan-India company which set the benchmark for the cement industry across every significant business parameter.\n

In 1999, Ambuja Cement made a strategic investment in ACC, India's oldest and most prestigious cement company, by acquiring approximately 14.5% stake. Mr Sekhsaria was appointed Vice-chairman of the company. Under his leadership, ACC entered a new growth trajectory and achieved significant improvements in project management, logistics, and overall cost-competitiveness. Mr Sekhsaria has been the non-executive Chairman of the company since 2006.\n

He currently holds Board positions as Chairman of Narotam Sekhsaria Foundation and Ambuja Cement Foundation. He is a Board Member in the Governing Council of the Indian Institute of Crafts & Design, Jaipur, and is Director of the Ambuja Educational Institute. Previously, he served as a Trustee on the Board of UTI (1993-2001), as the Vice Chairman of GRUH Finance Ltd (a co-investment of Ambuja Cement with HDFC), and was also on the Board of Governors of the Indian Institute of Technology (IIT) Kharagpur.
 
     `
  },
  {
    image: RajnishKumar,
    title: "Rajnish Kumar",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,

    popupdesc:
      `
     Rajnish Kumar is the former Chairman of the State Bank of India, completing his three-year term in October 2020. He is credited with steering the bank successfully through challenging times. During his tenure, SBI developed YONO, a digital platform that established the bank as a global leader in the adoption of technology and innovation.\n

Mr Kumar is a career banker with nearly four decades of service with the State Bank of India. His expertise in corporate credit and project finance is well recognised. He served the bank in various capacities across the country, including in the North-East as Chief General Manager. He successfully managed the UK operations of the bank immediately after the crisis caused by the collapse of Lehman Brothers. Earlier, he worked as Vice President (Credit) in Toronto.\n

Mr Kumar was also the Chairman of SBI’s subsidiaries, notably SBI Life Insurance Company Limited, SBI Foundation, SBI Capital Markets Limited, and SBI Cards & Payments Services Limited. He also served as Director on the boards of various organisations, including Export-Import Bank of India, Institute of Banking Personnel Selection, National Institute of Bank Management, Pune, Indian Banks’ Association, Khadi & Village Industries Commission, and Indian Institute of Banking & Finance, among others.\n

He is currently serving as an independent director on the Boards of many prestigious companies, such as HSBC, Asia Pacific and L&T Infotech. He is also Non-Executive Chairman of Resilient Innovations Pvt Ltd (BharatPe), one of the fastest-growing Fintech companies in the country, and an independent director on the Board of Lighthouse Communities Foundation. Mr Kumar is also an advisor to Kotaik Investment Advisors Ltd and Barings Private Equity Asia Ltd, apart from being a Member of the Board of Governors, Management Development Institute, Gurugram.\n

Born in January 1958, Mr Kumar holds an MSc in Physics from Meerut University and is a Certified Associate of the Indian Institute of Bankers (CAIIB). Mr Kumar is an avid traveller and has visited several countries.

     `
  },
  {
    image: ProfessorGRaghuram,
    title: "Professor G. Raghuram",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,

    popupdesc:
      `
      Professor Raghuram is Principal Academic Advisor and Distinguished Visiting Faculty at the National Rail and Transportation Institute, a university promoted by the Indian Ministry of Railways. He is Professor (Emeritus) at the Gujarat Maritime University, a university promoted by the Gujarat Maritime Board. He was Director, IIM Bangalore, from February 2017 to July 2020.\n

Earlier, he served as Professor and Chairperson of the Public Systems Group at IIMA. He has been Dean (Faculty), IIMA, Vice-Chancellor of the Indian Maritime University, and held the Indian Railways Chair Professor at IIMA.\n

Professor Raghuram received a PhD from Northwestern University, USA (1984); a postgraduate Diploma in Management from IIM, Ahmedabad (1978); and a BTech from IIT, Madras (1976). He specialises in infrastructure and transport systems, logistics and supply chain management. His research focuses on the railway, port, shipping, aviation, and road sectors.\n

He has published over 35 refereed papers in journals and written over 160 case studies. He has also published six co-authored books. His expertise spans applied Operations Research and Management modelling in network-oriented firms, including railroads and logistics, and public policy in the context of Public-Private Partnerships (PPPs) in transport infrastructure.\n

He serves on the Board of Directors of several companies in the fields of infrastructure and logistics, educational institutions, and Foundations working in the domain of Logistics and Transportation. He has teaching experience at universities in India, the USA, Canada, Yugoslavia, Singapore, Tanzania, the UAE, and Japan. He was a member of the Global Future Council on Mobility of the World Economic Forum from 2013-17.\n

Professor Raghuram has received several accolades, including the 'Lifetime Achievement Award' for Transport Excellence, by Mahindra and Mahindra, supported by the Ministry of Road Transport and Highways in 2018; the 'MC Puri Memorial Award' for contribution to Operational Research in India in 2016; and 'The Lifetime Achievement Award' for contribution to Logistics and Infrastructure by EXIM News in 2014.\n

He has offered consultancy services to over 100 organisations, including multilateral agencies. He has been part of various government policy-making and advisory committees for the Ministries of Civil Aviation, Consumer Affairs and Public Distribution, Railways, Road Transport and Highways, and Shipping. He has also played roles in the Cabinet Secretariat, Comptroller and Auditor General, the Planning Commission, and various State Governments.

      `
  },
  {
    image: ManojKSingh,
    title: "Manoj K. Singh",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/manoj-k-singh-72817a9/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
    Manoj K Singh of S&A Law Offices, New Delhi, India, is a reputable lawyer specialising in commercial disputes and advisory, with a keen focus on the infrastructure sector. His practice areas encompass commercial litigation and arbitration (both domestic and international), white-collar crime, bankruptcy law, company law, international trade law, banking & debt recovery laws, securities law, and taxation.\n

He advises clients on all aspects related to the functioning of infrastructure projects, foreign investment in India, offshore commercial borrowings, cross-border taxation, project financing, anti-dumping, energy, and natural resources. His expertise also includes advising clients on commercial dispute strategies, troubleshooting advisory, and general corporate advisory.\n

Mr Singh currently represents various Fortune 500 companies and large business houses. He is admired for his out-of-the-box, goal-oriented thinking and for achieving results in complex legal cases. He has approximately two decades of experience on various legal issues, during which he has appeared and argued matters before the Supreme Court of India, all High Courts in India, various Tribunals, and ad-hoc and institutional arbitrations (both domestic and international).\n

Mr Singh has also acted on behalf of various government authorities, including the Government of Madhya Pradesh, New Delhi Municipal Corporation, South Delhi Municipal Corporation, Delhi Transco Ltd, Delhi Power Company Limited, Indian Oil Corporation, Government of Rajasthan, Container Corporation of India, IRCON International Limited, The Shipping Corporation of India Ltd, Solar Corporation of India, IIT Jodhpur, Rail Development Authority of India, Delhi Development Authority, Delhi Co-operative Housing Finance Corporation Ltd, Defence Research and Development Organisation, National Research Development Council, Technology Information, Forecasting and Assessment Council, The Institute of Cost Accountants of India, and Centre for E-Governance.\n

Apart from being a prolific columnist in his field, Mr Singh has also authored the book titled "Infrastructure Arbitration — A Perspective", which is widely recognised as informative literature in the field.

    `
  },

  {
    image: SunilMathur,
    title: "Sunil Mathur",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/sunil-mathur/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
    Sunil Mathur has been the Managing Director and Chief Executive Officer of Siemens Limited, India and South Asia since 2014. He is currently a Member of the Global Leadership Team of Siemens, a Member of the Board of Siemens Healthcare Pvt Limited in India, and Chairman of Siemens Gamesa Renewable Power Pvt Ltd in India.\n

Prior to 2014, he was the Executive Director and Chief Financial Officer of Siemens Limited from 2008, responsible for Sri Lanka, Bangladesh, Nepal, and Bhutan. During this tenure, he was a Member of the Global Finance Management Team.\n

Mr Mathur has been with Siemens for over 30 years, holding several Senior Management positions in Germany, where he worked in the Power Generation Division and also as Chief Financial Officer of a Global Business Unit in the Industrial Automation Division of the company. He possesses wide experience in integrating companies, creating Joint Ventures, M&A, and turning around non-performing businesses in an international environment. He has worked in the United Kingdom and the United States, apart from India and Germany.\n

Mr Mathur is on the National Councils of the Confederation of Indian Industry (CII) and Federation of Indian Chambers of Commerce & Industry (FICCI). He is Chairman of the CII Smart Manufacturing Council and past Chairman of the CII Western Region. He is also the past President of the Indo-German Chamber of Commerce and the Bombay Chamber of Commerce & Industry.

    `
  },
  {
    image: AshishDhawan,
    title: "Ashish Dhawan",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,
    popupdesc:
      `Ashish Dhawan is the Founder-CEO of The Convergence Foundation (TCF), which focuses on accelerating India’s economic growth and development. TCF incubates non-profits focused on creating system-wide impact in the areas of economic growth, equality of opportunity, and sustainability. Its current portfolio includes organisations working on jobs and investment, the rule of law, governance and state capacity, economic empowerment of women, science and technology, air pollution, unlocking philanthropic capital, and improving the effectiveness of non-profits.\n

He is also the Founding Chairperson of Ashoka University and Central Square Foundation. Ashoka University, established as a university in 2014, is recognised as a leading teaching and research institute across the humanities, social sciences, natural sciences, and data & computer science. Central Square Foundation has been a leading voice for foundational literacy and numeracy in India and currently supports several state governments in improving learning outcomes in the early grades.\n

Mr Dhawan also serves on the governing board of the Bill and Melinda Gates Foundation (BMGF). Before his second career as a philanthropist, he was among India’s successful private equity investors. He founded and ran ChrysCapital, a leading private equity firm in the country.\n

He graduated from Yale University and received his MBA from Harvard Business School.

    `
  },
  {
    image: SNSubrahmanyan,
    title: "S. N. Subrahmanyan",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     
S N Subrahmanyan (SNS) is the Chairman & Managing Director of Larsen & Toubro, a multi-billion-dollar conglomerate. He also holds diverse leadership positions as Chairperson of L&T Finance Holdings Ltd and Chairman of LTIMindtree, L&T Technology Services, and L&T Metro Rail (Hyderabad) Ltd.\n

Hailing from Chennai, SNS embarked on his professional journey with L&T as a Project Planning Engineer in 1984. He holds a degree in civil engineering from the National Institute of Technology, Kurukshetra, and a postgraduate degree in business management from Symbiosis Institute of Business Management, Pune. He furthered his education with an Executive Management Programme from the London Business School.\n

Under his leadership, L&T has been recognised as one of Asia’s Most Honoured Companies by Institutional Investor and the Company of the Year by Business Standard in 2020. It has also been listed among the world's best employers on Forbes' list and as one of India’s Best Employers among Nation-Builders in 2023 by the Great Place to Work (GPTW) institute. SNS received the Eminent Engineer award from the Engineering Council of India in 2024.\n

He has been featured on the cover of Fortune magazine’s October 2023 edition as India’s Best CEO. He is also the winner in the Infrastructure & Engineering category of the Business Today-PwC India’s Best CEOs ranking in March 2022, was ranked 8th in the Construction Week Power 100 Ranking for 2022, and was honoured as the Infrastructure Person of the Year in 2012. In 2020, he achieved the Top CEO (Sell Side) and the 3rd Best CEO (Overall) in the All-Asia Executive Team Survey conducted by Institutional Investor and was recognised as the CEO of the Year by the leading Indian news channel, CNBC-Awaaz. His leadership was also recognised with the Emergent CEO Award in 2019, and he received the Leading Engineering Personality award from the Institution of Engineers (India) in 2014.\n

SNS serves as one of the nine founding members of the Climate Finance Leadership Initiative (CFLI) India, actively contributing to bringing global scale and influence to this initiative. Additionally, he serves as the honorary chairperson of the Board of Governors at the National Institute of Technology-Rourkela. In February 2021, he was appointed by the Union Ministry of Labour & Employment as the Chairman of the National Safety Council for two years.

     `
  },

  {
    image: SameerGupta,
    title: "Sameer Gupta",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,
    popupdesc:
      `
Sameer Gupta is Chairman and Managing Director of Jakson Group — India’s leading energy and infrastructure company specialising in distributed energy, solar, and EPC solutions. The business interests of Jakson span multiple lines, including generating set manufacturing, solar module manufacturing, solar off-grid products, hybrid solutions, battery-based energy storage systems, solar rooftops, solar land-based EPC, electrical EPC in areas of substation, transmission & distribution, and defence solutions. Jakson also has business interests in civil infrastructure in India, real estate in the UK, and hospitality.\n

Mr Gupta is currently Chairman of the Skill Council of Green Jobs, a Government of India initiative. He has served as Chairman of the Confederation of Indian Industry (CII) Northern Region and continues to be actively involved in various Councils & Committees of CII.\n

He is a graduate in Electronics Engineering from Pune University and an alumnus of Harvard Business School.

    `
  },
  {
    image: DKSen,
    title: "D. K. Sen",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     Dip Kishore Sen is a Whole-time Director and Senior Executive Vice President (Development Projects), L&T. He is Chairman on the board of Nabha Power Ltd, Power Development Ltd, L&T Special Steels & Heavy Forgings Pvt Ltd (LTSSHF), L&T Infrastructure Engineering Company, L&T Oman LLC, L&T Aviation Services Pvt Ltd, and Construction Skill Development Council of India (CSDCI). He is a Director on the board of L&T Qatar LLC and Raykal Aluminium Company Pvt Ltd, and is also Managing Director for L&T Infrastructure Development Projects Ltd (L&T IDPL). The Minerals & Metals (M&M) Strategic Business Group of L&T comes under his charge.\n

A civil engineering graduate from IIT Kharagpur and a postgraduate in business management from XLRI, Jamshedpur, Mr Sen worked for 12 years with reputed companies such as Tata Steel, Jamshedpur, and Development Consultants, Kolkata, before joining L&T. At the beginning of his career, he worked on a turnkey EPC transmission line project in Malaysia for HGEC, India.\n

He has played a prominent role in establishing L&T in the GCC Countries by securing several landmark projects and many urban infrastructure development projects in Qatar, Oman, and the UAE.\n

He is a member of the curriculum advisory committee for the postgraduate course in Infrastructure, IIT Kharagpur, and the Infrastructure postgraduate course at Narsee Monjee Institute of Management Studies, Mumbai. He has been associated with various industry organisations, including the Federation of Indian Chambers of Commerce & Industry (FICCI), the Confederation of Indian Industry (CII), National Highways Builders’ Federation (NHBF), First Construction Council (FCC), and Construction Federation of India (CFI). He is also the Chairman of the National Council on Roads, Highways & Transportation, ASSOCHAM.

     `
  },

  {
    image: ArunNanda,
    title: "Arun Nanda",
    desig: "Member, Council of Advisors",
    popupImg: vinayakImg.src,
    popupdesc:
      `Arun Nanda is a fellow member of the Institute of Chartered Accountants of India (FCA) and a fellow member of the Institute of Company Secretaries of India (FCS). He also participated in a Senior Executive Programme at the London Business School. And holds a degree in Law from the University of Calcutta.\n

He joined the Mahindra Group in 1973 and held several important positions over his 40 years with the company. He was inducted into the Board of Mahindra & Mahindra Ltd (M&M) in August 1992 and resigned as Executive Director in March 2010 to focus on the social sector and to create a favourable ecosystem for senior citizens. He served as a non-executive director from April 2010 until August 2014.\n

Mr Nanda is currently the Chairman of Mahindra Holidays & Resorts (I) Ltd and Chairman of Holiday Club Resorts Oy, Finland. He is Chairman of the Governing Board of the Centre for Social and Behaviour Change Communication, a Member of the Governing Body of HelpAge India, and on the Advisory Board of TechnoServe India. He is also Chairman Emeritus of the Indo-French Chamber of Commerce.\n

He was Chairman of the CII Western Region Council for the year 2010-2011, Chairman of the Tourism & Hospitality Skill Council, and Chairman of the CII National Task Force on Affirmative Action. He was a Member of the Task Force set up by the B20 on Anti-Corruption, which presented the policy paper to President Sarkozy at the G20 Summit held in Cannes in November 2011 and to President Putin in St. Petersburg in June 2013.\n

Mr Nanda is passionate about skilling youth, particularly young girls from the backward areas of the country. He was Chairman of the CII National Committee on Skill Development & Livelihood from April 2017 to March 2021 and was on the Board of the National Skill Development Corporation for several years. He is currently a Patron of the PanIIT Alumni Reach For India Foundation (PARFI), an IIT alumnus initiative to skill youth in India, and is the Chairman of PanIIT Alumni Reach For Madhya Pradesh Foundation (PARAM).\n

Mr Nanda was honoured with the "Chevalier de la Légion d'Honneur" (Knight of the National Order of the Legion of Honour) by the President of the French Republic, Nicolas Sarkozy, in 2008.


     `
  },

  {
    image: Arun,
    title: "Arun Maira",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/arun-maira-5499711b4/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      Arun Maira brings a diverse background encompassing experience as a hands-on leader and a consultant to leaders. He is a thought leader on subjects such as leadership and organisational transformation within the private, public, and social sectors.\n

Mr Maira has authored several books on institutional transformation and writes regularly in journals. He was a Member of India's Planning Commission from 2009 to 2014. Prior to this, he was Chairman of the Boston Consulting Group, India. Earlier in his career, he worked with the Tata Group in India for 25 years, and for another 10 years with Arthur D Little Inc and Innovation Associates in the USA.\n

Currently, Mr Maira is Chairman of HelpAge International and an advisor to several civil society networks.

      `
  },
  {
    image: DilipCherian,
    title: "Dilip Cherian",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/dilipcherian/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     Dilip Cherian possesses extensive experience and expertise in policy, bureaucracy, economy, and media. His extensive experience as a communications consultant includes advising over 800 corporate CEOs. He is recognised for his expertise in image management and policy affairs.\n

As co-founder of Perfect Relations, a leading public relations and public affairs consultancy group in South Asia, Mr Cherian pioneered the concept of image management in India. Over 32 years, the company, under his leadership, provided services to more than 3,800 clients, with 440 professionals in 18 offices across India.\n

Mr Cherian's past experiences have been diverse. He began his career in the government as an Economic Consultant to the Ministry of Industry (B.I.C.P.). He later joined Business India, a prominent publication, and eventually became an editor at one of India's leading business magazines. Along the way, he has been an internet start-up founder, run a popular restaurant, and launched a TV show.\n

As an independent director, Mr Cherian serves on the boards of prominent organisations such as Radio One, a prominent English Radio FM channel; Jagran, India's largest Hindi daily newspaper; and Bajaj Consumer Care, a prominent consumer product company. Significant public appointments include positions he has held on boards like the Advertising Standard Council of India (ASCI), the National Institute of Design (NID), the Apex Committee of Investor Education and Protection Fund (IEPF) under the Ministry of Company Affairs, and the Central Board of Film Certification (CBFC).

     `
  },
  {
    image: GeetanjaliKirloskar,
    title: "Geetanjali Vikram Kirloskar",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/geetanjali-kirloskar-b04203154/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     Geetanjali Vikram Kirloskar is Chairperson and MD of Kirloskar Systems and Chairperson of Toyota Tsusho Insurance Broker Pvt Ltd. She is recognised as a thought leader and entrepreneur with experience across sectors.\n


She served on the Board of the India Brand Equity Fund of the Commerce Ministry and as Co-Chairperson of FICCI India Japan Business Council. From 2020 to 2023, she was Chairperson of the Healthcare CSR Committee of the Government of Karnataka, during which time she worked to build a modular 100-bed Covid shelter in 45 days.\n

Among other initiatives, Ms Kirloskar established the Sakra World Hospital in a joint venture with Toyota Tsusho and Secom Japan, an insurance brokerage business with Toyota Tsusho, and a joint venture with the Embassy Group for real estate.\n

As Honorary Consul for Finland in Karnataka, she was awarded a Knighthood from the Government of Finland for her significant contribution to India-Finland ties.



     `
  },
  {
    image: VishalKampani,
    title: "Vishal Kampani",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/vishal-kampani-0a94942a6/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      
Vishal Kampani is the non-executive Vice-Chairman of JM Financial Limited, the Group’s flagship listed company. He has been instrumental in transforming the JM Financial Group into a prominent financial services powerhouse. He launched the Asset Reconstruction Business in 2008 and the Real Estate Finance Business in 2009.\n

Mr Kampani joined the JM Financial Group in 1997 as an analyst in the Merchant Banking Division and has since progressed through various roles, working across businesses within the Group. In a career spanning over 22 years, he has played a key role in consummating several landmark and complex M&A and restructuring transactions. He has been instrumental in expanding the company’s international operations and establishing a global presence.\n

In 1999, Mr Kampani worked with Morgan Stanley Dean Witter & Co. in New York, in the Equity Capital Markets Group, where he was involved in structuring products for the firm’s clients, most of whom were Fortune 500 companies. After returning to India in 2000, he worked as a Senior Banker in the Investment Banking Division of JM Morgan Stanley Pvt Ltd, which was then a joint venture between JM Financial Group and Morgan Stanley. He was responsible for building and maintaining client relationships, procuring and overseeing the execution of transactions, advising corporate clients in raising capital, acquisition and divestment of companies, and reorganisation of corporate groups. He was also the head of the corporate finance division.\n

Mr Kampani holds a Master of Commerce from the University of Mumbai and has completed his MS (Finance) from London Business School, University of London.

      `
  },
  {
    image: CyrilShroff,
    title: "Cyril Shroff",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/cyrilshroff/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     With over 43 years of experience in areas including corporate law, securities markets, banking, infrastructure, and other related fields, Mr Shroff is consistently rated as a leading corporate, banking, and project finance lawyer in India. This recognition comes from several international surveys, such as the International Financial Law Review (IFLR), Euromoney, Chambers Global, Asia Legal 500, and Asia Law.\n

He has received several awards from legal publications. Mr Shroff was featured in issues of Asian Legal Business (ALB) as 'Dealmakers of the Year 2016', notably as the only individual from India. He was also awarded 'Emerging Markets Firm Leader of the Year – Independent' at the Asian Lawyer Emerging Markets Awards 2016, organised by American Legal Media. He is recognised as a “legendary figure in the Indian legal community” and is consistently ranked as a “star practitioner” in India by Chambers Global. He is often regarded as the “M&A King of India”.\n

Mr Shroff is a member of the SEBI Committee on Corporate Governance and Insider Trading. He is also a member of the first Apex Advisory Committee of IMC International ADR Centre (IIAC); an advisory member of the Finance Planning Standard Board of India (FPSB India); and Macquarie. He was recently appointed as a task force member of the Society of Insolvency Practitioners of India (SIPI). He is a member of the Media Legal Defence Initiative (MLDI) International Advisory Board and is part of various committees of the Confederation of Indian Industry (CII) and Federation of Indian Chambers of Commerce & Industry (FICCI).\n

He has authored several publications on legal topics. Mr Shroff is a member of the Advisory Board of the Centre for Study of the Legal Profession established by the Harvard Law School; a member of the Advisory Board of the National Institute of Securities Markets (NISM); and on the Board of IIM, Trichy.

     `
  },

  {
    image: khurshed,
    title: "Khurshed Daruvala",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/khurshed-daruvala/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
    Khurshed Daruvala, Chairman of Sterling and Wilson Group (S&W), has significantly contributed to the company’s growth and expansion by blending traditional values with a contemporary business approach. As the catalyst behind the company’s evolution into a prominent global powerhouse with diverse businesses across verticals, Mr Daruvala has led from the front since he joined Sterling and Wilson in 1997.\n

He is credited with driving S&W’s emergence as India’s leading MEP (Mechanical, Electrical, and Public Health Engineering) and Renewable Energy solutions provider. Mr Daruvala was instrumental in introducing Solar EPC in 2011, a segment he believed had significant growth potential. This decision transformed S&W’s trajectory and accelerated the company’s growth.\n

A Chartered Accountant by qualification, he has made Sterling and Wilson one of India’s leading companies in the EPC sector. Today, S&W has established a strong global reputation. He has spent the past two decades building a rapidly growing business empire, taking the company’s turnover from USD 1 million in 1997 to approximately USD 1 billion for the year ending 2021, and expanding the team from fewer than 100 to approximately 4,000 skilled professionals.\n

Under his leadership, S&W has diversified into several emerging segments such as turnkey data centres, transmission & distribution, diesel generators, and E-Mobility, and established a footprint in over 30 countries spread across India, the Middle East, Africa, Southeast Asia, Australia, Europe, and the Americas.\n

Mr Daruvala holds a bachelor’s degree in commerce from the University of Mumbai and is an Associate Member of the Institute of Chartered Accountants of India (ICAI). He has been part of the Sterling and Wilson Group for approximately 28 years and has been on the board of Sterling and Wilson Renewable Energy Limited since 25 April 2018.	
    `
  },
];

export const fellow = [
  {
    image: rasikaAthawale,
    title: "Rasika Athawale",
    desig: "Distinguished Fellow (Power)",
    popupImg: vinayakImg.src,
    link: "https://www.linkedin.com/in/rasika-athawale-5072ab1/",
    popupdesc:
      `
     Rasika Athawale is a management professional with approximately two decades of experience in the energy and utilities sector, having worked as a power utility executive, a strategy consultant with Big Four management consulting firms, a research programme manager at a Big Ten US State University, and a US think tank.\n

Her research expertise includes the economics of the power sector and energy transition, government policy and regulatory impact analysis, planning and strategy formulation for utilities, and financial modelling. Her work has been published in prominent academic journals and print media. She has a demonstrated track record of executing complex consulting engagements and managing client relationships with federal and state governments in India and the United States. She also possesses the demonstrated ability to conceptualise, market, and execute project work as an individual consultant, with experience in managing thought leadership charters for expert advisors and a prominent energy efficiency analytics firm.\n

Ms Athawale is a thought leader and sector influencer who promotes inclusive dialogue by simplifying complex information under the brand of "India Energy Insights". She writes and provides inputs for media outlets (contributing author for MoneyControl) and has published "Electric utility death spiral: Revisited in the context of tariff design" in The Electricity Journal, December 2021, which features in the list of most downloaded articles. She was also a speaker at the Virtual Workshop on Regulatory Reforms, organised by the National Institute of Advanced Studies, in April 2022.\n

A B.Tech. in Chemical Engineering (Nagpur University) and a PGDBM in Finance from Sydenham Institute of Management, Mumbai University, Ms Athawale’s career has spanned a range of prominent organisations and significant projects in the energy sector. These include Adani Electricity, ICICI Bank, PricewaterhouseCoopers, KPMG Advisory Services, APPRISE Incorporated, Princeton (USA), Rutgers (New Jersey), Hiranandani Group, and several others.\n

She was a faculty for a Distribution Reforms training programme by USAID from 2004 to 2005. From 2011 to 2012, she was a member of the National Team, India Smart Grid Forum, and a Member of the Maharashtra State Smart Grid Committee (to determine measures for strengthening of R-APDRP by the Ministry of Power, Delhi).

     `
  },

  {
    image: supratimSarkar,
    title: "Supratim Sarkar",
    desig: "Distinguished Fellow (Financial Services)",
    popupImg: vinayakImg.src,
    popupdesc:
      `
    Supratim Sarkar brings over 25 years of experience in the financial services sector. He joined IDBI in 1995 and moved to SBICAPS in November 2000, where he served for 12 years as Executive Vice President and Group Head. In this role, he led a team of approximately 300 professionals across diverse areas, including Project Finance, Corporate Finance, Structured Finance, and Advisory services for project bidding, mine auctions, and disinvestments.\n

Since March 2022, Mr Sarkar has pursued an independent career as a Financial Advisor, working on multiple projects. He possesses a strong network with private sector leaders, PSUs, banks, Chief Investment Officers of Funds, senior bureaucrats, and government departments.\n

He has worked on different committees established by state governments and the Government of India, on matters such as the reintroduction of Development Finance Institutions (DFIs), the resolution of coastal power projects based on imported coal, the resolution of tarifsf for Independent Power Producers (IPPs), etc. Notably, he led the ideation of the National Bad Bank, now known as NARCIL.\n

Mr Sarkar was a part of the CII Infrastructure subcommittee and participated in FICCI delegations to the US and Canada alongside government dignitaries. He is a regular speaker at webinars and panel discussions organised by industry chambers and partners.\n

After graduating as a Mechanical Engineer from Jadavpur University in 1988, Mr Sarkar completed his post-graduation in Aeronautical Engineering from IIT Madras and subsequently his MBA with a specialisation in Finance from BIM Tiruchirapalli.

    `
  },
  {
    image: rajivRanjanMishra,
    title: "Rajiv Ranjan Mishra",
    popupImg: vinayakImg.src,
    desig: "Distinguished Fellow (Water Conservation)",
    popupdesc:
      `
     Mr Rajiv Ranjan Mishra recently retired from his position as Director General for the National Mission for Clean Ganga (NMCG), a role in which he transformed the Namami Gange Programme into an integrated, multi-sectoral model framework for river rejuvenation in India.\n

As Additional Secretary, India’s Ministry of Housing and Urban Affairs, he steered several policies in the housing sector, urban SDGs, New Urban Agenda, and sustainable technologies. He also played a pivotal role in the enactment of the landmark Real Estate (Regulation and Development) Act, 2016 (RERA).\n

In 2021, Mr Mishra was bestowed with the Annual Research Award from IIT Roorkee for his work on the rejuvenation of the river Ganga. Over the course of his time at NMCG, he guided the organisation to international and national recognition, including the Public Agency of the Year Award (Distinction) by Global Water Intelligence.\n

Mr Mishra implemented significant policy changes at NMCG through several key projects and policy interventions, including PPPs in wastewater management via a hybrid annuity mode and a ‘One City-One Operator’ approach for improved sustainability and governance in wastewater management. He has also developed innovative frameworks to plan ‘river cities’ by mainstreaming rivers and water within urban master plans, highlighting water-sensitive urban design and developing the River Cities Alliance (RCA).\n

Mr Mishra is the co-author of “Ganga: Reimagining, Rejuvenating, Reconnecting”, an account of the scale of challenges, institutional processes, and reforms that generated momentum and positively impacted a river’s health and the sustainability of those impacts. He has published several articles, papers, and opinion columns in various journals and magazines. He also edited a special issue on river rejuvenation in the Journal of Governance and served as editor and contributor on “Managing Urban Rivers: From Planning to Practice”, a set of articles by national and international experts being published by Elsevier.\n

He has contributed to many national and international training sessions and seminars. He holds Certificates in Advanced Studies in Public Administration from Maxwell School, Syracuse University, US; Public Budgeting from Georgia State University, Atlanta; Project Management from University of California, Berkeley; and the ‘Leaders in Development’ programme from Harvard Kennedy School, Cambridge, US.\n

Currently, he serves as Chief Advisor and Chairman of the Strategy & Policy Unit at the National Institute of Urban Affairs, India. Additionally, he acts as an advisor to the Centre for Ganga River Basin Management and Studies at the Indian Institute of Technology (IIT), Kanpur.

     `
  },
  {
    image: rajajiMeshram,
    title: "Rajaji Meshram",
    popupImg: vinayakImg.src,
    desig: "Distinguished Fellow(Transport & Logistics)",
    link: "https://www.linkedin.com/in/rajaji-meshram-9aa3437/",
    popupdesc:
      `
     Mr Rajaji Meshram has over 25 years of experience in strategy development, business planning, and the development of regulatory frameworks. His expertise spans large infrastructure projects in India, as well as countries such as Bangladesh, Saudi Arabia, Mongolia, Kenya, the UAE, and Sri Lanka.\n

He began his career with the Indian Railways, spending more than six years working across different areas of operations, maintenance, and project management. He has been involved in various policy formulation, feasibility assessment, transaction advisory, and Public-Private Partnership (PPP) projects across sectors within the transportation domain. His last corporate role was Partner, EY India. He has also worked with prominent corporations like IBM, KPMG, and PwC.\n

Currently, Mr Meshram is collaborating on projects with the World Bank and Asian Development Bank as an independent expert. Some of his notable contributions include:\n

1. Preparation of the LEADS report for the Ministry of Commerce and Industry, Government of India.\n
2. Updating the National Transport Policy 2006 of Bhutan for the United Nations Development Programme.\n
3. Logistics Capacity Development in Mongolia for the Asian Development Bank.\n
4. Assessment of cost reduction opportunities for Saudi Arabia Railway.\n
5. Process audit of Etihad Rail DB, the UAE.\n
6. Providing advisory services for the structuring of track access charges (tariffs) and setting a non-discriminatory access regime in the Dedicated Freight Corridor Corporation of India Ltd (DFCCIL), a World Bank-funded project.\n
7. Developing a regulatory structure for the Visakhapatnam-Chennai Industrial Corridor, Andhra Pradesh, for the Asian Development Bank.\n
8. Recommending a corporate planning framework for the Railway Planning & Investment Organisation (RPIO) and the Special Unit for Transportation Research and Analysis (SUTRA) in Indian Railways.\n
9. Sagarmala Project Management consultancy for the Ministry of Shipping and Ports, Government of India.\n
10. Transaction advisory for Concession and Operation Agreements for creating an Open Access Aviation Fuel Facility at airports for the Airports Authority of India (AAI).\n
11. Capacity development in Oxygen Logistics in four states and assisting in developing tools for oxygen transport planning through road and rail (World Bank).\n

Rajaji holds an MBA from IIM Ahmedabad and participated in the prestigious Gurukul Leadership programme at the London School of Economics. He is a member of the National Council of the Chartered Institute of Logistics and Transport, India.

     `
  },

  {
    image: SoumyaKantiGhosh,
    title: "Soumya Kanti Ghosh",
    desig: "Distinguished Fellow (Economic Policy)",
    popupImg: vinayakImg.src,
    link: "https://www.linkedin.com/in/soumya-kanti-ghosh-2043921a/",
    popupdesc:
      `
     Dr Soumya Kanti Ghosh is currently the Group Chief Economic Advisor at the State Bank of India. Previously, he has worked at Tata AIA, American Express, and ICRA, among other organisations.\n

Dr Ghosh was an instrumental co-author in a key initiative that, for the first time, captured payroll data in India, covering both formal and informal sectors. He contributed to the design of schemes such as the PMKISAN for farmers and the Emergency Credit Line Guarantee Scheme (ECLGS) for MSME borrowers, and the restructuring of the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTSME) scheme, among others. These initiatives proved effective during and after the pandemic. Following his report, EPFO and ESIC began publishing monthly payroll data.\n

He serves as Chairman of the Indian Banks’ Association’s Economist Group. He is also a member of the Insolvency Board Committee on Research and the Editorial Advisory Board of the Indian Institute of Banking and Finance (IIBF). Additionally, Dr Ghosh is a member of the Governing Board at the Indian Institute of Corporate Affairs (IICA). For six successive years, ending in 2023, Dr Ghosh was ranked as one of the best individuals in research in India by The Asset magazine.\n

Dr Ghosh has an extensive list of publications in media and international and national journals. He completed his doctoral thesis at Jawaharlal Nehru University (JNU).

     `
  },
  {
    image: AkhileshTilotia,
    title: "Akhilesh Tilotia",
    desig: "Distinguished Fellow (Public Policy)",
    link: "https://www.linkedin.com/in/atilotia/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      Akhilesh Tilotia is an astute observer of the economic, political, and social landscape of India. His distinct perspective in commentary is shaped by his diverse experiences as a government officer, an economist, a banker, and a strategist. These multiple world-views have enabled him to emerge as a “dot-joiner”: piecing together disparate issues into a coherent picture.\n

In his previous roles, he has served as the Head of Research at the National Investment and Infrastructure Fund (NIIF). He has led Strategy and New Initiatives for Axis Bank, worked with the Kotak Group, The Boston Consulting Group, and was a co-founder of PARK Financial Advisors.\n

His bestselling book, “The Making of India – Game-Changing Transitions” (2015), introduced the concept of “private cost of public failure” and explored its implications for investors. His second book, “Through the Looking Glass” (2021), examines the India story from the perspectives of bureaucrats, politicians, and citizens, drawn from his first-hand observations during a three-year stint in New Delhi with a union minister.\n

Akhilesh holds an MBA from IIM Ahmedabad and is an alumnus of MITx.

      `
  },
];

export const team = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     Vinayak Chatterjee co-founded Feedback Infra Pvt Ltd in 1990 and served as its Chairman from 1990 to 2021. Since stepping down from active management, he now dedicates his time and energy to infrastructure policy and advocacy, as well as to nurturing educational institutions.\n

Mr Chatterjee is frequently called upon to play a strategic advisory role to leading domestic and international corporates, the Government of India, various ministries involved in infrastructure, and multilateral and bilateral institutions in the areas of infrastructure policy, planning, and implementation. He is a leading proponent of the Public-Private Partnership (PPP) model for developing India’s infrastructure. His more recent engagements with the Government of India include being a member of the Committee on setting up a Development Finance Institution (DFI) and a member of the Consultative Group on PPPs at NITI Aayog.\n

In 1998, the World Economic Forum at Davos recognised him as one of the 100 Global Leaders of Tomorrow. In 2011, the Indian Institute of Management, Ahmedabad, conferred on him the “Distinguished Alumnus Award”.\n

Mr Chatterjee is currently the Chairman of the Confederation of Indian Industry’s (CII) National Council on Infrastructure and has chaired various infrastructure and economic committees at the national level of CII since 2001. He is on the Board of Directors of ACC Ltd, Apollo Hospitals Enterprise Ltd, KEC International Ltd, and L&T Infotech Ltd; and is a member of the Advisory Board of JCB India. He serves as the Chairman of the Board of Governors of the Indian Institute of Technology, Dharwad, and on the Boards of the Indian Institute of Management, Sirmaur, and the National Rail and Transportation Institute, Vadodara.\n

He is a popular columnist and writes a monthly column on infrastructure for Business Standard called “INFRATALK”. He has also authored a book titled “Getting it Right – India’s Unfolding Infrastructure Agenda”, published in 2011.\n


Mr Chatterjee graduated in Economics (Hons.) from St. Stephen's College, Delhi University (1976-1979) and completed his MBA from the Indian Institute of Management, Ahmedabad (1979–1981).

     `
  },
  {
    image: RumjhumChatterjee,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      Rumjhum Chatterjee co-founded the Feedback Infra Group. Following a successful tenure, she recently stepped down from her role as Group Managing Director and Head — Human Capital within the organisation.\n

She is currently the Chairperson of the Feedback Foundation Charitable Trust. The Trust is deeply involved in rural and urban sanitation, including solid waste management, and has successfully implemented numerous projects nationwide through community engagement. Ms Chatterjee pioneered community-led interventions for Resettlement and Rehabilitation (R&R) post land acquisition for infrastructure projects. Her paper, “Sustainable Rehabilitation Interventions through Community Engagement,” was published in the India Infrastructure Report 2009, issued by the 3iNetwork.\n

A leading practitioner in human capital management within the infrastructure sector, she was recognised as one of the 20 Most Talented HR Leaders in India by the World HRD Congress in 2013. She plays an active role in the Confederation of Indian Industry (CII), notably as the first woman Chairperson for the CII Northern Regional Council (2016-17). With a deep interest in women's empowerment, she chaired CII’s Women Exemplar Program (2015-17) and has served on its Jury Selection Committee since its inception in 2005. She also chaired the CII National Women’s Empowerment Committee for several years, representing industry perspectives on this critical issue before Parliamentarians in India. Furthermore, she participated in a closed-door interaction to discuss this topic with the Prime Minister of Japan, Mr. Shinzo Abe, during his visit to India in January 2014.\n

Currently, she co-chairs CII’s National Committee on CSR. She previously served as an Independent Director on the Board of Blue Star Ltd. and presently serves on the Boards of Somany Ceramics Ltd. and C&S Electric Ltd. (a subsidiary of Siemens India Ltd.). She is the Vice Chairperson and a member of the Governing Body of HelpAge India, the country’s largest not-for-profit organisation dedicated to the welfare of the aged. She is also a Trustee of HDFC Schools. Ms Chatterjee holds a degree in Psychology from Calcutta University.

      `
  },
  {
    image: jagan,
    title: "Jagan Shah",
    desig: "CEO",
    link: "https://www.linkedin.com/in/jagan-shah/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     
Jagan Shah is an architect and urbanist with a strong interest in the future of cities. Currently a senior expert in urban development policy and practice at Artha Global, he has been engaged with the urban sector in India for more than twenty years, through consultancy, teaching, writing, and public speaking.\n

From 2013 to 2019, he served as Director of the National Institute of Urban Affairs, a leading urban think tank in India. Under his leadership, the organisation provided evidence-based policy and planning support to urban local bodies, state governments, and the central Ministry of Housing and Urban Affairs. This support covered a diverse range of subjects, including smart city development, e-governance, integrated spatial and physical planning, water and sanitation, municipal finance, transit-oriented development, land value capture, resilience, and sustainability.\n

He is a member of the Board of Trustees, Clean Air Asia India. He has also served as a consultant with the World Bank and a Resident Senior Fellow at the IDFC Institute.\n

Mr Shah received his education and training at the School of Planning and Architecture, New Delhi; the University of Cincinnati; and Columbia University, New York.

     `
  },
  {
    image: KavereeBamzai,
    title: "Kaveree Bamzai",
    desig: "Head — Advocacy",
    link: "https://www.linkedin.com/in/kavereebamzai/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      Kaveree Bamzai has been a journalist for 35 years. She was the first and, so far, only woman editor of India Today magazine, where she worked for 17 years before leaving in 2019 to pursue an independent career.\n

She has worked in various capacities with two prominent national dailies, The Times of India and The Indian Express, handling diverse portfolios, from front page editor to Sunday Magazine editor. At India Today, she edited special issues dedicated to key areas of development, from infrastructure to social entrepreneurship. She also curated the annual India Today Conclave, a meeting ground for thought leaders and opinion makers; started Mind Rocks, an annual event for young people; as well as the India Today Woman Annual Summit and Awards. She also curated the annual Safaigiri Awards and Summit after the announcement of the Swachh Bharat Mission.\n

Since leaving India Today, she has curated events for The New Indian Express and the ABP Network, including a national education conclave, ThinkEdu; the annual Odisha Literary Festival; the Devi Awards for Women; and the Ideas of India Summit. She is a speaker at media and literary events and has been a TEDx speaker as well.\n

She is the author of various monographs and essays, as well as three books, among them “No Regrets: The Guilt-free Woman's Guide to a Good Life” and “The Three Khans and the Emergence of New India”. She is a frequent columnist on cinema and society for Dainik Bhaskar, The Times of India Plus, and The New Indian Express, and is a contributing editor to Open magazine. She is the presenter of Tiffin Talks, a well-regarded series of digital interviews with media personalities, as well as street stories, dedicated to women who are making a difference.\n

She went to school at the Convent of Jesus and Mary, New Delhi, and Loreto and La Martiniere, Kolkata. She completed an undergraduate degree in economics at St Xavier's College, Kolkata, and a postgraduate degree in sociology at the Delhi School of Economics, where she won the MSA Rao Scholarship for Academic Excellence. She was also a Chevening Fellow, a scholarship awarded by the British Foreign and Commonwealth Office.\n

She was designated a ‘game-changer’ by Save the Children, is a member of the Women Exemplar Jury of the CII Foundation, and has been a member of various juries and committees in the media space.


      `
  },
  {
    image: MutumChaobisana,
    title: "Dr Mutum Chaobisana",
    desig: "Head — Programmes",
    popupImg: vinayakImg.src,
    link: "https://www.linkedin.com/in/dr-mutum-chaobisana-83647017/",
    popupdesc:
      `Dr Mutum Chaobisana is an Architect-Urban Planner with a PhD in Urban Planning and a career marked by significant contributions to the urban sector and the development of Himalayan ecosystems in India.\n

Her roles have included Head-Programmes at The Infravision Foundation, Lead-Urban Planner at IIFCL Projects Ltd (a PSU under the Ministry of Finance), Sector Coordinator-Urban Planning at the National Institute of Urban Affairs (NIUA), Senior Consultant at the Ministry of Housing and Urban Affairs, and Assistant Director (Planning) at the Delhi Development Authority. In these positions, she has played key roles in policy formulation, drafting development control norms, and implementing infrastructure projects.\n

She has delivered sustainable rural-urban solutions, shaped strategic projects, and formulated vision and strategies for urban development. She has successfully spearheaded the development of master plans, including the Delhi Master Plan 2021 and 2041, and the Slum Rehabilitation Policy. She also developed national policy and guidelines in key urban missions such as PMAY-U, Rental Housing, and Retirement Homes. Her work also extends to eco-tourism, conservation of natural ecosystems and riverfront development, townships and regional planning initiatives in the North Eastern Region.\n

Throughout her professional tenure, Dr Mutum has been affiliated with esteemed entities such as the Ministry of Finance, the Ministry of Tourism, the Ministry of Housing and Urban Affairs, state government agencies, the Ministry of Development of the North Eastern Region, and international donor agencies. Her proficiency in stakeholder engagement and fostering strategic partnerships has contributed to driving inclusive growth and sustainable development. She is skilled in fostering collaborative relationships with state and central government agencies and donor agencies, and delivering vision and strategic development initiatives and infrastructure projects. She is well-versed in coordinating and managing partnerships with international agencies, think tanks, government officials at state and central ministries, Urban Local Bodies (ULBs), political leaders, civil societies, and NGOs.

      `
  },

  {
    image: VrindaSingh,
    title: "Vrinda Singh",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/vrinda-singh-3951951b4/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
      Vrinda Singh is an urban policy professional dedicated to shaping the future of India's cities. In her role as a Research Associate at The Infravision Foundation, she contributes to impactful urban development initiatives.\n

Her educational background reflects her commitment to understanding the complexities of urban development. Ms Singh holds a dual master's degree: one in Political Science from Calcutta University and another in Public Policy and Governance from the Tata Institute of Social Sciences (TISS), specialising in Urbanisation. This demonstrates her strong commitment to understanding and addressing the nuances of urban policy.\n

Diverse experiences, spanning across prominent organisations such as The Energy and Resources Institute (TERI) and Janaagraha, have provided her with comprehensive knowledge and hands-on experience in climate action plans, flood management policies, civic engagement initiatives, urban governance complexities, parliamentary research, and green transport research. This demonstrates her expertise in conducting primary and secondary research, analysing policies, interpreting data, and engaging with stakeholders.\n

In addition to her professional pursuits, Ms Singh holds a strong interest in infrastructure planning, finance, and sustainable development, with a distinctive focus on addressing climate change and environmental sustainability. She is committed to advocating for policies and initiatives that promote environmental stewardship and resilience, embodying a dedication to catalysing positive change in the realm of public policy. As she continues her work at The Infravision Foundation, Ms Singh remains dedicated to driving positive change in India's urban landscape, fostering sustainable development through her initiatives.

      `
  },
  {
    image: LawrenceCardoza,
    title: "Lawrence Cardoza",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/lawrence-cardoza/",
    popupImg: vinayakImg.src,
    popupdesc:
      `
     Lawrence Cardoza is a dedicated advocate for sustainable development and a proponent of data-backed policymaking to achieve tangible impact. As a Research Associate at The Infravision Foundation, he aspires to build compelling narratives to put the “public” back in public policy and strengthen the foundations of a resilient nation by further developing infrastructure policies.\n

Holding a PGP in Public Policy, Design, and Management from the Indian School of Public Policy and a B.A. from St. Stephen's College, Mr Cardoza combines academic rigour with hands-on experience. He has previously worked across diverse industries and functions, including operations at Better.com, sales and outreach at GenElek Technologies (supporting paraplegic veterans), and communications at the Delhi Lawn Tennis Association. In these roles, he developed expertise in stakeholder management, data analysis, and strategic communication.\n

At The Infravision Foundation, Mr Cardoza contributes to policy analysis and research projects, and assists in organising initiatives like the InfraKatha sessions, aimed at fostering informed discussions on the future of infrastructure in India. With a strong interest in social infrastructure and climate-resilient infrastructure, and their intersection with public welfare, he is skilled at translating complex policy issues into accessible formats for broader audiences.\n

His background also includes a focus on public policy evaluation and the socio-economic impact of initiatives, evidenced by his previous internship at the National Investment and Infrastructure Fund (NIIF).

     `
  },
  {
    image: PriyankaBains,
    title: "Priyanka Bains",
    desig: "Research Associate",
    popupImg: vinayakImg.src,
    link: "https://www.linkedin.com/in/priyanka-bains-b070607b/",
    popupdesc:
      `
     Priyanka Bains is an economist by training and a problem-solver. She graduated from Lady Shri Ram College for Women with a degree in Economics and pursued her Master’s in Economics at Jawaharlal Nehru University.\n

Passionate about development, policy, and sustainability, she is on a mission to make agriculture smarter, more efficient, and climate-resilient — because feeding the world shouldn’t cost the planet. With a keen interest in climate resilience, sustainable infrastructure, and data-driven policymaking, Ms Bains thrives on exploring innovative solutions that balance economic growth with environmental responsibility.

     `
  },
];
