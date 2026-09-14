/* ============================================================
   PORTFOLIO ERIK PLACIDO — Interatividade & Animações
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SCROLL REVEAL ─────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ── 2. ANIMATED COUNTERS ─────────────────────────────── */
  const counters = document.querySelectorAll('[data-counter]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const startTime = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function tick(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);
      const current = target * easedProgress;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      el.textContent = prefix + formatted + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* ── 3. SMOOTH SCROLL ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 4. NAV scroll shadow ───────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 40
        ? 'rgba(7, 9, 16, 0.95)'
        : 'rgba(7, 9, 16, 0.75)';
    }, { passive: true });
  }

  /* ── 5. PROTOTYPE FULLSCREEN TOGGLE ─────────────────── */
  const expandBtn = document.getElementById('expand-prototype');
  const iframeWrap = document.querySelector('.prototype-iframe-wrap');
  const iframe = document.querySelector('.prototype-iframe');

  if (expandBtn && iframe) {
    expandBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        iframeWrap.requestFullscreen?.().catch(() => {
          window.open(iframe.src, '_blank');
        });
      } else {
        document.exitFullscreen?.();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        expandBtn.textContent = '⊡ Sair do Fullscreen';
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.borderRadius = '0';
      } else {
        expandBtn.textContent = '⤢ Tela Cheia';
        iframe.style.width = '';
        iframe.style.height = '';
        iframe.style.borderRadius = '';
      }
    });
  }

  /* ── 6. SKILL CHIPS stagger entrance ─────────────────── */
  const chips = document.querySelectorAll('.skill-chip');
  chips.forEach((chip, i) => {
    chip.style.opacity = '0';
    chip.style.transform = 'translateY(12px) scale(0.95)';
    chip.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
  });

  const chipsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chips.forEach(chip => {
            chip.style.opacity = '1';
            chip.style.transform = 'translateY(0) scale(1)';
          });
          chipsObserver.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillsSection = document.querySelector('.skills-cloud');
  if (skillsSection) chipsObserver.observe(skillsSection);

  /* ── 7. PILLAR & SOLUTION CARDS mouse gradient ───────── */
  document.querySelectorAll('.pillar-card, .solution-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  console.log('%cErik Placido — Senior UI Designer · Fintech Portfolio Loaded', 'color:#EA3C36;font-weight:bold;font-size:14px;');
});
