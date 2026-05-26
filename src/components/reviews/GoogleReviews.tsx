import { useEffect } from "react";

const GoogleReviews = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <div className="w-full flex justify-center">
      <iframe
        src="https://widgets.sociablekit.com/google-reviews/iframe/25640157"
        className="w-full max-w-7xl h-[500px] border-0"
        loading="lazy"
        title="Google Reviews"
      ></iframe>
    </div>
    </>
  );
};

export default GoogleReviews;
