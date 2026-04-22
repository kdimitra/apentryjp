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

    var tabsContainer = section.querySelector('.faq-tabs');
    var accordion     = section.querySelector('.faq-accordion');
    var categoryTitle = section.querySelector('.faq-category-title');
    var categoryIcon  = section.querySelector('.faq-category-icon');
    var sectionIcon   = section.dataset.categoryIcon || '🐾';

    if (!tabsContainer || !accordion || !categoryTitle) return;

    /* ── 1. Extract unique ordered categories ── */
    var categories = [];
    items.forEach(function (item) {
      if (item.category && categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }
    });

    if (categories.length === 0) return;

    /* ── 2. Build ALL category groups in the accordion ── */
    accordion.innerHTML = '';
    var groupMap = {};

    categories.forEach(function (cat) {
      var group = document.createElement('div');
      group.className = 'faq-group';
      group.dataset.category = cat;

      var groupHeading = document.createElement('p');
      groupHeading.className = 'faq-group__heading';
      groupHeading.textContent = cat;
      group.appendChild(groupHeading);

      var catItems = items.filter(function (item) { return item.category === cat; });

      catItems.forEach(function (item, idx) {
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
        group.appendChild(el);
      });

      accordion.appendChild(group);
      groupMap[cat] = group;
    });

    /* ── 3. Build tab buttons ── */
    tabsContainer.innerHTML = '';
    categories.forEach(function (cat, idx) {
      var btn = document.createElement('button');
      btn.className = 'faq-tab' + (idx === 0 ? ' is-active' : '');
      btn.type = 'button';
      btn.textContent = cat;
      btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');

      btn.addEventListener('click', function () {
        /* Update active tab */
        tabsContainer.querySelectorAll('.faq-tab').forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        /* Update heading */
        categoryTitle.textContent = cat;
        if (categoryIcon) categoryIcon.textContent = sectionIcon;

        /* Smooth scroll to the group */
        var target = groupMap[cat];
        if (target) {
          var headerOffset = getHeaderHeight();
          var top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 24;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });

      tabsContainer.appendChild(btn);
    });

    /* ── 4. Set initial heading to first category ── */
    categoryTitle.textContent = categories[0];
    if (categoryIcon) categoryIcon.textContent = sectionIcon;

    /* ── 5. IntersectionObserver — sync active tab with scroll position ── */
    var observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cat = entry.target.dataset.category;
          tabsContainer.querySelectorAll('.faq-tab').forEach(function (b) {
            var active = b.textContent === cat;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          categoryTitle.textContent = cat;
          if (categoryIcon) categoryIcon.textContent = sectionIcon;
        }
      });
    }, observerOptions);

    Object.values(groupMap).forEach(function (group) {
      observer.observe(group);
    });
  }

  function getHeaderHeight() {
    var header = document.querySelector('header, .header, #shopify-section-header');
    return header ? header.offsetHeight : 80;
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
