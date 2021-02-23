import { useState, useEffect } from "react";

const useWindowMatchMedia = (width) => {
  const [isInTheMediaQuery, setInTheMediaQuery] = useState(false);

  useEffect(() => {
    // https://dev.to/yanns1/how-to-render-different-components-based-on-screen-size-2p35
    // mql : mediaQueryList (window.matchMedia returns MediaQueryList)
    const mql = window.matchMedia(`(max-width: ${width}px)`);

    const onMediaChange = (e) => {
      const mobileView = e.matches;

      if (mobileView) {
        setInTheMediaQuery(true);
      } else {
        setInTheMediaQuery(false);
      }
    };

    mql.addEventListener("change", onMediaChange);

    return () => {
      mql.removeListener(onMediaChange);
    };
  }, [width]);

  return {
    isInTheMediaQuery,
  };
};

export default useWindowMatchMedia;
