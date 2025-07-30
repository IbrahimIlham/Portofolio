// JavaScript dasar untuk portofolio (smooth scroll, animasi, dark mode, dll)
// Hamburger menu functionality
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const closeMenuBtn = document.getElementById('close-menu');

// Initialize mobile menu on page load
document.addEventListener('DOMContentLoaded', function() {
  if (mobileMenu) {
    mobileMenu.classList.remove('show');
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('show');
  }
});

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('show');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.add('show');
    }
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
}

if (closeMenuBtn && mobileMenu) {
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
    if (mobileMenuOverlay) {
      mobileMenuOverlay.classList.remove('show');
    }
    document.body.style.overflow = ''; // Restore scroll
  });
}

function closeMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('show');
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.classList.remove('show');
  }
  document.body.style.overflow = ''; // Restore scroll
}

// Close menu when clicking on overlay
if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener('click', () => {
    closeMenu();
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('show')) {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('show')) {
    closeMenu();
  }
});

// Fade-in animasi saat section masuk viewport
function revealSections() {
  const sections = document.querySelectorAll('.section-fade');
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Sticky navbar shadow saat scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('shadow-lg');
  } else {
    navbar.classList.remove('shadow-lg');
  }
});

// Smooth scroll untuk anchor (jika browser tidak support scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scrollspy: highlight menu aktif sesuai section
const navLinks = document.querySelectorAll('.nav-link');
const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href'));
function setActiveNav() {
  let current = '';
  sectionIds.forEach(id => {
    const section = document.querySelector(id);
    if (section) {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = id;
      }
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('DOMContentLoaded', setActiveNav); 

// Slider functionality for project images
class ImageSlider {
  constructor(sliderId, slidesId, prevBtnId, nextBtnId, dotsClass) {
    this.slider = document.getElementById(sliderId);
    this.slides = document.getElementById(slidesId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.dots = document.querySelectorAll(dotsClass);
    this.currentSlide = 0;
    this.slideCount = this.dots.length;
    
    this.init();
  }
  
  init() {
    if (!this.slider || !this.slides) return;
    
    // Set initial active dot
    this.updateDots();
    
    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Add dot click listeners
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Add touch/swipe support for mobile
    this.addTouchSupport();
    
    // Auto-play functionality (optional)
    this.startAutoPlay();
  }
  
  updateSlides() {
    const translateX = -this.currentSlide * 100;
    this.slides.style.transform = `translateX(${translateX}%)`;
  }
  
  updateDots() {
    this.dots.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('bg-white', 'active');
        dot.classList.remove('bg-white/60');
      } else {
        dot.classList.remove('bg-white', 'active');
        dot.classList.add('bg-white/60');
      }
    });
  }
  
  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slideCount - 1 : this.currentSlide - 1;
    this.updateSlides();
    this.updateDots();
    this.resetAutoPlay();
  }
  
  nextSlide() {
    this.currentSlide = this.currentSlide === this.slideCount - 1 ? 0 : this.currentSlide + 1;
    this.updateSlides();
    this.updateDots();
    this.resetAutoPlay();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlides();
    this.updateDots();
    this.resetAutoPlay();
  }
  
  addTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    this.slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });
    
    this.slider.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      this.slider.addEventListener('mouseup', (e) => {
        endX = e.clientX;
        this.handleSwipe(startX, endX);
      }, { once: true });
    });
  }
  
  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  resetAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Alphalva slider
  const alphalvaSlider = new ImageSlider(
    'alphalva-slider',
    'alphalva-slides',
    'alphalva-prev',
    'alphalva-next',
    '.alphalva-dot'
  );
  
  // Initialize Totase slider
  const totaseSlider = new ImageSlider(
    'totase-slider',
    'totase-slides',
    'totase-prev',
    'totase-next',
    '.totase-dot'
  );
  
  // Pause auto-play when user hovers over slider
  const sliders = document.querySelectorAll('[id$="-slider"]');
  sliders.forEach(slider => {
    slider.addEventListener('mouseenter', () => {
      if (slider.id === 'alphalva-slider' && alphalvaSlider) {
        alphalvaSlider.stopAutoPlay();
      } else if (slider.id === 'totase-slider' && totaseSlider) {
        totaseSlider.stopAutoPlay();
      }
    });
    
    slider.addEventListener('mouseleave', () => {
      if (slider.id === 'alphalva-slider' && alphalvaSlider) {
        alphalvaSlider.startAutoPlay();
      } else if (slider.id === 'totase-slider' && totaseSlider) {
        totaseSlider.startAutoPlay();
      }
    });
  });
}); 