/* Zwick Before/After Drag Slider
   Initialisiert alle .ba-slider auf der Seite.
   Pointer Events API (Mouse + Touch unified).
*/
(function () {
  'use strict';

  function initSlider(slider) {
    const handle = slider.querySelector('.ba-handle');
    const after  = slider.querySelector('.ba-after');
    if (!handle || !after) return;

    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = (x - rect.left) / rect.width;
      pct = Math.max(0.02, Math.min(0.98, pct));
      after.style.clipPath = `inset(0 ${(1 - pct) * 100}% 0 0)`;
      handle.style.left = `${pct * 100}%`;
    }

    // Start at 50%
    after.style.clipPath = 'inset(0 50% 0 0)';
    handle.style.left = '50%';

    handle.addEventListener('pointerdown', (e) => {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      setPosition(e.clientX);
    });

    handle.addEventListener('pointerup',     () => { dragging = false; });
    handle.addEventListener('pointercancel', () => { dragging = false; });

    // Klick auf Slider-Body springt zur Position
    slider.addEventListener('click', (e) => {
      if (e.target === handle || handle.contains(e.target)) return;
      setPosition(e.clientX);
    });
  }

  function initAll() {
    document.querySelectorAll('.ba-slider').forEach(initSlider);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
