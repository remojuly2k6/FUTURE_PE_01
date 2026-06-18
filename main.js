/* =====================================================
   REMO SALON — JavaScript (Interactions & Animations)
   ===================================================== */

/* ---------- Navbar Scroll Effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---------- Back to Top ---------- */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------- Hero Particles ---------- */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 28;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero-particle';
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 8 + 6}s;
      animation-delay: ${Math.random() * 6}s;
    `;
    container.appendChild(particle);
  }
}
createParticles();

/* ---------- Scroll Reveal ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- Smooth Active Nav Link ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        const href = link.getAttribute('href')?.replace('#', '');
        link.style.color = href === entry.target.id
          ? 'var(--clr-gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => activeObserver.observe(s));

/* ---------- Card hover tilt effect ---------- */
function addTiltEffect(selector) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rX = (y / rect.height) * -8;
      const rY = (x / rect.width) * 8;
      card.style.transform = `translateY(-6px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}
addTiltEffect('.why-card');
addTiltEffect('.service-card');

/* ---------- Counter animation for hero stats ---------- */
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const duration = 1800;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.dataset.display = `${Math.floor(current)}${suffix}`;
    el.querySelector('.stat-number').firstChild.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = document.querySelectorAll('.stat-number');
      if (statNums[0]) {
        statNums[0].firstChild.textContent = '0';
        setTimeout(() => {
          let c = 0;
          const t = setInterval(() => {
            c = Math.min(c + 17, 500);
            statNums[0].childNodes[0].nodeValue = c;
            if (c >= 500) clearInterval(t);
          }, 16);
        }, 400);
      }
      if (statNums[1]) {
        statNums[1].firstChild.textContent = '0';
        setTimeout(() => {
          let c = 0;
          const t = setInterval(() => {
            c = Math.min(c + 1, 8);
            statNums[1].childNodes[0].nodeValue = c;
            if (c >= 8) clearInterval(t);
          }, 120);
        }, 600);
      }
      if (statNums[2]) {
        statNums[2].firstChild.textContent = '0';
        setTimeout(() => {
          let c = 0;
          const t = setInterval(() => {
            c = Math.min(c + 4, 100);
            statNums[2].childNodes[0].nodeValue = c;
            if (c >= 100) clearInterval(t);
          }, 20);
        }, 800);
      }
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* ---------- Smooth CTA clicks ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Initial reveal for hero ---------- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-left, .hero .reveal-right').forEach(el => {
    setTimeout(() => el.classList.add('revealed'), 100);
  });
});
