/**
 * Team Data – Realhubb Ventures Pvt. Ltd.
 */
import sontosh from "../components/assets/teampic/sontosh id card.png";
import pankaj from "../components/assets/teampic/pankaj with hair.png";
import naveen from "../components/assets/teampic/Naveen id card.png";
import tejas from "../components/assets/teampic/tejas s.png";
import neha from "../components/assets/teampic/neha id.png";
import arati from "../components/assets/teampic/AArti M (1).png";
import shraddha from "../components/assets/teampic/shradha.png";
import inderjeet from "../components/assets/teampic/inder.png";
import vedant from "../components/assets/teampic/vedant.png";

export interface TeamMember {
  name: string;
  designation: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

export const teamMembers: TeamMember[] = [

  // ── Sales Team ────────────────────────────────────────────────────────────

  {
    name: "Santosh Ray",
    designation: "Sr Sales Manager",
    image: sontosh,
    bio: "Santosh leads our sales team with a results-driven approach and a deep understanding of premium residential and commercial segments. Known for building long-term client relationships, he ensures every buyer gets the most value from their investment.",
    linkedin: "https://linkedin.com",
    email: "santosh@realhubb.in",
    phone: "+91 6364940392",
  },
  {
    name: "Pankaj Sharma",
    designation: "Sr Sales Manager",
    image: pankaj,
    bio: "Pankaj brings strategic insight and market acumen to every property deal. With a strong track record in high-value transactions, he specialises in understanding client goals and aligning them with the right opportunities across Bangalore's top micro-markets.",
    linkedin: "https://linkedin.com",
    email: "pankaj@realhubb.in",
    phone: "+91 9980318162",
  },
  {
    name: "Naveen Rama Naik",
    designation: "Sr. Sales Executive",
    image: naveen,
    bio: "Naveen is a trusted advisor for clients navigating Bangalore's dynamic real estate landscape. His attention to detail and local market expertise make him a go-to resource for first-time buyers and seasoned investors alike.",
    linkedin: "https://linkedin.com",
    email: "rahul@realhubb.in",
    phone: "+91 9187017272",
  },
 {
  name: "Vedant Agarwal",
  designation: "Sr. Sales Executive",
  image: vedant,
  bio: "Vedant brings a sharp eye for opportunity and a client-focused approach to every property interaction. Specialising in Hyderabad's fast-moving real estate market, he guides buyers through each stage of the process with confidence, clarity, and a commitment to finding the perfect fit.",
  linkedin: "https://linkedin.com",
  email: "vedant@realhubb.in",
  phone: "+91 9740787049",
},
  {
    name: "Tejas S",
    designation: "Sr. Sales Executive",
    image: tejas,
    bio: "Tejas combines sharp negotiation skills with a client-first mindset to deliver seamless property transactions. He is well-versed in RERA-approved projects and helps clients make informed, confident decisions at every step of the buying journey.",
    linkedin: "https://linkedin.com",
    email: "tejas.s@realhubb.in",
    phone: "+91 9380953826",
  },
  {
    name: "Neha Chourey",
    designation: "Sales Executive",
    image: neha,
    bio: "Neha is often the first point of contact for prospective clients — and she sets the bar high. She expertly qualifies leads, understands buyer requirements, and ensures every conversation moves clients closer to finding their ideal property.",
    linkedin: "https://linkedin.com",
    email: "neha@realhubb.in",
    phone: "+91 9740787049",
  },

  // ── Marketing Team ────────────────────────────────────────────────────────

  {
    name: "Arati Mahato",
    designation: "Digital Marketing Manager",
    image: arati,
    bio: "Arati drives RealHubb's digital presence with data-backed campaigns across SEO, social media, and performance marketing. She crafts strategies that connect the right properties with the right audiences — maximising reach and generating high-quality leads.",
    linkedin: "https://linkedin.com",
    email: "arati@realhubb.in",
    phone: "+91 9740787049",
  },
  {
    name: "Shraddha Chandel",
    designation: "Digital Marketing Executive",
    image: shraddha,
    bio: "Shraddha brings creativity and consistency to RealHubb's brand communication. From content creation to campaign execution, she ensures every touchpoint — online and offline — reflects the professionalism and trust that RealHubb stands for.",
    linkedin: "https://linkedin.com",
    email: "shraddha@realhubb.in",
    phone: "+91 9740787049",
  },

  // ── Technology ────────────────────────────────────────────────────────────

  {
    name: "Inderjeet Kumar",
    designation: "Sr IT Associate",
    image: inderjeet,
    bio: "Inderjeet is the technical backbone of RealHubb's digital infrastructure. From maintaining robust systems to building seamless user experiences, he ensures the technology behind every client interaction is reliable, fast, and future-ready.",
    linkedin: "https://linkedin.com",
    email: "inderjeet@realhubb.in",
    phone: "+91 7654398184",
  },

];