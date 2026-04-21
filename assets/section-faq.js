(function () {
  'use strict';

  function initFaq(section) {
    var dataEl = section.querySelector('.faq-data');
    if (!dataEl) return;

    var items;
    try {
      items = JSON.parse(dataEl.textContent);
    } catch (e) {
      return;
    }

    var tabsContainer    = section.querySelector('.faq-tabs');
    var accordion        = section.querySelector('.faq-accordion');
    var categoryTitle    = section.querySelector('.faq-category-title');
    var categoryIcon     = section.querySelector('.faq-category-icon');
    var sectionIcon      = section.dataset.categoryIcon || '🐾';

    if (!tabsContainer || !accordion || !categoryTitle) return;

    /* ── 1. Extract unique ordered categories ── */
    var seen = [];
    items.forEach(function (item) {
      if (item.category && seen.indexOf(item.category) === -1) {
        seen.push(item.category);
      }
    });
    var categories = seen;

    if (categories.length === 0) return;

    /* ── 2. Build tab buttons ── */
    tabsContainer.innerHTML = '';
    categories.forEach(function (cat, idx) {
      var btn = document.createElement('button');
      btn.className = 'faq-tab' + (idx === 0 ? ' is-active' : '');
      btn.type = 'button';
      btn.textContent = cat;
      btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
      btn.addEventListener('click', function () {
        activateCategory(cat, btn);
      });
      tabsContainer.appendChild(btn);
    });

    /* ── 3. Render accordion for a category ── */
    function activateCategory(cat, activeBtn) {
      /* Update tabs */
      tabsContainer.querySelectorAll('.faq-tab').forEach(function (b) {
        var active = b === activeBtn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      /* Update right heading */
      categoryTitle.textContent = cat;
      if (categoryIcon) categoryIcon.textContent = sectionIcon;

      /* Filter items for this category */
      var filtered = items.filter(function (item) {
        return item.category === cat;
      });

      /* Build accordion */
      accordion.innerHTML = '';
      filtered.forEach(function (item, idx) {
        var el = document.createElement('div');
        el.className = 'faq-item' + (idx === 0 ? ' is-open' : '');

        var btn = document.createElement('button');
        btn.className = 'faq-item__question';
        btn.type = 'button';
        btn.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');

        var qText = document.createElement('span');
        qText.className = 'faq-item__q-text';
        qText.textContent = item.question;

        var toggle = document.createElement('span');
        toggle.className = 'faq-item__toggle';
        toggle.setAttribute('aria-hidden', 'true');
        toggle.textContent = idx === 0 ? '−' : '+';

        btn.appendChild(qText);
        btn.appendChild(toggle);

        var answer = document.createElement('div');
        answer.className = 'faq-item__answer';
        answer.textContent = item.answer;

        btn.addEventListener('click', function () {
          var isOpen = el.classList.contains('is-open');
          el.classList.toggle('is-open', !isOpen);
          btn.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
          toggle.textContent = !isOpen ? '−' : '+';
        });

        el.appendChild(btn);
        el.appendChild(answer);
        accordion.appendChild(el);
      });
    }

    /* ── 4. Activate first category on load ── */
    var firstBtn = tabsContainer.querySelector('.faq-tab');
    if (firstBtn) activateCategory(categories[0], firstBtn);
  }

  function init() {
    document.querySelectorAll('.section-faq').forEach(function (section) {
      if (!section.dataset.faqInit) {
        section.dataset.faqInit = 'true';
        initFaq(section);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
