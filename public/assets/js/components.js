/* ============================================================
   DNY — Drone & Robotics Components: catalogue filters, enquiry list, submission.
   The browser list is a convenience only; an enquiry exists once the server
   has saved it and returned a reference.
   ============================================================ */
(function () {
  'use strict';
  var KEY = 'dny_parts_enquiry_v1';
  var published = {};
  try {
    JSON.parse(document.getElementById('dny-published').textContent).forEach(function (p) { published[p.id] = p; });
  } catch (e) { /* no catalogue on this page */ }

  var store = {
    get: function () { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } },
    set: function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  var uid = function () { return Math.random().toString(36).slice(2, 10); };

  // Drop any line whose product is no longer published (retired or unknown IDs).
  var lines = store.get().filter(function (l) { return l && (l.pid === null || published[l.pid]); });
  store.set(lines);

  var pill = document.querySelector('[data-basket-pill]');
  var toastEl = document.querySelector('[data-toast]');
  function refreshPill() {
    if (!pill) return;
    var n = lines.length;
    pill.hidden = n === 0 || location.pathname.indexOf('/components/enquiry') === 0;
    pill.querySelector('[data-basket-count]').textContent = n;
  }
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2600);
  }
  function save() { store.set(lines); refreshPill(); }

  // ---------- Add to Enquiry ----------
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-add]');
    if (!b) return;
    var id = b.getAttribute('data-add');
    var p = published[id];
    if (!p) return;
    var part = (b.getAttribute('data-part') || '').slice(0, 120);
    lines.push({ lid: uid(), pid: id, name: p.name, model: '', part: part, qty: '1', desc: '' });
    save();
    toast((part ? p.name + ' ' + part : p.name) + ' added to your enquiry list.');
  });
  refreshPill();

  // ---------- Catalogue filters ----------
  var cat = document.querySelector('[data-catalogue]');
  if (cat) {
    var form = cat.querySelector('form');
    var cards = cat.querySelectorAll('.pcard');
    var groups = cat.querySelectorAll('[data-group]');
    var count = cat.querySelector('[data-pcount]');
    var empty = cat.querySelector('.vf-empty');
    var params = new URLSearchParams(location.search);
    if (params.get('q')) form.q.value = params.get('q');
    if (params.get('cat') && form.cat.querySelector('option[value="' + params.get('cat') + '"]')) form.cat.value = params.get('cat');
    var apply = function () {
      var q = form.q.value.trim().toLowerCase();
      var terms = q ? q.split(/\s+/) : [];
      var c = form.cat.value;
      var shown = 0;
      cards.forEach(function (card) {
        var hay = card.getAttribute('data-search');
        var ok = (!c || card.getAttribute('data-cat') === c) && terms.every(function (t) { return hay.indexOf(t) > -1; });
        card.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (g) { g.hidden = !g.querySelector('.pcard:not([hidden])'); });
      count.textContent = shown;
      empty.hidden = shown !== 0;
    };
    form.addEventListener('input', apply);
    form.addEventListener('change', apply);
    form.addEventListener('reset', function () { setTimeout(apply, 0); });
    apply();
  }

  // ---------- Enquiry page ----------
  var ef = document.getElementById('parts-enquiry');
  if (!ef) return;
  var box = ef.querySelector('[data-lines]');
  var emptyNote = ef.querySelector('[data-empty-note]');
  var status = ef.querySelector('.form-status');
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  function render() {
    emptyNote.hidden = lines.length > 0;
    box.innerHTML = lines.map(function (l, i) {
      var head = l.pid
        ? '<strong>' + esc(l.name) + '</strong> <span class="pcard-id">' + esc(l.pid) + '</span>'
        : '<strong>Part not listed</strong>';
      return '<div class="enq-line" data-lid="' + l.lid + '">' +
        '<div class="enq-line-head">' + head + '<button type="button" class="enq-remove" data-remove aria-label="Remove line ' + (i + 1) + '">Remove</button></div>' +
        '<div class="enq-grid">' +
        '<label>Equipment brand &amp; model<input data-f="model" maxlength="160" value="' + esc(l.model) + '" placeholder="e.g. brand, model, generation"></label>' +
        '<label>Part number<input data-f="part" maxlength="120" value="' + esc(l.part) + '" placeholder="Manufacturer part number"></label>' +
        '<label>Quantity' + (l.pid ? ' *' : '') + '<input data-f="qty" inputmode="numeric" pattern="[0-9]*" maxlength="6" value="' + esc(l.qty) + '" placeholder="' + (l.pid ? '1' : 'Leave blank if unknown') + '"></label>' +
        '<label class="enq-wide">' + (l.pid ? 'Notes' : 'Describe the part *') + '<input data-f="desc" maxlength="1000" value="' + esc(l.desc) + '"></label>' +
        '</div></div>';
    }).join('');
    refreshPill();
  }
  box.addEventListener('input', function (e) {
    var f = e.target.getAttribute('data-f');
    var row = e.target.closest('[data-lid]');
    if (!f || !row) return;
    lines.forEach(function (l) { if (l.lid === row.getAttribute('data-lid')) l[f] = e.target.value; });
    save();
  });
  box.addEventListener('click', function (e) {
    if (!e.target.hasAttribute('data-remove')) return;
    var lid = e.target.closest('[data-lid]').getAttribute('data-lid');
    lines = lines.filter(function (l) { return l.lid !== lid; });
    save(); render();
  });
  ef.querySelector('[data-add-custom]').addEventListener('click', function () {
    lines.push({ lid: uid(), pid: null, name: '', model: '', part: '', qty: '', desc: '' });
    save(); render();
    var last = box.querySelector('.enq-line:last-child [data-f="desc"]');
    if (last) last.focus();
  });
  render();

  function say(msg, ok) { status.hidden = false; status.className = 'form-status ' + (ok ? 'ok' : 'err'); status.textContent = msg; }

  var F = function (n) { return ef.elements.namedItem(n); };
  ef.addEventListener('submit', function (e) {
    e.preventDefault();
    if (F('_hp').value) return;
    var name = F('name').value.trim(), email = F('email').value.trim(), country = F('country').value;
    if (!name || !email || !country) return say('Please enter your name, email and country or region.', false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say('Please enter a valid email address.', false);
    if (!lines.length) return say('Please add at least one part, or describe a part that is not listed.', false);
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i], q = String(l.qty || '').trim();
      if (l.pid && !/^[1-9][0-9]{0,5}$/.test(q)) return say('Line ' + (i + 1) + ': quantity must be a whole number of 1 or more.', false);
      if (!l.pid && q && !/^[1-9][0-9]{0,5}$/.test(q)) return say('Line ' + (i + 1) + ': quantity must be a whole number, or left blank.', false);
      if (!l.pid && !String(l.desc || '').trim()) return say('Line ' + (i + 1) + ': please describe the part.', false);
    }
    var files = F('files').files;
    if (files.length > 5) return say('Please attach no more than 5 files.', false);
    for (var j = 0; j < files.length; j++) {
      if (files[j].size > 5 * 1024 * 1024) return say(files[j].name + ' is larger than 5 MB.', false);
      if (!/\.(jpe?g|png|webp|pdf)$/i.test(files[j].name)) return say(files[j].name + ' is not a JPG, PNG, WebP or PDF file.', false);
    }

    var fd = new FormData();
    ['name', 'email', 'country', 'company', 'phone', 'postcode', 'needed_by', 'notes'].forEach(function (k) { fd.append(k, F(k).value.trim()); });
    fd.append('marketing', F('marketing').checked ? 'yes' : 'no');
    fd.append('items', JSON.stringify(lines.map(function (l) { return { product_id: l.pid, model: l.model, part_number: l.part, quantity: l.qty, description: l.desc }; })));
    try {
      fd.append('source_page', sessionStorage.getItem('dny_cta_page') || document.referrer || '');
      fd.append('landing_page', sessionStorage.getItem('dny_landing') || '');
    } catch (err) { /* storage unavailable */ }
    for (var k = 0; k < files.length; k++) fd.append('files', files[k]);

    var btn = ef.querySelector('[data-submit]');
    btn.disabled = true; btn.textContent = 'Submitting…';
    say('Submitting your enquiry…', true);
    fetch('/api/enquiries', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || !res.j.reference) throw new Error(res.j.error || 'The enquiry could not be saved.');
        lines = []; save();
        var done = document.querySelector('[data-done]');
        done.querySelector('[data-ref]').textContent = res.j.reference;
        done.querySelector('[data-email]').textContent = email;
        ef.hidden = true; done.hidden = false;
        done.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function (err) {
        say((err && err.message ? err.message : 'The enquiry could not be submitted.') + ' Your details are still here, please try again.', false);
        btn.disabled = false; btn.textContent = 'Submit Enquiry';
      });
  });
})();
