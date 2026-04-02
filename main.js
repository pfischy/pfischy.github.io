(function () {
  'use strict';

  var steps   = document.querySelectorAll('#journey .journey-step');
  var panel   = document.querySelector('#journey .journey-panel');
  var panelText = document.querySelector('#journey .journey-panel-text');

  if (!steps.length || !panel || !panelText) return;

  function activate(step) {
    steps.forEach(function (s) {
      s.classList.remove('is-active');
      s.setAttribute('aria-pressed', 'false');
    });
    step.classList.add('is-active');
    step.setAttribute('aria-pressed', 'true');
    panelText.textContent = step.dataset.description;
    panel.classList.add('is-visible');
  }

  steps.forEach(function (step) {
    step.addEventListener('click', function () {
      activate(step);
    });
    step.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(step);
      }
    });
  });

  // Activate first step by default
  activate(steps[0]);
}());

// Scrollspy
(function () {
  'use strict';

  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  if (!navLinks.length) return;

  var sectionIds = Array.from(navLinks).map(function (a) {
    return a.getAttribute('href').slice(1);
  });

  var sections = sectionIds.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('is-active');
      } else {
        a.classList.remove('is-active');
      }
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
}());

// Method section
(function () {
  'use strict';

  var steps = document.querySelectorAll('#method .method-step');
  if (!steps.length) return;

  function activate(step) {
    steps.forEach(function (s) {
      s.classList.remove('is-active');
      s.setAttribute('aria-expanded', 'false');
    });
    step.classList.add('is-active');
    step.setAttribute('aria-expanded', 'true');
  }

  steps.forEach(function (step) {
    step.addEventListener('click', function () {
      activate(step);
    });
    step.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(step);
      }
    });
  });

  activate(steps[0]);
}());
