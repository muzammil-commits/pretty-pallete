import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollReveal: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElements = document.querySelectorAll('.reveal-init, [data-reveal]');

    // On mobile or reduced motion: show elements immediately for 60 FPS smooth scrolling
    if (isMobile || prefersReducedMotion) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // On desktop: use lightweight single IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '40px 0px 40px 0px',
        threshold: 0.05,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

