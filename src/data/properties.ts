/**
 * Properties Data
 * All property listings for current and ongoing projects
 * Update this file to add/modify properties
 */

import src from "gsap-trial/src/index";



export interface Property {
  imageUrl: any;
  name: string;
  id: string;
  slug?: string;
  title: string;
  mapEmbedUrl: string;
  location: string;
  price: string;
  priceValue: number; // For filtering
  type: "Apartment" | "Villa" | "Plot" | "Commercial";
  bhk: "1BHK" | "2BHK" | "3BHK" | "4BHK" | "5BHK+" | "Studio";
  status: "completed" | "ongoing";
  featured: string;
  area: string;
  images: string[];
  description: string;
  amenities: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  completionDate?: string;
  possession?: string;
  city?: "bangalore" | "hyderabad" | "chennai" | "delhi" | "mumbai" | "other";
}

// Current Projects (Completed)
export const currentProjects: Property[] = [
  {
    id: "up-001",
    slug: "godrej-plot-dodaballapur",
    title: "Godrej Plot Dodaballapur",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107220.98489423652!2d77.33333839726562!3d13.393578800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb1ddb95b75840f%3A0xcc2f7dccd7742fb0!2sAravya%20Estate%20%7C%20Godrej%20Plots%20Bangalore%20%7C%20Doddaballapur%2C%20North%20Bangalore!5e1!3m2!1sen!2sin!4v1769511221880!5m2!1sen!2sin",
    location: "Dodaballapur, North Bangalore",
    city: "bangalore",
    price: "₹50 Lakhs - ₹1.2 Cr",
    priceValue: 5000000,
    type: "Plot",
    bhk: "3BHK",
    status: "ongoing",
    featured: "Plots-1200 to 2400 sq.ft",
    area: "1200 - 2400 sq.ft",
    images: [
      "https://i.postimg.cc/G2ChPxPw/godrej-plot.jpg",
      "https://i.postimg.cc/d0HDFyrR/GOdrej-dodaballapur.jpg",
    ],
    description:
      "Upcoming plotted development by Godrej Properties featuring well-planned layouts, greenery, and high investment potential in North Bangalore.",
    amenities: [
      "Clubhouse",
      "Jogging Track",
      "Children’s Play Area",
      "Gated Security",
      "Rainwater Harvesting",
      "Solar Lighting",
      "Amphitheater",
      "Community Lawn",
    ],
    specifications: [
      { label: "Total Plots", value: "350" },
      { label: "Plot Sizes", value: "1200–2400 sq.ft" },
      { label: "Status", value: "Pre-Launch" },
      { label: "Approvals", value: "RERA Expected" },
    ],
    completionDate: "Q4 2029",
    possession: "Dec 2029",
  },
  {
    id: "up-002",
    slug: "century-marathahalli",
    title: "Century Marathahalli",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.660130294625!2d77.71135807430262!3d12.955342915236072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13f2e8040b4f%3A0x40707c342021cb85!2sCentury%20Marathahalli!5e1!3m2!1sen!2sin!4v1769511389086!5m2!1sen!2sin",
    location: "Marathahalli, Bangalore",
    city: "bangalore",
    price: "₹1.1 Cr - ₹2.3 Cr",
    priceValue: 11000000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "Plots-1450 to 2300 sq.ft",
    area: "1450 - 2300 sq.ft",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    ],
    description:
      "Century’s upcoming project in Marathahalli offers premium residences with top-tier connectivity and lifestyle amenities for tech professionals.",
    amenities: [
      "Sky Garden",
      "Swimming Pool",
      "Smart Security",
      "Gymnasium",
      "Kids Zone",
      "Party Hall",
      "Library",
      "Rooftop Lounge",
    ],
    specifications: [
      { label: "Total Units", value: "500" },
      { label: "Towers", value: "5" },
      { label: "Floors", value: "20" },
      { label: "RERA", value: "Awaited" },
    ],
    completionDate: "Q2 2028",
    possession: "Jun 2028",
  },
  {
    id: "up-003",
    slug: "godrej-hoskote",
    title: "Godrej Hoskote",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d593.0282046675458!2d77.81270446062311!3d13.101903649395277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae05053fa53ed3%3A0xef711ffd949bf52c!2sGodrej%20Foods%20Ltd%2C%20Hoskote!5e1!3m2!1sen!2sin!4v1769511953627!5m2!1sen!2sin",
    location: "Hoskote, Bangalore",
    city: "bangalore",
    price: "1.17 Cr - ₹1.95 Cr",
    priceValue: 4000000,
    type: "Plot",
    bhk: "2BHK",
    status: "ongoing",
    featured: "2BHK, 3BHK -PREMIUM and LUXE",
    area: "1050 - 1750 sq.ft",
    images: [
      "https://i.postimg.cc/8PnN2d72/gallery-min-5.png",
      "https://i.postimg.cc/3JbYsjyT/home-1.png",
      "https://i.postimg.cc/xTFnwGkf/home-2.png",
      "https://i.postimg.cc/HsLTvvkf/1.png",
      "https://i.postimg.cc/8PCTXXz3/2.png",
      "https://i.postimg.cc/zXfq22G4/3.png",
      "https://i.postimg.cc/m2rTppgJ/4.png",
      "https://i.postimg.cc/fTgDG734/floorplan-zoom-1.png",
      "https://i.postimg.cc/Qxnh2gFv/gallery-min-4.png",
    ],
    description:
      "Upcoming plotted community by Godrej near Hoskote — ideal for long-term investment with modern infrastructure and rapid growth potential.",
    amenities: [
      "Clubhouse",
      "Walking Track",
      "Solar Power",
      "Community Garden",
      "Children’s Park",
      "Security Cabin",
      "Basketball Court",
      "Amphitheater",
    ],
    specifications: [
      { label: "Total Plots", value: "1130" },
      { label: "Towers", value: "5" },
      { label: "Floors", value: "2B+G+28" },
      { label: "Development Area", value: "13.5 Acres" },
      { label: "Approvals", value: "RERA Awaited" },
      { label: "Status", value: "Pre-launch" },
    ],
    completionDate: "Q1 2030",
    possession: "Mar 2030",
  },
  {
    id: "up-004",
    slug: "mahindra-lifespace-blossom",
    title: "Mahindra Lifespace Blossom",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214756.38913928802!2d77.53025793235881!3d13.03608752501275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0f00551b89c5%3A0x7884fa0d444e36da!2sMahindra%20Blossom!5e1!3m2!1sen!2sin!4v1769512297323!5m2!1sen!2sin",
    location: "Hope Farm Junction at Whitefield, Bangalore",
    city: "bangalore",
    price: "₹1.3 Cr - ₹2.8 Cr",
    priceValue: 13000000,
    type: "Apartment",
    bhk: "1BHK",
    status: "ongoing",
    featured: "1BHK, 2BHK, 3BHK,3.5BHK, 4BHK",
    area: "625 - 2450 sq.ft",
    images: [
      "https://i.postimg.cc/g0pSNJVX/Whats-App-Image-2025-12-26-at-3-06-56-PM.jpg",
      "https://i.postimg.cc/L4gtgSfX/mahindra-lifespace-logo.jpg",
      "https://i.postimg.cc/HsGQQN4H/mahindra-whitefield-banner-img.jpg",
      "https://i.postimg.cc/HW8w8m5H/mahindra-blossom-living-area.png",
      "https://i.postimg.cc/bYSxSPbY/mahindra-blossom-outdoor-space.png",
      "https://i.postimg.cc/9Xwdw2TQ/mahindra-blossom-whitefield-project.png",
      "https://i.postimg.cc/bNXQQ5Hy/Main-Elevation-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/QNKQKD5C/mahindra-blossom-yoga-deck.png",
      "https://i.postimg.cc/tRn3nbPG/2BHK-Large-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/h4QLQnxW/2BHK-Regular-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/mZ1Y14Mx/3BHK-Large-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/ryR1RT4B/3BHK-Regular-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/05KYKvmv/floorplan-zoom-1.png",
      "https://i.postimg.cc/fWScSsXM/floorplan-zoom-3.png",
      "https://i.postimg.cc/HsGQQN4s/Master-Plan-Mahindra-Blossom-Whitefield.jpg",

    ],
    description:
      "A futuristic residential project by Mahindra Lifespaces near Hopefarm Metro, offering sustainable and tech-integrated living spaces.",
    amenities: [
      "Green Terraces",
      "Swimming Pool",
      "Co-working Lounge",
      "EV Parking",
      "Solar Energy",
      "Smart Access Control",
      "Yoga Pavilion",
      "Kids Pool",
    ],
    specifications: [
      { label: "Total Apartments", value: "733" },
      { label: "Towers", value: "7" },
      { label: "Floors", value: "G+29" },
      { label: "Development Area", value: "9.3 Acres" },
      { label: "Approvals", value: "Yes" },
      { label: "Status", value: "Pre-launch" },
    ],
    completionDate: "Q3 2030",
    possession: "Sep 2030",
  },
];

// Ongoing Projects (Under Construction)
export const ongoingProjects: Property[] = [
  {
    id: "op-005",
    slug: "winds-of-change-by-ckpc",
    title: "Winds of Change by CKPC",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.1238493810793!2d77.56351347430567!3d13.14220811111643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19ee091056b7%3A0xbcd566121717ad2a!2sWinds%20of%20Change%20by%20CKPC!5e1!3m2!1sen!2sin!4v1769512464151!5m2!1sen!2sin",
    location: "Yelahanka, Bangalore",
    city: "bangalore",
    price: "₹1.15 Cr* - ₹2.41 Cr*",
    priceValue: 13000000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing",
    featured: "2BHK, 3BHK, 4BHK",
    area: "1206 - 2300 sq.ft",
    images: [
      "https://i.postimg.cc/zGqnXTbs/CKPC-winds-of-change-fron-image.jpg",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://i.postimg.cc/rmq6fnKP/CKPC-Intrerior1.jpg",
      "https://i.postimg.cc/DyJNPkx4/CKPC-location-map.jpg",
    ],
    description:
      "Elegant apartments crafted with modern design and sustainability in mind, offering spacious interiors and premium amenities in Sarjapur’s fast-growing neighborhood.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Children's Play Area",
      "Landscaped Gardens",
      "24/7 Security",
      "Amphitheater",
      "Co-working Space",
    ],
    specifications: [
      { label: "Total Units", value: "438" },
      { label: "Towers", value: "9" },
      { label: "Floors", value: "G+6" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },

    ],
    completionDate: "Q1 2029",
    possession: "March 2029",
  },
  {
    id: "op-006",
    slug: "tvs-auralis",
    title: "TVS Auralis",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53677.408793399554!2d77.58652892616945!3d13.089853235455067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1908ef17a6bb%3A0x78008320643f9d17!2sTVS%20Emerald%20Auralis!5e1!3m2!1sen!2sin!4v1769512555927!5m2!1sen!2sin",
    location: "Kanakapura Road, Bangalore",
    city: "bangalore",
    price: "₹1.4 Cr* - ₹2.6 Cr*",
    priceValue: 14000000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing",
    featured: "2BHK, 3BHK, 4BHK",
    area: "1700 - 2600 sq.ft",
    images: [
      "https://i.postimg.cc/X7qgwf7m/Entrance_TVS_Emerald_Auralis.jpg",
      "https://i.postimg.cc/vHTvWrHp/Bedroom_TVS_Emerald_Auralis.jpg",
      "https://i.postimg.cc/fTyvxcTF/Clubhouse_View_TVS_Emerald_Auralis.jpg",
      "https://i.postimg.cc/Fs6VGY7G/Party_Lawn_TVS_Emerald_Auralis.jpg",
      "https://i.postimg.cc/BQzBNjXh/Sports_Courts_TVS_Emerald_Auralis.jpg",
    ],
    description:
      "Luxury apartments designed by TVS for a serene lifestyle with world-class amenities and exceptional connectivity near Kanakapura Road.",
    amenities: [
      "Infinity Pool",
      "Yoga Deck",
      "Smart Home Systems",
      "Jogging Track",
      "Multipurpose Hall",
      "EV Charging Stations",
      "Indoor Games Zone",
      "Banquet Hall",
    ],
    specifications: [
      { label: "Total Units", value: "400" },
      { label: "Towers", value: "5" },
      { label: "Floors", value: "20" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },

    ],
    completionDate: "Q2 2027",
    possession: "Jun 2027",
  },
  {
    id: "op-007",
    slug: "ramky-lumina",
    title: "Ramky Lumina",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.8609708255008!2d77.66352637430123!3d12.865938517187594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d1ab5b82981%3A0x283a1d54dfe6409b!2sRamky%20Lumina%20Apartments!5e1!3m2!1sen!2sin!4v1769512649439!5m2!1sen!2sin",
    location: "Hosa Road, South bangalore",
    city: "bangalore",
    price: "₹1.2 Cr* - ₹2.8 Cr*",
    priceValue: 12000000,
    type: "Apartment",
    bhk: "1BHK",
    status: "ongoing",
    featured: "1BHK, 2BHK, 3BHK",
    area: "1050 - 1533 sq.ft",
    images: [
      "https://i.postimg.cc/pVmNq1Cy/Elevation_B_Ramky_Lumina.jpg",
      "https://i.postimg.cc/zDym0P7N/Elevation_A_Ramky_Lumina.jpg",
      "https://i.postimg.cc/XNrMQDLp/Master_Plan_Ramky_Lumina.jpg",
      "https://i.postimg.cc/v84R3ShG/1BHK_615_Ramky_Lumina.jpg",
      "https://i.postimg.cc/44YCBFPZ/2BHK_1040_Ramky_Lumina.jpg",
      "https://i.postimg.cc/WpdRXf8T/3BHK_1311_Ramky_Lumina.jpg",
    ],
    description:
      "Ramky Lumina offers modern luxury homes at the heart of bangalore’s IT corridor, designed for comfort, sustainability, and high ROI.",
    amenities: [
      "YOGA & MEDITATION DECK",
      "WELLNESS GARDEN",
      "24X7 CCTV SURVEILLANCE",
      "24X7 POWER BACKUP",
      "RAIN WATER HARVESTING",
      "WASTE MANAGEMENT & DISPOSAL",
      "BASKETBALL COURT",
      "GYMNASIUM | JOGGING TRACK",
      "CALISTHENICS GYM",
      "SWING PARK | KIDS PLAY AREA",
      "REFLEXOLOGYWALKWAY",
      "SWIMMING POOL | KIDS POOL",
      "ELDERS OUTDOOR GYM",
      "YOGA LAWN | SKATING RINK",
      "PICKLE BALL COURT",
      "MULTIPURPOSE LAWN",
      "FUTSAL COURT | CRICKET PITCH",
      "GIANT CHESS | GIANT LUDO",
      "GIANTSNAKE AND LADDER",
      "HOPSCOTCH"
    ],
    specifications: [
      { label: "Total Units", value: "729" },
      { label: "Towers", value: "6" },
      { label: "Floors", value: "2B+G+14" },
      { label: "Smart Homes", value: "Yes" },
      { label: "Land Area", value: "7 acres" },
      { label: "RERA Approved", value: "Yes" },

    ],
    completionDate: "Q3 2026",
    possession: "Sep 2026"
  },
  {
    id: "op-008",
    slug: "mana-vista",
    title: "Mana Vista",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.7029828670784!2d77.6959762743014!3d12.877735816930757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6d0034f6cb67%3A0xc34029adc0177d92!2sMana%20Vista!5e1!3m2!1sen!2sin!4v1769512713405!5m2!1sen!2sin",
    location: "Sarjapur Road, Bangalore",
    city: "bangalore",
    price: "₹1.24 Cr* - ₹1.72 Cr*",
    priceValue: 11000000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing",
    featured: "2BHK, 3BHK, 3BHK + 3T",
    area: "1127 - 1563 sq.ft",
    images: [
      "https://i.postimg.cc/LsHxqnhp/mana_vista_gallery_1.webp",
      "https://i.postimg.cc/fbw83JkD/mana_vista_gallery_2.webp",
      "https://i.postimg.cc/xd06kcqQ/mana_vista_gallery_3.webp",
      "https://i.postimg.cc/8C1ZFjsT/mana_vista_gallery_4.webp",
      "https://i.postimg.cc/ZqTw9C05/mana_vista_gallery_5.webp",
    ],
    description:
      "Mana Vista redefines luxury with serene lake views, modern architecture, and premium lifestyle amenities in Sarjapur’s green zone.",
    amenities: [
      "Lake View Deck",
      "Jogging Trail",
      "Sky Lounge",
      "Swimming Pool",
      "Banquet Space",
      "Sports Arena",
      "Kids Zone",
      "Pet Park",
    ],
    specifications: [
      { label: "Total Units", value: "440" },
      { label: "Towers", value: "3" },
      { label: "Floors", value: "G+14" },
      { label: "Vastu Compliant", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },
      { label: "RERA Approved", value: "Yes" },

    ],
    completionDate: "Q2 2027",
    possession: "Jun 2027",
  },
  {
    id: "op-009",
    slug: "sobha-neopolis",
    title: "Sobha Neopolis ",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.9478242691466!2d77.71179539678951!3d12.933979000000019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13de030c640d%3A0x75981729dbc28690!2sSOBHA%20Neopolis!5e1!3m2!1sen!2sin!4v1769512798427!5m2!1sen!2sin",
    location: "Near Marathahalli on Varthur Panathur road. Bangalore",
    city: "bangalore",
    price: "13666 Rs / Sqft",
    priceValue: 35000000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "1 bhk , 3 bhk , 3.5 bhk , 4 bhk",
    area: "2700 - 4000 sq.ft",
    images: [
      "https://i.postimg.cc/5yj4DYPd/Main-Elevation-Sobha-Neopolis.jpg",
      "https://i.postimg.cc/Zn0bXBfm/sobha-neopolis.jpg",
      "https://i.postimg.cc/J0trSDTW/Sobha-Neopolis-4.jpg",
      "https://i.postimg.cc/nrMFNjdh/sobha-neopolis2.png",
      "https://i.postimg.cc/3NW8z4LW/Sobha-neopolis3.jpg",
      "https://i.postimg.cc/SRjSH2Zm/Sobha-neopolis5.jpg",
      "https://i.postimg.cc/QCV8v96F/Sobha-neopolis6.jpg",
      "https://i.postimg.cc/Fz1rwdPf/Sobha-neopolis7.jpg",

    ],
    description:
      "The Greek-themed residential enclave Sobha Neopolis features the very best in SOBHA Limited’s ultra-luxury living segment. The project offers spacious 3,3.5,4 BHK Apartments with luxurious features.",
    amenities: [
      "Temperature Controlled Pool",
      "Private Theater",
      "Concierge Service",
      "Fitness Studio",
      "Lounge Bar",
      "Smart Home Access",
      "Golf Putting Zone",
      "24/7 Security",
    ],
    specifications: [
      { label: "Total Units", value: "1875" },
      { label: "Towers", value: "19 Wings" },
      { label: "Floors", value: "2 Basement + Ground + 18 floors" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },

    ],
    completionDate: "Q4 2027",
    possession: "Mid 2026 to End 2027",
  },
  {
    id: "op-010",
    slug: "mana-dale",
    title: "Mana Dale",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.579424092962!2d77.70437737430153!3d12.886954816729984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13979a1d685b%3A0x4e115945817a350!2sMana%20Dale%20by%20Mana%20Projects!5e1!3m2!1sen!2sin!4v1769512856116!5m2!1sen!2sin",
    location: "Kodathi, Off Sarjapur Road, Bangalore",
    city: "bangalore",
    price: "₹1.2 Cr - ₹2.5 Cr",
    priceValue: 12000000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "3BHK-2T, 3BHK-3T",
    area: "1482 - 1823 sq.ft",
    images: [
      "https://i.postimg.cc/BbQxPgmj/mana-dale1.jpg",
      "https://i.postimg.cc/zvXnHjx3/mana-dale2.jpg",
      "https://i.postimg.cc/prXD5Zsp/mana-dale3.jpg",
      "https://i.postimg.cc/fyTxSK8b/amna-dale4.jpg",
      "https://i.postimg.cc/D0yq4gxX/mana-dale5.jpg",
      "https://i.postimg.cc/Y0q1L3dQ/mana-dale6.jpg",
      "https://i.postimg.cc/90FGwpLG/mana-dale7.jpg",
      "https://i.postimg.cc/rsFSRJf1/mana-dale8.jpg",
    ],
    description:
      "Set amidst 6.39 acres, Mana Dale offers nature-inspired homes with resort-style amenities and world-class architecture for a balanced lifestyle.",
    amenities: [
      "Largest Clubhouse",
      "Amphitheater",
      "Wellness Spa",
      "Jogging Trail",
      "Infinity Pool",
      "Café Lounge",
      "Sports Zone",
      "EV Charging",
    ],
    specifications: [
      { label: "Total Units", value: "682" },
      { label: "Floors", value: "G+29" },
      { label: "Blocks", value: "4" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },

    ],
    completionDate: "Q4 2027",
    possession: "Dec 2027",
  },
  {
    id: "op-011",
    slug: "godrej-regal-pavilion",
    title: "Godrej Regal Pavilion",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.7078106057425!2d78.4131728243861!3d17.289287805625303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbd001f33aa75%3A0xbf48e6a0f9d4959c!2sGodrej%20Regal%20Pavilion%2C%20Rajendra%20Nagar%2C%20Hyderabad!5e1!3m2!1sen!2sin!4v1769512908698!5m2!1sen!2sin",
    location: "Rajendra Nagar, Hyderabad",
    city: "hyderabad",
    price: "₹2.32 Cr - ₹3.02 Cr",
    priceValue: 8000000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "3BHK, 3.5BHK, 4BHK, 4BHK Large",
    area: "1873 - 3572 sq.ft",
    images: [
      "https://i.postimg.cc/hP83RCPh/B4.png",
      "https://i.postimg.cc/m2W6qxRc/B1.png",
      "https://i.postimg.cc/SNLtbZNJ/B3.png",
      "https://i.postimg.cc/FsXnqtmK/About.png",
      "https://i.postimg.cc/Wbmfc9b3/gym.png",
      "https://i.postimg.cc/J43dCT40/kids-20play-20area.png",
      "https://i.postimg.cc/4NvFR8NK/min-20outside-20gym.png",
      "https://i.postimg.cc/m236Wd21/pool.png",
      "https://i.postimg.cc/X7KD6275/site-visit.png",
    ],
    description:
      "A landmark residential project by Godrej in Hyderabad, blending elegance, technology, and sustainability for modern living. 12.51 Acres of sheer luxury with world-class amenities.",
    amenities: [
      "Sky Clubhouse",
      "Swimming Pool",
      "Fitness Studio",
      "Meditation Deck",
      "Indoor Games",
      "Jogging Park",
      "Solar Lighting",
      "24x7 Power Backup",
    ],
    specifications: [
      { label: "Total Units", value: "2000+" },
      { label: "Towers", value: "9" },
      { label: "Floors", value: " G+32 & G+33" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" },

    ],
    completionDate: "Q3 2029",
    possession: "Sep 2029",
  },
  {
    id: "op-012",
    slug: "kalyani-living-tree",
    title: "Living Tree by Kalyani",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3354.119702380902!2d77.67488427430561!3d13.142511511109692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1b002676fec9%3A0xeb95646f1bab32!2sKalyani%20LivingTree%20-%20Apartments%20In%20Bagalur!5e1!3m2!1sen!2sin!4v1769512958702!5m2!1sen!2sin",
    location: "KIADB, Aerospace Park, Bagalur, North Bangalore",
    city: "bangalore",
    price: "₹78.39 Lakhs - ₹1.73 Cr",
    priceValue: 7000000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "3BHK Smart, 3BHK Luxe",
    area: "1316 - 1927 sq.ft",
    images: [
      "https://i.postimg.cc/K8rx1rG6/kalyani-living-tree-1-720x405.png",
      "https://i.postimg.cc/P5zTCzX9/kalyani-living-tree-2-bhk-plan-768x614.png",
      "https://i.postimg.cc/0ydPzdk3/kalyani-living-tree-3-bedroom-720x405.png",
      "https://i.postimg.cc/9QtCDtX5/kalyani-living-tree-3-floor-plan-768x614.png",
      "https://i.postimg.cc/Nj7BK7GB/kalyani-living-tree-720x405.png",
      "https://i.postimg.cc/P5zTCzfJ/kalyani-living-tree-aerospace-720x405.png",
      "https://i.postimg.cc/t4tpstRY/kalyani-living-tree-amenities-720x405.png",
      "https://i.postimg.cc/cLM0vM1v/kalyani-living-tree-bengaluru-900x450.png",
      "https://i.postimg.cc/cJxZwg6C/kalyani-living-tree-club-900x450.png",
      "https://i.postimg.cc/xdfYMJqL/kalyani-living-tree-flats-900x450.png",
      "https://i.postimg.cc/vmYMfgDf/kalyani-living-tree-home-900x450.png",
      "https://i.postimg.cc/QM8s19V7/Screenshot-2025-12-17-174302.png",
    ],
    description:
      "Sprawled across 25 acres with 10 towers and 2,522 homes, Living Tree by Kalyani offers green living with premium facilities and smart layouts.",
    amenities: [
      "25-Acre Green Zone",
      "Kids Park",
      "Fitness Arena",
      "Sky Decks",
      "Sports Hub",
      "EV Charging",
      "Spa & Yoga",
      "Mini Theater",
    ],
    specifications: [
      { label: "Total Units", value: "2522" },
      { label: "Towers", value: "10" },
      { label: "Floors", value: "G+30" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "2.5 acres" }
    ],
    completionDate: "Q4 2029",
    possession: "Dec 2029",
  },
  // Aratt Alchemy Essence
  {
    id: "op-013",
    slug: "aratt-alchemy-essence",
    title: "Aratt Alchemy Essence",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.140490469627!2d77.66328257430446!3d13.067620512767371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1b40309fd7bb%3A0x3a218b70a96e8fc2!2sAratt%20Alchemy%20Essence!5e1!3m2!1sen!2sin!4v1769513012874!5m2!1sen!2sin",
    location: "Doddagubbi, Off Hennur Main Road, Bangalore",
    city: "bangalore",
    price: "₹1.16 Cr - ₹1.67 Cr",
    priceValue: 11600000,
    type: "Apartment",
    bhk: "2BHK", // also 3BHK
    status: "ongoing",
    featured: "2BHK, 3BHK",
    area: "1201 - 1754 sq.ft",
    images: [
      "https://i.postimg.cc/N0kDn35L/Main-Elevation-Aratt-Alchemy-Essence-Hennur.jpg",
      "https://i.postimg.cc/R0LdYkNZ/Entrance-Aratt-Alchemy-Essence-Hennur.png",
      "https://i.postimg.cc/257GtsV8/3BHK-1754-Aratt-Alchemy-Essence-Hennur.png",
      "https://i.postimg.cc/vmthKJcQ/3BHK-1201-Aratt-Alchemy-Essence-Hennur.png",
      "https://i.postimg.cc/tgNkcKYq/2BHK-1241-Aratt-Alchemy-Essence-Hennur.png",
      "https://i.postimg.cc/PqQy7gPL/Master-Plan-Aratt-Alchemy-Essence-Hennur.png",
      "https://i.postimg.cc/bv9g57st/Pool-Aratt-Alchemy-Essence-Hennur.png",
    ],
    description: "Premium 2 & 3 BHK apartments spread across 2.5 acres with modern amenities, landscaped gardens, excellent connectivity, and a vibrant, elite living experience.",
    amenities: [
      "Clubhouse",
      "Landscaped Gardens",
      "Gymnasium",
      "Swimming Pool",
      "Recreation Rooms",
      "Outdoor Sports Courts",
      "Children’s Play Area",
      "Amphitheater",
      "Party Hall",
      "24/7 Security"
    ],
    specifications: [
      { label: "Total Units", value: "188 Apartments" },
      { label: "Towers", value: "2 Towers" },
      { label: "Floors", value: "2B+G+9" },
      { label: "Land Area", value: "2.5 acres" },
      { label: "RERA Approved", value: "Yes" },
    ],
    completionDate: "2030",
    possession: "2030 Onwards"
  },

  // Sumadhura Tea & Twilight
  {
    id: "op-014",
    slug: "sumadhura-tea-and-twilight",
    title: "Sumadhura Tea & Twilight",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3356.622718163129!2d77.72487397430267!3d12.9581185651753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae133e4f4be9fb%3A0xad9e4f99a4ade9a6!2sSumadhura%20Edition!5e1!3m2!1sen!2sin!4v1769513260561!5m2!1sen!2sin",
    location: "Siddapura, Whitefield, Bangalore",
    city: "bangalore",
    price: "₹1.83 Cr - ₹3.28 Cr",
    priceValue: 16600000,
    type: "Apartment",
    bhk: "2BHK", // also 3/4 BHK available
    status: "ongoing",
    featured: "2BHK, 3BHK, 4BHK",
    area: "1280 - 2295 sq.ft",
    images: [
      "https://i.postimg.cc/J0g4L7p3/banner1.png",
      "https://i.postimg.cc/L576p4xP/banner3.png",
      "https://i.postimg.cc/3N6JTrtV/g10.png",
      "https://i.postimg.cc/fWgbX5MV/g11.png",
      "https://i.postimg.cc/yYg8T9Nh/g13.png",
      "https://i.postimg.cc/Gh8mjYpX/g14.png",
      "https://i.postimg.cc/pXhLB8Tt/g18.png",
      "https://i.postimg.cc/C5tLgMck/g5.png",
      "https://i.postimg.cc/vTjHs80r/g6.png",
      "https://i.postimg.cc/D0DyTfxM/g7.png",
      "https://i.postimg.cc/WzKbvp9L/g8.png",
      "https://i.postimg.cc/WbF17r4K/location.png",
      "https://i.postimg.cc/bN7NVJDN/masterplan.png",
    ],
    description: "British-themed 2, 3 & 4 BHK luxury apartments in a 20-acre community with 150+ amenities, 16 themed gardens, grand clubhouse, and rustic charm in vibrant Whitefield.",
    amenities: [
      "Clubhouse (66,000 sq. ft.)",
      "16 Themed Gardens",
      "Swimming Pool",
      "Spa",
      "Yoga Room",
      "Children’s Play Area",
      "Parking",
      "Multipurpose Hall",
      "Party Lawn",
      "Security"
    ],
    specifications: [
      { label: "Total Units", value: "1650" },
      { label: "Towers", value: "11 Towers" },
      { label: "Floors", value: "2B+G+18" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Land Area", value: "20 acres" }
    ],
    completionDate: "On Request",
    possession: "On Request"
  },

  // Mana The Right Life
  {
    id: "op-015",
    slug: "mana-the-right-life",
    title: "Mana The Right Life",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.4158106782675!2d77.74535987430174!3d12.899152416464096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0dc0ad20cbbb%3A0x68e80745218128fa!2sMana%20Skanda%20%7C%20The%20Right%20Life!5e1!3m2!1sen!2sin!4v1769513359445!5m2!1sen!2sin",
    location: "Sarjapur Varthur Road, Bangalore",
    city: "bangalore",
    price: "₹1.97 Cr - ₹2.75 Cr",
    priceValue: 19700000,
    type: "Apartment",
    bhk: "3BHK", // also 3.5 BHK
    status: "ongoing",
    featured: "3BHK, 3.5BHK",
    area: "1661 - 2244 sq.ft",
    images: [
      "https://i.postimg.cc/MK9R4109/Main-Elevation-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/ncFB03mq/Elevation-A-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/WbNgX5Z6/Elevation-B-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/yYL950hJ/Elevation-C-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/Kv0LVt7g/Elevation-D-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/Hs65Kb00/Elevation-E-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/4NfVBWcY/3BHK-1473-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/5N4Lnszj/3BHK-Comfort-1289-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/gkz8Nghn/3BHK-Comfort-1326-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/GhLGqXDt/3-5BHK-1594-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
      "https://i.postimg.cc/Qxf5Pcgy/Master-Plan-Mana-The-Right-Life-Mana-Skanda-The-Right-Life.png",
    ],
    description: "Child-centric township spanning 100 acres (Phase 1: 32 acres). Premium clubhouses, vast open space, and thoughtfully designed for family living, lifestyle, and wellness.",
    amenities: [
      "Swimming Pool",
      "Jogging Track",
      "Curated Parks",
      "World-Class Gym",
      "Games Room",
      "Multi-Purpose Hall",
      "Landscape Gardens",
      "Cycling Track",
      "Kids Pool",
      "Party Halls",
      "Yoga Deck",
      "Sports Court"
    ],
    specifications: [
      { label: "Total Units (Phase 1)", value: "687" },
      { label: "Towers", value: "9 Towers" },
      { label: "Floors", value: "3B+G+34" },
      { label: "Land Area", value: "100+ acres (Phase 1: 31 acres)" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Open Area", value: "84%" },
      { label: "Vastu Compliant", value: "Yes" },
    ],
    completionDate: "Dec 2029",
    possession: "Dec 2028 Onwards"
  },

  // Brigade Gateway, Hyderabad
  {
    id: "op-016",
    slug: "brigade-gateway-neopolis",
    title: "Brigade Gateway Neopolis",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.627457514959!2d78.31242827438875!3d17.40535250228888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95ab65575823%3A0x242137fd9bf5c248!2sBrigade%20Gateway%20-%20Hyderabad!5e1!3m2!1sen!2sin!4v1769513416330!5m2!1sen!2sin",
    location: "Neopolis, Kokapet, Hyderabad",
    city: "hyderabad",
    price: "₹4.6 Cr onwards",
    priceValue: 46000000,
    type: "Apartment",
    bhk: "3BHK", // 4, 5, 6 BHK Sky Duplexes
    status: "ongoing",
    featured: "true",
    area: "3067 - 9859 sq.ft",
    images: [
      "https://i.postimg.cc/BvNnjTSq/Main-Elevation-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/pdkLmf27/Co-Working-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/QMSdFQXn/Commercial-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/jjvSDHsM/Elevation-A-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/pdkLmfWt/Elevation-B-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/hGMtXLDn/Living-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/BvNnjTqh/Clubhouse-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/ZRRKpWRG/Master-Bedroom-Brigade-Gateway-Neopolis.png",
      "https://i.postimg.cc/nzzcBXrp/Tower-Terrace-Brigade-Gateway-Neopolis.png",
    ],
    description: "Ultra-premium mixed-use township: luxury homes, World Trade Center, InterContinental Hotel, Orion Mall. 9.7 acres of luxury, grand amenities, signature living by Brigade.",
    amenities: [
      "Clubhouse",
      "Retail Mall",
      "Swimming Pool",
      "Landscaped Gardens",
      "Fitness Center",
      "Leisure Spaces",
      "Multi-purpose Hall",
      "24/7 Security"
    ],
    specifications: [
      { label: "Total Units", value: "188 Apartments" },
      { label: "Towers", value: "2 Towers" },
      { label: "Floors", value: "2B+G+9" },
      { label: "Land Area", value: "2.5 acres" },
      { label: "RERA Approved", value: "Yes" },
    ],
    completionDate: "2029",
    possession: "2029"
  },

  // Sobha Town Park
  {
    id: "op-017",
    slug: "sobha-town-park",
    title: "Sobha Town Park",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2093.869661884535!2d77.74072100134732!3d12.787918560869869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6fc2e6fd2d07%3A0xb52d5d4fe17eba01!2sSOBHA%20Townpark!5e1!3m2!1sen!2sin!4v1769513517030!5m2!1sen!2sin",
    location: "Hosur Road, Attibele, Yadavanahalli",
    city: "bangalore",
    price: " 90 Lakhs - ₹4.10 Cr",
    priceValue: 18000000,
    type: "Apartment",
    bhk: "1BHK", // 3, 4 BHK also available
    status: "ongoing",
    featured: "1BHK, 2BHK, 3BHK, 4BHK",
    area: "753 - 2800 sq.ft",
    images: [
      "https://i.postimg.cc/P53k0Yj2/Main-Elevation-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/ZKLmFXDZ/Elevation-A-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/DwyTC5th/Elevation-B-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/bwNh6LKJ/Elevation-C-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/VkL87435/Elevation-I-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/BnQ0hNdK/Elevation-J-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/y8Qz2cHk/Elevation-K-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/XYH0tdbr/Elevation-L-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/CxPV9kgk/Elevation-M-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/VkGc2n8Z/Master-Plan-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/BQ3sFJpM/2BHK-1240-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/fTsZdMC8/2BHK-1339-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/qMGrXWD8/3BHK-1514-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/xTQYm95x/3BHK-1842-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/QxqDkvYy/3BHK-1859-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/gkKpq1tC/4BHK-2203-Sobha-Town-Park-Phase-3.png",
      "https://i.postimg.cc/Hstm4FPG/4BHK-2845-Sobha-Town-Park-Phase-3.png",
    ],
    description: "New York-themed ultra-luxury township on 33 acres. 2,104 residences, clubhouses, sports grounds, forest groves, and best-in-class amenities for contemporary urban living.",
    amenities: [
      "Clubhouses",
      "Cricket Ground",
      "Multi-Sport Courts",
      "Lap & Leisure Pools",
      "Camping Grounds",
      "Forest Grove",
      "Children's Play Areas"
    ],
    specifications: [
      { label: "Total Units", value: "560 Apartments" },
      { label: "Towers", value: "5 Towers" },
      { label: "Floors", value: "1B + G + 37,38" },
      { label: "Land Area", value: "7.24 acres(32 Acres total)" },
      { label: "RERA Approved", value: "Yes" },
    ],
    completionDate: "Phase 1: Dec 2027, Full: Jun 2033",
    possession: "Phase 1: Dec 2027, Full: Jun 2033"
  },

  // Sattva Lumina
  {
    id: "op-018",
    slug: "sattva-lumina",
    title: "Sattva Lumina",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26828.56028271925!2d77.542478411908!3d13.182665162826599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1f007a0ae46f%3A0x82412dc389c6637c!2sSattva%20Lumina!5e1!3m2!1sen!2sin!4v1769515617667!5m2!1sen!2sin",
    location: "Rajunkunte,Yelhanka, Bengaluru",
    city: "bangalore",
    price: "₹41 Lakhs - ₹1.85 Cr",
    priceValue: 6900000,
    type: "Apartment",
    bhk: "Studio", // 2BHK, 3BHK available
    status: "ongoing",
    featured: "Studio, 1BHK, 2BHK, 3BHK+2T, 3BHK+3T",
    area: "434 - 1823 sq.ft",
    images: [
      "https://i.postimg.cc/cHyt2TVN/12-2.png",
      "https://i.postimg.cc/xjPNpv5x/Top-Cam.png",
      "https://i.postimg.cc/G2FTCGC1/cam.png",
      "https://i.postimg.cc/d1PZpnzQ/Floorplan-brochure-A3Spriral-Lumina-10092024-03.png",
      "https://i.postimg.cc/KzP32B2z/Floorplan-brochure-A3Spriral-Lumina-10092024-04.png",
      "https://i.postimg.cc/KzP32B2Y/Floorplan-brochure-A3Spriral-Lumina-10092024-06.png",
      "https://i.postimg.cc/1Xyn5Xmf/Floorplan-brochure-A3Spriral-Lumina-10092024-09.png",
      "https://i.postimg.cc/85RfSMSL/Floorplan-brochure-A3Spriral-Lumina-10092024-10.png",
      "https://i.postimg.cc/T1TLY1dj/Floorplan-brochure-A3Spriral-Lumina-10092024-13.png",
      "https://i.postimg.cc/mkTz2kLm/Floorplan-brochure-A3Spriral-Lumina-10092024-14.png",
      "https://i.postimg.cc/2yCb8ykt/Floorplan-brochure-A3Spriral-Lumina-10092024-15.png",
      "https://i.postimg.cc/zvpLLN3Z/Floorplan-brochure-A3Spriral-Lumina-10092024-16.png",
      "https://i.postimg.cc/NFbyytLf/Floorplan-brochure-A3Spriral-Lumina-10092024-18.png",
      "https://i.postimg.cc/T1Qyyxhh/Master-Plan-1.png",
      "https://i.postimg.cc/V6Q0p43w/1-2.png",

    ],
    description: "Contemporary urban township: 1,553 premium apartments, 8 towers (29 floors each), 13 acres, 80% open space, 40+ amenities. Vaastu homes, metro/airport access, spectacular green views.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Sports Facilities",
      "Jogging/Cycling Track",
      "Children’s Park",
      "Indoor Games",
      "Pet Park",
      "Party Hall"
    ],
    specifications: [
      { label: "Total Units", value: "1553 Apartments" },
      { label: "Towers", value: "8 Towers" },
      { label: "Floors", value: "G+29" },
      { label: "Land Area", value: "13 acres" },
      { label: "RERA Approved", value: "Yes" },
    ],
    completionDate: "Nov 2029",
    possession: "Dec 2029"
  },
  // Prestige Spring Heights
  {
    id: "op-019",
    slug: "prestige-spring-heights",
    title: "Prestige Spring Heights",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2555.666608992923!2d78.38181208619775!3d17.312851669599347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbf4a390d14c1%3A0x4f5b0692b08655d3!2sPrestige%20Spring%20Heights!5e1!3m2!1sen!2sin!4v1769515753675!5m2!1sen!2sin",
    location: "Rajendra Nagar, Budvel, Hyderabad",
    city: "hyderabad",
    price: "₹41 Lakhs - ₹1.85 Cr",
    priceValue: 6900000,
    type: "Apartment",
    bhk: "3BHK", //  3BHK available
    status: "ongoing",
    featured: "3BHK + 2T/3T , 4BHK + 3T/4T",
    area: "1571 - 3233 sq.ft",
    images: [
      "https://i.postimg.cc/Rh9g9DMX/Screenshot-2025-12-19-163918.png",
      "https://i.postimg.cc/5y1s1RxR/Screenshot-2025-12-19-163935.png",
      "https://i.postimg.cc/8cDZD01X/Screenshot-2025-12-19-163958.png",
      "https://i.postimg.cc/QCsfsy8Z/Screenshot-2025-12-19-164013.png",
      "https://i.postimg.cc/Twntz6XN/Screenshot-2025-12-19-163333.png",
      "https://i.postimg.cc/W305BvPZ/Screenshot-2025-12-19-163301.png",
      "https://i.postimg.cc/zBTxsr1x/Screenshot-2025-12-19-163356.png",
      "https://i.postimg.cc/mD7mvsGX/Screenshot-2025-12-19-163423.png",
      "https://i.postimg.cc/Rh9g9DMQ/Screenshot-2025-12-19-163446.png",
      "https://i.postimg.cc/cCZFZbx0/Screenshot-2025-12-19-164032.png",
      "https://i.postimg.cc/tJ52gNJX/Screenshot-2025-12-19-164107.png",
      "https://i.postimg.cc/sxcw24xs/Screenshot-2025-12-19-164202.png",

    ],
    description: "Contemporary urban township: 1,553 premium apartments, 8 towers (29 floors each), 13 acres, 80% open space, 40+ amenities. Vaastu homes, metro/airport access, spectacular green views.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Sports Facilities",
      "Jogging/Cycling Track",
      "Children’s Park",
      "Indoor Games",
      "Pet Park",
      "Party Hall"
    ],
    specifications: [
      { label: "Total Units", value: "1553 Apartments" },
      { label: "Towers", value: "8 Towers" },
      { label: "Floors", value: "G+29" },
      { label: "Land Area", value: "13 acres" },
      { label: "RERA Approved", value: "Yes" },
    ],
    completionDate: "Nov 2029",
    possession: "Dec 2029"
  },
  {
    id: "op-020",
    slug: "bricks-and-milestones-solcrest",
    title: "Bricks & Milestones Solcrest",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.3461250723067!2d77.6775565743042!3d13.05248286310138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11dc1b4e6483%3A0xc102cecd152c3053!2sSolcrest%20by%20Bricks%20%26%20Milestones!5e1!3m2!1sen!2sin!4v1769515997506!5m2!1sen!2sin",
    location: "Bileshivale Main Road, Rampura, off Hennur Road,Bengaluru",
    city: "bangalore",
    price: "₹1.35 - ₹2.29 Cr ", // ticket-size band from portal listings
    priceValue: 12000000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing", // new launch / under construction
    featured: "Luxury 2, 3, 3.5 & 4BHK ",
    area: "1332 - 2026 sq.ft", // consolidated from size tables
    images: [
      "https://i.postimg.cc/pdB7cm6T/Main-Elevation-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/FHVDN2gW/Master-Plan-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/4xQBsrbw/Aerial-Play-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/kgvfqkFf/Entry-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/6pfYtDLP/Play-Area-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/FHVDN2gq/Pool-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/VkWDm3BW/2BHK-1332-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/FHVDN2gg/2BHK-1347-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/52SnbZq5/3-5BHK-1991-Bricks-and-Milestones-Solcrest.jpg",
      "https://i.postimg.cc/3xFnYPCX/3-5BHK-2000-Bricks-and-Milestones-Solcrest.jpg",



    ],
    description:
      "Bricks & Milestones Solcrest is a 9.3-acre low-density luxury community off Hennur Road with about 650–780 premium 2, 3, 3.5 & 4 BHK apartments, 90% open spaces, signature 180° curved balconies and 100% corner units with no common walls, designed to maximise light, ventilation and long-range green views while staying close to ORR, Horamavu, KR Puram and Bhartiya City.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Indoor Games",
      "Party Hall",
      "Children’s Play Area",
      "Outdoor Sports Courts",
      "Jogging/Walking Track",
      "Landscaped Gardens & Large Green Area",
      "24x7 Security with CCTV & Access Control",
      "Power Backup & 24x7 Water Supply",
      "Pet-friendly Open Spaces (projected – check on-site)",
    ],
    specifications: [
      { label: "Total Units", value: "656 - 780 Apartments" }, // housing vs homznspace ranges
      { label: "Towers", value: "6 Towers" }, // 5 blocks @ housing, 6 towers @ homznspace
      { label: "Floors", value: "2B + G + 18 Floors" },
      { label: "Land Area", value: "9.3 acres" },
      { label: "RERA Approved", value: "Yes" },
      { label: "Project Type", value: "Luxury residential apartments in a gated community" },
    ],
    completionDate: "Nov 2030 (as per RERA)",
    possession: "Nov 2030 onwards "
  },

  {
    id: "op-004",
    slug: "mahindra-lifespace-blossom",
    title: "Mahindra Lifespace Blossom",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d214756.38913928802!2d77.53025793235881!3d13.03608752501275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae0f00551b89c5%3A0x7884fa0d444e36da!2sMahindra%20Blossom!5e1!3m2!1sen!2sin!4v1769512297323!5m2!1sen!2sin", location: "Hope Farm Junction at Whitefield, Bangalore",
    city: "bangalore",
    price: "₹1.3 Cr - ₹2.8 Cr",
    priceValue: 13000000,
    type: "Apartment",
    bhk: "1BHK",
    status: "ongoing",
    featured: "1BHK, 2BHK, 3BHK,3.5BHK, 4BHK",
    area: "625 - 2450 sq.ft",
    images: [
      "https://i.postimg.cc/g0pSNJVX/Whats-App-Image-2025-12-26-at-3-06-56-PM.jpg",
      "https://i.postimg.cc/L4gtgSfX/mahindra-lifespace-logo.jpg",
      "https://i.postimg.cc/HsGQQN4H/mahindra-whitefield-banner-img.jpg",
      "https://i.postimg.cc/HW8w8m5H/mahindra-blossom-living-area.png",
      "https://i.postimg.cc/bYSxSPbY/mahindra-blossom-outdoor-space.png",
      "https://i.postimg.cc/9Xwdw2TQ/mahindra-blossom-whitefield-project.png",
      "https://i.postimg.cc/bNXQQ5Hy/Main-Elevation-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/QNKQKD5C/mahindra-blossom-yoga-deck.png",
      "https://i.postimg.cc/tRn3nbPG/2BHK-Large-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/h4QLQnxW/2BHK-Regular-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/mZ1Y14Mx/3BHK-Large-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/ryR1RT4B/3BHK-Regular-Mahindra-Blossom-Whitefield.jpg",
      "https://i.postimg.cc/05KYKvmv/floorplan-zoom-1.png",
      "https://i.postimg.cc/fWScSsXM/floorplan-zoom-3.png",
      "https://i.postimg.cc/HsGQQN4s/Master-Plan-Mahindra-Blossom-Whitefield.jpg",

    ],
    description:
      "A futuristic residential project by Mahindra Lifespaces near Hopefarm Metro, offering sustainable and tech-integrated living spaces.",
    amenities: [
      "Green Terraces",
      "Swimming Pool",
      "Co-working Lounge",
      "EV Parking",
      "Solar Energy",
      "Smart Access Control",
      "Yoga Pavilion",
      "Kids Pool",
    ],
    specifications: [
      { label: "Total Apartments", value: "733" },
      { label: "Towers", value: "7" },
      { label: "Floors", value: "G+29" },
      { label: "Development Area", value: "9.3 Acres" },
      { label: "Approvals", value: "Yes" },
      { label: "Status", value: "Pre-launch" },
    ],
    completionDate: "Q3 2030",
    possession: "Sep 2030",
  },
  // Godrej Aveline – Yelahanka, North Bangalore
  {
    id: "op-021",
    slug: "godrej-aveline-yelahanka",
    title: "Godrej Aveline",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.481584141133!2d77.60545845520554!3d13.115333590958516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae190025d75c33%3A0x481a0031c4db2584!2sGodrej%20IHP!5e1!3m2!1sen!2sin!4v1773139476078!5m2!1sen!2sin",
    location: "Airport Road, Palanahalli, Yelahanka, North Bangalore",
    city: "bangalore",
    price: "₹2.53 Cr - ₹3.90 Cr",
    priceValue: 28800000,
    type: "Apartment",
    bhk: "3BHK",
    status: "ongoing",
    featured: "3BHK + 2T, 3BHK + 3T, 3.5BHK, 4.5BHK",
    area: "1601 - 2514 sq.ft",
    images: [
  new URL("../components/assets/property/godrej-aveline/Master-Plan-Godrej-Aveline-Yelahanka-1.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/banner2-sm.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/overview-img1.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/mob1.jpeg", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/3BHK-1593-Godrej-Aveline-Yelahanka.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/3BHK-1908-Godrej-Aveline-Yelahanka.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/3BHK-2195-Godrej-Aveline-Yelahanka.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/4BHK-2506-Godrej-Aveline-Yelahanka.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/fthghf.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/virtual_tour.png", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/price_bg_sm.webp", import.meta.url).href,
  new URL("../components/assets/property/godrej-aveline/Provident_logo_final_blacks.png", import.meta.url).href,
],
    description:
      "Godrej Aveline is a premium low-density residential community spread across 10 acres in Yelahanka, North Bangalore. Featuring 849 apartments across 10 towers (3B+G+15), just 4 units per floor for enhanced privacy. Only 500m from Bagalur Metro Station and minutes from NH-44 and Kempegowda International Airport.",
    amenities: [
      "Grand Clubhouse",
      "Swimming Pool",
      "Gymnasium & Yoga Centre",
      "Children's Play Area",
      "Multipurpose Hall",
      "Jogging Track",
      "Landscaped Gardens",
      "Smart Home Systems",
      "EV Charging Points",
      "24/7 Security & CCTV",
      "Rooftop Amenities",
      "Basement Parking",
    ],
    specifications: [
      { label: "Total Units", value: "814 Apartments" },
      { label: "Towers", value: "10 Towers" },
      { label: "Floors", value: "3B + G + 15" },
      { label: "Land Area", value: "10 Acres" },
      { label: "RERA No.", value: "PRM/KA/RERA/1251/309/PR/020326/008501" },
      { label: "Open Space", value: "70% plus" },
      { label: "Units per Floor", value: "4 only" },
    ],
    completionDate: "Dec 2030",
    possession: "Dec 2030 (RERA: Mar 2031)",
  },

  // Sattva City – Hamlet, Chikkajala, North Bangalore
  {
    id: "op-022",
    slug: "sattva-city-hamlet",
    title: "Sattva City – Hamlet",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.4315115699046!2d77.63998567484526!3d13.185066387150279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1f00050c02e5%3A0x82aed0e4b27c49fb!2sSattva%20City!5e1!3m2!1sen!2sin!4v1773139668201!5m2!1sen!2sin",
    location: "International Airport Road, Chikkajala, North Bangalore",
    city: "bangalore",
    price: "₹1.86 Cr - ₹4.15 Cr",
    priceValue: 5500000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing",
    featured: " 2BHK, 2.5BHK, 3BHK, 3BHK, 4BHK",
    area: "1316 - 2244 sq.ft",
    images: [
  new URL("../components/assets/property/sattva-city/Main-Elevation-Sattva-City-Sattva-Hamlet.png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-A-Sattva-City-Sattva-Hamlet.png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-C-Sattva-City-Sattva-Hamlet (1).png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-E-Sattva-City-Sattva-Hamlet (1).png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-G-Sattva-City-Sattva-Hamlet (1).png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-I-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-J-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-K-Sattva-City-Sattva-Hamlet.png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-L-Sattva-City-Sattva-Hamlet (1).png", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-M-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-N-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-Q-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-S-Sattva-City-Sattva-Hamlet.jpg", import.meta.url).href,
  new URL("../components/assets/property/sattva-city/Elevation-T-Sattva-City-Sattva-Hamlet.png", import.meta.url).href,
],
    description:
      "Sattva City – Hamlet is a flagship 53-acre premium township by Sattva Group in Chikkajala, just before the Sadahalli Toll Plaza, North Bangalore. Offering 3,460 luxury apartments across 13 high-rise towers (2B+G+17), with 80% open space, a 50,000 sq.ft clubhouse, rooftop pool, and proximity to Kempegowda International Airport and the upcoming Blue Line Metro.",
    amenities: [
      "50,000 sq.ft Grand Clubhouse",
      "Rooftop Swimming Pool",
      "Banquet Hall & Alfresco Dining",
      "Co-working Zones",
      "Gymnasium",
      "Sports Courts",
      "Landscaped Gardens",
      "Children's Play Area",
      "Pet Park",
      "Jogging & Cycling Track",
      "Shopping Centre (within township)",
      "24/7 Security & CCTV",
    ],
    specifications: [
      { label: "Total Units", value: "3000 + Apartments" },
      { label: "Towers", value: "13 Towers" },
      { label: "Floors", value: "2B + G + 17" },
      { label: "Land Area", value: "53 Acres" },
      { label: "RERA Applied", value: "Yes (Approval Awaited)" },
      { label: "Open Space", value: "80%" },
    ],
    completionDate: "Mar 2032",
    possession: "Mar 2032",
  },

  // Century Attur – Yelahanka New Town, North Bangalore
  {
    id: "op-023",
    slug: "century-attur-yelahanka",
    title: "Century Attur",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.565698620742!2d77.56289557484388!3d13.109731987218444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1900194e596d%3A0x74ebe5083cb5ee4d!2sCentury%20Attur!5e1!3m2!1sen!2sin!4v1773140357482!5m2!1sen!2sin",
    location: "Attur Main Road, Attur Layout, Yelahanka New Town, Bangalore",
    city: "bangalore",
    price: "₹1.09 Cr - ₹1.75 Cr",
    priceValue: 11000000,
    type: "Apartment",
    bhk: "2BHK",
    status: "ongoing",
    featured: "2BHK, 2.5BHK, 3BHK",
    area: "1160 sq.ft. - 1750 sq.ft.",
images: [
  new URL("../components/assets/property/Century-Attur/Elevation-1-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-2-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-3-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-4-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-5-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-6-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
  new URL("../components/assets/property/Century-Attur/Elevation-7-Century-Codename-New-You-Century-Novus.png", import.meta.url).href,
],
    description:
      "Century Attur is a premium pre-launch residential project by Century Real Estate in Yelahanka New Town, North Bangalore. Spread across 15 acres with 14 towers and 800 thoughtfully designed units across 18 floors. Strategically located on Attur Main Road near Attur Lake, with excellent connectivity to NH-44, Manyata Tech Park, and Kempegowda International Airport.",
    amenities: [
      "Grand Clubhouse",
      "Swimming Pool",
      "Gymnasium",
      "Jogging & Cycling Track",
      "Landscaped Gardens",
      "Children's Play Area",
      "Multipurpose Court",
      "Party Hall & Amphitheater",
      "Co-working Space",
      "Business Lounge",
      "Indoor Games Room",
      "24/7 Security & CCTV",
      "Rainwater Harvesting",
    ],
    specifications: [
      { label: "Total Units", value: "458 Apartments" },
      { label: "Towers", value: "6 Towers" },
      { label: "Floors", value: "G + 2B + 19" },
      { label: "Land Area", value: "15.7 Acres" },
      { label: "RERA No.", value: "Coming Soon" },
      { label: "Developer", value: "Century Real Estate" },
    ],
    completionDate: "Mid 2030",
    possession: "June 2030",
  },

  // Birla Trimaya Phase 4 – Devanahalli, North Bangalore
  {
    id: "op-024",
    slug: "birla-trimaya-phase-4",
    title: "Birla Trimaya Phase 4",
    mapEmbedUrl:
     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.41647215431!2d77.6658625748453!3d13.18606248714938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1d000b85990d%3A0x3f31b47f134daf6d!2sTrimaya%20Phase%204%20Birla%20Estate!5e1!3m2!1sen!2sin!4v1773140599530!5m2!1sen!2sin",
    location: "Shettigere Main Road, Before KIAL, Devanahalli, North Bangalore",
    city: "bangalore",
    price: "₹90 Lakh - ₹4.3 Cr",
    priceValue: 11000000,
    type: "Apartment",
    bhk: "1BHK",
    status: "ongoing",
    featured: "1BHK, 2BHK, 3BHK, 4BHK Duplex Villaments",
    area: "824 - 4000 sq.ft",
   images: [
  new URL("../components/assets/property/birla-trimaya/Main-Elevation-Birla-Trimaya-Phase-2.png", import.meta.url).href,
  new URL("../components/assets/property/birla-trimaya/Elevation-B-Birla-Trimaya-Phase-2.png", import.meta.url).href,
  new URL("../components/assets/property/birla-trimaya/Elevation-C-Birla-Trimaya-Phase-2.png", import.meta.url).href,
],
    description:
      "Birla Trimaya Phase 4 is the latest phase of the iconic 52-acre smart township by Birla Estates in Devanahalli, just 2 km from Kempegowda International Airport. Phase 4 offers 548 villa-style duplex apartments across 7 towers (G+14), featuring 1, 2, 3 & 4 BHK homes with private terraces. The township boasts 35+ acres of green open space, a 2.5-acre lake, 45,000 sq.ft clubhouse, and Vaastu-compliant designs.",
    amenities: [
      "45,000 sq.ft Grand Clubhouse",
      "2.5-Acre Lake with Walk-over Bridge",
      "Swimming Pool & Kids Pool",
      "Gymnasium",
      "Jogging Track",
      "Cricket Arena",
      "Indoor Sports & Games",
      "Amphitheater",
      "Fragrance Garden",
      "Children's Play Area",
      "Convenience Retail within Township",
      "EV Charging Stations",
      "24/7 Security & CCTV",
    ],
    specifications: [
      { label: "Total Units (Phase 4)", value: "548 Homes" },
      { label: "Towers", value: "7 Towers" },
      { label: "Floors", value: "G + 14" },
      { label: "Total Township Area", value: "52 Acres" },
      { label: "RERA No.", value: "PRM/KA/RERA/1250/303/PR/290126/008436" },
      { label: "Open Space", value: "73%" },
      { label: "Design by", value: "Broadway Malyan (Architect)" },
    ],
    completionDate: "Dec 2031",
    possession: "Dec 2031",
  },
  {
  id: "op-025",
  slug: "ramky-fortuna-whitefield",
  title: "Ramky Fortuna",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1098.536541425185!2d77.73463605468491!3d13.012390197345635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11d1b88905ed%3A0x3787eb51b47e6150!2sRamky%20Fortuna%20Entrance!5e1!3m2!1sen!2sin!4v1773403147806!5m2!1sen!2sin",
  location: "Whitefield, Near Hoodi Circle, Budigere Cross, Bangalore",
  city: "bangalore",
  price: "₹79 Lakh - ₹2 Cr",
  priceValue: 7900000,
  type: "Apartment",
  bhk: "1BHK",
  status: "ongoing",
  featured: "1BHK, 2BHK, 2.5BHK, 3BHK Apartments",
  area: "624 - 1610 sq.ft",
  images: [
   new URL("../components/assets/property/ramky-fortuna/Face Entry.jpg (1).jpeg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/1 -A.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/1 new (2).png", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/01_1.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/1.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/1bhk 605.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/1bhk 624.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/2_1.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/2.5bhk 1268.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/2bhk 1011.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/3BHK type 1484.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/3BHK type 1610.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/Aerobic-01.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/Aerobic-02.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/Badminton-01.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/Bed-01.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/FORTUNA-amphitheatre-01.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/FORTUNA-amphitheatre-03.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/gameroom-01.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/gameroom-02.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/gym 2.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/gym1.jpg", import.meta.url).href,
  new URL("../components/assets/property/ramky-fortuna/Kids-01_Interactive LightMix.jpg", import.meta.url).href,
],
  description:
    "Ramky Fortuna is a wonderfully enchanting 11-acre residential community by Ramky Group in Whitefield, Bangalore's most sought-after IT corridor. Offering 1, 2, 2.5 & 3 BHK apartments ranging from 624 to 1610 sq.ft, the project features 80% open spaces, a 50,000 sq.ft grand clubhouse, and an Olympic-size swimming pool. With 74% carpet area efficiency, 60+ lifestyle amenities, and possession within one year, Ramky Fortuna is ideal for IT professionals and smart investors seeking high rental demand and long-term value.",
  amenities: [
    "50,000 sq.ft Grand Clubhouse",
    "Olympic-Size Swimming Pool",
    "60+ Lifestyle Amenities",
    "8.5 Acres of Open Green Space",
    "Jogging & Cycling Track",
    "Children's Play Area",
    "Indoor & Outdoor Sports",
    "Gymnasium",
    "Multipurpose Hall",
    "Landscaped Gardens",
    "EV Charging Stations",
    "24/7 Security & CCTV",
    "Visitor Parking",
    "Senior Citizen Zones",
  ],
  specifications: [
    { label: "Land Area", value: "11 Acres" },
    { label: "Typology", value: "1, 2, 2.5, 3 BHK Apartments" },
    { label: "Size Range", value: "624 – 1610 sq.ft" },
    { label: "Carpet Area", value: "74%" },
    { label: "Open Space", value: "80% (8.5 Acres)" },
    { label: "Clubhouse", value: "50,000 sq.ft" },
    { label: "RERA No.", value: "Update with official RERA number" },
  ],
  completionDate: "Within 1 Year",
  possession: "2026",
},


];


// All properties combined
export const allProperties = [...currentProjects, ...ongoingProjects];

// Helper function to filter properties by search query
export const getFilteredProperties = (searchQuery: string = "") => {
  const search = searchQuery.trim().toLowerCase() || "";

  // If no search, show all
  if (!search) return allProperties;

  // Split into keywords and ignore filler words like "by", "of", "the", "in"
  const keywords = search
    .split(" ")
    .filter((w: string) => !["by", "of", "the", "in"].includes(w));

  return allProperties.filter((property) =>
    keywords.some((kw: string) =>
      property.title?.toLowerCase().includes(kw) ||
      property.location?.toLowerCase().includes(kw)
    )
  );
};
export const FEATURED_PROPERTY_IDS = allProperties
  .filter((p) => p.status === "ongoing")
  .sort((a, b) => {
    const numA = parseInt(a.id.replace(/\D/g, ""));
    const numB = parseInt(b.id.replace(/\D/g, ""));
    return numB - numA;
  })
  .slice(0, 6)
  .map((p) => p.id);

// Featured properties (for home page) – call the function when needed
export const featuredProperties = allProperties.filter((property) =>
  FEATURED_PROPERTY_IDS.includes(property.id)
);

