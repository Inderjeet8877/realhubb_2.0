import SocialIframe from "@/components/social/SocialIframe";
import GalleryNav from "./GalleryNav";
import SEO from "@/components/seo/SEO";

const InstagramGallery = () => {
  return (
    <>
      <SEO
  title="Instagram Feed | Property Updates & Project Launches | RealHubb"
  description="Follow RealHubb on Instagram for the latest property launches, project walkthroughs, real estate tips and updates across Bangalore, Hyderabad & Chennai."
  keywords="RealHubb Instagram, real estate Instagram India, property launches Instagram, RealHubb project updates, Bangalore real estate social media"
  canonical="https://www.realhubb.in/gallery/instagram"
  image="https://www.realhubb.in/og/instagram.jpg"
  type="website"
  breadcrumb={[
    { name: "Home", url: "https://www.realhubb.in/" },
    { name: "Gallery", url: "https://www.realhubb.in/gallery" },
    { name: "Instagram", url: "https://www.realhubb.in/gallery/instagram" }
  ]}
/>
      <section className="min-h-screen pt-20 pb-16 bg-[#faf6f1]">
        <div className="px-8 md:px-14 lg:px-20 xl:px-28">
          <GalleryNav />

          <div className="text-center mb-10">
            <p className="text-[#D7A764] text-[10px] tracking-[0.28em] uppercase font-normal mb-3">Our Feed</p>
            <h1 className="text-3xl md:text-4xl font-normal text-[#00274D]">
              Instagram <span className="text-[#D7A764]">Feed</span>
            </h1>
            <p className="mt-3 text-sm text-gray-400 max-w-xl mx-auto">
              Explore our latest project updates, launches, and real estate insights on Instagram.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <SocialIframe
                title="Instagram Feed"
                src="https://widgets.sociablekit.com/instagram-feed/iframe/25640203"
                height={700}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstagramGallery;
