/**
 * Chatbot Widget Component
 * Sticky chatbot button available on all pages
 */

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type LeadStep =
  | "INTRO"
  | "ASK_INTENT"
  | "ASK_LOCATION"
  | "ASK_BUDGET"
  | "ASK_BHK"
  | "ASK_TIMELINE"
  | "ASK_NAME"
  | "ASK_PHONE"
  | "ASK_EMAIL"
  | "LEAD_DONE"
  | "FAQ_ONLY";

interface LeadData {
  intent: string;
  location: string;
  budget: string;
  bhk: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
}

// helper for matching
const normalize = (str: string) => str.toLowerCase().trim();

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text:
        "Hi! I'm your virtual assistant from RealHubb.\n\nI can help you with:\n- Finding the best projects for your budget\n- Property investments & EMIs\n- Details about our services and careers\n\nTo get started, tell me if you want to buy a home, invest, or just ask questions.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [leadStep, setLeadStep] = useState<LeadStep>("INTRO");
  const [leadData, setLeadData] = useState<LeadData>({
    intent: "",
    location: "",
    budget: "",
    bhk: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
  });

  // new: count how many user questions (messages) have been asked
  const [userQuestionCount, setUserQuestionCount] = useState(0);
  // new: flag when user has clicked “Share my details”
  const [leadPromptClicked, setLeadPromptClicked] = useState(false);

  // FAQ + project Q&A pairs (add more as needed)
  const faqPairs: { match: string[]; answer: string }[] = [
    // ==== GENERAL ABOUT REALHUBB ====
    {
      match: ["what is realhubb", "about realhubb", "who are you", "realhubb ventures"],
      answer:
        "RealHubb Ventures Pvt. Ltd. is a customer‑centric real estate channel partner based in Bangalore, helping buyers and investors with verified, RERA‑aligned properties and transparent, end‑to‑end services.",
    },
    {
      match: ["how long", "years of experience", "since how many years"],
      answer:
        "RealHubb’s leadership has over 17 years of experience in real estate with a strong track record across Bangalore and other major markets.",
    },
    {
      match: ["how many properties", "how many clients", "track record"],
      answer:
        "RealHubb has successfully handled thousands of property transactions and supported a large base of happy clients across multiple projects.",
    },
    {
      match: ["where is realhubb", "office location", "office address"],
      answer:
        "Our office is at Ground Floor, 243, 9th Main Road, HRBR Layout 1st Block, Kalyan Nagar, Bengaluru, Karnataka 560043.",
    },
    {
      match: ["timing", "working hours", "office hours"],
      answer:
        "We are available Monday to Sunday, roughly 10:00 AM to 6:00 PM for calls and office visits, and email support is available 24/7.",
    },

    // ==== SERVICES & PROCESS ====
    {
      match: ["what services", "services do you provide", "what do you do"],
      answer:
        "We help with property consultation, curated site visits, documentation and registration support, home‑loan assistance, investment advisory, and after‑sales support.",
    },
    {
      match: ["home loan", "loan assistance", "help with loan"],
      answer:
        "Yes, RealHubb supports you with home loans end‑to‑end, from connecting to banking partners to helping you compare and apply for suitable offers.",
    },
    {
      match: ["legal documentation", "legal help", "legal team"],
      answer:
        "We coordinate with legal experts for document verification, agreement review, and registration‑related guidance to ensure a secure transaction.",
    },
    {
      match: ["after sales", "after-sales", "post purchase support"],
      answer:
        "RealHubb stays with you even after booking, assisting with documentation, possession, and coordination with the developer.",
    },
    {
      match: ["consultation process", "how do you work", "buying process"],
      answer:
        "We first understand your budget and requirements, then shortlist projects, arrange site visits, assist with negotiations, documentation, and support you till handover.",
    },
    {
      match: ["first time buyer", "first-time buyer", "new buyer"],
      answer:
        "RealHubb is friendly for first‑time buyers and explains every step clearly—from project shortlisting to registration and possession.",
    },
    {
      match: ["investment property", "for investment", "good investment"],
      answer:
        "Yes, we help investors choose projects with strong appreciation and rental potential based on micro‑market analysis and developer credentials.",
    },

    // ==== CITIES, PROJECTS, PROPERTY TYPES ====
    {
      match: ["which cities", "cities do you serve", "locations you cover"],
      answer:
        "We currently focus on Bangalore, with select projects in Hyderabad and Chennai, covering major growth and IT corridors.",
    },
    {
      match: ["property types", "what kind of properties", "types of property"],
      answer:
        "We work with apartments (1–4 BHK), villas, and plotted developments across mid‑segment to premium categories.",
    },
    {
      match: ["view property details", "see projects", "online details"],
      answer:
        "You can explore detailed listings on our website and the team can share curated options plus coordinate site visits based on your profile.",
    },

    // ==== PRICE RANGE & BUDGET ====
    {
      match: ["price range", "overall price", "minimum price", "maximum price"],
      answer:
        "Across our portfolio, ticket sizes generally start around the mid‑₹40 lakh range and go up to premium multi‑crore developments depending on project and configuration.",
    },
    {
      match: ["budget", "my budget", "within", "under"],
      answer:
        "Share your approximate budget, city, and BHK preference, and we’ll match you with the most relevant projects.",
    },

    // ==== PROJECT‑SPECIFIC EXAMPLES ====
    {
      match: ["godrej plot dodaballapur", "dodaballapur plot", "godrej dodaballapur"],
      answer:
        "Godrej Plot Dodaballapur is a plotted development in North Bangalore with multiple plot sizes and long‑term appreciation potential, suitable for both end‑use and investment‑focused buyers.",
    },
    {
      match: ["century marathahalli", "marathahalli project"],
      answer:
        "Century Marathahalli offers premium 3BHK apartments in an established IT corridor, ideal for both own stay and rental income.",
    },
    {
      match: ["godrej hoskote", "hoskote project"],
      answer:
        "Godrej Hoskote features 2 and 3 BHK apartments in an emerging micro‑market with connectivity to major highways and job hubs.",
    },
    {
      match: ["mahindra lifespace blossom", "blossom whitefield", "hope farm project"],
      answer:
        "Mahindra Lifespace Blossom near Hope Farm, Whitefield is a premium apartment development with multiple BHK options and strong IT‑corridor demand.",
    },

    // ==== CONTACT & COMMUNICATION ====
    {
      match: ["contact", "phone", "call you", "reach you"],
      answer:
        "You can reach the RealHubb team via phone/WhatsApp and email as shown on the Contact page, or simply share your name and phone here and we will call you back.",
    },
    {
      match: ["whatsapp", "message you"],
      answer:
        "Yes, you can message RealHubb on WhatsApp for quick queries. You can also request a WhatsApp callback here by sharing your number.",
    },
    {
      match: ["response time", "how quickly", "how fast you reply"],
      answer:
        "Typically, the team responds within a working day, and urgent queries can be handled faster over call or WhatsApp.",
    },

    // ==== EMI & FINANCE ====
    {
      match: ["emi calculator", "calculate emi", "emi"],
      answer:
        "You can use the EMI calculator on the website to estimate monthly payments and the team can connect you to loan partners for exact offers.",
    },

    // ==== TEAM, FOUNDERS & CAREERS ====
    {
      match: ["founder", "who founded", "ceo", "cfo"],
      answer:
        "RealHubb is led by experienced co‑founders with deep exposure to real estate sales, finance, and customer service.",
    },
    {
      match: ["team size", "advisors", "experts"],
      answer:
        "RealHubb works with a strong advisory and sales team that understands micro‑markets and project details in depth.",
    },
    {
      match: ["career", "job", "openings", "hiring"],
      answer:
        "Yes, RealHubb periodically hires for roles like real estate sales, telesales, and digital marketing. You can check the Careers page and share your profile.",
    },
    {
      match: ["apply for job", "how to apply", "career page"],
      answer:
        "To apply, visit the Careers page on the website and submit your details. HR will reach out if there’s a suitable opening.",
    },

    // ==== TRUST, REVIEWS, VALUES ====
    {
      match: ["hidden charges", "extra charges", "any hidden cost"],
      answer:
        "RealHubb follows a transparent, zero‑hidden‑charges‑focused approach, aligning with builder price sheets and clear communication.",
    },
    {
      match: ["values", "core values"],
      answer:
        "Core values include transparency, customer‑first service, integrity, data‑driven recommendations, and long‑term relationships.",
    },
    {
      match: ["reviews", "google rating", "what do clients say"],
      answer:
        "Client reviews often mention transparent guidance, knowledgeable advisors, and smooth coordination from search to registration.",
    },

    // ==== MISSION, VISION, BLOG ====
    {
      match: ["mission", "your mission"],
      answer:
        "The mission is to simplify homebuying and investing through transparent, customer‑centric real estate services.",
    },
    {
      match: ["vision", "your vision"],
      answer:
        "The vision is to be a trusted, tech‑enabled real estate partner for buyers and investors in key Indian cities.",
    },
    {
      match: ["blog", "educational content", "learning material"],
      answer:
        "The blog section covers topics like first‑time homebuyer tips, legal and RERA basics, market trends, and finance guidance.",
    },
  ];

  // Try FAQ first
  const tryFaq = (userMessage: string): string | null => {
    const lower = normalize(userMessage);
    for (const faq of faqPairs) {
      if (faq.match.some((m) => lower.includes(m))) {
        return faq.answer;
      }
    }
    return null;
  };

  // simple backend hook placeholder
  const submitLead = async (lead: LeadData) => {
    // TODO: connect to your API / n8n / CRM
    console.log("Lead captured:", lead);
  };

  const getLeadResponse = (userMessage: string): string => {
    const msg = normalize(userMessage);

    // if user clicked the CTA, jump directly to name/phone capture
    if (leadPromptClicked && leadStep === "INTRO") {
      setLeadStep("ASK_NAME");
      return "Great! Please share your full name so our advisor can connect with you personally.";
    }

    if (leadStep === "INTRO") {
      if (msg.includes("buy")) {
        setLeadData((d) => ({ ...d, intent: "Buy for own stay" }));
        setLeadStep("ASK_LOCATION");
        return "Great! Which city and location are you considering? (e.g., Bangalore - Whitefield, Sarjapur, Hebbal, etc.)";
      }
      if (msg.includes("invest")) {
        setLeadData((d) => ({ ...d, intent: "Investment" }));
        setLeadStep("ASK_LOCATION");
        return "Nice! For investment, which city and location are you looking at? (e.g., Bangalore - Whitefield, Hennur, Hosur Road, Hyderabad, Chennai, etc.)";
      }
      if (msg.includes("question") || msg.includes("faq")) {
        setLeadStep("FAQ_ONLY");
        return "Sure, you can ask me anything about RealHubb, projects, EMIs, services, or careers.";
      }
      setLeadStep("ASK_INTENT");
      return "To help you better, let me quickly understand your requirement.\n\nAre you planning to *buy a home*, *invest*, or just *exploring options*?";
    }

    if (leadStep === "ASK_INTENT") {
      if (msg.includes("buy")) {
        setLeadData((d) => ({ ...d, intent: "Buy for own stay" }));
      } else if (msg.includes("invest")) {
        setLeadData((d) => ({ ...d, intent: "Investment" }));
      } else {
        setLeadData((d) => ({ ...d, intent: "Exploring / not sure" }));
      }
      setLeadStep("ASK_LOCATION");
      return "Got it. Which city and preferred location are you considering? (e.g., Bangalore - Whitefield, Sarjapur, Hebbal, etc.)";
    }

    if (leadStep === "ASK_LOCATION") {
      setLeadData((d) => ({ ...d, location: userMessage }));
      setLeadStep("ASK_BUDGET");
      return "Thanks. What is your approximate budget range? (e.g., 50–80L, 80L–1.2Cr, 1.5–2Cr+)";
    }

    if (leadStep === "ASK_BUDGET") {
      setLeadData((d) => ({ ...d, budget: userMessage }));
      setLeadStep("ASK_BHK");
      return "Noted. What kind of configuration are you looking for? (e.g., 1 BHK / 2 BHK / 3 BHK / 4 BHK / Villa / Plot)";
    }

    if (leadStep === "ASK_BHK") {
      setLeadData((d) => ({ ...d, bhk: userMessage }));
      setLeadStep("ASK_TIMELINE");
      return "Great. By when are you planning to finalize the property? (Immediately / 0–3 months / 3–6 months / 6+ months)";
    }

    if (leadStep === "ASK_TIMELINE") {
      setLeadData((d) => ({ ...d, timeline: userMessage }));
      setLeadStep("ASK_NAME");
      return "Perfect. Please share your full name so our advisor can connect with you personally.";
    }

    if (leadStep === "ASK_NAME") {
      setLeadData((d) => ({ ...d, name: userMessage }));
      setLeadStep("ASK_PHONE");
      return "Thanks! Please share your mobile number so we can call or WhatsApp you with the best‑matched projects.";
    }

    if (leadStep === "ASK_PHONE") {
      setLeadData((d) => ({ ...d, phone: userMessage }));
      setLeadStep("ASK_EMAIL");
      return "Got it. Lastly, please share your email ID (optional, but helpful for sending brochures and cost sheets).";
    }

    if (leadStep === "ASK_EMAIL") {
      const finalLead: LeadData = { ...leadData, email: userMessage };
      setLeadData(finalLead);
      setLeadStep("LEAD_DONE");
      void submitLead(finalLead);
      return (
        "Thank you! 🎉 Your details are shared with the RealHubb advisory team.\n\n" +
        "You’ll receive a callback/WhatsApp shortly with shortlisted projects and site‑visit options.\n\n" +
        "Meanwhile, you can ask me any FAQs about RealHubb, projects, EMI, or careers."
      );
    }

    if (leadStep === "LEAD_DONE") {
      const faqAns = tryFaq(userMessage);
      if (faqAns) return faqAns;
      return "Your query is noted. A RealHubb advisor will also assist you shortly. You can keep asking me project or process‑related questions here.";
    }

    if (leadStep === "FAQ_ONLY") {
      const faqAns = tryFaq(userMessage);
      if (faqAns) return faqAns;
      return "You can ask about RealHubb, cities we cover, budget ranges, EMI, documentation, or careers. If you want suggestions for properties, just share your location, budget, and BHK.";
    }

    const faqAns = tryFaq(userMessage);
    if (faqAns) return faqAns;

    return "Great! To suggest the best options, please share your preferred city/location, your approximate budget, and BHK requirement.";
  };

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    if (
      [
        "INTRO",
        "ASK_INTENT",
        "ASK_LOCATION",
        "ASK_BUDGET",
        "ASK_BHK",
        "ASK_TIMELINE",
        "ASK_NAME",
        "ASK_PHONE",
        "ASK_EMAIL",
        "LEAD_DONE",
        "FAQ_ONLY",
      ].includes(leadStep)
    ) {
      return getLeadResponse(userMessage);
    }

    const faqAns = tryFaq(userMessage);
    if (faqAns) return faqAns;

    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return "Hello! Welcome to RealHubb. Tell me your preferred location, budget, and BHK so I can share the best projects.";
    }

    if (lower.includes("property")) {
      return "Sure! Are you looking for apartments, villas, or plots? Also share your preferred location and budget.";
    }

    if (lower.includes("location")) {
      return "We cover key areas in Bangalore like Whitefield, Sarjapur, Hennur, Yelahanka, Hosur Road and more, plus select projects in Hyderabad and Chennai. Which location are you considering?";
    }

    if (lower.includes("price") || lower.includes("cost")) {
      return "Our associated projects typically range from mid‑₹40 lakhs to multi‑crore premium developments, depending on the city, project, and configuration. What is your budget range?";
    }

    if (lower.includes("visit") || lower.includes("site visit") || lower.includes("property tour")) {
      return "We can organize a no‑obligation site visit for you. Share your name, preferred date, and location, and our team will schedule it.";
    }

    return "Could you share your city/location, budget, and preferred BHK? That will help me give you specific project suggestions or connect you to the right advisor.";
  };

  const appendMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    appendMessage(userMessage);

    // increment user question counter (only for user messages)
    setUserQuestionCount((count) => count + 1);

    const currentInput = inputValue;
    setInputValue("");

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(currentInput),
        sender: "bot",
        timestamp: new Date(),
      };
      appendMessage(botMessage);
    }, 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  const handleLeadPromptClick = () => {
    setLeadPromptClicked(true);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text:
        "Happy to help you personally.\n\nPlease share your full name so our advisor can connect with you and send best project options.",
      sender: "bot",
      timestamp: new Date(),
    };
    setLeadStep("ASK_NAME");
    appendMessage(botMessage);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card
          className="
            fixed 
            z-50 
            shadow-lg-custom 
            animate-scale-in
            flex flex-col
            bottom-28 right-4
            w-[90%] max-w-[380px] h-[75vh]
            md:bottom-24 md:right-6 md:w-96 md:h-[500px]
          "
        >
          {/* Header */}
          <div className="bg-[#00274D] p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-[#00274D]" />
              </div>
              <div>
                <h3 className="font-normal text-white">RealHubb Bot</h3>
                <p className="text-xs text-white/80">
                  Helping you with projects & EMIs
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg text-sm ${
                    msg.sender === "user"
                      ? "bg-[#00274D] text-white"
                      : "bg-white shadow-sm"
                  }`}
                >
                  {msg.text}
                  <p className="text-[10px] mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Inline Popular FAQs */}
            <div className="mt-2 text-xs text-gray-400">
              <p className="font-normal mb-1">Popular questions you can ask:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>What is RealHubb?</li>
                <li>Do you help with home loans?</li>
                <li>Which locations do you cover?</li>
                <li>Is there any brokerage or hidden charges?</li>
              </ul>
            </div>

            {/* Lead CTA after 2+ user questions, before lead is completed */}
            {userQuestionCount >= 2 && leadStep !== "LEAD_DONE" && (
              <div className="mt-3">
                <div className="bg-white border border-[#D7A764]/30 rounded-lg p-3 text-xs text-slate-700">
                  <p className="font-normal mb-1">
                    Want personalised project suggestions?
                  </p>
                  <p className="mb-2">
                    Share your basic details and our RealHubb advisor will call or WhatsApp you with curated options and site‑visit slots.
                  </p>
                  <Button
                    size="sm"
                    className="bg-[#00274D] text-white w-full hover:bg-[#001d3a]"
                    onClick={handleLeadPromptClick}
                  >
                    Share my details
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-card">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Share your location, budget, BHK or ask any FAQ..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="bg-[#00274D] hover:bg-[#001d3a]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed 
            z-50 
            w-14 h-14 
            bg-[#00274D] hover:bg-[#001d3a]
            rounded-full shadow-primary
            flex items-center justify-center
            hover:scale-110 transition-all duration-300
            bottom-24 
            right-4
            md:bottom-6 md:right-6
          "
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  );
};

export default ChatbotWidget;
