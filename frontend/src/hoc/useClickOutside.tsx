import { useEffect } from 'react';

const useClickOutside = (ref: any, handler: any) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && typeof handler === 'function' && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    let timeoutId: NodeJS.Timeout;

    const addEventListenerWithDelay = () => {
      timeoutId = setTimeout(() => {
        window.addEventListener('mousedown', handleClickOutside);
      }, 2000);
    };

    addEventListenerWithDelay();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
};

export default useClickOutside;
