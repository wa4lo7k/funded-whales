"use client";

/**
 * Scroll Animation Utility
 * 
 * This utility adds animation classes to elements when they enter the viewport.
 * It uses the Intersection Observer API for performance.
 */

export function initScrollAnimations() {
  // Only run on client-side
  if (typeof window === 'undefined') return;

  // Get all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.fade-in-up, .fade-in-up-v2, .fade-in-up-v3, .animate-fade-in-up, .animate-fade-in-up-v2, .animate-fade-in-up-v3, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in'
  );

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Add visible class when element enters viewport
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // If element has animation class, trigger it
          if (entry.target.classList.contains('animate-fade-in-up') ||
              entry.target.classList.contains('animate-fade-in-up-v2') ||
              entry.target.classList.contains('animate-fade-in-up-v3') ||
              entry.target.classList.contains('animate-fade-in-left') ||
              entry.target.classList.contains('animate-fade-in-right') ||
              entry.target.classList.contains('animate-scale-in')) {
            // The animation is triggered by the class already being there
            // We just need to make sure it's visible
          }
          
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1, // 10% of the element is visible
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  return () => {
    // Cleanup function
    animatedElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
}
