/// <reference types="vite/client" />

declare module "*.JPG" {
  const src: string;
  export default src;
}


// ✅ add these lines
interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}