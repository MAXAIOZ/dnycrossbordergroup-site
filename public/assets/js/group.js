/* ============================================================
   DNY Cross Border Group — group components (v4)
   Nav dropdowns · architecture stack · venture filters · enquiry form
   ============================================================ */
(function () {
  'use strict';

  var store = {
    get: function (k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  /* ---------- Attribution: first landing page, referrer and UTM ---------- */
  (function () {
    if (!store.get('dny_landing')) {
      store.set('dny_landing', location.pathname + location.search);
      store.set('dny_referrer', document.referrer || 'direct');
    }
    var p = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(function (k) {
      if (p.get(k)) store.set('dny_' + k, p.get(k));
    });
    // Remember the page a visitor was on when they clicked through to Contact.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="/contact"]');
      if (a && location.pathname.indexOf('/contact') !== 0) store.set('dny_cta_page', location.pathname);
    });
  })();

  /* ---------- Nav dropdown toggles ---------- */
  var items = document.querySelectorAll('.nav-item.has-sub');
  function closeAll(except) {
    items.forEach(function (it) {
      if (it === except) return;
      it.classList.remove('open');
      var b = it.querySelector('.sub-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  items.forEach(function (it) {
    var btn = it.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !it.classList.contains('open');
      closeAll(it);
      it.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(null); });
  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav-item')) closeAll(null);
  });

  /* ---------- Group architecture stack: hover/focus drives the detail panel ---------- */
  document.querySelectorAll('[data-gstack]').forEach(function (root) {
    var links = root.querySelectorAll('.gl-link');
    var panels = root.querySelectorAll('.gp');
    if (!panels.length) return;
    function show(n) {
      links.forEach(function (l) { l.classList.toggle('on', l.getAttribute('data-layer') === n); });
      panels.forEach(function (p) { p.classList.toggle('on', p.getAttribute('data-panel') === n); });
    }
    links.forEach(function (l) {
      var n = l.getAttribute('data-layer');
      l.addEventListener('mouseenter', function () { show(n); });
      l.addEventListener('focus', function () { show(n); });
    });
    show('3');
  });

  /* ---------- Venture filters ---------- */
  document.querySelectorAll('[data-vfilter]').forEach(function (root) {
    var form = root.querySelector('.vfilters');
    if (!form) return;
    var cards = root.querySelectorAll('.vcard');
    var count = root.querySelector('[data-vcount]');
    var empty = root.querySelector('.vf-empty');
    function apply() {
      var f = {
        category: form.category.value,
        industries: form.industries.value,
        tech: form.tech.value,
        status: form.status.value
      };
      var shown = 0;
      cards.forEach(function (c) {
        var ok =
          (!f.category || c.dataset.category === f.category) &&
          (!f.status || c.dataset.status === f.status) &&
          (!f.industries || c.dataset.industries.split('|').indexOf(f.industries) > -1) &&
          (!f.tech || c.dataset.tech.split('|').indexOf(f.tech) > -1);
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (count) count.textContent = shown;
      if (empty) empty.hidden = shown !== 0;
    }
    form.addEventListener('change', apply);
    form.addEventListener('reset', function () { setTimeout(apply, 0); });
    // Allow deep links such as /ventures?category=Physical%20Intelligence
    var p = new URLSearchParams(location.search);
    ['category', 'industries', 'tech', 'status'].forEach(function (k) {
      if (p.get(k) && form[k]) form[k].value = p.get(k);
    });
    apply();
  });

  /* ---------- Enquiry form (typed, attributed, submitted via FormSubmit) ---------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    var typeSel = form.querySelector('[name="enquiry_type"]');
    var qType = new URLSearchParams(location.search).get('type');
    if (qType && typeSel && typeSel.querySelector('option[value="' + qType + '"]')) typeSel.value = qType;

    var status = form.querySelector('.form-status');
    function say(msg, ok) {
      status.hidden = false;
      status.className = 'form-status ' + (ok ? 'ok' : 'err');
      status.innerHTML = msg;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if (data.get('_honey')) return;
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      var message = String(data.get('message') || '').trim();
      if (!name || !email || !message) { say('Please fill in your name, email and message.', false); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { say('Please enter a valid email address.', false); return; }

      var type = String(data.get('enquiry_type') || 'general');
      var payload = {
        name: name,
        email: email,
        organisation: String(data.get('organisation') || ''),
        enquiry_type: type,
        interest: String(data.get('interest') || ''),
        message: message,
        source_page: store.get('dny_cta_page') || document.referrer || location.pathname,
        landing_page: store.get('dny_landing') || '',
        referrer: store.get('dny_referrer') || '',
        utm_source: store.get('dny_utm_source') || '',
        utm_medium: store.get('dny_utm_medium') || '',
        utm_campaign: store.get('dny_utm_campaign') || '',
        _subject: '[DNY website] ' + type.charAt(0).toUpperCase() + type.slice(1) + ' enquiry — ' + name,
        _replyto: email,
        _template: 'table',
        _captcha: 'false'
      };

      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.j.success) === 'false') throw new Error(res.j.message || 'Send failed');
          form.reset();
          if (typeSel) typeSel.value = type;
          say('Thank you — your ' + type + ' enquiry has been sent. We will reply to ' + email.replace(/</g, '') + '.', true);
          if (window.dataLayer) window.dataLayer.push({ event: 'enquiry_submit', enquiry_type: type });
        })
        .catch(function () {
          var mail = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(payload._subject) +
            '&body=' + encodeURIComponent(message + '\n\n' + name + '\n' + payload.organisation);
          say('We could not send the form just now. Please <a href="' + mail + '">email us directly</a> instead.', false);
        })
        .then(function () { btn.disabled = false; btn.textContent = 'Send enquiry'; });
    });
  }
})();
