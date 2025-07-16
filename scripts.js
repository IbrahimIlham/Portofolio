// JavaScript dasar untuk portofolio (smooth scroll, animasi, dark mode, dll)

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