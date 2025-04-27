import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useFadeIn = (delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay,
          ease: 'power3.out'
        }
      );
    }
  }, [delay]);

  return elementRef;
};

export const useStaggerChildren = (delay = 0) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const children = container.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay,
          ease: 'power3.out'
        }
      );
    }
  }, [delay]);

  return containerRef;
};

export const useScaleIn = (delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay,
          ease: 'elastic.out(1, 0.5)'
        }
      );
    }
  }, [delay]);

  return elementRef;
}; 