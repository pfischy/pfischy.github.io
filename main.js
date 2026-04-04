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

  var navLinks  = document.querySelectorAll('.nav-link[href^="#"]');
  var railItems = document.querySelectorAll('.rail-item');

  // Build observed section list from rail (superset) + any pill-nav extras
  var seen = {};
  var sectionIds = [];
  document.querySelectorAll('.rail-item .rail-link[href^="#"]').forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (!seen[id]) { seen[id] = true; sectionIds.push(id); }
  });
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    if (!seen[id]) { seen[id] = true; sectionIds.push(id); }
  });

  var sections = sectionIds.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  if (!sections.length) return;

  function setActive(id) {
    navLinks.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
    railItems.forEach(function (item) {
      var link = item.querySelector('.rail-link');
      if (!link) return;
      item.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
    });
    document.dispatchEvent(new CustomEvent('railActivate', { detail: { id: id } }));
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

// Rail blob indicator
(function () {
  'use strict';

  var linksContainer = document.querySelector('.nav-rail .rail-links');
  if (!linksContainer) return;

  // Inject blob SVG into the links list
  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('class', 'rail-blob-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '13');

  var blobPath = document.createElementNS(ns, 'path');
  blobPath.setAttribute('class', 'rail-blob-path');
  svg.appendChild(blobPath);
  linksContainer.appendChild(svg);

  // Map section id -> rail-item element
  var railLinks = linksContainer.querySelectorAll('.rail-link[href^="#"]');
  var itemMap = {};
  railLinks.forEach(function (a) {
    itemMap[a.getAttribute('href').slice(1)] = a.closest('.rail-item');
  });

  // Build a rounded-rect SVG path between yTop and yBot within width w
  function buildPath(yTop, yBot, w, r) {
    r = Math.min(r, (yBot - yTop) / 2, w / 2);
    return [
      'M', 0, yTop + r,
      'Q', 0, yTop, r, yTop,
      'L', w - r, yTop,
      'Q', w, yTop, w, yTop + r,
      'L', w, yBot - r,
      'Q', w, yBot, w - r, yBot,
      'L', r, yBot,
      'Q', 0, yBot, 0, yBot - r,
      'Z'
    ].join(' ');
  }

  function getDotCenterY(item) {
    var dot = item && item.querySelector('.rail-dot');
    if (!dot) return 0;
    var cRect = linksContainer.getBoundingClientRect();
    var dRect = dot.getBoundingClientRect();
    return dRect.top - cRect.top + dRect.height / 2;
  }

  function renderBlob(id) {
    var h = linksContainer.offsetHeight;
    if (!h) return;
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 13 ' + h);

    var item = itemMap[id];
    if (!item) return;

    var cy  = getDotCenterY(item);
    var pad = 7; // vertical padding around dot center
    var d   = buildPath(cy - 4 - pad, cy + 4 + pad, 13, 6.5);

    // Set SVG attribute as fallback, then try CSS property for transition
    blobPath.setAttribute('d', d);
    try { blobPath.style.d = 'path("' + d + '")'; } catch (e) {}
  }

  // Respond to scrollspy active-section changes
  document.addEventListener('railActivate', function (e) {
    renderBlob(e.detail.id);
  });

  // Re-render on resize (dot positions shift if layout reflows)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var activeItem = linksContainer.querySelector('.rail-item.is-active');
      if (activeItem) {
        var link = activeItem.querySelector('.rail-link');
        if (link) renderBlob(link.getAttribute('href').slice(1));
      }
    }, 100);
  });

  // Fallback: render at first item if railActivate hasn't fired within 300ms
  var initTimer = setTimeout(function () {
    if (railLinks.length) renderBlob(railLinks[0].getAttribute('href').slice(1));
  }, 300);
  document.addEventListener('railActivate', function () {
    clearTimeout(initTimer);
  }, { once: true });

}());
