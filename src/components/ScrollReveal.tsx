import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollReveal: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Select all elements marked for reveal
    const revealElements = document.querySelectorAll(
      '.reveal-init, [data-reveal]'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve once revealed for permanent smooth display
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Handle dynamically rendered elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (node.matches('.reveal-init, [data-reveal]')) {
              observer.observe(node);
            }
            node.querySelectorAll?.('.reveal-init, [data-reveal]').forEach((child) => {
              observer.observe(child);
            });
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return null;
};
