declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_ID = "G-RXW691N6BH";

export const initGA = () => {
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("config", GA_ID, {
  page_path: url,
  page_title: document.title,
});
  }
};