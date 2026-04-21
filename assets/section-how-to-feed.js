(function () {
  'use strict';

  /* Multiplier ranges per life stage value [min, max] */
  var RATES = {
    puppy:     [0.03, 0.05],
    active:    [0.03, 0.05],
    adult:     [0.02, 0.04],
    senior:    [0.02, 0.04],
    pregnant:  [0.02, 0.04],
    nursing:   [0.03, 0.06]
  };

  function formatGrams(g) {
    return Math.round(g) + 'g';
  }

  function calculate(weightKg, stage) {
    var rate = RATES[stage] || RATES['adult'];
    var min = weightKg * 1000 * rate[0];
    var max = weightKg * 1000 * rate[1];
    return formatGrams(min) + ' 〜 ' + formatGrams(max) + ' / 日';
  }

  function initSimulator(section) {
    var form     = section.querySelector('.htf-sim-form');
    var weightEl = section.querySelector('.htf-sim-weight');
    var stageEl  = section.querySelector('.htf-sim-stage');
    var resultEl = section.querySelector('.htf-sim-result');
    var btn      = section.querySelector('.htf-sim-button');

    if (!form || !weightEl || !stageEl || !resultEl || !btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();

      var weight = parseFloat(weightEl.value);
      var stage  = stageEl.value;

      resultEl.textContent = '';

      if (!weight || weight <= 0 || isNaN(weight)) {
        resultEl.textContent = '体重を正しく入力してください。';
        return;
      }

      var result = calculate(weight, stage);
      resultEl.textContent = '目安の食事量：' + result;
    });
  }

  function init() {
    document.querySelectorAll('.section-how-to-feed').forEach(function (section) {
      if (!section.dataset.htfInit) {
        section.dataset.htfInit = 'true';
        initSimulator(section);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
