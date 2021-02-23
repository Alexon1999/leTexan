import { useEffect, useRef } from 'react';

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  // il va etre appelé une fois puis quand le parent component ou component va etre re render la il va appelé à nouveau la useefect function
  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  });

  return dimensions.current;
};
