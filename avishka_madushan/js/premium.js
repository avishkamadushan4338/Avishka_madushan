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

  /* ── Hide splash after DURATION ms ── */
  setTimeout(function () {
    splash.classList.add('splash-hide');
    if (splashAnimId) cancelAnimationFrame(splashAnimId);
    /* Remove from DOM after CSS transition (0.8s) so it can't block mobile touch/scroll */
    setTimeout(function () {
      splash.style.display = 'none';
    }, 900);
  }, DURATION);
})();


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
    let tracking = false;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      if (!tracking) {
        tracking = true;
        rx = mx; ry = my; /* snap the ring to the pointer instead of easing in from the corner */
        document.documentElement.classList.add('p-cursor-ready'); /* only now hide the real OS cursor */
      }
    });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    const hoverSel = 'a, button, .btn, .project-card, .services-1, .glass-card, .blog-entry, .skill-card, .skill-tags li, .skill-chip[data-projects], .p-top-btn';
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

    /* Hero role-word rotator and typing effect now live inline in
       index.html (css/hero.css's .hero-2030__role-word) — the old
       .slider-item/.one-third targets here were removed with the
       owl-carousel hero markup. */

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
      document.querySelectorAll('.btn-primary, .btn-white, .contact-cta-btn').forEach(btn => {
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

    /* ── SERVICES: reveal-on-scroll for the premium bento cards ── */
    const serviceCards = document.querySelectorAll('.services-1');
    if (serviceCards.length) {
      const svcObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services-in-view');
            svcObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      serviceCards.forEach(card => svcObs.observe(card));
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

  /* Small delay so init() runs after other page libs have settled */
  setTimeout(init, 450);

})();

/* ── SKILLS SECTION: accordion categories + skill-to-project linking ── */
(function () {
  const groups = document.querySelectorAll('.skills-group');
  if (!groups.length) return;

  groups.forEach(group => {
    const trigger = group.querySelector('.skills-group-title');
    const panel = group.querySelector('.skills-grid');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = group.classList.contains('is-open');

      groups.forEach(g => {
        g.classList.remove('is-open');
        const t = g.querySelector('.skills-group-title');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        group.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const chips = document.querySelectorAll('.skill-chip[data-projects]');
  chips.forEach(chip => {
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('role', 'button');

    const activate = () => {
      const keys = chip.getAttribute('data-projects').split(',').map(k => k.trim()).filter(Boolean);
      if (!keys.length) return;

      document.querySelectorAll('.project-card.is-skill-match').forEach(el => el.classList.remove('is-skill-match'));

      const cards = keys
        .map(key => document.querySelector(`.project-card[data-project="${key}"]`))
        .filter(Boolean);
      if (!cards.length) return;

      cards.forEach(card => card.classList.add('is-skill-match'));
      cards[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        cards.forEach(card => card.classList.remove('is-skill-match'));
      }, 3200);
    };

    chip.addEventListener('click', activate);
    chip.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });
})();
