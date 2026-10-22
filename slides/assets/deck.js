/* Week 7 lecture decks (F20DL/F21DL), Dr Heba El-Shimy.
   Shared set-up for every deck: logo, footer and copyright lines, demo slides, maths, drawing tools, keys.
   Everything loads from this repository, so the decks work offline. */
(function () {
  'use strict';

  var AUTHOR_LINE = 'Dr. Heba El-Shimy ©2026 Heriot-Watt University';
  var LOGO = '../images/logo.png';
  var SECTION_BG = '../images/bg.jpg';

  // Folder that holds this file (slides/assets/), so vendor paths work wherever the deck is opened from.
  var here = (function () {
    var s = document.currentScript && document.currentScript.src;
    return s ? s.slice(0, s.lastIndexOf('/') + 1) : 'assets/';
  })();
  var VENDOR = here + '../vendor/';
  var printing = /print-pdf/i.test(window.location.search);

  /* ---------- 1. decorate slides before reveal.js starts ---------- */
  function decorate() {
    var sections = document.querySelectorAll('.reveal .slides section');
    Array.prototype.forEach.call(sections, function (s) {
      if (s.querySelector('section')) { s.classList.add('stack'); return; }   // vertical stack wrapper
      if (s.classList.contains('title-slide')) return;                      // copyright notice is written in the slide

      if (s.classList.contains('section-slide')) {
        s.setAttribute('data-background-image', SECTION_BG);
        s.setAttribute('data-background-color', '#0C1F2D');
      } else if (!s.classList.contains('demo') && !s.classList.contains('no-logo')) {
        var img = document.createElement('img');
        img.className = 'logo'; img.src = LOGO; img.alt = 'Heriot-Watt University';
        s.insertBefore(img, s.firstChild);
      }

      if (s.classList.contains('demo')) {
        var src = s.getAttribute('data-demo');
        var frame = document.createElement('iframe');
        frame.className = 'demo-frame';
        frame.setAttribute('data-src', src + '#deck');            // reveal.js loads it when the slide is near
        frame.setAttribute('title', s.getAttribute('data-title') || 'Interactive demo');
        frame.setAttribute('allowfullscreen', '');
        s.insertBefore(frame, s.firstChild);
        var open = document.createElement('a');
        open.className = 'demo-open'; open.href = src; open.target = '_blank'; open.rel = 'noopener';
        open.textContent = 'Open in a new tab ↗';
        s.appendChild(open);
      }

      var foot = document.createElement('div');
      foot.className = 'deck-footer';
      foot.textContent = AUTHOR_LINE;
      s.appendChild(foot);
    });
  }

  /* ---------- 2. maths (MathJax 3, SVG output, no web fonts needed) ---------- */
  function loadMath() {
    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]'], ['$$', '$$']]
      },
      svg: { fontCache: 'global' },
      options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] },
      startup: {
        ready: function () {
          window.MathJax.startup.defaultReady();
          window.MathJax.startup.promise.then(function () {
            document.documentElement.classList.add('math-ready');
            if (window.Reveal && window.Reveal.isReady()) window.Reveal.layout();
          });
        }
      }
    };
    var s = document.createElement('script');
    s.src = VENDOR + 'mathjax/tex-svg-full.js';
    s.async = true;
    document.head.appendChild(s);
  }

  /* ---------- 3. drawing tools (chalkboard plugin) ---------- */
  var ICON_PEN = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/><path d="M14 6l3 3"/></svg>';
  var ICON_BOARD = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21l4-4 4 4"/></svg>';
  function addTools() {
    if (printing || !window.RevealChalkboard) return;
    var bar = document.createElement('div');
    bar.className = 'deck-tools';
    bar.innerHTML =
      '<button type="button" id="tool-pen" title="Draw on this slide (C). Right-drag to erase, Delete to clear.">' + ICON_PEN + '</button>' +
      '<button type="button" id="tool-board" title="Whiteboard (B)">' + ICON_BOARD + '</button>';
    document.body.appendChild(bar);
    document.getElementById('tool-pen').addEventListener('click', function () { window.RevealChalkboard.toggleNotesCanvas(); this.blur(); });
    document.getElementById('tool-board').addEventListener('click', function () { window.RevealChalkboard.toggleChalkboard(); this.blur(); });
  }

  /* ---------- 4. keys from inside demos (presenter remote, arrows) ---------- */
  function wireDemoKeys(Reveal) {
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.type !== 'deck-nav') return;
      var a = document.activeElement;
      if (a && a.tagName === 'IFRAME') a.blur();
      if (d.dir === 'next') Reveal.next();
      else if (d.dir === 'prev') Reveal.prev();
    });
    // Leaving a slide hands the keyboard back to the deck, even if the demo had it.
    Reveal.on('slidechanged', function () {
      var a = document.activeElement;
      if (a && a.tagName === 'IFRAME') a.blur();
    });
  }

  /* ---------- start ---------- */
  decorate();
  loadMath();

  var plugins = [];
  if (window.RevealNotes) plugins.push(window.RevealNotes);
  if (window.RevealZoom) plugins.push(window.RevealZoom);
  if (window.RevealChalkboard) plugins.push(window.RevealChalkboard);

  window.Reveal.initialize({
    width: 1366,
    height: 768,
    margin: 0.02,
    minScale: 0.1,
    maxScale: 3,
    center: false,
    hash: true,
    controls: true,
    controlsTutorial: false,
    progress: true,
    slideNumber: 'c/t',
    transition: 'fade',
    transitionSpeed: 'fast',
    backgroundTransition: 'fade',
    viewDistance: 2,
    pdfSeparateFragments: false,
    chalkboard: {
      theme: 'whiteboard',
      boardmarkerWidth: 4,
      transition: 300,
      toggleChalkboardButton: false,
      toggleNotesButton: false
    },
    plugins: plugins
  }).then(function () {
    addTools();
    wireDemoKeys(window.Reveal);
    if (document.documentElement.classList.contains('math-ready')) window.Reveal.layout();
  });
})();
