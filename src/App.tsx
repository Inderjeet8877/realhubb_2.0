import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CurrentProjects from "./pages/CurrentProjects";
import OngoingProjects from "./pages/OngoingProjects";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import EMICalculatorPage from "./pages/tools/EMICalculatorPage";
import HomeLoanEligibilityPage from "./pages/tools/HomeLoanEligibilityPage";  
import RentalYieldPage from "./pages/tools/RentalYieldPage";
import SalaryAdvisorPage from "./pages/tools/SalaryAdvisorPage";
import CurrencyCalculator from "./pages/tools/CurrencyConverter";
import PropertyDetail from "./pages/PropertyDetail";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Analytics from "./Analytics";
import { ScrollProgress } from "./components/ScrollProgress";
import Career from "./pages/Career";
import Gallery from "./pages/Gallery";
import FaqPage from "./pages/FaqPage";
import GoogleReviews from "./pages/social/GoogleReviews";
import YouTubeGallery from "./pages/social/YouTubeGallery";
import InstagramGallery from "./pages/social/InstagramGallery";
import LinkedInGallery from "./pages/social/LinkedInGallery";
import TeamGallery from "./pages/TeamGallery";
import DeveloperPage from "./pages/DeveloperPage";
import DevelopersPage from "./pages/DevelopersPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AdminApp from "./admin/AdminApp";
import CloudinaryTest from "../src/admin/Cloudinarytest";
import NewsPage from "./pages/NewsPage";
import { Currency } from "lucide-react";

const queryClient = new QueryClient();

// ── Scroll to top on every route change ──────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// ── GA4 page tracker — fires on every route change in the SPA ────────────────
// ✅ Defined OUTSIDE AppRoutes so it never gets recreated on each render
const GAPageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
  return null;
};

// ── Inner router — has access to useLocation ──────────────────────────────────
const AppRoutes = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* ✅ Both helpers sit OUTSIDE <Routes> — valid position for non-Route components */}
      <GAPageTracker />
      <ScrollToTop />

      {/* ScrollProgress only on public pages */}
      {!isAdmin && <ScrollProgress />}

      {isAdmin ? (
        // ── Admin pages: completely outside Layout (no header/footer) ──
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/admin/test" element={<CloudinaryTest />} />
        </Routes>
      ) : (
        // ── Public pages: wrapped in Layout (header + footer) ──
        <Layout>
          <Routes>
            {/* ✅ Only <Route> elements go inside <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/upcoming-projects" element={<CurrentProjects />} />
            <Route path="/upcoming-projects/:city" element={<CurrentProjects />} />
            <Route path="/ongoing-projects" element={<OngoingProjects />} />
            <Route path="/ongoing-projects/:city" element={<OngoingProjects />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/realhubb-news" element={<NewsPage />} />
            <Route path="/emi-calculator" element={<EMICalculatorPage />} />
            <Route path="/home-loan-eligibility" element={<HomeLoanEligibilityPage />} />
            <Route path="/rental-yield-calculator" element={<RentalYieldPage />} />
            <Route path="/salary-advisor" element={<SalaryAdvisorPage />} />
            <Route path="/currency-calculator" element={<CurrencyCalculator />} />
            <Route path="/property/:slug" element={<PropertyDetail />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/google-reviews" element={<GoogleReviews />} />
            <Route path="/gallery/youtube" element={<YouTubeGallery />} />
            <Route path="/gallery/instagram" element={<InstagramGallery />} />
            <Route path="/gallery/linkedin" element={<LinkedInGallery />} />
            <Route path="/gallery/team-gallery" element={<TeamGallery />} />
            <Route path="/career" element={<Career />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/developers/:slug" element={<DeveloperPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<div className="p-0 m-0"><NotFound /></div>} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

// ── Root App ──────────────────────────────────────────────────────────────────
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;