import SocialIframe from "@/components/social/SocialIframe";
import GalleryNav from "./GalleryNav";
import SEO from "@/components/seo/SEO";

const YouTubeGallery = () => {
  return (
    <>
      <SEO
  title="YouTube Videos | Property Walkthroughs & Site Visits | RealHubb"
  description="Watch RealHubb's YouTube videos featuring property walkthroughs, site visits, real estate investment tips and project reviews across Bangalore, Hyderabad & Chennai."
  keywords="RealHubb YouTube, property walkthrough videos India, site visit videos Bangalore, real estate YouTube channel, RealHubb property reviews, real estate investment videos"
  canonical="https://www.realhubb.in/gallery/youtube"
  image="https://www.realhubb.in/og/youtube.jpg"
  type="website"
  breadcrumb={[
    { name: "Home", url: "https://www.realhubb.in/" },
    { name: "Gallery", url: "https://www.realhubb.in/gallery" },
    { name: "YouTube", url: "https://www.realhubb.in/gallery/youtube" }
  ]}
/>

      <section className="min-h-screen pt-20 pb-16 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">
          <GalleryNav />

          <div className="text-center mb-10">
            <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Property Videos</p>
            <h1 className="text-3xl md:text-4xl font-normal text-[#00274D]">
              YouTube <span className="text-[#D7A764]">Gallery</span>
            </h1>
            <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
              Watch property walkthroughs, site visits, and real estate insights from RealHubb.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <SocialIframe
                title="YouTube Channel"
                src="https://widgets.sociablekit.com/youtube-channel-videos/iframe/25640161"
                height={650}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YouTubeGallery;
