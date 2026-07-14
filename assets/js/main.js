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

  // Synchronously show anything already in the initial viewport —
  // prevents flash of invisible content on mobile before IO fires.
  revealEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('visible');
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  } else {
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
      const mailto   = `mailto:info@dnycrossbordergroup.com?subject=${subject}&body=${body}`;

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


/* ============================================================
   DNY — TECH-DYNAMIC ENHANCEMENTS (V3)
   Particle network canvas, animated counters, 3D card tilt,
   scroll progress meter, hero parallax, magnetic buttons.
   Colors reference the existing brand palette only.
============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll progress meter ---------- */
  (function () {
    const meter = document.createElement('div');
    meter.className = 'scroll-meter';
    document.body.appendChild(meter);
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? (h.scrollTop / max) * 100 : 0;
      meter.style.width = p + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- Animated number counters ---------- */
  (function () {
    const nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    const animate = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = Math.round(target * eased);
        el.textContent = val + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window && !reduceMotion) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      nums.forEach(n => io.observe(n));
    } else {
      nums.forEach(n => { n.textContent = n.getAttribute('data-count') + (n.getAttribute('data-suffix') || ''); });
    }
  })();

  /* ---------- 3D tilt + cursor sheen on cards ---------- */
  (function () {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    const tiltables = document.querySelectorAll('.card, .svc-card, .corridor-card, .vis-card');
    tiltables.forEach(card => {
      card.classList.add('tilt-sheen');
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * -6;
        const ry = (px - 0.5) * 8;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.setProperty('--my', '-20%');
      });
    });
  })();

  /* ---------- Magnetic primary buttons ---------- */
  (function () {
    if (reduceMotion || window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px) translateY(-2px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  })();

  /* ---------- Hero grid parallax on scroll ----------
     (hero-content and hero-visual/globe parallax handled in fx.js) */
  (function () {
    if (reduceMotion) return;
    const grid = document.querySelector('.hero-grid');
    if (!grid) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        grid.style.transform = `translateY(${window.scrollY * 0.12}px)`;
        ticking = false;
      });
    }, { passive: true });
  })();

  /* ---------- Particle / network canvas background ---------- */
  (function () {
    if (reduceMotion) return;
    const canvas = document.getElementById('fx-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr, particles = [];
    const GOLD = '239,159,39', CYAN = '93,202,165';

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      const count = Math.min(Math.floor((innerWidth * innerHeight) / 18000), 90);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28 * dpr,
          vy: (Math.random() - 0.5) * 0.28 * dpr,
          r: (Math.random() * 1.6 + 0.6) * dpr,
          c: Math.random() > 0.72 ? CYAN : GOLD
        });
      }
    }

    const mouse = { x: -9999, y: -9999 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr;
    }, { passive: true });
    window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

    const LINK = 130;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      const link = LINK * dpr;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // gentle mouse attraction
        const mdx = mouse.x - p.x, mdy = mouse.y - p.y;
        const md = Math.hypot(mdx, mdy);
        if (md < 160 * dpr) { p.x += mdx * 0.006; p.y += mdy * 0.006; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.9)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            const a = (1 - d / link) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${p.c},${a})`;
            ctx.lineWidth = 0.6 * dpr;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(frame);
  })();

})();
