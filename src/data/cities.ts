// src/data/cities.ts
import bangalore from "../components/assets/bangalore-city.jpg";
import chennai from "../components/assets/chennai-city.jpg";
import hyderabad from "../components/assets/hyderabad-city.jpg";
// import mumbai from "../components/assets/mumbai.png";
// import delhi from "../components/assets/india-gate.png";
export const cities = [
  {
    name: "Bangalore",
    logo: bangalore,
    projects: 120,
    description: "India's leading IT hub and fastest-growing real estate market.",
    link: "/city/bangalore",
  },
  
  {
    name: "Hyderabad",
    logo: hyderabad,
    projects: 110,
    description: "Booming tech city with excellent investment potential.",
    link: "/city/hyderabad",
  },
  {
    name: "Chennai",
    logo: chennai,
    projects: 90,
    description: "Known for beachfront living and a strong industrial base.",
    link: "/city/chennai",
  }

];
