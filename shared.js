/* shared.js — Kiana Rezaee portfolio */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
      const toggleMenu = (forceOpen) => {
        const willOpen = typeof forceOpen === 'boolean'
          ? forceOpen
          : !mobileMenu.classList.contains('active');

        mobileMenu.classList.toggle('active', willOpen);
        hamburger.classList.toggle('active', willOpen);
        hamburger.setAttribute('aria-expanded', String(willOpen));
        document.body.style.overflow = willOpen ? 'hidden' : '';
      };

      hamburger.addEventListener('click', () => toggleMenu());

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
          toggleMenu(false);
        }
      });

      // Close when clicking the menu backdrop
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) toggleMenu(false);
      });

      // Auto-close if screen is resized to desktop
      const mq = window.matchMedia('(min-width: 861px)');
      const mqHandler = (m) => { if (m.matches) toggleMenu(false); };
      mq.addEventListener('change', mqHandler);
    }

    // Global function for exit button and links
    window.closeMobile = () => {
      const hamburger = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (!hamburger || !mobileMenu) return;
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    };

  });

  /* ── SCROLL REVEAL ────────────────────────────────────────── */
  const ro = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

})();