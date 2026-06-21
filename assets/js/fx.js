/* ============================================================
   DNY — TECH-DYNAMIC V4 EFFECTS
   1) Hero 3D dot-matrix globe + cross-border light arcs
   2) Glow cursor with trailing sparks
   3) Scroll narrative: per-word title reveal, directional &
      staggered section entrances, parallax watermarks
   Brand palette only: gold #E4A535, cyan #38BDF8, navy.
============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var GOLD = '228,165,53';
  var CYAN = '56,189,248';

  /* ========================================================
     1) HERO 3D DOT-MATRIX GLOBE + CROSS-BORDER ARCS
  ======================================================== */
  (function () {
    if (reduce) return;
    var host = document.querySelector('.hero-visual') || document.querySelector('.hero');
    if (!host) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'hero-globe';
    canvas.setAttribute('aria-hidden', 'true');
    host.insertBefore(canvas, host.firstChild);
    var ctx = canvas.getContext('2d');

    var dpr, W, H, CX, CY, R;
    var dots = [];        // points on the sphere
    var arcs = [];        // travelling light pulses
    var rot = 4.0;        // rotation angle (Y axis) — start with Australia facing viewer
    var tilt = -0.42;     // fixed X tilt
    var mouseX = 0, targetMouseX = 0;

    // Australia approximate lat/lng (Sydney) as the broadcast origin
    var ORIGIN = { lat: -33.8, lng: 151.2 };
    // market endpoints: China, ASEAN, Oceania/NZ, Global(Europe)
    var TARGETS = [
      { lat: 31.2,  lng: 121.5 }, // Shanghai (China)
      { lat: 1.35,  lng: 103.8 }, // Singapore (ASEAN)
      { lat: -41.0, lng: 174.8 }, // Wellington (Oceania)
      { lat: 51.5,  lng: -0.1  }  // London (Global)
    ];

    function toVec(lat, lng) {
      var phi = (90 - lat) * Math.PI / 180;
      var theta = (lng + 180) * Math.PI / 180;
      return {
        x: -Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      };
    }

    // Coarse land bounding boxes [latMin, latMax, lngMin, lngMax].
    // Used to classify a lat/lng as land so the globe shows continents,
    // with Australia flagged for highlight.
    var LAND = [
      // Australia (highlight)
      { box: [-39, -11, 113, 154], au: true },
      // Tasmania
      { box: [-43.6, -40, 144, 148.5], au: true },
      // New Zealand
      { box: [-47, -34, 166, 178] },
      // SE Asia / ASEAN archipelago
      { box: [-10, 7, 95, 141] },
      { box: [5, 21, 97, 110] },        // Indochina
      // China + East Asia
      { box: [20, 53, 100, 135] },
      { box: [30, 46, 128, 146] },      // Japan/Korea
      // India + South Asia
      { box: [6, 35, 68, 90] },
      // Middle East
      { box: [12, 40, 35, 60] },
      // Africa
      { box: [-35, 12, -17, 52] },
      { box: [10, 37, -10, 35] },       // N Africa
      // Europe
      { box: [36, 60, -10, 40] },
      { box: [60, 71, 5, 60] },         // Scandinavia
      // Russia / N Asia
      { box: [50, 70, 60, 180] },
      // North America
      { box: [25, 60, -125, -65] },
      { box: [55, 72, -160, -60] },     // Canada north
      { box: [14, 30, -118, -86] },     // Mexico
      // South America
      { box: [-55, 12, -81, -35] }
    ];

    function isLand(lat, lng) {
      for (var i = 0; i < LAND.length; i++) {
        var b = LAND[i].box;
        if (lat >= b[0] && lat <= b[1] && lng >= b[2] && lng <= b[3]) {
          return LAND[i].au ? 2 : 1; // 2 = Australia, 1 = other land
        }
      }
      return 0;
    }

    function build() {
      // Even fibonacci-sphere lattice — full, regular dot globe.
      // Australia/land points are flagged for highlight but the whole
      // sphere is uniformly covered for a clean tech look.
      dots = [];
      var n = innerWidth < 1000 ? 900 : 1500;
      var off = 2 / n, inc = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < n; i++) {
        var y = i * off - 1 + off / 2;
        var r = Math.sqrt(1 - y * y);
        var p = i * inc;
        var x = Math.cos(p) * r, z = Math.sin(p) * r;
        // recover lat/lng from the unit vector to test landmass
        var lat = Math.asin(y) * 180 / Math.PI;
        var lng = Math.atan2(z, -x) * 180 / Math.PI - 180;
        if (lng < -180) lng += 360; if (lng > 180) lng -= 360;
        dots.push({ x: x, y: y, z: z, kind: isLand(lat, lng) });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Use the canvas's actual rendered box (CSS may scale it beyond host).
      var rect = canvas.getBoundingClientRect();
      var cw = rect.width || host.getBoundingClientRect().width;
      var ch = rect.height || host.getBoundingClientRect().height;
      W = canvas.width = cw * dpr;
      H = canvas.height = ch * dpr;
      CX = W / 2; CY = H / 2;
      R = Math.min(W, H) * 0.46;
      build();
    }

    // rotate a unit vector around Y then tilt around X
    function project(v, ry) {
      var cosY = Math.cos(ry), sinY = Math.sin(ry);
      var x1 = v.x * cosY - v.z * sinY;
      var z1 = v.x * sinY + v.z * cosY;
      var cosX = Math.cos(tilt), sinX = Math.sin(tilt);
      var y1 = v.y * cosX - z1 * sinX;
      var z2 = v.y * sinX + z1 * cosX;
      return { x: x1, y: y1, z: z2 };
    }

    function spawnArc() {
      var t = TARGETS[Math.floor(Math.random() * TARGETS.length)];
      arcs.push({
        a: toVec(ORIGIN.lat, ORIGIN.lng),
        b: toVec(t.lat, t.lng),
        t: 0,
        speed: 0.006 + Math.random() * 0.006,
        color: Math.random() > 0.5 ? GOLD : CYAN
      });
    }

    function slerp(a, b, t) {
      var dot = a.x*b.x + a.y*b.y + a.z*b.z;
      dot = Math.max(-1, Math.min(1, dot));
      var om = Math.acos(dot);
      if (om < 1e-4) return a;
      var so = Math.sin(om);
      var s1 = Math.sin((1 - t) * om) / so;
      var s2 = Math.sin(t * om) / so;
      // lift arc above surface (altitude bulge mid-flight)
      var alt = 1 + 0.35 * Math.sin(Math.PI * t);
      return {
        x: (a.x*s1 + b.x*s2) * alt,
        y: (a.y*s1 + b.y*s2) * alt,
        z: (a.z*s1 + b.z*s2) * alt
      };
    }

    var lastSpawn = 0;
    function frame(now) {
      ctx.clearRect(0, 0, W, H);
      mouseX += (targetMouseX - mouseX) * 0.05;
      rot += 0.0011;
      var ry = rot + mouseX * 0.6;

      // glow halo
      var grd = ctx.createRadialGradient(CX, CY, R*0.2, CX, CY, R*1.5);
      grd.addColorStop(0, 'rgba(' + GOLD + ',0.06)');
      grd.addColorStop(1, 'rgba(' + GOLD + ',0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // Full even dot globe. Whole sphere drawn; back hemisphere dimmed.
      // Land = gold, Australia = bright pulsing, ocean = faint cyan lattice.
      var auPulse = (Math.sin(now * 0.0035) + 1) / 2;
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var p = project(d, ry);
        var depth = (p.z + 1) / 2;            // 0 back .. 1 front
        var sx = CX + p.x * R;
        var sy = CY + p.y * R;
        var size, color, alpha;
        if (d.kind === 2) {                   // Australia — bright, larger, pulsing
          size = (1.4 + depth * 2.0) * dpr;
          color = GOLD;
          alpha = (0.30 + depth * 0.6) * (0.75 + auPulse * 0.25);
        } else if (d.kind === 1) {            // other land — gold
          size = (0.8 + depth * 1.5) * dpr;
          color = GOLD;
          alpha = 0.12 + depth * 0.6;
        } else {                              // ocean lattice — faint cyan
          size = (0.5 + depth * 1.0) * dpr;
          color = CYAN;
          alpha = 0.05 + depth * 0.22;
        }
        if (d.kind === 2 && depth > 0.5) { ctx.shadowBlur = 7 * dpr; ctx.shadowColor = 'rgba(' + GOLD + ',0.9)'; }
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + alpha.toFixed(3) + ')';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // origin marker (Australia) pulse
      var o = project(toVec(ORIGIN.lat, ORIGIN.lng), ry);
      if (o.z > -0.2) {
        var ox = CX + o.x * R, oy = CY + o.y * R;
        var pulse = (Math.sin(now * 0.004) + 1) / 2;
        ctx.beginPath();
        ctx.arc(ox, oy, (2 + pulse * 4) * dpr, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(' + GOLD + ',' + (0.5 + pulse*0.4) + ')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(ox, oy, (6 + pulse * 10) * dpr, 0, Math.PI*2);
        ctx.strokeStyle = 'rgba(' + GOLD + ',' + (0.4 - pulse*0.3) + ')';
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      }

      // spawn arcs over time
      if (now - lastSpawn > 900) { spawnArc(); lastSpawn = now; }

      // draw arcs
      for (var k = arcs.length - 1; k >= 0; k--) {
        var arc = arcs[k];
        arc.t += arc.speed;
        if (arc.t >= 1) { arcs.splice(k, 1); continue; }
        var segs = 26;
        ctx.beginPath();
        var started = false;
        for (var s = 0; s <= segs; s++) {
          var tt = (s / segs) * arc.t;          // draw trailing comet up to head
          var pt = slerp(arc.a, arc.b, tt);
          var pr = project(pt, ry);
          var px = CX + pr.x * R, py = CY + pr.y * R;
          if (pr.z < -0.9) { started = false; continue; }
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(' + arc.color + ',' + (0.65 * (1 - arc.t * 0.3)) + ')';
        ctx.lineWidth = 1.4 * dpr;
        ctx.shadowBlur = 8 * dpr;
        ctx.shadowColor = 'rgba(' + arc.color + ',0.8)';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // comet head
        var head = slerp(arc.a, arc.b, arc.t);
        var hp = project(head, ry);
        if (hp.z > -0.9) {
          ctx.beginPath();
          ctx.arc(CX + hp.x * R, CY + hp.y * R, 2.4 * dpr, 0, Math.PI*2);
          ctx.fillStyle = 'rgba(' + arc.color + ',0.95)';
          ctx.fill();
        }
      }

      requestAnimationFrame(frame);
    }

    window.addEventListener('mousemove', function (e) {
      targetMouseX = (e.clientX / innerWidth - 0.5);
    }, { passive: true });

    resize();
    // re-measure after layout/CSS settles (canvas is CSS-scaled to 130%)
    requestAnimationFrame(resize);
    setTimeout(resize, 250);
    window.addEventListener('load', resize);
    window.addEventListener('resize', resize);
    // seed a few arcs
    for (var z = 0; z < 2; z++) spawnArc();
    requestAnimationFrame(frame);
  })();

  /* ========================================================
     2) GLOW CURSOR + TRAILING SPARKS
  ======================================================== */
  (function () {
    if (reduce || !fine) return;
    document.body.classList.add('has-glow-cursor');

    var ring = document.createElement('div'); ring.className = 'glow-cursor';
    var dot  = document.createElement('div'); dot.className  = 'glow-cursor-dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    var rx = innerWidth/2, ry = innerHeight/2, dx = rx, dy = ry, tx = rx, ty = ry;
    var lastSpark = 0;

    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      dx = e.clientX; dy = e.clientY;
      var now = performance.now();
      if (now - lastSpark > 28) {
        lastSpark = now;
        var sp = document.createElement('div');
        sp.className = 'cursor-spark';
        var gold = Math.random() > 0.45;
        sp.style.left = e.clientX + 'px';
        sp.style.top = e.clientY + 'px';
        sp.style.background = 'rgba(' + (gold ? GOLD : CYAN) + ',0.9)';
        sp.style.boxShadow = '0 0 8px rgba(' + (gold ? GOLD : CYAN) + ',0.9)';
        document.body.appendChild(sp);
        setTimeout(function(){ sp.remove(); }, 700);
      }
    }, { passive: true });

    function loop() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      dot.style.transform  = 'translate(' + dx + 'px,' + dy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    }
    loop();

    // enlarge over interactive elements
    var hot = 'a, button, .btn, .card, .svc-card, .corridor-card, input, select, textarea, .pill';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hot)) ring.classList.add('is-hot');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hot)) ring.classList.remove('is-hot');
    });
    document.addEventListener('mousedown', function(){ ring.classList.add('is-hot'); });
    document.addEventListener('mouseup',   function(){ ring.classList.remove('is-hot'); });
  })();

  /* ========================================================
     3) SCROLL NARRATIVE
  ======================================================== */

  // 3a) Split hero H1 into animated words
  (function () {
    var h1 = document.getElementById('hero-heading');
    if (!h1) return;
    // wrap each top-level text node's words; keep <em>/<br> intact
    var nodes = Array.prototype.slice.call(h1.childNodes);
    h1.classList.add('word-anim');
    nodes.forEach(function (node) {
      if (node.nodeType === 3) { // text
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (tok) {
          if (tok.trim() === '') { frag.appendChild(document.createTextNode(tok)); return; }
          var span = document.createElement('span');
          span.className = 'w'; span.textContent = tok;
          frag.appendChild(span);
        });
        h1.replaceChild(frag, node);
      } else if (node.nodeType === 1 && node.tagName === 'EM') {
        node.classList.add('w'); // animate the gradient word as one unit
      }
    });
    // stagger delays
    var ws = h1.querySelectorAll('.w');
    ws.forEach(function (w, i) { w.style.transitionDelay = (0.06 * i) + 's'; });
    if (reduce) { h1.classList.add('in'); return; }
    requestAnimationFrame(function(){ setTimeout(function(){ h1.classList.add('in'); }, 200); });
  })();

  // 3b) Directional + staggered reveals via IntersectionObserver
  (function () {
    // auto-tag grids for stagger
    document.querySelectorAll('.values-grid, .svc-grid, .grid-3, .grid-4, .corridor-grid')
      .forEach(function (g) { g.classList.add('stagger', 'reveal-aux'); });
    document.querySelectorAll('.reveal-l, .reveal-r').forEach(function(e){ e.classList.add('reveal-aux'); });

    var targets = document.querySelectorAll('.reveal-aux, .section-head');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function(t){ t.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    targets.forEach(function (t) {
      var r = t.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) t.classList.add('visible');
      else io.observe(t);
    });
  })();

  // 3c) Section number watermarks + parallax
  (function () {
    if (reduce) return;
    var labels = {
      about: '01', desk: '02', services: '03', pillars: '04',
      corridors: '05', projects: '06', serve: '07', compliance: '08', contact: '09'
    };
    var marks = [];
    Object.keys(labels).forEach(function (id) {
      var sec = document.getElementById(id);
      if (!sec) return;
      if (getComputedStyle(sec).position === 'static') sec.style.position = 'relative';
      var w = document.createElement('div');
      w.className = 'sec-watermark';
      w.textContent = labels[id];
      sec.appendChild(w);
      marks.push({ el: w, sec: sec });
    });

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var vh = innerHeight;
        marks.forEach(function (m) {
          var r = m.sec.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var prog = (vh - r.top) / (vh + r.height); // 0..1 through viewport
          m.el.style.transform = 'translateY(' + ((prog - 0.5) * 80) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  })();

  // 3d) Hero scales/fades subtly as you scroll past it
  (function () {
    if (reduce) return;
    var content = document.querySelector('.hero-content');
    if (!content) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var f = Math.min(y / 600, 1);
        content.style.opacity = (1 - f * 0.85).toFixed(3);
        content.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        ticking = false;
      });
    }, { passive: true });
  })();

})();
