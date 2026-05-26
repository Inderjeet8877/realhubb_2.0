import * as React from "react";

const MOBILE_BREAKPOINT = 768; // < 768 = mobile

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    mql.addEventListener("change", updateSize);
    updateSize();

    return () => mql.removeEventListener("change", updateSize);
  }, []);

  return !!isMobile;
}
