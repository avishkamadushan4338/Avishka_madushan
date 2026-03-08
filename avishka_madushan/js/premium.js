/* ═══════════════════════════════════════════════════════════
   PREMIUM PORTFOLIO — Avishka Madushan
   Interactive Animations: Cursor · Particles · Tilt · Typing
   ═══════════════════════════════════════════════════════════ */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SPLASH SCREEN  (7-second welcome)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function () {
  var DURATION = 4000;
  var splash   = document.getElementById('splash-screen');
  var bar      = document.getElementById('splash-bar');
  if (!splash) return;

  document.body.style.overflow = 'hidden';

  /* ── Animated particle background on the splash ── */
  var pCanvas = document.getElementById('splash-particles');
  var splashAnimId;
  if (pCanvas) {
    var ctx = pCanvas.getContext('2d');
    function resizePC() {
      pCanvas.width  = window.innerWidth;
      pCanvas.height = window.innerHeight;
    }
    resizePC();
    window.addEventListener('resize', resizePC, { passive: true });

    var pts = Array.from({ length: 90 }, function () {
      return {
        x:  Math.random() * pCanvas.width,
        y:  Math.random() * pCanvas.height,
        r:  Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        a:  Math.random() * 0.45 + 0.1
      };
    });

    function drawSplash() {
      ctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      pts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > pCanvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > pCanvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#F96D00';
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      splashAnimId = requestAnimationFrame(drawSplash);
    }
    drawSplash();
  }

  /* ── Progress bar animates over exactly DURATION ms ── */
  if (bar) {
    bar.style.transition = 'width ' + DURATION + 'ms linear';
    void bar.offsetWidth; /* force reflow so transition fires from 0 */
    bar.style.width = '100%';
  }

  /* ── Hide splash after 7 s, then fire confetti ── */
  setTimeout(function () {
    splash.classList.add('splash-hide');
    document.body.style.overflow = '';
    if (splashAnimId) cancelAnimationFrame(splashAnimId);
    setTimeout(fireConfetti, 750); /* wait for the CSS fade-out */
  }, DURATION);
})();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RIBBON POPPERS  (fires once after splash)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function fireConfetti() {
  var canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  var COLORS = ['#F96D00','#ff8c38','#ffe066','#ffffff','#e85d04',
                '#38ef7d','#6a82fb','#fc5c7d','#ffd200','#00d2ff',
                '#c471ed','#f64f59','#43e97b','#fa709a'];
  var ribbons = [];

  function burst(x, y, n, aMin, aMax) {
    for (var i = 0; i < n; i++) {
      var angle = (aMin + Math.random() * (aMax - aMin)) * Math.PI / 180;
      var spd   = Math.random() * 14 + 6;
      ribbons.push({
        x: x, y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        len:  Math.random() * 22 + 16,   /* ribbon length */
        wid:  Math.random() * 3  + 2,    /* ribbon width  */
        c:    COLORS[Math.floor(Math.random() * COLORS.length)],
        rot:  Math.random() * 360,
        rs:   (Math.random() - 0.5) * 7, /* spin speed    */
        phase:     Math.random() * Math.PI * 2, /* wave phase    */
        phaseSpd:  0.18 + Math.random() * 0.18, /* wave speed    */
        flutter:   Math.random() * 0.6 + 0.4,   /* flutter amp   */
        grav: 0.22,
        drag: 0.991,
        life: 1,
        dec:  Math.random() * 0.010 + 0.006
      });
    }
  }

  var W = canvas.width, H = canvas.height;
  burst(0,         H,       95, -118, -22);  /* bottom-left  */
  burst(W,         H,       95, -158, -62);  /* bottom-right */
  burst(W * 0.5,   0,       65,   42, 138);  /* top-centre   */
  burst(W * 0.22,  H,       55, -130, -50);  /* extra-left   */
  burst(W * 0.78,  H,       55, -130, -50);  /* extra-right  */

  /* Draw one ribbon as a curling bezier strip */
  function drawRibbon(p) {
    var half   = p.len / 2;
    var wave   = Math.sin(p.phase) * p.wid * p.flutter;
    var shadow = Math.cos(p.phase);          /* fake 3-D shading */

    ctx.save();
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);

    /* Front face */
    ctx.beginPath();
    ctx.moveTo(-half, 0);
    ctx.bezierCurveTo(-half / 2, -p.wid + wave,
                       half / 2,  p.wid - wave,
                       half, 0);
    ctx.bezierCurveTo( half / 2,  p.wid - wave + p.wid,
                      -half / 2, -p.wid + wave + p.wid,
                      -half, p.wid);
    ctx.closePath();
    ctx.fillStyle = p.c;
    ctx.fill();

    /* Shading overlay to fake twist depth */
    if (shadow < 0) {
      ctx.globalAlpha = Math.max(p.life, 0) * Math.abs(shadow) * 0.35;
      ctx.fillStyle   = '#000';
      ctx.fill();
    }

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var alive = false;
    ribbons.forEach(function (p) {
      if (p.life <= 0) return;
      alive     = true;
      p.x      += p.vx;
      p.y      += p.vy;
      p.vy     += p.grav;
      p.vx     *= p.drag;
      p.rot    += p.rs;
      p.phase  += p.phaseSpd;
      p.life   -= p.dec;
      drawRibbon(p);
    });
    if (alive) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, W, H);
  }
  draw();
}

(function () {
  'use strict';

  const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches;

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     CUSTOM CURSOR  (non-touch only)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (!IS_TOUCH) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'p-cursor-dot';
    ring.className = 'p-cursor-ring';
    document.body.append(dot, ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    const hoverSel = 'a, button, .btn, .project-card, .services-1, .glass-card, .blog-entry, .soft-skills-list li, .p-top-btn';
    document.querySelectorAll(hoverSel).forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });

    /* Click sparkle burst */
    document.addEventListener('click', e => {
      const s = document.createElement('div');
      s.className = 'p-sparkle';
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:#F96D00;`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 650);
    });
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL PROGRESS BAR
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const bar = document.createElement('div');
  bar.className = 'p-scroll-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100) + '%';
  }, { passive: true });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     SCROLL-TO-TOP BUTTON
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  const topBtn = document.createElement('a');
  topBtn.className = 'p-top-btn';
  topBtn.href = '#home-section';
  topBtn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
  document.body.appendChild(topBtn);

  topBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Everything that needs DOM + libraries ready
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  function init() {

    /* ── HERO: Floating Shapes ── */
    const hero = document.querySelector('#home-section');
    if (hero) {
      const wrap = document.createElement('div');
      wrap.className = 'p-float-wrap';
      for (let i = 0; i < 3; i++) {
        const s = document.createElement('div');
        s.className = 'p-shape';
        wrap.appendChild(s);
      }
      hero.style.position = 'relative';
      hero.appendChild(wrap);
    }

    /* ── HERO: Canvas Particle Network ── */
    if (hero) {
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
      hero.insertBefore(canvas, hero.firstChild);

      const ctx = canvas.getContext('2d');
      const COLORS = ['#F96D00', '#e85d04', '#ff8c38'];

      function resizeCanvas() {
        canvas.width  = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas, { passive: true });

      const particles = Array.from({ length: 72 }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.44,
        vy: (Math.random() - 0.5) * 0.44,
        c:  COLORS[Math.floor(Math.random() * 3)],
        a:  Math.random() * 0.45 + 0.1,
      }));

      function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.c;
          ctx.globalAlpha = p.a;
          ctx.fill();
        });

        /* Connection lines between nearby particles */
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d  = Math.hypot(dx, dy);
            if (d < 115) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = '#F96D00'; /* keep orange */
              ctx.globalAlpha = (1 - d / 115) * 0.13;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    /* ── HERO: Typing Effect ── */
    const heroH2 = document.querySelector('.owl-item:not(.cloned) .slider-item h2.mb-4');
    if (heroH2) {
      const texts = ['An Undergraduate', 'A Web Developer', 'A Problem Solver', 'A Creative Coder'];
      let ti = 0, ci = 0, deleting = false;

      const tSpan = document.createElement('span');
      const tCur  = document.createElement('span');
      tCur.className = 'p-type-cursor';
      heroH2.textContent = '';
      heroH2.append(tSpan, tCur);

      function type() {
        const word = texts[ti];
        tSpan.textContent = deleting ? word.slice(0, --ci) : word.slice(0, ++ci);
        let delay = deleting ? 55 : 105;
        if (!deleting && ci === word.length) { delay = 2200; deleting = true; }
        else if (deleting && ci === 0)       { deleting = false; ti = (ti + 1) % texts.length; delay = 380; }
        setTimeout(type, delay);
      }
      setTimeout(type, 1000);
    }

    /* ── HERO: Mouse Parallax on Image ── */
    if (!IS_TOUCH && hero) {
      const heroImg = hero.querySelector('.one-third.img');
      if (heroImg) {
        document.addEventListener('mousemove', e => {
          const x = (e.clientX / window.innerWidth  - 0.5) * 14;
          const y = (e.clientY / window.innerHeight - 0.5) * 14;
          heroImg.style.transform = `translate(${x}px, ${y}px)`;
        });
      }
    }

    /* ── 3D TILT + SPOTLIGHT on Cards ── */
    document.querySelectorAll('.project-card, .services-1').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const x  = e.clientX - r.left;
        const y  = e.clientY - r.top;
        const cx = r.width  / 2;
        const cy = r.height / 2;
        const rX = ((y - cy) / cy) * -7;
        const rY = ((x - cx) / cx) * 7;
        el.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(10px)`;
        el.style.setProperty('--mx', ((x / r.width)  * 100) + '%');
        el.style.setProperty('--my', ((y / r.height) * 100) + '%');
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        el.style.setProperty('--mx', '50%');
        el.style.setProperty('--my', '50%');
      });
    });

    /* ── MAGNETIC BUTTONS ── */
    if (!IS_TOUCH) {
      document.querySelectorAll('.btn-primary, .btn-white').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const r  = btn.getBoundingClientRect();
          const dx = e.clientX - r.left - r.width  / 2;
          const dy = e.clientY - r.top  - r.height / 2;
          btn.style.transform = `translate(${dx * 0.16}px, ${dy * 0.16}px) translateY(-3px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transition = 'transform .45s cubic-bezier(.175,.885,.32,1.275)';
          btn.style.transform  = '';
          setTimeout(() => { btn.style.transition = ''; }, 450);
        });
      });
    }

    /* ── COUNTER ENTRANCE ANIMATION ── */
    const numEl = document.querySelector('.counter-wrap .number');
    if (numEl) {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          numEl.style.animation = 'none';
          void numEl.offsetWidth; /* reflow */
          numEl.style.animation = 'pCounterPop .85s cubic-bezier(.22,1,.36,1) forwards';
          obs.disconnect();
        }
      }, { threshold: 0.6 });
      obs.observe(numEl);
    }

  } /* end init() */

  /* Run init after Owl Carousel & other libs have initialized */
  setTimeout(init, 450);

})();
