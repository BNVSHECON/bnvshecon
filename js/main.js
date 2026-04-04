/**
 * BNV SHE CON – Main JavaScript
 * Handles: Navigation, Animations, Counter, Marquee, Form, Back-to-Top
 */

'use strict';

/* ═══════════════════════════════════════════════════
   1. DOM READY
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initActiveLink();
  initScrollReveal();
  initCounters();
  initApproachSteps();
  initMarquee();
  initEnquiryForm();
  initBackToTop();
  setFooterYear();
});

/* ═══════════════════════════════════════════════════
   2. NAVBAR — Scroll behaviour
═══════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}

/* ═══════════════════════════════════════════════════
   3. HAMBURGER MENU
═══════════════════════════════════════════════════ */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen);
    // Animate hamburger → X
    const spans = btn.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu when a link is clicked
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

/* ═══════════════════════════════════════════════════
   4. ACTIVE NAV LINK on scroll
═══════════════════════════════════════════════════ */
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(sec => observer.observe(sec));
}

/* ═══════════════════════════════════════════════════
   5. SCROLL REVEAL
═══════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger by index within parent
          const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   6. ANIMATED COUNTERS
═══════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const animateCounter = el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start    = performance.now();

    const tick = now => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   7. APPROACH STEPS — hover highlight
═══════════════════════════════════════════════════ */
function initApproachSteps() {
  const steps = document.querySelectorAll('.approach-step');
  if (!steps.length) return;

  steps.forEach(step => {
    step.addEventListener('mouseenter', () => {
      steps.forEach(s => s.classList.remove('active-step'));
      step.classList.add('active-step');
    });
  });

  // Activate first step by default
  if (steps[0]) steps[0].classList.add('active-step');
}

/* ═══════════════════════════════════════════════════
   8. MARQUEE DUPLICATION for seamless loop
═══════════════════════════════════════════════════ */
function initMarquee() {
  const track = document.getElementById('clients-track');
  if (!track) return;

  // Clone all children and append for seamless loop
  const clone = track.innerHTML;
  track.innerHTML += clone;
}

/* ═══════════════════════════════════════════════════
   9. ENQUIRY FORM — Formspree submission
═══════════════════════════════════════════════════ */
function initEnquiryForm() {
  const form       = document.getElementById('enquiry-form');
  if (!form) return;

  const nameInput  = document.getElementById('enquiry-name');
  const phoneInput = document.getElementById('enquiry-phone');
  const purposeInput = document.getElementById('enquiry-purpose');
  const submitBtn  = document.getElementById('submit-btn');
  const btnText    = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  // ── Validation helpers ──
  const showError = (groupId, show) => {
    const group = document.getElementById(groupId);
    if (group) group.classList.toggle('error', show);
  };

  const validateName = () => {
    const val = nameInput.value.trim();
    showError('form-group-name', val.length < 2);
    return val.length >= 2;
  };

  const validatePhone = () => {
    const val = phoneInput.value.trim();
    const valid = /^[\+]?[\d\s\-\(\)]{7,16}$/.test(val);
    showError('form-group-phone', !valid);
    return valid;
  };

  const validatePurpose = () => {
    const val = purposeInput.value.trim();
    showError('form-group-purpose', val.length < 10);
    return val.length >= 10;
  };

  // ── Live validation ──
  nameInput?.addEventListener('blur', validateName);
  phoneInput?.addEventListener('blur', validatePhone);
  purposeInput?.addEventListener('blur', validatePurpose);

  // Clear errors on input
  [nameInput, phoneInput, purposeInput].forEach(el => {
    el?.addEventListener('input', () => {
      const groupId = el.closest('.form-group')?.id;
      if (groupId) showError(groupId, false);
    });
  });

  // ── Form submit ──
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const isValid = [validateName(), validatePhone(), validatePurpose()]
      .every(Boolean);

    if (!isValid) return;

    // Show loading state
    if (btnText)    btnText.hidden    = true;
    if (btnLoading) btnLoading.hidden = false;
    if (submitBtn)  submitBtn.disabled = true;
    if (successMsg) successMsg.hidden = true;
    if (errorMsg)   errorMsg.hidden   = true;

    const payload = {
      name:    nameInput.value.trim(),
      phone:   phoneInput.value.trim(),
      purpose: purposeInput.value.trim(),
      _subject: `New Enquiry from ${nameInput.value.trim()} – BNV SHE CON`,
    };

    try {
      /* ── Formspree endpoint ──
         Replace YOUR_FORMSPREE_ID below with your actual Formspree form ID.
         Sign up free at https://formspree.io → create a form → copy the ID.
         Example: https://formspree.io/f/xpwzabcd  →  ID = xpwzabcd          */
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Success
        form.reset();
        if (successMsg) successMsg.hidden = false;
        successMsg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Enquiry form error:', err);
      if (errorMsg) errorMsg.hidden = false;
      errorMsg?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      if (btnText)    btnText.hidden    = false;
      if (btnLoading) btnLoading.hidden = true;
      if (submitBtn)  submitBtn.disabled = false;
    }
  });
}

/* ═══════════════════════════════════════════════════
   10. BACK TO TOP BUTTON
═══════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ═══════════════════════════════════════════════════
   11. FOOTER YEAR
═══════════════════════════════════════════════════ */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
