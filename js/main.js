$('.project-slider').slick({
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 3,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,

    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                centerMode: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                centerMode: true
            }
        }
    ]
});

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

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {
                formStatus.style.display = "block";
                formStatus.classList.remove("text-danger");
                formStatus.classList.add("text-success");
                formStatus.innerText =
                    "Thanks! Your message has been sent successfully.";

                form.reset();

                setTimeout(() => {
                    formStatus.style.display = "none";
                }, 5000);
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            formStatus.style.display = "block";
            formStatus.classList.remove("text-success");
            formStatus.classList.add("text-danger");
            formStatus.innerText =
                "Something went wrong. Please try again.";
        }
    });
}
