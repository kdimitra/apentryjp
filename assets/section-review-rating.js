(function () {
  'use strict';

  /* Okendo renders its widget asynchronously after their app script loads.
     We observe the wrapper div and wire up carousel behaviour once their
     review list appears in the DOM. */

  var TRACK_SELECTORS = [
    '.oke-w-reviews-list',
    '.oke-reviews-list',
    '[data-oke-reviews-list]'
  ];

  function getTrack(wrapper) {
    for (var i = 0; i < TRACK_SELECTORS.length; i++) {
      var el = wrapper.querySelector(TRACK_SELECTORS[i]);
      if (el) return el;
    }
    return null;
  }

  function getCards(track) {
    var cards = track.querySelectorAll('.oke-review, .oke-w-review');
    return Array.from(cards);
  }

  function initCarousel(section) {
    var wrapper = section.querySelector('.rr-okendo-wrapper');
    var dotsEl  = section.querySelector('.rr-dots');
    if (!wrapper) return;

    /* Wait for Okendo to inject the review list */
    var mo = new MutationObserver(function () {
      var track = getTrack(wrapper);
      if (!track) return;

      var cards = getCards(track);
      if (cards.length === 0) return;

      mo.disconnect();
      wireCarousel(track, cards, dotsEl);
    });

    mo.observe(wrapper, { childList: true, subtree: true });

    /* Also try immediately in case Okendo already rendered */
    var track = getTrack(wrapper);
    if (track) {
      var cards = getCards(track);
      if (cards.length > 0) {
        mo.disconnect();
        wireCarousel(track, cards, dotsEl);
      }
    }
  }

  function wireCarousel(track, cards, dotsEl) {
    /* ── Dot indicators ── */
    var dots = [];
    if (dotsEl && cards.length > 1) {
      dotsEl.innerHTML = '';
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

    /* IntersectionObserver syncs active dot with scroll position */
    if (dots.length > 0) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveDot(cards.indexOf(entry.target));
          }
        });
      }, { root: track, threshold: 0.5 });

      cards.forEach(function (card) { io.observe(card); });
    }

    /* ── Drag to scroll (mouse only) ── */
    var isDown = false, startX = 0, scrollL = 0;

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
      var x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollL - (x - startX) * 1.2;
    });
  }

  function init() {
    document.querySelectorAll('.section-rr').forEach(function (section) {
      if (!section.dataset.rrInit) {
        section.dataset.rrInit = 'true';
        initCarousel(section);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
