import { useState } from 'react';

const useAnimation = (initialVisibility: any) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const showAnimation = {
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    display: "flex"
  };

  const hideAnimation = {
    opacity: 0,
    scaleX: 0.1,
    scaleY: 0.1,
    transitionEnd: {
      display: "none"
    }
  };

  return { isVisible, setIsVisible, showAnimation, hideAnimation };
};

export default useAnimation;
