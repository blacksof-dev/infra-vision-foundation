import { StaticImageData } from "next/image";

import nitin from "@/../public/assets/infraShakti/luminaries/nitin.png";
import hardeep from "@/../public/assets/infraShakti/luminaries/hardeep.png";

import sanjay from "@/../public/assets/infraShakti/luminaries/sanjay.png";
import pranav from "@/../public/assets/infraShakti/luminaries/pranav.png";
import vinayak from "@/../public/assets/infraShakti/luminaries/vinayak.png";
import rumjhum from "@/../public/assets/infraShakti/luminaries/rumjhum.png";

import vinayakImg from "@/../public/assets/home/trustees/vinayakImg.png";

import renu from "@/../public/assets/infraShakti/luminaries/renu.png";
import gul from "@/../public/assets/infraShakti/luminaries/gul.png";
import bibek from "@/../public/assets/infraShakti/luminaries/bibek.png";
import raghuram from "@/../public/assets/infraShakti/luminaries/raghuram.png";
import dilip from "@/../public/assets/infraShakti/luminaries/dilip.png";

export type CardData = {
  image: StaticImageData;
  title: string;
  desig: string;
  link?: string;
  socialMedia?: string;

};

export const Guests = [
  {
    image: nitin,
    title: "Mr Nitin Gadkari",
    desig: "Hon'ble Minister of Road Transport and Highways, GoI",
    link:"https://x.com/nitin_gadkari",
    socialMedia:"X"
  
  },
  {
    image: hardeep,
    title: "Mr Hardeep Singh Puri",
    desig:
      "Hon'ble Minister of Housing and Urban Affairs & Petroleum and Natural Gas, GoI",
      link:"https://x.com/hardeepspuri?lang=en",
      socialMedia:"X"
      
  },
];

export const Preeminent = [
    {
    image: sanjay,
    title: "Mr Sanjay Pugalia",
    desig:
      "CEO and Editor-in-Chief, NDTV",
      link:"https://x.com/sanjaypugalia",
      socialMedia:"X"
    
  },
  {
    image: pranav,
    title: "Mr Pranav Adani",
    desig:
      "MD (Agro, Oil & Gas) and Director of Adani Enterprises",
      link:"https://in.linkedin.com/in/pranav-adani-9b1279331?original_referer=https%3A%2F%2Fwww.google.com%2F",
      socialMedia:"linkedin"
    
  },
  {
    image: vinayak,
    title: "Mr Vinayak Chatterjee",
    desig:
      "Founder and Managing Trustee, The Infravision Foundation",
      link:"https://x.com/infra_vinayakch?lang=en",
      socialMedia:"X"
     
  },
  {
    image: rumjhum,
    title: "Ms Rumjhum Chatterjee",
    desig:
      "Co-Founder and Managing Trustee, The Infravision Foundation",
      link:"https://www.linkedin.com/in/rumjhum-chatterjee-396041268/",
      socialMedia:"linkedin"
    
  },
];

export const jury = [
    {
    image: renu,
    title: "Mrs Renu Sud Karnad",
    desig:
      "Chairperson, GSK Pharmaceuticals; Former MD, HDFC",
     link:"https://in.linkedin.com/in/renu-sud-karnad-41bb2112a",
      socialMedia:"linkedin"
  },
  {
    image: gul,
    title: "Ms Gul Panag",
    desig:
      "Actor, Entrepreneur, and Sustainability Advocate",
      link:"https://x.com/GulPanag",
      socialMedia:"X"
     
  },
  {
    image: bibek,
    title: " Dr Bibek Debroy",
    desig:
      "Chairman, Economic Advisory Council, Prime Minister of India",
      link:"https://x.com/bibekdebroy?lang=en",
      socialMedia:"X"
      
  },
  {
    image: raghuram,
    title: "Prof G Raghuram",
    desig:
      "Former Director, IIMB and Dean, IIMA",
      link:"https://in.linkedin.com/in/g-raghuram-aa103750",
      socialMedia:"linkedin"
    
  },
  {
    image: dilip,
    title: "Mr Dilip Cherian",
    desig:
      "Image Guru, Litigation Landscaping and Policy Analyst",
      link:"https://in.linkedin.com/in/dilipcherian",
      socialMedia:"linkedin"
      
  },
];
