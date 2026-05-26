import SocialIframe from "@/components/social/SocialIframe";
import SEO from "@/components/seo/SEO";
import GalleryNav from "./GalleryNav";

const GoogleReviews = () => {
  return (
    <>
      <SEO
  title="Google Reviews | Verified Client Feedback | RealHubb"
  description="Read verified Google reviews from real home buyers and property investors who worked with RealHubb across Bangalore, Hyderabad & Chennai. See what our clients say."
  keywords="RealHubb Google reviews, RealHubb client feedback, real estate reviews Bangalore, property advisor reviews India, RealHubb testimonials"
  canonical="https://www.realhubb.in/gallery/google-reviews"
  image="https://www.realhubb.in/og/google-reviews.jpg"
  type="website"
  breadcrumb={[
    { name: "Home", url: "https://www.realhubb.in/" },
    { name: "Gallery", url: "https://www.realhubb.in/gallery" },
    { name: "Google Reviews", url: "https://www.realhubb.in/gallery/google-reviews" }
  ]}
/>

      <section className="min-h-screen pt-20 pb-16 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">
          <GalleryNav />

          <div className="text-center mb-10">
            <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Client Feedback</p>
            <h1 className="text-3xl md:text-4xl font-normal text-[#00274D]">
              Google <span className="text-[#D7A764]">Reviews</span>
            </h1>
            <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
              See what our customers say about their real estate journey with RealHubb.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <SocialIframe
                title="Google Reviews"
                src="https://widgets.sociablekit.com/google-reviews/iframe/25640157"
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleReviews;
