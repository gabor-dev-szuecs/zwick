/* Zwick Navigation — Dropdown (Desktop) + Hamburger (Mobile) */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle   = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropParents = document.querySelectorAll('.has-dropdown');

    // Hamburger öffnet/schließt Menü
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      });

      // ESC schließt
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Klick außerhalb schließt
      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
          navLinks.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Mobile: Dropdown-Gruppen als Accordion
    dropParents.forEach((parent) => {
      const link = parent.querySelector(':scope > a');
      const dd   = parent.querySelector('.dropdown');
      if (!link || !dd) return;

      link.addEventListener('click', (e) => {
        // Nur auf Mobile als Accordion
        if (window.innerWidth > 768) return;
        e.preventDefault();
        const isOpen = dd.classList.toggle('open');
        link.setAttribute('aria-expanded', String(isOpen));
      });
    });

    // Aktive Seite markieren
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href === current || (current === '' && href === 'index.html')) {
        a.classList.add('active');
        const parentLi = a.closest('.has-dropdown');
        if (parentLi) {
          const parentLink = parentLi.querySelector(':scope > a');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    });
  });
})();
