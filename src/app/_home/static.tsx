import Kiran from "@/../public/assets/home/trustees/Kiran.jpg";
import Rumjhum from "@/../public/assets/home/trustees/Rumjhum.jpg";

import Arun from "@/../public/assets/home/advisory/Arun.jpg";
import ArunNanda from "@/../public/assets/home/advisory/ArunNanda.jpg";
import AshishDhawan from "@/../public/assets/home/advisory/AshishDhawan.jpg";
import CyrilShroff from "@/../public/assets/home/advisory/CyrilShroff.png";
import DKSen from "@/../public/assets/home/advisory/DKSen.jpg";
import JanmejayaKSinha from "@/../public/assets/home/advisory/JanmejayaKSinha.jpg";
import GeetanjaliKirloskar from "@/../public/assets/home/advisory/GeetanjaliKirloskar.jpg";
import HemendraMKothari from "@/../public/assets/home/advisory/HemendraMKothari.jpg";
import jagan from "@/../public/assets/home/advisory/jagan.jpg";
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
};

export const trustee = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
  },
  {
    image: Rumjhum,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
    link: "https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
  },

  {
    image: Kiran,
    title: "Kiran Karnik",
    desig: "Trustee",
  },
];

export const advisory = [
  {
    image: NasserMunjee,
    title: "Nasser Munjee",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/nasser-munjee-8aaa5316/",
  },
  {
    image: HemendraMKothari,
    title: "Hemendra M. Kothari",
    desig: "Member, Council of Advisors",
  },
  {
    image: JanmejayaKSinha,
    title: "Janmejaya K. Sinha",
    desig: "Member, Council of Advisors",
  },
  {
    image: NarotamSekhsaria,
    title: "Narotam Sekhsaria",
    desig: "Member, Council of Advisors",
  },
  {
    image: RajnishKumar,
    title: "Rajnish Kumar",
    desig: "Member, Council of Advisors",
  },
  {
    image: ProfessorGRaghuram,
    title: "Professor G. Raghuram",
    desig: "Member, Council of Advisors",
  },
  {
    image: ManojKSingh,
    title: "Manoj K. Singh",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/manoj-k-singh-72817a9/",
  },

  {
    image: SunilMathur,
    title: "Sunil Mathur",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/sunil-mathur/",
  },
  {
    image: AshishDhawan,
    title: "Ashish Dhawan",
    desig: "Member, Council of Advisors",
  },
  {
    image: SNSubrahmanyan,
    title: "S. N. Subrahmanyan",
    desig: "Member, Council of Advisors",
  },

  {
    image: SameerGupta,
    title: "Sameer Gupta",
    desig: "Member, Council of Advisors",
  },
  {
    image: DKSen,
    title: "D. K. Sen",
    desig: "Member, Council of Advisors",
  },

  {
    image: ArunNanda,
    title: "Arun Nanda",
    desig: "Member, Council of Advisors",
  },

  {
    image: Arun,
    title: "Arun Maira",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/arun-maira-5499711b4/",
  },
  {
    image: DilipCherian,
    title: "Dilip Cherian",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/dilipcherian/",
  },
  {
    image: GeetanjaliKirloskar,
    title: "Geetanjali Kirloskar",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/geetanjali-kirloskar-b04203154/",
  },
  {
    image: VishalKampani,
    title: "Vishal Kampani",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/vishal-kampani-0a94942a6/",
  },
  {
    image: CyrilShroff,
    title: "Cyril Shroff",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/cyrilshroff/",
  },

  {
    image: khurshed,
    title: "Khurshed",
    desig: "Member, Council of Advisors",
    link: "https://www.linkedin.com/in/khurshed-daruvala/",
  },
];

export const fellow = [
  {
    image: rasikaAthawale,
    title: "Rasika Athawale",
    desig: "Distinguished Fellow (Power)",
    link: "https://www.linkedin.com/in/rasika-athawale-5072ab1/",
  },

  {
    image: supratimSarkar,
    title: "Supratim Sarkar",
    desig: "Distinguished Fellow (Financial Services)",
  },
  {
    image: rajivRanjanMishra,
    title: "Rajiv Ranjan Mishra",
    desig: "Distinguished Fellow (Water Conservation)",
  },
  {
    image: rajajiMeshram,
    title: "Rajaji Meshram",
    desig: "Distinguished Fellow(Transport & Logistics)",
    link: "https://www.linkedin.com/in/rajaji-meshram-9aa3437/",
  },

  {
    image: SoumyaKantiGhosh,
    title: "Soumya Kanti Ghosh",
    desig: "Distinguished Fellow (Economic Policy)",
    link: "https://www.linkedin.com/in/soumya-kanti-ghosh-2043921a/",
  },
  {
    image: AkhileshTilotia,
    title: "Akhilesh Tilotia",
    desig: "Distinguished Fellow (Public Policy)",
    link: "https://www.linkedin.com/in/atilotia/",
  },
];

export const team = [
  {
    image: Vinayak,
    title: "Vinayak Chatterjee",
    desig: "Founder & Managing Trustee",
  },
  {
    image: RumjhumChatterjee,
    title: "Rumjhum Chatterjee",
    desig: "Co-Founder & Managing Trustee",
  },
  {
    image: jagan,
    title: "Jagan Shah",
    desig: "CEO",
    link: "https://www.linkedin.com/in/jagan-shah/",
  },
  {
    image: KavereeBamzai,
    title: "Kaveree Bamzai",
    desig: "Head Advocacy",
    link: "https://www.linkedin.com/in/kavereebamzai/",
  },
  {
    image: MutumChaobisana,
    title: "Dr. Mutum Chaobisana",
    desig: "Head Programmes",
    link: "https://www.linkedin.com/in/dr-mutum-chaobisana-83647017/",
  },

  {
    image: VrindaSingh,
    title: "Vrinda Singh",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/vrinda-singh-3951951b4/",
  },
  {
    image: LawrenceCardoza,
    title: "Lawrence Cardoza",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/lawrence-cardoza/",
  },
  {
    image: PriyankaBains,
    title: "Priyanka Bains",
    desig: "Research Associate",
    link: "https://www.linkedin.com/in/priyanka-bains-b070607b/",
  },
];
