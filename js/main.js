// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll state
const nav = document.getElementById('mainNav');
const onScroll = () => {
  if (window.scrollY > 30) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('#navMenu .nav-link, #navMenu .btn');
const navCollapse = document.getElementById('navMenu');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navCollapse.classList.contains('show')) {
      // eslint-disable-next-line no-undef
      new bootstrap.Collapse(navCollapse).hide();
    }
  });
});

// Reveal-on-scroll
const revealEls = document.querySelectorAll(
  '.section .section-title, .section .section-eyebrow, .skill-card, .project-card, .stat-card, .contact-card, .about-image-wrap'
);
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// Contact form (demo)
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.hidden = false;
  e.target.reset();
  setTimeout(() => (status.hidden = true), 4000);
}
window.handleSubmit = handleSubmit;
