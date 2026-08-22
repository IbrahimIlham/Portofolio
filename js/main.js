/**
 * M. Ibrahim Ilham — Personal Portfolio
 * Vanilla JavaScript (Zero Dependencies, Zero Build Step)
 * Features: Live ML Simulator, Animated Stats Counter, Project Filter, Deep-Dive Tabs, Toast System
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
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    revealSections.forEach(section => {
      sectionObserver.observe(section);
    });
  } else {
    revealSections.forEach(section => section.classList.add('is-visible'));
  }

  // ------------------------------------------------------------------------
  // 6. Impact Stats Counter Animation
  // ------------------------------------------------------------------------
  const statsStrip = document.querySelector('.stats-strip');
  const statCounters = document.querySelectorAll('.stat-counter');

  const animateCounters = () => {
    statCounters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease Out Quart
        const ease = 1 - Math.pow(1 - progress, 4);
        const currentVal = target * ease;

        if (decimals > 0) {
          counter.textContent = currentVal.toFixed(decimals);
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          if (decimals > 0) {
            counter.textContent = target.toFixed(decimals);
          } else {
            counter.textContent = target.toLocaleString();
          }
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsStrip && statCounters.length > 0) {
    if (prefersReducedMotion) {
      statCounters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
        counter.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
      });
    } else if ('IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      statsObserver.observe(statsStrip);
    } else {
      animateCounters();
    }
  }

  // ------------------------------------------------------------------------
  // 7. Interactive Scatter Plot Hover Tooltips
  // ------------------------------------------------------------------------
  const scatterTooltip = document.getElementById('scatter-tooltip');
  const scatterPoints = document.querySelectorAll('.scatter-point');
  const treeCard = document.querySelector('.tree-card');

  if (scatterTooltip && treeCard && scatterPoints.length > 0) {
    scatterPoints.forEach(point => {
      point.addEventListener('mouseenter', (e) => {
        const label = point.getAttribute('data-label') || 'Data Point';
        scatterTooltip.textContent = label;
        scatterTooltip.classList.add('is-visible');

        // Position tooltip relative to container
        const cardRect = treeCard.getBoundingClientRect();
        const pointRect = point.getBoundingClientRect();
        const left = pointRect.left - cardRect.left + pointRect.width / 2;
        const top = pointRect.top - cardRect.top;

        scatterTooltip.style.left = `${left}px`;
        scatterTooltip.style.top = `${top}px`;
      });

      point.addEventListener('mouseleave', () => {
        scatterTooltip.classList.remove('is-visible');
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. SVG Decision Boundary Curve Reveal Animation
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
  // 9. SHAP Feature Importance Bar Animation (Overview Tab)
  // ------------------------------------------------------------------------
  const shapContainer = document.querySelector('.shap-chart-container');
  const shapFills = document.querySelectorAll('.shap-bar-fill');

  const triggerShapAnimation = () => {
    shapFills.forEach(fill => {
      fill.style.width = fill.getAttribute('data-width') || '0%';
    });
  };

  if (shapContainer && shapFills.length > 0) {
    if (prefersReducedMotion) {
      triggerShapAnimation();
    } else if ('IntersectionObserver' in window) {
      const shapObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerShapAnimation();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      shapObserver.observe(shapContainer);
    } else {
      triggerShapAnimation();
    }
  }

  // ------------------------------------------------------------------------
  // 10. Live Interactive ML Churn & SHAP Simulator (Project 01)
  // ------------------------------------------------------------------------
  const sliderDuration = document.getElementById('slider-duration');
  const sliderFrequency = document.getElementById('slider-frequency');
  const sliderLifespan = document.getElementById('slider-lifespan');

  const valDuration = document.getElementById('val-duration');
  const valFrequency = document.getElementById('val-frequency');
  const valLifespan = document.getElementById('val-lifespan');

  const churnProbNum = document.getElementById('churn-prob-num');
  const churnRiskBadge = document.getElementById('churn-risk-badge');
  const churnGaugeFill = document.getElementById('churn-gauge-fill');
  const churnVerdictText = document.getElementById('churn-verdict-text');

  const liveShapDuration = document.getElementById('live-shap-duration');
  const liveShapFrequency = document.getElementById('live-shap-frequency');
  const liveShapLifespan = document.getElementById('live-shap-lifespan');

  const liveBarDuration = document.getElementById('live-bar-duration');
  const liveBarFrequency = document.getElementById('live-bar-frequency');
  const liveBarLifespan = document.getElementById('live-bar-lifespan');

  const presetButtons = document.querySelectorAll('.preset-btn');

  const calculateChurnPrediction = () => {
    if (!sliderDuration || !sliderFrequency || !sliderLifespan) return;

    const duration = parseFloat(sliderDuration.value); // 1 - 36 months
    const frequency = parseFloat(sliderFrequency.value); // 1 - 24 orders/yr
    const lifespan = parseFloat(sliderLifespan.value); // 10 - 365 days

    // Update label values
    if (valDuration) valDuration.textContent = `${duration} months`;
    if (valFrequency) valFrequency.textContent = `${frequency} orders/yr`;
    if (valLifespan) valLifespan.textContent = `${lifespan} days`;

    // Mathematical logistic inference model calibrated against realistic CRISP-DM dataset
    // Baseline logit (neutral center point)
    const baseLogit = 0.45;
    const effectDuration = -0.095 * (duration - 8);
    const effectFrequency = -0.155 * (frequency - 5);
    const effectLifespan = -0.0075 * (lifespan - 75);

    const totalLogit = baseLogit + effectDuration + effectFrequency + effectLifespan;
    const probability = 1 / (1 + Math.exp(-totalLogit));
    const probPercent = Math.min(Math.max(probability * 100, 1.5), 98.8);

    // Update probability display & gauge
    if (churnProbNum) churnProbNum.textContent = `${probPercent.toFixed(1)}%`;
    if (churnGaugeFill) churnGaugeFill.style.width = `${probPercent.toFixed(1)}%`;

    // Update Risk level badge & commentary
    if (churnRiskBadge && churnVerdictText) {
      churnRiskBadge.className = 'risk-badge';
      if (probPercent < 30) {
        churnRiskBadge.classList.add('badge-low');
        churnRiskBadge.textContent = 'Low Risk';
        churnVerdictText.textContent = 'Profile indicates high customer loyalty with solid retention probability.';
      } else if (probPercent < 65) {
        churnRiskBadge.classList.add('badge-med');
        churnRiskBadge.textContent = 'Moderate Risk';
        churnVerdictText.textContent = 'Marginal profile — candidate for retention discounts or targeted outreach.';
      } else {
        churnRiskBadge.classList.add('badge-high');
        churnRiskBadge.textContent = 'High Churn Risk';
        churnVerdictText.textContent = 'Significant churn indicators detected. Model flags immediate drop-off probability.';
      }
    }

    // Dynamic SHAP values calculation (force contributions relative to baseline)
    const shapDur = -effectDuration * 0.32;
    const shapFreq = -effectFrequency * 0.38;
    const shapLife = -effectLifespan * 0.30;

    const updateShapRow = (elemVal, elemBar, shapScore) => {
      if (!elemVal || !elemBar) return;
      const isPos = shapScore > 0; // Positive pushes toward churn (+), Negative toward retention (-)
      const sign = isPos ? '+' : '';
      elemVal.textContent = `${sign}${shapScore.toFixed(3)}`;
      elemVal.className = isPos ? 'shap-dir-pos' : 'shap-dir-neg';

      elemBar.className = isPos ? 'live-shap-fill fill-pos' : 'live-shap-fill fill-neg';
      const maxMagnitude = 0.65;
      const pct = Math.min(Math.max((Math.abs(shapScore) / maxMagnitude) * 100, 8), 100);
      elemBar.style.width = `${pct.toFixed(0)}%`;
    };

    updateShapRow(liveShapDuration, liveBarDuration, shapDur);
    updateShapRow(liveShapFrequency, liveBarFrequency, shapFreq);
    updateShapRow(liveShapLifespan, liveBarLifespan, shapLife);
  };

  // Slider event listeners
  [sliderDuration, sliderFrequency, sliderLifespan].forEach(slider => {
    slider?.addEventListener('input', () => {
      calculateChurnPrediction();
      presetButtons.forEach(btn => btn.classList.remove('active'));
    });
  });

  // Persona Presets
  const presets = {
    retained: { duration: 24, frequency: 16, lifespan: 280 },
    moderate: { duration: 10, frequency: 7, lifespan: 120 },
    churn: { duration: 2, frequency: 1, lifespan: 25 }
  };

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetKey = btn.getAttribute('data-preset');
      const p = presets[presetKey];
      if (p && sliderDuration && sliderFrequency && sliderLifespan) {
        sliderDuration.value = p.duration;
        sliderFrequency.value = p.frequency;
        sliderLifespan.value = p.lifespan;

        presetButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        calculateChurnPrediction();
      }
    });
  });

  // Initial calculation on load
  calculateChurnPrediction();

  // ------------------------------------------------------------------------
  // 11. Project Category Filter
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 12. Project Card View Tabs (Featured Card)
  // ------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const parentCard = btn.closest('.featured-project');
      if (!parentCard) return;

      const cardTabs = parentCard.querySelectorAll('.tab-btn');
      const cardContents = parentCard.querySelectorAll('.tab-content');

      cardTabs.forEach(t => t.classList.remove('active'));
      cardContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = parentCard.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
        // If switching to overview, re-trigger SHAP bar animations
        if (targetId === 'tab-overview-01') {
          triggerShapAnimation();
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 13. Secondary Card Mini Tabs
  // ------------------------------------------------------------------------
  const miniTabButtons = document.querySelectorAll('.mini-tab-btn');

  miniTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      const parentCard = btn.closest('.project-card');
      if (!parentCard) return;

      const cardMiniTabs = parentCard.querySelectorAll('.mini-tab-btn');
      const cardMiniContents = parentCard.querySelectorAll('.mini-tab-content');

      cardMiniTabs.forEach(t => t.classList.remove('active'));
      cardMiniContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = parentCard.querySelector(`#${targetId}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ------------------------------------------------------------------------
  // 14. Skills Arsenal Category Filter
  // ------------------------------------------------------------------------
  const skillFilterButtons = document.querySelectorAll('.skill-filter-btn');
  const arsenalTags = document.querySelectorAll('.arsenal-tag');

  skillFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-skill-filter') || 'all';

      arsenalTags.forEach(tag => {
        const tagCategory = tag.getAttribute('data-category');
        if (filterCategory === 'all' || tagCategory === filterCategory) {
          tag.classList.remove('is-hidden');
        } else {
          tag.classList.add('is-hidden');
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 15. Toast Notification & Quick Clipboard Copy
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  const showToast = (message = 'Copied to clipboard!') => {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;

    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  };

  // Copy Contact Buttons
  const copyButtons = document.querySelectorAll('.quick-copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast(`Copied ${textToCopy} to clipboard!`);
        } catch (err) {
          showToast('Failed to copy to clipboard.');
        }
      }
    });
  });

  // Code Snippet Copy Button
  const codeCopyButtons = document.querySelectorAll('.code-copy-btn');
  codeCopyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const codeElement = document.getElementById(targetId);
      if (codeElement) {
        try {
          await navigator.clipboard.writeText(codeElement.textContent);
          showToast('Code snippet copied to clipboard! 📋');
        } catch (err) {
          showToast('Failed to copy code.');
        }
      }
    });
  });

  // ------------------------------------------------------------------------
  // 16. Dynamic Copyright Year
  // ------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ------------------------------------------------------------------------
  // 17. Multi-Project Detail Modals & Image Sliders Controller
  // ------------------------------------------------------------------------
  const allModals = document.querySelectorAll('.project-modal-backdrop');
  let activeModal = null;
  const modalSliders = new Map();

  // Initialize Slider for each Modal
  allModals.forEach((modal) => {
    const modalId = modal.getAttribute('id');
    const sliderTrack = modal.querySelector('.slider-track');
    const sliderSlides = modal.querySelectorAll('.slider-slide');
    const sliderDots = modal.querySelectorAll('.slider-dot');
    const sliderPrevBtn = modal.querySelector('.slider-nav-btn.prev');
    const sliderNextBtn = modal.querySelector('.slider-nav-btn.next');
    const currentNumEl = modal.querySelector('.slider-current-num');
    const totalNumEl = modal.querySelector('.slider-total-num');
    const captionTitleEl = modal.querySelector('.slider-caption-title');
    const captionDescEl = modal.querySelector('.slider-caption-desc');
    const closeBtns = modal.querySelectorAll('.modal-close-btn, [data-modal-close]');
    const sliderViewport = modal.querySelector('.slider-viewport');

    const totalSlides = sliderSlides.length;
    let currentIndex = 0;

    if (totalNumEl) {
      totalNumEl.textContent = totalSlides;
    }

    const updateSlide = (index) => {
      if (totalSlides === 0) return;

      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      sliderSlides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.classList.add('active');
          const title = slide.getAttribute('data-title') || '';
          const desc = slide.getAttribute('data-desc') || '';
          if (captionTitleEl) captionTitleEl.textContent = title;
          if (captionDescEl) captionDescEl.textContent = desc;
        } else {
          slide.classList.remove('active');
        }
      });

      sliderDots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      if (currentNumEl) {
        currentNumEl.textContent = currentIndex + 1;
      }
    };

    // Navigation buttons
    sliderPrevBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(currentIndex - 1);
    });

    sliderNextBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      updateSlide(currentIndex + 1);
    });

    // Dot indicators
    sliderDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        updateSlide(idx);
      });
    });

    // Close buttons
    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(modal);
      });
    });

    // Backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    sliderViewport?.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderViewport?.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 40;
      if (touchEndX < touchStartX - swipeThreshold) {
        updateSlide(currentIndex + 1); // Next
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        updateSlide(currentIndex - 1); // Prev
      }
    }, { passive: true });

    // Store controller interface
    modalSliders.set(modalId, {
      updateSlide,
      reset: () => updateSlide(0),
      prev: () => updateSlide(currentIndex - 1),
      next: () => updateSlide(currentIndex + 1)
    });
  });

  const openModal = (modalId) => {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;

    if (activeModal && activeModal !== targetModal) {
      closeModal(activeModal);
    }

    targetModal.classList.add('is-open');
    targetModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = targetModal;

    const controller = modalSliders.get(modalId);
    if (controller) {
      controller.reset();
    }
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (activeModal === modal) {
      activeModal = null;
    }
  };

  // Attach Open Triggers to View Detail buttons & image preview containers
  const modalTriggers = document.querySelectorAll('[data-modal-target], .btn-view-detail');
  modalTriggers.forEach(trigger => {
    const handleTrigger = (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target') || (trigger.id === 'btn-open-xai-modal' ? 'modal-xai' : null);
      if (targetId) {
        openModal(targetId);
      }
    };

    trigger.addEventListener('click', handleTrigger);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleTrigger(e);
      }
    });
  });

  // Global Keyboard Navigation (Esc, Left Arrow, Right Arrow)
  window.addEventListener('keydown', (e) => {
    if (!activeModal || !activeModal.classList.contains('is-open')) return;

    const modalId = activeModal.getAttribute('id');
    const controller = modalSliders.get(modalId);

    if (e.key === 'Escape') {
      closeModal(activeModal);
    } else if (e.key === 'ArrowLeft' && controller) {
      controller.prev();
    } else if (e.key === 'ArrowRight' && controller) {
      controller.next();
    }
  });
});
