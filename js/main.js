/**
 * M. Ibrahim Ilham — Personal Portfolio
 * Vanilla JavaScript (Zero Dependencies, Zero Build Step)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Accessibility: Check prefers-reduced-motion
  // ------------------------------------------------------------------------
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------------------
  // 2. Sticky Header Scroll Shadow
  // ------------------------------------------------------------------------
  const header = document.querySelector('.header');

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle
  // ------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when clicking a navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 4. ScrollSpy: Highlight Active Nav Link on Scroll
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // ------------------------------------------------------------------------
  // 5. Scroll Reveal with IntersectionObserver
  // ------------------------------------------------------------------------
  const revealSections = document.querySelectorAll('.fade-in-section');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    // If reduced motion is preferred or observer not supported, show immediately
    revealSections.forEach(section => section.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------------
  // 6. SVG Decision Boundary Curve Reveal Animation
  // ------------------------------------------------------------------------
  const scatterContainer = document.querySelector('.hero-visual');
  const boundaryCurve = document.querySelector('.boundary-curve');

  const animateBoundary = () => {
    if (prefersReducedMotion) {
      if (boundaryCurve) boundaryCurve.style.strokeDashoffset = '0';
      return;
    }
    if (boundaryCurve) {
      boundaryCurve.classList.add('animated-curve');
    }
  };

  if (scatterContainer && boundaryCurve) {
    if (prefersReducedMotion) {
      boundaryCurve.style.strokeDashoffset = '0';
    } else if ('IntersectionObserver' in window) {
      const boundaryObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateBoundary();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      boundaryObserver.observe(scatterContainer);
    } else {
      animateBoundary();
    }
  }

  // ------------------------------------------------------------------------
  // 7. SHAP Feature Importance Bar Animation
  // ------------------------------------------------------------------------
  const shapContainer = document.querySelector('.shap-chart-container');
  const shapFills = document.querySelectorAll('.shap-bar-fill');

  if (shapContainer && shapFills.length > 0) {
    if (prefersReducedMotion) {
      shapFills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') || '0%';
      });
    } else if ('IntersectionObserver' in window) {
      const shapObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            shapFills.forEach(fill => {
              fill.style.width = fill.getAttribute('data-width') || '0%';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      shapObserver.observe(shapContainer);
    } else {
      shapFills.forEach(fill => {
        fill.style.width = fill.getAttribute('data-width') || '0%';
      });
    }
  }

  // ------------------------------------------------------------------------
  // 8. Dynamic Copyright Year
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
