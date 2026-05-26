export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
};

export const faqData: FaqCategory[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. ABOUT REALHUBB
  // ─────────────────────────────────────────────────────────────
  {
    id: "general",
    title: "About RealHubb",
    icon: "🏠",
    items: [
      {
        question: "What is RealHubb?",
        answer:
          "RealHubb is a trusted real estate advisory platform helping homebuyers discover verified residential projects across Bangalore, Hyderabad, and Chennai. We provide expert guidance, transparent information, and end-to-end support — from shortlisting the right property to completing your purchase.",
      },
      {
        question: "Is RealHubb a broker or a developer?",
        answer:
          "RealHubb is neither a broker nor a developer. We are an authorized channel partner for reputed developers like Prestige, Brigade, Godrej, Sobha, Mahindra Lifespaces, and more. We work exclusively in the interest of buyers, and you are never charged any brokerage or commission.",
      },
      {
        question: "Is RealHubb a reliable platform for buying property?",
        answer:
          "Yes. RealHubb works only with RERA-registered developers and verified projects. Our advisors are trained to give unbiased guidance so you make a fully informed decision. We have helped hundreds of buyers across Bangalore, Hyderabad, and Chennai find the right property.",
      },
      {
        question: "Which cities does RealHubb operate in?",
        answer:
          "RealHubb currently operates in Bangalore (Bengaluru), Hyderabad, and Chennai — three of India's fastest-growing real estate markets. We cover key micro-markets including Electronic City, Yelahanka, Whitefield, Sarjapur, Gachibowli, HITEC City, OMR, Perungudi, and more.",
      },
      {
        question: "Which developers does RealHubb partner with?",
        answer:
          "We are authorized channel partners for leading developers including Prestige Group, Brigade Group, Godrej Properties, Sobha Limited, Mahindra Lifespaces, CKPC Properties, and several other RERA-approved builders. All projects listed on RealHubb are verified and legally compliant.",
      },
      {
        question: "Why should I buy property through RealHubb?",
        answer:
          "Buying through RealHubb gives you access to verified listings, expert advisory, exclusive developer offers, and site visit assistance — at zero cost to you. Unlike traditional brokers, we charge no brokerage to buyers and are compensated by developers only.",
      },
      {
        question: "Does RealHubb charge any fee to buyers?",
        answer:
          "No. RealHubb's advisory, consultation, property comparisons, and site visit coordination are completely free for buyers. We are compensated by the developer once a successful booking is made. There is no hidden charge to the buyer at any stage.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. PROJECTS & LISTINGS
  // ─────────────────────────────────────────────────────────────
  {
    id: "projects",
    title: "Projects & Listings",
    icon: "🏗️",
    items: [
      {
        question: "What types of residential projects are available on RealHubb?",
        answer:
          "RealHubb features apartments, villas, luxury homes, and plotted developments from reputed builders across Bangalore, Hyderabad, and Chennai. We list projects across 1 BHK, 2 BHK, 3 BHK, and 4 BHK configurations in budget, mid-range, and luxury segments.",
      },
      {
        question: "Does RealHubb list pre-launch and new launch projects?",
        answer:
          "Yes. RealHubb features pre-launch, new launch, and ready-to-move properties. Pre-launch projects typically offer lower prices, better unit selection, and flexible payment plans. Our advisors keep you updated on the latest launches so you never miss early-mover benefits.",
      },
      {
        question: "What is the price range for properties listed on RealHubb?",
        answer:
          "Properties on RealHubb range from approximately ₹40 Lakhs to ₹5+ Crores, catering to first-time buyers, upgrade buyers, and investors across all budget segments.",
      },
      {
        question: "Can I download a project brochure, floor plans, and price sheet?",
        answer:
          "Yes. Each project page includes floor plans, brochures, price details, carpet area breakdowns, and amenity lists. You can also request these directly from your RealHubb advisor.",
      },
      {
        question: "What is the difference between carpet area, built-up area, and super built-up area?",
        answer:
          "Carpet area is the actual usable floor area inside your flat — the area you can 'carpet'. Built-up area includes the carpet area plus the thickness of walls and columns. Super built-up area (also called saleable area) adds a proportionate share of common areas like lobbies, staircases, and corridors. Developers price flats based on super built-up area, but RERA mandates all pricing disclosures to be in carpet area terms.",
      },
      {
        question: "What is the difference between ready-to-move and under-construction properties?",
        answer:
          "Ready-to-move (RTM) properties have received the Occupancy Certificate (OC), are available for immediate possession, attract no GST, and carry lower risk. Under-construction properties are at various stages of building — they are typically priced lower, offer flexible payment plans, and allow early unit selection, but carry delivery timeline risk. RealHubb helps you weigh both options based on your needs.",
      },
      {
        question: "What should I check when comparing two projects?",
        answer:
          "Key factors to compare include: RERA registration status, developer track record, location and connectivity, price per sq. ft. (carpet area basis), amenities, construction quality, possession timeline, payment plan, maintenance charges, and resale/rental potential. RealHubb advisors provide a structured comparison across all these parameters.",
      },
      {
        question: "Are there any ongoing offers or discounts on listed projects?",
        answer:
          "Yes. Developers periodically offer launch pricing, flexible payment plans, EMI subvention schemes, GST waivers, or added value like parking and modular kitchens. RealHubb keeps track of all active offers and ensures you benefit from the best available deal at the time of your booking.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. BUYING PROCESS
  // ─────────────────────────────────────────────────────────────
  {
    id: "process",
    title: "Buying Process",
    icon: "🔑",
    items: [
      {
        question: "How do I start my property search on RealHubb?",
        answer:
          "Browse our verified project listings by city or locality. Once you find a project of interest, submit an enquiry. A dedicated RealHubb advisor will contact you, understand your requirements — budget, location preference, BHK type — and help you shortlist the best options.",
      },
      {
        question: "How can I schedule a site visit?",
        answer:
          "You can book a site visit directly through the project page or by contacting our advisory team via phone or WhatsApp. We coordinate the visit at your convenience — completely free of charge.",
      },
      {
        question: "Is there any charge for consultations or site visits?",
        answer:
          "Absolutely not. Site visits, advisory consultations, project comparisons, and all guidance provided by RealHubb are completely free for buyers.",
      },
      {
        question: "Can RealHubb help first-time homebuyers?",
        answer:
          "Yes. RealHubb provides dedicated guidance to first-time homebuyers — helping you understand property pricing, loan eligibility, documentation, legal compliance, and project comparisons. Our goal is to make the process as simple and stress-free as possible.",
      },
      {
        question: "What is the step-by-step process for buying a property through RealHubb?",
        answer:
          "The typical process is: (1) Submit enquiry and speak with your advisor. (2) Shortlist projects based on your requirements. (3) Attend site visits. (4) Finalise the project and unit. (5) Pay the booking amount. (6) Sign the Sale Agreement and pay as per the payment plan. (7) Apply for a home loan (if needed). (8) Complete the sale deed registration. (9) Take possession. RealHubb supports you at every step.",
      },
      {
        question: "What happens after I book a property?",
        answer:
          "After booking, our team assists you with documentation, agreement review, home loan coordination, and follow-up with the developer. We remain your point of contact throughout the post-booking phase to ensure a smooth and stress-free experience.",
      },
      {
        question: "Can I negotiate the price of a property listed on RealHubb?",
        answer:
          "For new launch and under-construction projects, prices are generally fixed by the developer. However, RealHubb advisors often have access to exclusive pricing, waived charges, or added inclusions (like free parking or club membership) that are not publicly available. Our team will negotiate on your behalf wherever possible.",
      },
      {
        question: "What is a booking amount, and is it refundable?",
        answer:
          "The booking amount is an initial payment (typically ₹1–5 Lakhs depending on the project) made to reserve a specific unit. Refund policies vary by developer and are governed by the terms in the Sale Agreement. RealHubb advisors ensure you understand the cancellation and refund terms before you commit.",
      },
      {
        question: "How long does it take to complete the buying process?",
        answer: "The timeline can vary widely based on the type of property (ready-to-move vs under-construction), loan processing time, and registration process. On average, it can take anywhere from 3 to 6 months from booking to possession for ready-to-move properties, and 1 to 3 years for under-construction projects. RealHubb keeps you informed about expected timelines at every stage.",
      },
      {
        question: "What is EOI (Expression of Interest) and how does it work?",
        answer: "EOI is a non-binding indication of your interest in a project, allowing you to receive updates and priority communication about that project. It does not require any payment or commitment. You can submit an EOI for any project on RealHubb to stay informed about launch dates, price changes, and exclusive offers.",
      },
      
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. COSTS & HIDDEN CHARGES
  // ─────────────────────────────────────────────────────────────
  {
    id: "costs",
    title: "Costs & Hidden Charges",
    icon: "💰",
    items: [
      {
        question: "What are the total costs involved in buying a property in Bangalore?",
        answer:
          "Beyond the base property price, a buyer typically pays: GST (5% on under-construction non-affordable / 1% for affordable housing — nil for RTM with OC), Stamp Duty (3%–5.6% in Bangalore depending on property value), Registration Charges (1%), maintenance deposit, car parking charges, club membership, and legal/documentation fees. RealHubb advisors give you a complete cost breakup upfront so there are no surprises.",
      },
      {
        question: "What is stamp duty in Bangalore and how much is it?",
        answer:
          "Stamp duty is a government tax paid when registering a property in your name. In Bangalore (Karnataka), stamp duty ranges from 2% to 5.6% of the property's market value depending on the property value and location. For properties above ₹45 Lakhs in BBMP areas, the effective rate is 5.6% (5% base + 10% cess + 2% surcharge). You can calculate it at the Kaveri Online Services portal.",
      },
      {
        question: "What are property registration charges in Bangalore?",
        answer:
          "Registration charges in Bangalore are 1% of the property's market value, paid at the Sub-Registrar's Office. This fee covers the administrative cost of recording the title deed. Both stamp duty and registration charges can be paid online via the Kaveri portal or offline at the SRO.",
      },
      {
        question: "Can I claim a tax deduction on stamp duty and registration charges?",
        answer:
          "Yes. Under Section 80C of the Income Tax Act, you can claim a deduction of up to ₹1.5 Lakh per year for stamp duty and registration charges paid. This benefit is available only for your first residential property and must be claimed in the same financial year the payment was made.",
      },
      {
        question: "What is GST on property purchase?",
        answer:
          "GST applies only to under-construction properties bought from a builder. The rates are: 1% for affordable housing (carpet area ≤60 sq.m in metro cities, price ≤₹45 Lakhs) and 5% for non-affordable under-construction properties. Ready-to-move-in flats with an Occupancy Certificate (OC) are completely exempt from GST. Resale properties are also exempt from GST.",
      },
      {
        question: "Is GST applicable if I buy a ready-to-move flat?",
        answer:
          "No. Ready-to-move flats that have received an Occupancy Certificate (OC) or Completion Certificate (CC) are exempt from GST. You only pay stamp duty and registration charges. This makes RTM properties more cost-effective from a tax standpoint.",
      },
      {
        question: "What are maintenance charges and when do I start paying them?",
        answer:
          "Maintenance charges are monthly fees paid to the Residents' Welfare Association (RWA) for upkeep of common areas, security, lifts, landscaping, and other shared facilities. Some developers collect an advance maintenance deposit at the time of possession. Charges vary by project — typically ₹2–5 per sq. ft. per month. Make sure to ask about maintenance charges before booking.",
      },
      {
        question: "Are car parking charges included in the base price?",
        answer:
          "Not always. Some developers include one covered car parking space in the base price, while others charge it separately (typically ₹3–8 Lakhs per slot for covered parking in Bangalore). Clarify this with your RealHubb advisor before booking so it's factored into your total budget.",
      },
      {
        question: "What is a Preferential Location Charge (PLC)?",
        answer:
          "PLC is an additional charge levied by developers for units in preferred positions — such as higher floors, corner units, park-facing, or pool-facing flats. PLC can range from ₹50 to ₹300+ per sq. ft. depending on the project and preference type. Your RealHubb advisor will highlight which units attract PLC so you can budget accordingly.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. RERA & LEGAL
  // ─────────────────────────────────────────────────────────────
  {
    id: "rera",
    title: "RERA & Legal",
    icon: "📋",
    items: [
      {
        question: "Are all projects listed on RealHubb RERA approved?",
        answer:
          "Yes. Every project listed on RealHubb is RERA (Real Estate Regulatory Authority) approved. We only partner with projects legally compliant under Karnataka RERA, Telangana RERA, and Tamil Nadu RERA, ensuring full transparency and buyer protection.",
      },
      {
        question: "What is RERA and why does it matter for buyers?",
        answer:
          "RERA is a Government of India act that regulates the real estate sector and protects homebuyers. Developers must register their projects, disclose project details publicly, and adhere to promised timelines. Buying a RERA-registered project protects you against delays, fraud, and misleading claims.",
      },
      {
        question: "How can I verify a project's RERA number?",
        answer:
          "Each project's RERA number is listed on our project page. You can verify it independently on: rera.karnataka.gov.in (Bangalore), rera.telangana.gov.in (Hyderabad), and tnrera.in (Chennai).",
      },
      {
        question: "What is an Occupancy Certificate (OC) and why is it important?",
        answer:
          "An Occupancy Certificate (OC) is issued by the local municipal authority confirming that the building has been constructed as per approved plans and is safe for occupation. You should not take possession of a flat without an OC — it is essential for getting a home loan, registering the property, connecting utilities, and avoiding GST.",
      },
      {
        question: "What is an Encumbrance Certificate (EC)?",
        answer:
          "An Encumbrance Certificate is an official document confirming that a property is free from any legal dues, mortgages, loans, or disputes. It is a critical document for property purchase and home loan applications. RealHubb ensures that all listed projects have clear title and can assist you in obtaining the EC.",
      },
      {
        question: "What legal documents should I check before buying a property?",
        answer:
          "Key documents to verify include: RERA registration certificate, title deed (clear and marketable title), Encumbrance Certificate (EC), approved building plan, commencement certificate, occupancy certificate (for RTM), sale agreement, and the builder's track record. RealHubb advisors guide you through every document.",
      },
      {
        question: "What is a Khata certificate and when do I need it?",
        answer:
          "A Khata is a Bangalore-specific document issued by BBMP (or Panchayat) that records a property for tax assessment purposes. An A-Khata (BBMP limits) confirms the property is legally constructed and compliant. It is required for property registration, mutation, and utility connections. RealHubb verifies Khata status for all listed Bangalore projects.",
      },
      {
        question: "What should I check about the developer before buying?",
        answer:
          "Check the developer's track record: past project delivery timelines, construction quality, RERA compliance history, customer reviews, and financial stability. RealHubb only partners with developers who have demonstrated reliability. Our advisors can share detailed profiles of any developer before you commit.",
      },
      {
        question: "Can I back out after signing the Sale Agreement?",
        answer:
          "You can withdraw, but the developer may deduct a portion of the amount paid as per the cancellation clause in the Sale Agreement. Under RERA, developers must specify clearly the terms for cancellation and refunds. Always read the Sale Agreement carefully before signing — RealHubb advisors can help you review the key clauses.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. HOME LOAN & EMI
  // ─────────────────────────────────────────────────────────────
  {
    id: "loan",
    title: "Home Loan & EMI",
    icon: "🏦",
    items: [
      {
        question: "Does RealHubb help with home loans?",
        answer:
          "Yes. RealHubb has a dedicated home loan assistance team that helps you check eligibility, compare rates across SBI, HDFC, ICICI, Axis, Kotak, and more, prepare documentation, and coordinate with lenders for faster approvals.",
      },
      {
        question: "Which banks and NBFCs does RealHubb work with?",
        answer:
          "We work with all major banks and housing finance companies including SBI, HDFC, ICICI Bank, Axis Bank, Kotak Mahindra Bank, PNB Housing Finance, LIC Housing Finance, and others. Our team identifies the lender with the best terms for your profile.",
      },
      {
        question: "How much home loan can I get?",
        answer:
          "Most banks offer up to 75%–90% of the property value as a home loan, depending on the property price. The actual loan amount depends on your income, CIBIL score, existing liabilities, and employer profile. RealHubb's loan team can run a quick eligibility check for you before you shortlist properties.",
      },
      {
        question: "What is the minimum CIBIL score needed for a home loan?",
        answer:
          "Most banks require a CIBIL score of 700 or above for home loan approval. A score of 750+ gives you better negotiating power on interest rates. If your score is lower, our team can guide you on steps to improve it before applying.",
      },
      {
        question: "What is the down payment required to buy a property?",
        answer:
          "Banks typically finance 75%–90% of the property value, meaning you need to arrange 10%–25% of the property cost as a down payment from your own funds. Note that stamp duty, registration, GST, and other charges are generally not covered by home loans and must be paid separately.",
      },
      {
        question: "Can I use the EMI calculator before deciding on a property?",
        answer:
          "Yes. Our advisors walk you through an EMI estimate based on your loan amount, tenure, and current interest rates, giving you a clear picture of your monthly commitment. You can also use the EMI calculator tool on our website.",
      },
      {
        question: "Is home loan approval guaranteed through RealHubb?",
        answer:
          "Loan approvals are subject to the eligibility criteria set by the bank or NBFC. Our team maximises your chances by helping prepare a strong application, resolving documentation issues, and connecting you with the most suitable lender.",
      },
      {
        question: "What is an EMI subvention scheme?",
        answer:
          "An EMI subvention (or pre-EMI waiver) scheme is a payment plan offered by some developers where the developer pays your loan EMIs on your behalf until possession. This means you don't bear any EMI burden during the construction period. RealHubb highlights all projects offering such schemes.",
      },
      {
        question: "What documents are required for a home loan application?",
        answer:
          "Typically required: identity proof (Aadhaar, PAN, passport), address proof, last 3 months' salary slips, last 6 months' bank statements, latest ITR (2 years), Form 16, property documents (allotment letter, sale agreement), and photographs. Self-employed applicants need additional income proof and business documents.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. INVESTMENT & MARKET
  // ─────────────────────────────────────────────────────────────
  {
    id: "investment",
    title: "Investment & Market",
    icon: "📈",
    items: [
      {
        question: "Is now a good time to invest in Bangalore, Hyderabad, or Chennai real estate?",
        answer:
          "All three cities are among India's top-performing real estate markets. Bangalore continues to see strong demand from the IT sector. Hyderabad has delivered consistent price appreciation in Gachibowli, HITEC City, and the Financial District. Chennai's OMR and suburban belts are growing steadily. Our advisors can give you city-specific market insights aligned with your investment goals.",
      },
      {
        question: "Which areas of Bangalore offer the best investment potential?",
        answer:
          "Currently high-potential corridors in Bangalore include: North Bangalore (Hebbal, Yelahanka, Devanahalli — driven by airport and tech parks), East Bangalore (Whitefield, Sarjapur Road, Marathahalli — IT hubs), South Bangalore (Electronic City, Begur, Bannerghatta Road), and West Bangalore (Rajaji Nagar, Yeshwantpur). Your best option depends on budget, purpose (end-use vs investment), and tenure.",
      },
      {
        question: "Do new launch projects offer better pricing than ready-to-move ones?",
        answer:
          "Typically yes. Pre-launch and new launch projects are priced lower with better unit selection and flexible payment plans. Ready-to-move properties are priced higher but offer no GST, zero delivery risk, and immediate possession. Our advisors help you weigh both based on your timeline and goals.",
      },
      {
        question: "Can NRIs buy property through RealHubb?",
        answer:
          "Yes. NRIs can legally purchase residential property in India (except agricultural land). RealHubb assists NRI buyers with project selection, legal documentation, power of attorney, NRI home loan coordination, and end-to-end communication. We have helped many NRI clients from the US, UK, UAE, and Singapore.",
      },
      {
        question: "What is the expected rental yield on apartments in Bangalore?",
        answer:
          "Rental yields in Bangalore typically range from 2.5% to 4% per year depending on the location, project type, and BHK configuration. Areas with high IT workforce concentration — like Whitefield, Electronic City, and Hebbal — tend to offer stronger rental demand. Our advisors can estimate rental potential for specific projects.",
      },
      {
        question: "Is it better to buy a 2 BHK or 3 BHK for investment?",
        answer:
          "2 BHK apartments generally offer higher rental demand, faster resale, and better liquidity in Bangalore, Hyderabad, and Chennai. 3 BHKs command higher absolute rental income but cater to a narrower tenant pool. For investment purposes, 2 BHKs in well-connected areas tend to be safer; 3 BHKs are better suited for end-use or premium investment. Our advisors tailor recommendations to your specific goals.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. POSSESSION & AFTER HANDOVER
  // ─────────────────────────────────────────────────────────────
  {
    id: "possession",
    title: "Possession & Handover",
    icon: "🏡",
    items: [
      {
        question: "What should I check at the time of possession?",
        answer:
          "Before accepting possession, inspect: flooring, walls, doors, windows, and fixtures for defects; plumbing connections and water pressure; electrical fittings and switchboards; car parking allocation; common area amenities completion; and most importantly — confirm the Occupancy Certificate (OC) is available. Never accept possession without an OC.",
      },
      {
        question: "What is a possession letter and why does it matter?",
        answer:
          "A possession letter is an official document from the developer handing over possession of the flat to you. It is a legally important document for property registration, home loan final disbursement, and insurance purposes. RealHubb assists you in reviewing the possession letter before you sign it.",
      },
      {
        question: "What can I do if the developer delays possession?",
        answer:
          "Under RERA, developers are legally obligated to deliver possession by the promised date. If delayed, buyers are entitled to interest compensation at SBI MCLR + 2% for every month of delay, or a full refund with interest. RealHubb can guide you on your rights and help escalate to the developer if needed.",
      },
      {
        question: "What happens at property registration?",
        answer:
          "Property registration is the legal process of recording the sale deed at the Sub-Registrar's Office (SRO) in your name. Both buyer and seller (or their authorised representatives) must be present. You'll need to pay stamp duty and registration charges at this stage. After verification, the registered sale deed is issued within 15–20 working days.",
      },
      {
        question: "What is property mutation and do I need it?",
        answer:
          "Mutation is the process of updating the property ownership records in the local municipal authority's (BBMP/Panchayat) records after registration. It is important for paying property tax in your name and for future resale. RealHubb can guide you through the mutation process after possession.",
      },
      {
        question: "What kind of after-sales support does RealHubb provide?",
        answer:
          "Our relationship doesn't end at booking. RealHubb assists with possession-related queries, coordinates with the developer on snag resolution, supports you through the registration process, and remains your point of contact for any post-purchase assistance.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. SUPPORT & CONTACT
  // ─────────────────────────────────────────────────────────────
  {
    id: "support",
    title: "Support & Contact",
    icon: "🤝",
    items: [
      {
        question: "How can I contact RealHubb?",
        answer:
          "You can reach us through the enquiry form on realhubb.in, via phone, or through WhatsApp. Our advisors are available Monday to Saturday, 9 AM to 7 PM IST. We aim to respond to all enquiries within a few hours.",
      },
      {
        question: "What if I am not satisfied with the options shown to me?",
        answer:
          "We encourage honest feedback. If the options don't match your requirements, let your advisor know and we'll reassess and curate a fresh set of recommendations. Our goal is to find you the right property — even if it takes multiple rounds of shortlisting.",
      },
      {
        question: "Can I speak to an advisor before visiting any project?",
        answer:
          "Absolutely. In fact, we recommend it. A pre-visit call with your RealHubb advisor helps align your requirements, set realistic expectations, and makes your site visit far more productive. You can schedule a call anytime via phone or WhatsApp.",
      },
      {
        question: "Does RealHubb assist with resale properties?",
        answer:
          "RealHubb primarily focuses on new residential projects from reputed developers. If you are looking for resale or secondary market properties, our advisors can guide you to relevant resources. However, our core strength lies in new, RERA-approved project advisory.",
      },
      {
        question: "Can RealHubb help me if I want to sell my existing property?",
        answer:
          "RealHubb's primary focus is helping buyers discover and purchase new residential projects. For selling existing properties, we recommend connecting with a licensed real estate agent in your area. However, our advisors can offer general guidance on market pricing and timing.",
      },
    ],
  },
];