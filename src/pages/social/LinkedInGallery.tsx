import SocialIframe from "@/components/social/SocialIframe";
import GalleryNav from "./GalleryNav";
import SEO from "@/components/seo/SEO";

const LinkedInGallery = () => {
  return (
    <>
      <SEO
  title="LinkedIn Posts | Company Updates & Industry Insights | RealHubb"
  description="Follow RealHubb Ventures on LinkedIn for company announcements, real estate industry insights, developer partnerships and property market updates across India."
  keywords="RealHubb LinkedIn, RealHubb Ventures company updates, real estate industry news India, property market insights, RealHubb announcements"
  canonical="https://www.realhubb.in/gallery/linkedin"
  image="https://www.realhubb.in/og/linkedin.jpg"
  type="website"
  breadcrumb={[
    { name: "Home", url: "https://www.realhubb.in/" },
    { name: "Gallery", url: "https://www.realhubb.in/gallery" },
    { name: "LinkedIn", url: "https://www.realhubb.in/gallery/linkedin" }
  ]}
/>

      <section className="min-h-screen pt-20 pb-16 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">
          <GalleryNav />

          <div className="text-center mb-10">
            <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Company Updates</p>
            <h1 className="text-3xl md:text-4xl font-normal text-[#00274D]">
              LinkedIn <span className="text-[#D7A764]">Posts</span>
            </h1>
            <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
              Stay updated with company announcements, industry insights, and real estate updates from RealHubb.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <SocialIframe
                title="LinkedIn Posts"
                src="https://widgets.sociablekit.com/linkedin-page-posts/iframe/25640213"
                height={650}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LinkedInGallery;
