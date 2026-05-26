/**
 * Property-Specific FAQ Data
 * 4 SEO-optimised FAQs per property for use on individual property detail pages.
 * 
 * Usage:
 *   import { getPropertyFaqs, getPropertyFaqSchema } from "@/data/propertyFaqData";
 * 
 *   const faqs = getPropertyFaqs("op-009");           // get 4 FAQs for a property
 *   const schema = getPropertyFaqSchema("op-009");     // get JSON-LD for <script> tag
 */

export type PropertyFaqItem = {
  question: string;
  answer: string;
};

export type PropertyFaqEntry = {
  propertyId: string;   // matches Property.id in properties.ts
  slug: string;         // matches Property.slug
  items: PropertyFaqItem[];
};

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — 4 per property
// ─────────────────────────────────────────────────────────────────────────────

export const propertyFaqData: PropertyFaqEntry[] = [

  // ── up-001 | Godrej Plot Dodaballapur ────────────────────────────────────
  {
    propertyId: "up-001",
    slug: "godrej-plot-dodaballapur",
    items: [
      {
        question: "What is the price of Godrej Plot Dodaballapur and what are the plot sizes available?",
        answer:
          "Godrej Plot Dodaballapur (Aravya Estate) is priced between ₹50 Lakhs and ₹1.2 Crore. Plot sizes range from 1,200 sq.ft to 2,400 sq.ft. Located in Doddaballapur, North Bangalore, it is an upcoming plotted development by Godrej Properties with strong investment potential driven by the proximity to KIADB Industrial Area and the Bangalore–Hyderabad highway.",
      },
      {
        question: "Is Godrej Plot Dodaballapur RERA approved?",
        answer:
          "The RERA approval for Godrej Plot Dodaballapur is currently awaited (Expected). As with all Godrej Properties projects, RERA registration will be completed before the official launch. RealHubb will update the RERA number on the project page as soon as it is available. Buyers are advised to confirm RERA status before booking.",
      },
      {
        question: "When is the possession date for Godrej Plot Dodaballapur?",
        answer:
          "The expected possession for Godrej Plot Dodaballapur is December 2029 (Q4 2029). As a pre-launch plotted project, the possession timeline may be subject to regulatory approvals. RealHubb advisors can keep you updated on the official launch and RERA registration dates.",
      },
      {
        question: "Why should I invest in a plot in Doddaballapur, North Bangalore?",
        answer:
          "Doddaballapur in North Bangalore is emerging as a high-potential investment corridor due to its proximity to Kempegowda International Airport, KIADB Aerospace SEZ, and the proposed Peripheral Ring Road. Plot investments in this micro-market have delivered strong appreciation, and a Godrej-branded plotted community adds developer credibility, legal safety, and modern infrastructure.",
      },
    ],
  },

  // ── up-002 | Century Marathahalli ───────────────────────────────────────
  {
    propertyId: "up-002",
    slug: "century-marathahalli",
    items: [
      {
        question: "What is the price range and configuration for Century Marathahalli?",
        answer:
          "Century Marathahalli offers premium 3 BHK apartments priced between ₹1.1 Crore and ₹2.3 Crore. Apartment sizes range from 1,450 sq.ft to 2,300 sq.ft. The project is upcoming in Marathahalli, one of Bangalore's top IT corridors, with excellent connectivity to Whitefield, Outer Ring Road, and Sarjapur.",
      },
      {
        question: "Is Century Marathahalli RERA registered?",
        answer:
          "The RERA registration for Century Marathahalli is currently awaited. Century Real Estate is a reputed Bangalore-based developer with a strong track record of RERA-compliant projects. RealHubb will publish the RERA number once officially registered. Buyers should confirm RERA status before making any payment.",
      },
      {
        question: "What are the key amenities at Century Marathahalli?",
        answer:
          "Century Marathahalli offers a premium lifestyle with amenities including a Sky Garden, Swimming Pool, Smart Security, Gymnasium, Kids Zone, Party Hall, Library, and Rooftop Lounge. The project comprises 5 towers of 20 floors each with 500 total units, designed for tech professionals seeking a premium urban lifestyle.",
      },
      {
        question: "When is possession for Century Marathahalli and who is the developer?",
        answer:
          "The expected possession for Century Marathahalli is June 2028 (Q2 2028). The project is developed by Century Real Estate, one of Bangalore's most established and trusted developers with decades of experience in delivering quality residential projects across the city.",
      },
    ],
  },

  // ── up-003 | Godrej Hoskote ─────────────────────────────────────────────
  {
    propertyId: "up-003",
    slug: "godrej-hoskote",
    items: [
      {
        question: "What is the price and configuration of Godrej Hoskote?",
        answer:
          "Godrej Hoskote offers 2 BHK and 3 BHK Premium and Luxe apartments priced between ₹1.17 Crore and ₹1.95 Crore. Apartment sizes range from 1,050 sq.ft to 1,750 sq.ft, spread across 13.5 acres with 1,130 total units across 5 towers of 2B+G+28 floors.",
      },
      {
        question: "Why is Hoskote considered a good investment location in Bangalore?",
        answer:
          "Hoskote is a rapidly growing eastern corridor of Bangalore with strong infrastructure development, proximity to Whitefield and the IT belt, connectivity via NH-75, and planned industrial growth under KIADB. Property prices in Hoskote are currently lower than established Bangalore micro-markets, making it an attractive early-investment opportunity with strong appreciation potential.",
      },
      {
        question: "Is Godrej Hoskote RERA approved and what is the possession date?",
        answer:
          "RERA approval for Godrej Hoskote is awaited (pre-launch stage). The expected possession date is March 2030 (Q1 2030). Godrej Properties has a consistent track record of RERA compliance and timely delivery. RealHubb will update the official RERA number upon registration.",
      },
      {
        question: "What amenities does Godrej Hoskote offer?",
        answer:
          "Godrej Hoskote features a Clubhouse, Walking Track, Solar Power infrastructure, Community Garden, Children's Park, Security Cabin, Basketball Court, and Amphitheater. The project is designed as a self-sufficient gated community with modern amenities and sustainable features across 13.5 acres.",
      },
    ],
  },

  // ── up-004 / op-004 | Mahindra Lifespace Blossom ────────────────────────
  {
    propertyId: "up-004",
    slug: "mahindra-lifespace-blossom",
    items: [
      {
        question: "What is the price range and configurations available at Mahindra Blossom Whitefield?",
        answer:
          "Mahindra Blossom at Hopefarm Junction, Whitefield offers 1 BHK, 2 BHK, 3 BHK, 3.5 BHK, and 4 BHK apartments priced from ₹1.3 Crore to ₹2.8 Crore. Apartment sizes range from 625 sq.ft to 2,450 sq.ft. The project spans 9.3 acres with 733 apartments across 7 towers of G+29 floors.",
      },
      {
        question: "Where is Mahindra Blossom located and why is Whitefield a good location?",
        answer:
          "Mahindra Blossom is located at Hopefarm Junction, Whitefield — adjacent to the Hopefarm Channasandra Metro Station (Purple Line). Whitefield is Bangalore's premier IT corridor, home to major tech parks, EPIP Zone, and ITPL. The area offers excellent connectivity, strong rental demand, and consistent property price appreciation, making it one of the best locations for both end-use and investment.",
      },
      {
        question: "What are the key features and amenities at Mahindra Blossom Whitefield?",
        answer:
          "Mahindra Blossom offers a tech-integrated, sustainable living experience with Green Terraces, Swimming Pool, Co-working Lounge, EV Parking, Solar Energy systems, Smart Access Control, Yoga Pavilion, and a Kids Pool. The project is designed by Mahindra Lifespaces with a focus on sustainability, smart home features, and green building standards.",
      },
      {
        question: "When is possession for Mahindra Blossom and is it RERA approved?",
        answer:
          "Mahindra Blossom Whitefield is currently in pre-launch stage with RERA approval in place. The expected possession is September 2030 (Q3 2030). Mahindra Lifespaces is a reputed national developer known for timely delivery, sustainability-focused projects, and RERA compliance across all its developments.",
      },
    ],
  },

  // ── op-005 | Winds of Change by CKPC ────────────────────────────────────
  {
    propertyId: "op-005",
    slug: "winds-of-change-by-ckpc",
    items: [
      {
        question: "What is the price and configuration of Winds of Change by CKPC in Yelahanka?",
        answer:
          "Winds of Change by CKPC offers 2 BHK, 3 BHK, and 4 BHK apartments priced from ₹1.15 Crore to ₹2.41 Crore. Apartment sizes range from 1,206 sq.ft to 2,300 sq.ft. The project comprises 438 units across 9 towers of G+6 floors, spread across 2.5 acres in Yelahanka, North Bangalore.",
      },
      {
        question: "Is Winds of Change by CKPC RERA approved?",
        answer:
          "Yes. Winds of Change by CKPC is RERA approved. CKPC Properties is an established Bangalore developer with a strong track record. The RERA number is available on the project listing page and can be independently verified at rera.karnataka.gov.in.",
      },
      {
        question: "Why is Yelahanka a good location to buy property in Bangalore?",
        answer:
          "Yelahanka in North Bangalore is a fast-growing residential corridor with excellent connectivity to Kempegowda International Airport (15–20 km), BIAL Tech Park, Manyata Tech Park, and the city centre via NH-44. It offers cleaner air, wider roads, and newer infrastructure compared to central Bangalore, making it attractive for families and professionals seeking quality of life.",
      },
      {
        question: "What amenities and possession date does Winds of Change CKPC offer?",
        answer:
          "Winds of Change features a Clubhouse, Swimming Pool, Gymnasium, Children's Play Area, Landscaped Gardens, 24/7 Security, Amphitheater, and Co-working Space. The expected possession is March 2029 (Q1 2029). Contact a RealHubb advisor to check current construction progress and available units.",
      },
    ],
  },

  // ── op-006 | TVS Auralis ─────────────────────────────────────────────────
  {
    propertyId: "op-006",
    slug: "tvs-auralis",
    items: [
      {
        question: "What is the price and size of apartments at TVS Auralis on Kanakapura Road?",
        answer:
          "TVS Auralis on Kanakapura Road, Bangalore offers 2 BHK, 3 BHK, and 4 BHK luxury apartments priced from ₹1.4 Crore to ₹2.6 Crore. Apartment sizes range from 1,700 sq.ft to 2,600 sq.ft across 5 towers of 20 floors with 400 total units.",
      },
      {
        question: "Who is the developer of TVS Auralis and is it RERA approved?",
        answer:
          "TVS Auralis is developed by TVS Emerald, the real estate arm of the reputed TVS Group — one of India's most trusted industrial conglomerates. Yes, TVS Auralis is RERA approved. The RERA number is available on the project page and can be verified at rera.karnataka.gov.in.",
      },
      {
        question: "What luxury amenities does TVS Auralis offer?",
        answer:
          "TVS Auralis offers a premium lifestyle with an Infinity Pool, Yoga Deck, Smart Home Systems, Jogging Track, Multipurpose Hall, EV Charging Stations, Indoor Games Zone, and a Banquet Hall. The project is designed for discerning buyers who value both connectivity and serene, resort-style living.",
      },
      {
        question: "When is possession for TVS Auralis and is Kanakapura Road a good investment?",
        answer:
          "TVS Auralis possession is expected in June 2027 (Q2 2027). Kanakapura Road is one of Bangalore's most promising investment corridors, driven by the Namma Metro Green Line extension, expanding IT parks, NICE Road connectivity, and growing social infrastructure. Property values here have shown consistent appreciation over the past 5 years.",
      },
    ],
  },

  // ── op-007 | Ramky Lumina ────────────────────────────────────────────────
  {
    propertyId: "op-007",
    slug: "ramky-lumina",
    items: [
      {
        question: "What are the apartment sizes, prices, and configurations at Ramky Lumina?",
        answer:
          "Ramky Lumina on Hosa Road, South Bangalore offers 1 BHK, 2 BHK, and 3 BHK smart homes priced from ₹1.2 Crore to ₹2.8 Crore. Sizes range from 1,050 sq.ft to 1,533 sq.ft. The project comprises 729 units across 6 towers of 2B+G+14 floors on 7 acres.",
      },
      {
        question: "Is Ramky Lumina RERA approved and when is possession?",
        answer:
          "Yes. Ramky Lumina is RERA approved. The expected possession is September 2026 (Q3 2026), making it one of the nearer-term delivery options among ongoing Bangalore projects. Ramky Group is a reputed Hyderabad-based developer with a strong delivery track record across South India.",
      },
      {
        question: "What makes Ramky Lumina stand out in South Bangalore?",
        answer:
          "Ramky Lumina offers 40+ lifestyle amenities on 7 acres including a Swimming Pool, Kids Pool, Yoga & Meditation Deck, Wellness Garden, Calisthenics Gym, Pickle Ball Court, Futsal Court, Cricket Pitch, Skating Rink, and unique recreational features like Giant Chess and Giant Ludo — making it one of the most amenity-rich projects in the Hosa Road micro-market.",
      },
      {
        question: "Why is Hosa Road considered a good location to buy property in Bangalore?",
        answer:
          "Hosa Road in South Bangalore connects Electronic City, Sarjapur, and Bommasandra — major IT employment hubs. The corridor benefits from proximity to Infosys, Wipro, and Biocon campuses, strong rental demand from IT professionals, relatively affordable pricing compared to Whitefield, and rapid infrastructure development including flyovers and road widening projects.",
      },
    ],
  },

  // ── op-008 | Mana Vista ──────────────────────────────────────────────────
  {
    propertyId: "op-008",
    slug: "mana-vista",
    items: [
      {
        question: "What is the price and configuration at Mana Vista on Sarjapur Road?",
        answer:
          "Mana Vista on Sarjapur Road, Bangalore offers 2 BHK, 3 BHK, and 3 BHK+3T apartments priced from ₹1.24 Crore to ₹1.72 Crore. Apartment sizes range from 1,127 sq.ft to 1,563 sq.ft. The project has 440 units across 3 towers of G+14 floors on 2.5 acres.",
      },
      {
        question: "What unique features does Mana Vista offer?",
        answer:
          "Mana Vista offers serene lake views, modern architecture, and a resort-like lifestyle in Sarjapur's green zone. Key amenities include a Lake View Deck, Jogging Trail, Sky Lounge, Swimming Pool, Banquet Space, Sports Arena, Kids Zone, and a Pet Park. All units are Vastu compliant. It is RERA approved with possession expected June 2027.",
      },
      {
        question: "Is Sarjapur Road a good location for buying property in Bangalore?",
        answer:
          "Yes. Sarjapur Road is one of Bangalore's most sought-after residential corridors, strategically located between Whitefield, Electronic City, and HSR Layout. It is home to major IT parks and has strong rental demand from tech professionals. Property values have appreciated significantly over the last decade and are projected to continue growing with upcoming infrastructure projects.",
      },
      {
        question: "Who is the developer of Mana Vista and is it reliable?",
        answer:
          "Mana Vista is developed by Mana Projects, a Bangalore-based developer known for quality construction, innovative design, and multiple successful residential deliveries in the Sarjapur–Whitefield corridor. The project is RERA approved. RealHubb can share details of Mana's delivered projects for your reference.",
      },
    ],
  },

  // ── op-009 | Sobha Neopolis ──────────────────────────────────────────────
  {
    propertyId: "op-009",
    slug: "sobha-neopolis",
    items: [
      {
        question: "What is the price per sq.ft and apartment sizes at Sobha Neopolis?",
        answer:
          "Sobha Neopolis is priced at ₹13,666 per sq.ft and offers ultra-luxury 1 BHK, 3 BHK, 3.5 BHK, and 4 BHK apartments ranging from 2,700 sq.ft to 4,000 sq.ft. Located near Marathahalli on Varthur Panathur Road, this Greek-themed luxury enclave by Sobha Limited is one of the most premium residential projects in East Bangalore.",
      },
      {
        question: "Why is Sobha Neopolis considered ultra-luxury and who is it for?",
        answer:
          "Sobha Neopolis is designed for discerning buyers seeking ultra-luxury living. It features a Temperature Controlled Pool, Private Theater, Concierge Service, Fitness Studio, Lounge Bar, Smart Home Access, Golf Putting Zone, and 24/7 Security across 19 wings on 2B+G+18 floors with 1,875 units. It is ideal for senior IT professionals, HNIs, and NRI investors seeking a premium address in Bangalore.",
      },
      {
        question: "Is Sobha Neopolis RERA approved and what is the possession timeline?",
        answer:
          "Yes. Sobha Neopolis is RERA approved. Possession is staggered from Mid-2026 through End-2027, with some units ready for handover sooner. Sobha Limited is one of India's most reliable developers with a track record of delivering projects on or ahead of schedule — a major confidence factor for buyers.",
      },
      {
        question: "What is the investment potential of Sobha Neopolis in Bangalore?",
        answer:
          "Sobha Neopolis sits in East Bangalore's prime tech belt — minutes from Whitefield, EPIP Zone, and Varthur Kodi. Sobha-branded luxury properties historically command strong resale premiums and rental yields. With unit sizes starting at 2,700 sq.ft, this project targets a niche luxury segment with limited comparable supply, making it a strong long-term investment with capital appreciation potential.",
      },
    ],
  },

  // ── op-010 | Mana Dale ───────────────────────────────────────────────────
  {
    propertyId: "op-010",
    slug: "mana-dale",
    items: [
      {
        question: "What are the apartment sizes and price range at Mana Dale, Sarjapur Road?",
        answer:
          "Mana Dale at Kodathi, off Sarjapur Road offers 3 BHK-2T and 3 BHK-3T apartments priced from ₹1.2 Crore to ₹2.5 Crore. Apartment sizes range from 1,482 sq.ft to 1,823 sq.ft. The project has 682 units across 4 blocks of G+29 floors on 6.39 acres with possession expected December 2027.",
      },
      {
        question: "What resort-style amenities does Mana Dale offer?",
        answer:
          "Mana Dale is designed around a resort lifestyle with the Largest Clubhouse in its segment, Amphitheater, Wellness Spa, Jogging Trail, Infinity Pool, Café Lounge, Sports Zone, and EV Charging. Set amidst 6.39 acres of green landscape, it offers nature-inspired living with modern conveniences in Bangalore's fastest-growing Sarjapur–Kodathi belt.",
      },
      {
        question: "Is Mana Dale RERA approved and who is the developer?",
        answer:
          "Yes. Mana Dale is RERA approved and developed by Mana Projects, one of Bangalore's trusted residential developers known for quality finishes and innovative design across the Sarjapur–Whitefield corridor. Their previous projects have strong owner satisfaction ratings.",
      },
      {
        question: "How is the location of Mana Dale (Kodathi, Sarjapur Road) for daily commute?",
        answer:
          "Mana Dale at Kodathi sits on Sarjapur Road — one of Bangalore's most connected IT corridors. It provides easy access to Wipro, Infosys, and RMZ Ecoworld campuses, HSR Layout, Electronic City via Sarjapur Road, and the Outer Ring Road. The area is also close to top schools, hospitals, and retail centres, making it ideal for families.",
      },
    ],
  },

  // ── op-011 | Godrej Regal Pavilion ──────────────────────────────────────
  {
    propertyId: "op-011",
    slug: "godrej-regal-pavilion",
    items: [
      {
        question: "What is the price and configuration at Godrej Regal Pavilion, Hyderabad?",
        answer:
          "Godrej Regal Pavilion in Rajendra Nagar, Hyderabad offers 3 BHK, 3.5 BHK, 4 BHK, and 4 BHK Large apartments priced from ₹2.32 Crore to ₹3.02 Crore. Apartment sizes range from 1,873 sq.ft to 3,572 sq.ft. The project spans 12.51 acres with 2,000+ units across 9 towers of G+32 and G+33 floors.",
      },
      {
        question: "Is Godrej Regal Pavilion RERA approved in Hyderabad?",
        answer:
          "Yes. Godrej Regal Pavilion is RERA approved under Telangana RERA. The RERA number can be verified at rera.telangana.gov.in. Godrej Properties is one of India's most trusted listed developers with a 100% RERA-compliance track record across all its projects nationwide.",
      },
      {
        question: "Why is Rajendra Nagar, Hyderabad a good location to invest?",
        answer:
          "Rajendra Nagar is a premium residential micro-market in South Hyderabad, well-connected to the Financial District, Gachibowli, HITEC City, and the Outer Ring Road. The area benefits from excellent social infrastructure, proximity to top schools and hospitals, and strong demand from IT and government professionals. Property values here have appreciated steadily alongside Hyderabad's overall real estate boom.",
      },
      {
        question: "What amenities does Godrej Regal Pavilion offer and when is possession?",
        answer:
          "Godrej Regal Pavilion features a Sky Clubhouse, Swimming Pool, Fitness Studio, Meditation Deck, Indoor Games, Jogging Park, Solar Lighting, and 24x7 Power Backup across 12.51 acres of sheer luxury. Possession is expected September 2029 (Q3 2029).",
      },
    ],
  },

  // ── op-012 | Living Tree by Kalyani ─────────────────────────────────────
  {
    propertyId: "op-012",
    slug: "kalyani-living-tree",
    items: [
      {
        question: "What is the price and configuration at Kalyani Living Tree in Bagalur, North Bangalore?",
        answer:
          "Kalyani Living Tree at KIADB Aerospace Park, Bagalur offers 3 BHK Smart and 3 BHK Luxe apartments priced from ₹78.39 Lakhs to ₹1.73 Crore. Apartment sizes range from 1,316 sq.ft to 1,927 sq.ft. This is a large-scale project with 2,522 homes across 10 towers of G+30 floors, spread across 25 acres.",
      },
      {
        question: "Why is Bagalur (Aerospace Park) in North Bangalore worth investing in?",
        answer:
          "Bagalur sits in the heart of the KIADB Aerospace & Defence SEZ — one of India's fastest-developing industrial and tech corridors near Bangalore International Airport. Major companies like HAL, Boeing, and Airbus have operations nearby. With proximity to the airport, planned infrastructure upgrades, and entry-level pricing compared to other Bangalore micro-markets, Bagalur offers excellent early-investment potential.",
      },
      {
        question: "Is Kalyani Living Tree RERA approved and when is possession?",
        answer:
          "Yes. Kalyani Living Tree is RERA approved. Possession is expected December 2029 (Q4 2029). Kalyani Developers is a reputed Bangalore-based developer with multiple successfully delivered residential projects. Their Living Tree project stands out for its 25-acre green campus and value pricing in North Bangalore.",
      },
      {
        question: "What are the amenities and highlights of Kalyani Living Tree?",
        answer:
          "Kalyani Living Tree is set across 25 acres with 10 towers and features a 25-Acre Green Zone, Kids Park, Fitness Arena, Sky Decks, Sports Hub, EV Charging, Spa & Yoga, and Mini Theater. With 2,522 homes and a large community, residents enjoy township-level amenities at competitive pricing for the North Bangalore market.",
      },
    ],
  },

  // ── op-013 | Aratt Alchemy Essence ──────────────────────────────────────
  {
    propertyId: "op-013",
    slug: "aratt-alchemy-essence",
    items: [
      {
        question: "What is the price and size of apartments at Aratt Alchemy Essence, Hennur Road?",
        answer:
          "Aratt Alchemy Essence at Doddagubbi, off Hennur Main Road, Bangalore offers 2 BHK and 3 BHK apartments priced from ₹1.16 Crore to ₹1.67 Crore. Apartment sizes range from 1,201 sq.ft to 1,754 sq.ft. The project has 188 apartments across 2 towers of 2B+G+9 floors on 2.5 acres.",
      },
      {
        question: "Is Aratt Alchemy Essence RERA approved?",
        answer:
          "Yes. Aratt Alchemy Essence is RERA approved. The RERA number is available on the project listing page and can be verified at rera.karnataka.gov.in. Aratt Builders is a Bangalore-based developer known for quality residential projects in the North and East Bangalore corridors.",
      },
      {
        question: "Why is the Hennur Road corridor popular for buying apartments in Bangalore?",
        answer:
          "Hennur Road connects Kalyanagar, HBR Layout, and Thanisandra — providing easy access to Manyata Tech Park, Hebbal, Outer Ring Road, and the airport. It is a well-established residential belt with strong social infrastructure (schools, hospitals, malls) and consistent rental demand from IT professionals. Pricing here remains attractive compared to Whitefield and Sarjapur.",
      },
      {
        question: "What amenities does Aratt Alchemy Essence offer and when is possession?",
        answer:
          "Aratt Alchemy Essence features a Clubhouse, Landscaped Gardens, Gymnasium, Swimming Pool, Recreation Rooms, Outdoor Sports Courts, Children's Play Area, Amphitheater, Party Hall, and 24/7 Security. Possession is expected from 2030 onwards. Contact RealHubb advisors for current construction updates and available configurations.",
      },
    ],
  },

  // ── op-014 | Sumadhura Tea & Twilight ────────────────────────────────────
  {
    propertyId: "op-014",
    slug: "sumadhura-tea-and-twilight",
    items: [
      {
        question: "What is the price range and configuration at Sumadhura Tea & Twilight, Whitefield?",
        answer:
          "Sumadhura Tea & Twilight at Siddapura, Whitefield offers 2 BHK, 3 BHK, and 4 BHK British-themed luxury apartments priced from ₹1.83 Crore to ₹3.28 Crore. Apartment sizes range from 1,280 sq.ft to 2,295 sq.ft. The project has 1,650 units across 11 towers of 2B+G+18 floors on a sprawling 20-acre community.",
      },
      {
        question: "What makes Sumadhura Tea & Twilight unique among Whitefield projects?",
        answer:
          "Sumadhura Tea & Twilight stands out with its British architectural theme, 150+ amenities, 16 distinctively themed gardens, and a massive 66,000 sq.ft Grand Clubhouse. The 20-acre community offers Swimming Pool, Spa, Yoga Room, Party Lawn, and extensive landscaping — offering a rare resort-lifestyle experience at a Whitefield address.",
      },
      {
        question: "Is Sumadhura Tea & Twilight RERA approved?",
        answer:
          "Yes. Sumadhura Tea & Twilight is RERA approved. Sumadhura Group is a reputed Bangalore developer with a strong portfolio of residential projects. The RERA details are available on the project listing page and can be independently verified at rera.karnataka.gov.in.",
      },
      {
        question: "Is Whitefield (Siddapura) a good investment location?",
        answer:
          "Whitefield is Bangalore's most established IT hub, home to EPIP Zone, ITPL, and numerous MNC campuses. Siddapura sits within the Whitefield micro-market, offering excellent connectivity to the Whitefield Metro Station (Purple Line), Sarjapur Road, and the Outer Ring Road. Properties in this belt command premium rental yields and strong resale demand.",
      },
    ],
  },

  // ── op-015 | Mana The Right Life ────────────────────────────────────────
  {
    propertyId: "op-015",
    slug: "mana-the-right-life",
    items: [
      {
        question: "What is the price range and BHK configuration at Mana The Right Life?",
        answer:
          "Mana The Right Life (Mana Skanda) on Sarjapur Varthur Road, Bangalore offers 3 BHK and 3.5 BHK apartments priced from ₹1.97 Crore to ₹2.75 Crore. Apartment sizes range from 1,661 sq.ft to 2,244 sq.ft. Phase 1 has 687 units across 9 towers of 3B+G+34 floors on 31 acres, part of a larger 100-acre township.",
      },
      {
        question: "What makes Mana The Right Life a family-friendly township?",
        answer:
          "Mana The Right Life is conceptualised as a child-centric, family-first township spanning 100 acres (Phase 1: 32 acres). With 84% open area, curated parks, Cycling Track, Jogging Track, Kids Pool, Yoga Deck, World-Class Gym, and multiple Party Halls, it is designed around healthy, active, and community-oriented family living — rare at this scale in Bangalore.",
      },
      {
        question: "Is Mana The Right Life RERA approved and when is possession?",
        answer:
          "Yes. Mana The Right Life is RERA approved. Possession is expected from December 2028 onwards. Mana Projects is a trusted Bangalore-based developer with a proven track record of quality delivery in the Sarjapur–Whitefield corridor.",
      },
      {
        question: "How is the connectivity from Mana The Right Life to IT hubs?",
        answer:
          "Mana The Right Life is on Sarjapur Varthur Road, placing it within easy reach of Whitefield, RMZ Ecoworld, Wipro and Infosys campuses, HSR Layout, and the Outer Ring Road. The township's scale and location make it one of the most strategic addresses for IT professionals working in East and South Bangalore.",
      },
    ],
  },

  // ── op-016 | Brigade Gateway Neopolis ───────────────────────────────────
  {
    propertyId: "op-016",
    slug: "brigade-gateway-neopolis",
    items: [
      {
        question: "What is the price and configuration at Brigade Gateway Neopolis, Hyderabad?",
        answer:
          "Brigade Gateway Neopolis at Kokapet, Hyderabad offers ultra-premium 4 BHK, 5 BHK, and Sky Duplex residences priced from ₹4.6 Crore onwards. Apartment sizes range from 3,067 sq.ft to 9,859 sq.ft. This is a landmark mixed-use development by Brigade Group featuring luxury homes, World Trade Center offices, InterContinental Hotel, and Orion Mall on 9.7 acres.",
      },
      {
        question: "Why is Kokapet (Financial District) Hyderabad's most prime investment location?",
        answer:
          "Kokapet in the Hyderabad Financial District is the city's most prestigious business and residential address, home to Google, Microsoft, Amazon, and hundreds of MNC campuses. Property values here have more than doubled in the last 5 years. Brigade Gateway Neopolis in Kokapet offers a rare mixed-use address in this ultra-prime corridor — making it one of the most compelling luxury investment opportunities in South India.",
      },
      {
        question: "Is Brigade Gateway Neopolis RERA approved in Telangana?",
        answer:
          "Yes. Brigade Gateway Neopolis is RERA approved under Telangana RERA and can be verified at rera.telangana.gov.in. Brigade Group is a Bangalore-listed developer with decades of experience in delivering large-format, mixed-use developments across Bangalore, Hyderabad, and Chennai.",
      },
      {
        question: "What lifestyle does Brigade Gateway Neopolis offer?",
        answer:
          "Brigade Gateway Neopolis delivers a truly integrated lifestyle — residents have world-class retail (Orion Mall), 5-star hotel (InterContinental), premium offices (World Trade Center), Clubhouse, Swimming Pool, Landscaped Gardens, Fitness Center, and 24/7 Security — all within the same development. Possession is expected 2029.",
      },
    ],
  },

  // ── op-017 | Sobha Town Park ─────────────────────────────────────────────
  {
    propertyId: "op-017",
    slug: "sobha-town-park",
    items: [
      {
        question: "What is the price range and configurations at Sobha Town Park on Hosur Road?",
        answer:
          "Sobha Town Park on Hosur Road, Attibele offers 1 BHK, 2 BHK, 3 BHK, and 4 BHK apartments priced from ₹90 Lakhs to ₹4.10 Crore. Apartment sizes range from 753 sq.ft to 2,800 sq.ft. Phase 3 has 560 apartments across 5 towers of 1B+G+37/38 floors on 7.24 acres, part of a larger 33-acre New York-themed ultra-luxury township.",
      },
      {
        question: "What is the New York theme at Sobha Town Park and what amenities are available?",
        answer:
          "Sobha Town Park is inspired by New York's urban living aesthetic — offering a Cricket Ground, Multi-Sport Courts, Lap & Leisure Pools, Camping Grounds, Forest Grove, and multiple Clubhouses across a 33-acre master-planned community with 2,104 total residences. It is designed for buyers who want flagship Sobha quality with township-scale amenities.",
      },
      {
        question: "Is Sobha Town Park RERA approved and when is Phase 3 possession?",
        answer:
          "Yes. Sobha Town Park is RERA approved. Phase 1 possession is expected December 2027; the full project completes by June 2033. Sobha Limited is one of India's most trusted developers, known for in-house construction, consistent quality, and reliable delivery timelines across all its projects.",
      },
      {
        question: "Is Hosur Road, Attibele a good location to buy property in Bangalore?",
        answer:
          "Hosur Road (SH-17) connecting Bangalore to Hosur/Tamil Nadu is a strategic South Bangalore corridor adjacent to Electronic City, home to Infosys, Wipro, and hundreds of IT and manufacturing companies. Attibele falls just beyond BBMP limits, offering more affordable entry points, clean surroundings, and rapidly improving infrastructure. It is ideal for end-use buyers working in Electronic City and long-term investors.",
      },
    ],
  },

  // ── op-018 | Sattva Lumina ───────────────────────────────────────────────
  {
    propertyId: "op-018",
    slug: "sattva-lumina",
    items: [
      {
        question: "What is the price and configuration at Sattva Lumina, Yelahanka?",
        answer:
          "Sattva Lumina at Rajanukunte, Yelahanka, Bengaluru offers Studio, 1 BHK, 2 BHK, 3 BHK+2T, and 3 BHK+3T apartments priced from ₹41 Lakhs to ₹1.85 Crore. Apartment sizes range from 434 sq.ft to 1,823 sq.ft. The project has 1,553 units across 8 towers of G+29 floors on 13 acres with 80% open space.",
      },
      {
        question: "What are the highlights of Sattva Lumina and why is it good value?",
        answer:
          "Sattva Lumina is developed by Sattva Group — one of Bangalore's most prolific and reputed developers. The project offers 40+ amenities, Vastu-compliant homes, metro and airport connectivity, a Clubhouse, Sports Facilities, Pet Park, Jogging/Cycling Track, and spectacular green views. With studio apartments starting at ₹41 Lakhs in a prime North Bangalore address, it offers exceptional value for first-time buyers and investors.",
      },
      {
        question: "Is Sattva Lumina RERA approved and when is possession?",
        answer:
          "Yes. Sattva Lumina is RERA approved. Possession is expected December 2029. Sattva Group has delivered 80+ million sq.ft of real estate across India and is known for reliable delivery timelines and consistent construction quality.",
      },
      {
        question: "How well-connected is Sattva Lumina in Yelahanka?",
        answer:
          "Sattva Lumina at Rajanukunte sits close to Yelahanka, offering excellent connectivity to Kempegowda International Airport (approx. 15 km), Manyata Tech Park, BIAL Aerospace SEZ, and the Outer Ring Road. The upcoming Metro Phase 2 extension to Yelahanka further strengthens the location's long-term value and commute convenience.",
      },
    ],
  },

  // ── op-019 | Prestige Spring Heights ────────────────────────────────────
  {
    propertyId: "op-019",
    slug: "prestige-spring-heights",
    items: [
      {
        question: "What is the price range and configuration at Prestige Spring Heights, Hyderabad?",
        answer:
          "Prestige Spring Heights at Rajendra Nagar, Budvel, Hyderabad offers 3 BHK+2T/3T and 4 BHK+3T/4T luxury apartments with sizes ranging from 1,571 sq.ft to 3,233 sq.ft. The project is by Prestige Group — one of India's most trusted real estate developers. Contact a RealHubb advisor for the latest pricing details.",
      },
      {
        question: "Why is Rajendra Nagar (Budvel), Hyderabad a premium location?",
        answer:
          "Rajendra Nagar in South Hyderabad is a well-established premium residential neighbourhood close to the Financial District, Gachibowli, HITEC City, and the Outer Ring Road. Budvel specifically offers clean surroundings, proximity to major IT employers, good schools, hospitals, and consistent property value appreciation — all hallmarks of a strong residential investment.",
      },
      {
        question: "Is Prestige Spring Heights RERA approved in Telangana?",
        answer:
          "Yes. Prestige Spring Heights is RERA approved under Telangana RERA, verifiable at rera.telangana.gov.in. Prestige Group is a Bangalore Stock Exchange-listed developer with one of the most trusted brand names in Indian real estate and a strong presence in Hyderabad.",
      },
      {
        question: "What amenities does Prestige Spring Heights offer?",
        answer:
          "Prestige Spring Heights offers a Clubhouse, Swimming Pool, Sports Facilities, Jogging/Cycling Track, Children's Park, Indoor Games, Pet Park, and Party Hall — delivering the premium lifestyle experience expected from a Prestige-branded development in one of Hyderabad's finest locations.",
      },
    ],
  },

  // ── op-020 | Bricks & Milestones Solcrest ───────────────────────────────
  {
    propertyId: "op-020",
    slug: "bricks-and-milestones-solcrest",
    items: [
      {
        question: "What is the price range and BHK configuration at Bricks & Milestones Solcrest, Hennur Road?",
        answer:
          "Bricks & Milestones Solcrest on Bileshivale Main Road, off Hennur Road, Bangalore offers luxury 2 BHK, 3 BHK, 3.5 BHK, and 4 BHK apartments priced from ₹1.35 Crore to ₹2.29 Crore. Apartment sizes range from 1,332 sq.ft to 2,026 sq.ft across 6 towers of 2B+G+18 floors on 9.3 acres, with 656–780 total units.",
      },
      {
        question: "What makes Solcrest unique — what is special about its design?",
        answer:
          "Bricks & Milestones Solcrest is designed as a low-density luxury community with 90% open spaces, signature 180° curved balconies, and 100% corner units — meaning no flat shares a common wall with another. Every apartment maximises natural light, cross-ventilation, and long-range green views. With only 6 towers on 9.3 acres, it offers a rare sense of space and privacy in Bangalore.",
      },
      {
        question: "Is Bricks & Milestones Solcrest RERA approved and when is possession?",
        answer:
          "Yes. Solcrest is RERA approved with a possession date of November 2030 as per RERA. Bricks & Milestones is a Bangalore-based developer focused on boutique, quality residential projects. The RERA number can be verified at rera.karnataka.gov.in.",
      },
      {
        question: "How is the location of Solcrest (off Hennur Road) for connectivity and investment?",
        answer:
          "Solcrest is located on Bileshivale Main Road, off Hennur Road — providing excellent access to Manyata Tech Park (approx. 8 km), Outer Ring Road, Horamavu, KR Puram, and Bhartiya City. The Hennur Road corridor has seen strong appreciation driven by IT demand and infrastructure growth. Solcrest's low-density design and quality positioning make it a compelling mid-premium investment in this belt.",
      },
    ],
  },
  // Godrej Aveline – Yelahanka, North Bangalore
{
  propertyId: "op-021",
  slug: "godrej-aveline-yelahanka",
  items: [
    {
      question: "What is the price range and BHK configuration at Godrej Aveline, Yelahanka?",
      answer:
        "Godrej Aveline on Airport Road, Palanahalli, Yelahanka, North Bangalore offers premium 3 BHK and 4.5 BHK apartments priced from ₹2.53 Crore to ₹3.90 Crore. Configurations include 3BHK+2T, 3BHK+3T, 3.5BHK, and 4.5BHK with sizes ranging from 1,601 sq.ft to 2,514 sq.ft across 10 towers of 3B+G+15 floors on 10 acres, with 814 total units.",
    },
    {
      question: "What makes Godrej Aveline unique — what is special about its design?",
      answer:
        "Godrej Aveline is designed as a premium low-density residential community with only 4 units per floor, offering exceptional privacy rarely found in Bangalore high-rises. Spread across 10 acres with 70%+ open space, the project features a grand clubhouse, rooftop amenities, smart home systems, and EV charging points. With just 814 apartments across 10 towers, residents enjoy an exclusive, uncrowded living experience.",
    },
    {
      question: "Is Godrej Aveline RERA approved and when is possession?",
      answer:
        "Yes. Godrej Aveline is RERA approved with registration number PRM/KA/RERA/1251/309/PR/020326/008501. The possession date is December 2030 as per project timelines, with RERA completion date of March 2031. Godrej Properties is one of India's most trusted real estate brands with a consistent track record of on-time delivery. The RERA number can be verified at rera.karnataka.gov.in.",
    },
    {
      question: "How is the location of Godrej Aveline in Yelahanka for connectivity and investment?",
      answer:
        "Godrej Aveline is located just 500m from Bagalur Metro Station and minutes from NH-44 and Kempegowda International Airport — making it one of the best-connected residential addresses in North Bangalore. The Airport Road corridor is among Bangalore's fastest-appreciating micro-markets, driven by aerospace, IT, and logistics growth. Godrej's brand premium and the location's airport proximity make this a strong long-term investment.",
    },
  ],
},

// Sattva City – Hamlet, Chikkajala, North Bangalore
{
  propertyId: "op-022",
  slug: "sattva-city-hamlet",
  items: [
    {
      question: "What is the price range and BHK configuration at Sattva City Hamlet, Chikkajala?",
      answer:
        "Sattva City – Hamlet on International Airport Road, Chikkajala, North Bangalore offers 2 BHK, 2.5 BHK, 3 BHK, and 4 BHK apartments priced from ₹1.86 Crore to ₹4.15 Crore. Apartment sizes range from 1,316 sq.ft to 2,244 sq.ft across 13 high-rise towers of 2B+G+17 floors on a 53-acre flagship township with 3,000+ total units.",
    },
    {
      question: "What makes Sattva City Hamlet unique — what is special about this township?",
      answer:
        "Sattva City – Hamlet is a flagship 53-acre integrated township by the Sattva Group, one of Bangalore's most reputed developers. With 80% open space, a 50,000 sq.ft grand clubhouse, rooftop swimming pool, banquet hall, co-working zones, pet park, and an in-township shopping centre, it offers a self-sufficient lifestyle rarely available at this price point. The sheer scale and amenity depth make it one of North Bangalore's most compelling township projects.",
    },
    {
      question: "Is Sattva City Hamlet RERA approved and when is possession?",
      answer:
        "Sattva City – Hamlet has RERA approval applied and is currently awaiting formal registration. Possession is targeted for March 2032. Sattva Group has a strong delivery track record across Bangalore with multiple completed township projects. Buyers are advised to verify the RERA status at rera.karnataka.gov.in before booking. RealHubb will keep clients updated on registration status.",
    },
    {
      question: "How is the location of Sattva City Hamlet in Chikkajala for connectivity and investment?",
      answer:
        "Sattva City – Hamlet is located just before the Sadahalli Toll Plaza on International Airport Road, Chikkajala — offering direct access to Kempegowda International Airport and the upcoming Blue Line Metro. The North Bangalore corridor around the airport has seen consistent 15–20% appreciation driven by aerospace parks, IT SEZs, and improved infrastructure. A 53-acre township by Sattva at this location represents significant long-term value.",
    },
  ],
},

// Century Attur – Yelahanka New Town, North Bangalore
{
  propertyId: "op-023",
  slug: "century-attur-yelahanka",
  items: [
    {
      question: "What is the price range and BHK configuration at Century Attur, Yelahanka New Town?",
      answer:
        "Century Attur on Attur Main Road, Yelahanka New Town, Bangalore offers 2 BHK, 2.5 BHK, and 3 BHK apartments priced from ₹1.09 Crore to ₹1.75 Crore. Apartment sizes range from 1,160 sq.ft to 1,750 sq.ft across 6 towers of G+2B+19 floors on 15.7 acres with 458 total units.",
    },
    {
      question: "What makes Century Attur unique — what is special about its design?",
      answer:
        "Century Attur is a premium pre-launch project by Century Real Estate on Attur Main Road, adjacent to Attur Lake in Yelahanka New Town. With 15.7 acres, 6 towers, a grand clubhouse, co-working space, business lounge, amphitheater, and rainwater harvesting, it blends modern amenities with a green, lake-facing setting. The pre-launch pricing offers early investors compelling value in an established Yelahanka residential neighbourhood.",
    },
    {
      question: "Is Century Attur RERA approved and when is possession?",
      answer:
        "Century Attur's RERA registration is coming soon — the project is in its pre-launch phase. Possession is targeted for June 2030. Century Real Estate is a Bangalore-based developer with a strong portfolio of delivered residential projects. Buyers are advised to confirm RERA registration at rera.karnataka.gov.in prior to booking. RealHubb will update clients as soon as the RERA number is published.",
    },
    {
      question: "How is the location of Century Attur in Yelahanka New Town for connectivity and investment?",
      answer:
        "Century Attur is located on Attur Main Road in Yelahanka New Town — offering excellent connectivity to NH-44, Manyata Tech Park, and Kempegowda International Airport. The Yelahanka micro-market is a well-established residential hub with strong social infrastructure including schools, hospitals, and malls. The lake-adjacent location, pre-launch pricing, and Century's brand reputation combine to make this a strong mid-segment investment opportunity.",
    },
  ],
},

// Birla Trimaya Phase 4 – Devanahalli, North Bangalore
{
  propertyId: "op-024",
  slug: "birla-trimaya-phase-4",
  items: [
    {
      question: "What is the price range and BHK configuration at Birla Trimaya Phase 4, Devanahalli?",
      answer:
        "Birla Trimaya Phase 4 on Shettigere Main Road, Devanahalli, North Bangalore offers 1 BHK, 2 BHK, 3 BHK, and 4 BHK Duplex Villaments priced from ₹90 Lakh to ₹4.3 Crore. Apartment sizes range from 824 sq.ft to 4,000 sq.ft across 7 towers of G+14 floors with 548 total units in this phase, as part of the 52-acre Birla Trimaya smart township.",
    },
    {
      question: "What makes Birla Trimaya Phase 4 unique — what is special about its design?",
      answer:
        "Birla Trimaya Phase 4 introduces villa-style duplex apartments with private terraces — a product type rarely available in Bangalore at sub-₹2 Crore entry points. Designed by international architects Broadway Malyan, the township features a 2.5-acre lake with a walk-over bridge, 45,000 sq.ft clubhouse, cricket arena, fragrance garden, and 73% open space across 52 acres. Vaastu-compliant layouts and Birla Estates' quality construction further distinguish this project.",
    },
    {
      question: "Is Birla Trimaya Phase 4 RERA approved and when is possession?",
      answer:
        "Yes. Birla Trimaya Phase 4 is RERA approved with registration number PRM/KA/RERA/1250/303/PR/290126/008436. Possession is targeted for December 2031. Birla Estates, part of the Aditya Birla Group, is among India's most credible real estate brands with a strong commitment to quality and timely delivery. The RERA number can be verified at rera.karnataka.gov.in.",
    },
    {
      question: "How is the location of Birla Trimaya Phase 4 in Devanahalli for connectivity and investment?",
      answer:
        "Birla Trimaya Phase 4 is located just 2 km from Kempegowda International Airport on Shettigere Main Road, Devanahalli — one of Bangalore's most strategically positioned micro-markets. The area benefits from the BIAL Aerospace SEZ, IT Investment Region, and upcoming infrastructure including metro connectivity. Airport-adjacent properties in Devanahalli have historically appreciated 18–25% over 5-year cycles. Birla's brand, the villa-duplex product, and the airport proximity make this a high-conviction investment.",
    },
  ],
},
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the 4 FAQs for a specific property by its id or slug.
 * Returns an empty array if no FAQs are defined for that property.
 *
 * @example
 *   const faqs = getPropertyFaqs("op-009");
 *   const faqs = getPropertyFaqs("sobha-neopolis");
 */
export const getPropertyFaqs = (idOrSlug: string): PropertyFaqItem[] => {
  const entry = propertyFaqData.find(
    (e) => e.propertyId === idOrSlug || e.slug === idOrSlug
  );
  return entry?.items ?? [];
};

/**
 * Get JSON-LD FAQPage schema for a specific property (for SEO).
 * Drop the returned object into a <script type="application/ld+json"> tag.
 *
 * @example
 *   const schema = getPropertyFaqSchema("op-009");
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export const getPropertyFaqSchema = (idOrSlug: string) => {
  const items = getPropertyFaqs(idOrSlug);
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};