import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, initGA } from "./lib/ga";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    initGA(); // initialize once
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default Analytics;