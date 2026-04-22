(function () {
  'use strict';

  function initReviewCarousel(section) {
    var track  = section.querySelector('.rr-cards');
    var dotsEl = section.querySelector('.rr-dots');
    if (!track) return;

    var cards = Array.from(track.querySelectorAll('.rr-card'));
    if (cards.length === 0) return;

    /* ── Dot indicators ── */
    var dots = [];
    if (dotsEl && cards.length > 1) {
      cards.forEach(function (_, idx) {
        var dot = document.createElement('button');
        dot.className = 'rr-dot' + (idx === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', (idx + 1) + '枚目のレビュー');
        dot.addEventListener('click', function () {
          cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        });
        dotsEl.appendChild(dot);
        dots.push(dot);
      });
    }

    function setActiveDot(idx) {
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === idx);
      });
    }

    /* ── IntersectionObserver — sync dots with scroll ── */
    if (dots.length > 0) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = cards.indexOf(entry.target);
            if (idx !== -1) setActiveDot(idx);
          }
        });
      }, { root: track, threshold: 0.5 });

      cards.forEach(function (card) { observer.observe(card); });
    }

    /* ── Drag to scroll (mouse) ── */
    var isDown  = false;
    var startX  = 0;
    var scrollL = 0;

    track.addEventListener('mousedown', function (e) {
      isDown  = true;
      startX  = e.pageX - track.offsetLeft;
      scrollL = track.scrollLeft;
      track.classList.add('is-grabbing');
    });

    track.addEventListener('mouseleave', function () {
      isDown = false;
      track.classList.remove('is-grabbing');
    });

    track.addEventListener('mouseup', function () {
      isDown = false;
      track.classList.remove('is-grabbing');
    });

    track.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x    = e.pageX - track.offsetLeft;
      var walk = (x - startX) * 1.2;
      track.scrollLeft = scrollL - walk;
    });
  }

  function init() {
    document.querySelectorAll('.section-rr').forEach(function (section) {
      if (!section.dataset.rrInit) {
        section.dataset.rrInit = 'true';
        initReviewCarousel(section);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
