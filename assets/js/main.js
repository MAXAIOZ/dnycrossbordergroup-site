/* ============================================================
   DNY Cross Border Group — Main Website JS
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Nav toggle (mobile) ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.classList.toggle('active', open);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.classList.remove('active');
      }
    });

    // Close on nav link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
        toggle.classList.remove('active');
      });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));

  function setActiveLink() {
    const scrollY = window.scrollY + 120;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        current = sec.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 30px rgba(0,0,0,.40)'
        : '';
    }, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.querySelector('[name="name"]').value.trim();
      const email   = form.querySelector('[name="email"]').value.trim();
      const company = form.querySelector('[name="company"]').value.trim();
      const topic   = form.querySelector('[name="topic"]').value;
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message) {
        showFormMsg('Please fill in your name, email and message.', 'error');
        return;
      }

      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(email)) {
        showFormMsg('Please enter a valid email address.', 'error');
        return;
      }

      // Build mailto
      const subject  = encodeURIComponent(`[DNY Enquiry] ${topic || 'General'} — ${name}`);
      const body     = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nCompany: ${company || '—'}\nTopic: ${topic || '—'}\n\nMessage:\n${message}`
      );
      const mailto   = `mailto:max@dny2dny.com?subject=${subject}&body=${body}`;

      window.location.href = mailto;

      showFormMsg('Your email client is opening. Thank you for reaching out — we will be in touch shortly.', 'success');
    });
  }

  function showFormMsg(text, type) {
    let msg = document.getElementById('form-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.id = 'form-message';
      msg.style.cssText =
        'margin-top:14px;padding:14px 18px;border-radius:10px;font-size:14px;line-height:1.55;';
      document.getElementById('contact-form').appendChild(msg);
    }
    msg.textContent = text;
    msg.style.background = type === 'error'
      ? 'rgba(169,70,42,.15)' : 'rgba(74,103,65,.20)';
    msg.style.border = type === 'error'
      ? '1px solid rgba(169,70,42,.35)' : '1px solid rgba(74,103,65,.35)';
    msg.style.color = type === 'error' ? '#f0a090' : '#a8d8a0';
  }

  /* ---------- Smooth scroll for all anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
