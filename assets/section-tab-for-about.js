(function () {
  'use strict';

  class AboutTabNav {
    constructor(container) {
      this.container = container;
      this.tabs = Array.from(container.querySelectorAll('.ta-tab'));
      this.headerOffset = this._getHeaderHeight() + 16;
      this.observer = null;
      this._init();
    }

    _getHeaderHeight() {
      const header = document.getElementById('header-group') || document.querySelector('header');
      return header ? header.getBoundingClientRect().height : 64;
    }

    _init() {
      this.tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = tab.getAttribute('data-target');
          if (!targetId) return;
          const target = document.getElementById(targetId);
          if (!target) return;
          this._scrollTo(target);
          this._setActive(tab);
        });
      });

      this._initObserver();
    }

    _scrollTo(el) {
      const top = el.getBoundingClientRect().top + window.scrollY - this.headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    _setActive(activeTab) {
      this.tabs.forEach((t) => t.classList.remove('is-active'));
      activeTab.classList.add('is-active');
    }

    _initObserver() {
      const targets = this.tabs
        .map((tab) => document.getElementById(tab.getAttribute('data-target')))
        .filter(Boolean);

      if (!targets.length || typeof IntersectionObserver === 'undefined') return;

      const options = {
        rootMargin: `-${this.headerOffset + 10}px 0px -50% 0px`,
        threshold: 0,
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const matchingTab = this.tabs.find((t) => t.getAttribute('data-target') === id);
          if (matchingTab) this._setActive(matchingTab);
        });
      }, options);

      targets.forEach((el) => this.observer.observe(el));
    }

    destroy() {
      if (this.observer) this.observer.disconnect();
    }
  }

  function init() {
    document.querySelectorAll('.section-tab-for-about').forEach((el) => {
      if (!el.dataset.tabNavInit) {
        el.dataset.tabNavInit = 'true';
        new AboutTabNav(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
